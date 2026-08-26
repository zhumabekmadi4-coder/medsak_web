import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

const locales = ['ru', 'kk'] as const;

// lastModified is pinned by hand: `new Date()` would move on every deploy even
// when nothing changed, and search engines stop trusting the signal.
const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const, lastModified: '2026-08-26' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-08-26' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: '2026-08-26' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const, lastModified: '2026-08-26' },
    { path: '/license', priority: 0.4, changeFrequency: 'yearly' as const, lastModified: '2026-08-26' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const, lastModified: '2026-08-26' },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.flatMap(({ path, priority, changeFrequency, lastModified }) =>
        locales.map((locale) => ({
            url: `${SITE_URL}/${locale}${path}`,
            lastModified: new Date(lastModified),
            changeFrequency,
            priority,
            alternates: {
                languages: {
                    ru: `${SITE_URL}/ru${path}`,
                    kk: `${SITE_URL}/kk${path}`,
                    'x-default': `${SITE_URL}/ru${path}`,
                },
            },
        }))
    );
}
