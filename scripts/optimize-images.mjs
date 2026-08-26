/**
 * Rebuilds public/ image assets from the originals in assets-src/.
 *
 * Why this exists: the icons ship as 1024x1024 JPEGs named .png and are
 * displayed at 24-32 CSS pixels. Being JPEG they carry an opaque white square,
 * which covers the coloured chip they sit in. Vercel's image optimizer hid the
 * weight; a static host in Kazakhstan will not.
 *
 * Run: npm run images   (also runs automatically before `npm run build`)
 */

import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "assets-src";
const OUT = "public";

/**
 * Clears the flat background surrounding artwork by flood-filling from the
 * borders. Only pixels connected to an edge are erased, so white details
 * *inside* the icon (the gaps between vertebrae) are preserved.
 */
async function removeBackground(inputPath, threshold = 244) {
    const { data, info } = await sharp(inputPath)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    const visited = new Uint8Array(width * height);
    const stack = [];

    const isBackground = (idx) => {
        const p = idx * channels;
        return data[p] >= threshold && data[p + 1] >= threshold && data[p + 2] >= threshold;
    };

    const push = (x, y) => {
        const idx = y * width + x;
        if (!visited[idx] && isBackground(idx)) {
            visited[idx] = 1;
            stack.push(idx);
        }
    };

    for (let x = 0; x < width; x++) {
        push(x, 0);
        push(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
        push(0, y);
        push(width - 1, y);
    }

    while (stack.length) {
        const idx = stack.pop();
        data[idx * channels + 3] = 0; // transparent
        const x = idx % width;
        const y = (idx - x) / width;
        if (x > 0) push(x - 1, y);
        if (x < width - 1) push(x + 1, y);
        if (y > 0) push(x, y - 1);
        if (y < height - 1) push(x, y + 1);
    }

    return sharp(data, { raw: { width, height, channels } });
}

async function run() {
    await mkdir(join(OUT, "icons"), { recursive: true });
    await mkdir(join(OUT, "doctors"), { recursive: true });

    // Service icons — displayed at 24px (landing) and 32px (price list).
    const icons = await readdir(join(SRC, "icons"));
    for (const file of icons) {
        const { name } = parse(file);
        const image = await removeBackground(join(SRC, "icons", file));
        await image
            .resize({ width: 96, height: 96, fit: "inside", withoutEnlargement: true })
            .webp({ quality: 82, alphaQuality: 90, effort: 6 })
            .toFile(join(OUT, "icons", `${name}.webp`));
    }
    console.log(`icons: ${icons.length} -> webp 96px, background removed`);

    // Doctor portraits — displayed in a 96px circle.
    const doctors = await readdir(join(SRC, "doctors"));
    for (const file of doctors) {
        const { name } = parse(file);
        await sharp(join(SRC, "doctors", file))
            .resize({ width: 192, height: 192, fit: "cover", position: "top" })
            .webp({ quality: 74, effort: 6 })
            .toFile(join(OUT, "doctors", `${name}.webp`));
    }
    console.log(`doctors: ${doctors.length} -> webp 192px`);

    // Full-viewport background, sitting behind a white scrim at 40-70% opacity.
    await sharp(join(SRC, "misc", "spine-bg-right.png"))
        .resize({ width: 1280 })
        .webp({ quality: 62, effort: 6 })
        .toFile(join(OUT, "spine-bg-right.webp"));
    await sharp(join(SRC, "misc", "spine-bg-right.png"))
        .resize({ width: 640 })
        .webp({ quality: 60, effort: 6 })
        .toFile(join(OUT, "spine-bg-right-640.webp"));
    console.log("background: webp 1280 + 640");

    await sharp(join(SRC, "misc", "map-preview.png"))
        .resize({ width: 800 })
        .webp({ quality: 75, effort: 6 })
        .toFile(join(OUT, "map-preview.webp"));
    console.log("map: webp 800");

    // Logo keeps its alpha channel.
    await sharp(join(SRC, "misc", "logo.png"))
        .resize({ width: 96 })
        .webp({ quality: 88, alphaQuality: 95, effort: 6 })
        .toFile(join(OUT, "logo.webp"));
    console.log("logo: webp 96");

    // Social preview must be a real 1200x630 JPEG: the file was a 1024x1024
    // JPEG named .png while the metadata claimed 1200x630, so every shared
    // link rendered cropped.
    await sharp(join(SRC, "misc", "og-image.png"))
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(join(OUT, "og-image.jpg"));
    console.log("og-image: jpeg 1200x630");

    // Favicons — the tab icon used to be a 316 KB 1024x1024 PNG.
    await sharp(join(SRC, "misc", "logo.png"))
        .resize(32, 32)
        .png({ compressionLevel: 9 })
        .toFile("app/icon.png");
    await sharp(join(SRC, "misc", "logo.png"))
        .resize(180, 180)
        .png({ compressionLevel: 9 })
        .toFile("app/apple-icon.png");
    console.log("favicons: 32 + 180");

    await writeFile(
        join(OUT, "icons", ".gitkeep"),
        "",
        "utf8"
    ).catch(() => { });
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
