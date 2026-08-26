import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Static export to ./out — the site moves to shared hosting in Kazakhstan,
  // where there is no Node.js runtime. Required by the KIB notice: a .kz domain
  // must be served from a server inside the country.
  output: 'export',

  // Writes out/ru/index.html instead of out/ru.html, so nginx and Apache serve
  // it with their default DirectoryIndex and no rewrite rules.
  trailingSlash: true,

  // There is no /_next/image endpoint on a static host. Images are optimised at
  // build time by scripts/optimize-images.mjs instead.
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
