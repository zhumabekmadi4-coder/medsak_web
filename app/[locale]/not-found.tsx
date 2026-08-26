import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE } from "@/lib/site-config";

export default function LocaleNotFound() {
    const t = useTranslations('notFound');

    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 text-center pt-32 pb-20">
            <p className="text-7xl font-bold text-primary">404</p>
            <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
            <p className="text-lg text-slate-700 max-w-xl">{t('subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center min-h-[48px] rounded-xl bg-primary px-6 text-white font-semibold"
                >
                    {t('home')}
                </Link>
                <a
                    href={SITE.phone.tel}
                    className="inline-flex items-center justify-center min-h-[48px] rounded-xl border-2 border-primary px-6 text-primary font-semibold"
                >
                    {SITE.phone.display}
                </a>
            </div>
        </section>
    );
}
