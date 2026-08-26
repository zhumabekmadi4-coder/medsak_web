import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

// Required by `output: 'export'` — route handlers must opt into static
// generation explicitly, otherwise the build refuses to emit them.
export const dynamic = 'force-static';

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

// trailingSlash: true, so canonical URLs end with a slash. The sitemap must
// use the exact same form or search engines treat them as separate URLs.
const url = (locale: string, path: string) => `${SITE_URL}/${locale}${path}/`;

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.flatMap(({ path, priority, changeFrequency, lastModified }) =>
        locales.map((locale) => ({
            url: url(locale, path),
            lastModified: new Date(lastModified),
            changeFrequency,
            priority,
            alternates: {
                languages: {
                    ru: url('ru', path),
                    kk: url('kk', path),
                    'x-default': url('ru', path),
                },
            },
        }))
    );
}
