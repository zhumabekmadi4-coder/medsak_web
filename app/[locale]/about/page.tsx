import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata, type Locale } from "@/lib/seo";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
    const { locale } = await params;
    return buildMetadata(locale, "about");
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('about_section');

    return (
        <>
            {/* The whole page used to be hardcoded Russian and called the clinic
                "Medsak" — the repository folder name had leaked into the copy. */}
            <section className="pt-32 pb-16 px-4 bg-slate-50">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-700 leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6 text-lg text-slate-700">
                        <p>{t('p1')}</p>
                        <p>{t('p2')}</p>
                        <p>{t('p3')}</p>
                        <div className="pl-4 border-l-4 border-primary text-slate-700 my-8">
                            {t('p4')}
                        </div>
                        <p className="text-xl font-semibold text-primary">{t('slogan_1')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('approach_title')}</h2>
                        <ul className="space-y-3 text-lg text-slate-700">
                            {['approach_1', 'approach_2', 'approach_3', 'approach_4', 'approach_5', 'approach_6', 'approach_7'].map((key) => (
                                <li key={key} className="flex gap-3">
                                    <span className="text-primary font-bold" aria-hidden="true">—</span>
                                    <span>{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
