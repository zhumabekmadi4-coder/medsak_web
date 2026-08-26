"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';

const LOCALES = [
    { code: 'ru', label: 'РУС', full: 'Русский' },
    { code: 'kk', label: 'ҚАЗ', full: 'Қазақша' },
] as const;

export function LanguageSwitcher() {
    const locale = useLocale();
    // Locale-aware router from @/i18n/routing: the previous hand-rolled path
    // surgery on next/navigation dropped the query string, so switching
    // language on a page opened from an ad lost its UTM tags.
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const t = useTranslations('nav');

    const switchLanguage = (newLocale: string) => {
        if (locale === newLocale) return;
        startTransition(() => {
            router.replace(pathname, { locale: newLocale as 'ru' | 'kk' });
        });
    };

    return (
        <div
            role="group"
            aria-label={t('footerNav')}
            className="flex items-center gap-1 bg-slate-100 rounded-full p-1"
        >
            {LOCALES.map(({ code, label, full }) => (
                <button
                    key={code}
                    type="button"
                    lang={code}
                    onClick={() => switchLanguage(code)}
                    disabled={isPending}
                    aria-pressed={locale === code}
                    aria-label={full}
                    className={`min-h-[44px] min-w-[56px] px-4 text-base font-semibold rounded-full transition-colors ${locale === code
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
