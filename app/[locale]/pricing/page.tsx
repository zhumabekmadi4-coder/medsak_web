import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { services } from "@/data/services";
import { PricingCard } from "@/components/pricing/PricingCard";
import { buildMetadata, type Locale } from "@/lib/seo";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
    const { locale } = await params;
    return buildMetadata(locale, "pricing");
}

export default async function PricingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('pricing');
    const tServices = await getTranslations('services_data');

    return (
        <>
            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-white/60 backdrop-blur-sm">
                <div className="container mx-auto text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('title')}</h1>
                    <p className="text-lg text-slate-700">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Pricing List */}
            <section className="py-12 bg-transparent container mx-auto px-4">
                <h2 className="sr-only">{t('programsHeading')}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <PricingCard
                            key={service.id}
                            service={service}
                            title={tServices(`${service.id}.title`)}
                            description={tServices(`${service.id}.fullDesc`)}
                            benefits={{
                                consultation: t('benefits.consultation'),
                                plan: t('benefits.plan'),
                                support: t('benefits.support'),
                            }}
                            bookButtonLabel={t('bookButton')}
                            priceOnRequestLabel={t('priceOnRequest')}
                            showDetailsLabel={t('showDetails')}
                            hideDetailsLabel={t('hideDetails')}
                            waMessage={t('waMessage', { service: tServices(`${service.id}.title`) })}
                        />
                    ))}
                </div>

                <p className="mt-12 text-sm text-slate-600 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('offerNote')}
                </p>
            </section>
        </>
    );
}
