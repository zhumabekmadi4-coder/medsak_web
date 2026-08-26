import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['ru', 'kk'] as const,
    defaultLocale: 'ru',

    // Stated explicitly: with a static export there is no server to strip the
    // prefix, so every URL must carry /ru or /kk. Switching this to 'as-needed'
    // would 404 the whole site.
    localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
