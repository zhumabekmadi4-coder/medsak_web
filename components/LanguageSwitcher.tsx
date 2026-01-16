"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const switchLanguage = (newLocale: string) => {
        if (locale === newLocale) return;

        startTransition(() => {
            // Remove current locale from pathname and add new locale
            const segments = pathname.split('/').filter(Boolean);

            // Remove old locale if present
            if (segments[0] === 'ru' || segments[0] === 'kk') {
                segments.shift();
            }

            // Build new path
            const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
            router.replace(newPath);
        });
    };

    return (
        <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
            <button
                onClick={() => switchLanguage('ru')}
                disabled={isPending}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${locale === 'ru'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
            >
                РУС
            </button>
            <button
                onClick={() => switchLanguage('kk')}
                disabled={isPending}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${locale === 'kk'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
            >
                ҚАЗ
            </button>
        </div>
    );
}
