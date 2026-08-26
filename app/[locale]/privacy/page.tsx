import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata, type Locale } from "@/lib/seo";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
    const { locale } = await params;
    return buildMetadata(locale, "privacy");
}

const SECTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('legal');

    return (
        <section className="pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('privacyTitle')}</h1>
                <p className="text-base text-slate-600 mb-10">{t('privacyUpdated')}</p>

                <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
                    {SECTIONS.map((n) => (
                        <div key={n} className="space-y-3">
                            <h2 className="text-xl font-bold text-slate-900">{t(`privacyS${n}Title`)}</h2>
                            <p className="text-base">{t(`privacyS${n}Body`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
