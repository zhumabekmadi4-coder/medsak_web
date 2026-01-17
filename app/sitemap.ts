import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sakclinic.kz';
    const locales = ['ru', 'kk'];
    const lastModified = new Date();

    // Generate sitemap entries for all pages and language versions
    const routes = [
        '',           // Homepage
        // Add more routes here as your site grows
        // '/about',
        // '/services',
        // '/contact',
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    // Generate entries for each route and locale
    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified,
                changeFrequency: route === '' ? 'weekly' : 'monthly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    return sitemap;
}
