import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata, type Locale } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
    const { locale } = await params;
    return buildMetadata(locale, "license");
}

export default async function LicensePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('legal');
    const tContact = await getTranslations('contact');

    const hasLicenceDetails = Boolean(SITE.legal.licenseNumber);
    const hasRequisites = Boolean(SITE.legal.entityName || SITE.legal.bin || SITE.legal.legalAddress);

    return (
        <section className="pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">{t('licenseTitle')}</h1>

                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                    <p>{t('licenseIntro')}</p>

                    {hasLicenceDetails ? (
                        <dl className="grid sm:grid-cols-[220px_1fr] gap-x-6 gap-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-base">
                            <dt className="font-semibold text-slate-900">{t('licenseNumberLabel')}</dt>
                            <dd>{SITE.legal.licenseNumber}</dd>
                            {SITE.legal.licenseDate && (
                                <>
                                    <dt className="font-semibold text-slate-900">{t('licenseDateLabel')}</dt>
                                    <dd>{SITE.legal.licenseDate}</dd>
                                </>
                            )}
                            {SITE.legal.licenseAuthority && (
                                <>
                                    <dt className="font-semibold text-slate-900">{t('licenseAuthorityLabel')}</dt>
                                    <dd>{SITE.legal.licenseAuthority}</dd>
                                </>
                            )}
                        </dl>
                    ) : (
                        // Shown until the clinic supplies the licence details, so the
                        // page never presents a placeholder as if it were real data.
                        <p className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-base">
                            {t('licensePending')}
                        </p>
                    )}

                    <p className="text-base">
                        {t('licenseRegistry')}:{' '}
                        <a
                            href="https://elicense.kz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-4"
                        >
                            elicense.kz
                        </a>
                    </p>

                    {hasRequisites && (
                        <>
                            <h2 className="text-2xl font-bold text-slate-900 pt-6">{t('requisitesTitle')}</h2>
                            <dl className="grid sm:grid-cols-[220px_1fr] gap-x-6 gap-y-3 text-base">
                                {SITE.legal.entityName && (
                                    <>
                                        <dt className="font-semibold text-slate-900">{t('entityLabel')}</dt>
                                        <dd>{SITE.legal.entityName}</dd>
                                    </>
                                )}
                                {SITE.legal.bin && (
                                    <>
                                        <dt className="font-semibold text-slate-900">{t('binLabel')}</dt>
                                        <dd>{SITE.legal.bin}</dd>
                                    </>
                                )}
                                {SITE.legal.legalAddress && (
                                    <>
                                        <dt className="font-semibold text-slate-900">{t('legalAddressLabel')}</dt>
                                        <dd>{SITE.legal.legalAddress}</dd>
                                    </>
                                )}
                            </dl>
                        </>
                    )}

                    <h2 className="text-2xl font-bold text-slate-900 pt-6">{t('complaintsTitle')}</h2>
                    <p className="text-base">{t('complaintsBody')}</p>

                    <p className="text-base">
                        {tContact('phone')}:{' '}
                        <a href={SITE.phone.tel} className="text-primary underline underline-offset-4">
                            {SITE.phone.display}
                        </a>
                        {' · '}
                        {tContact('email')}:{' '}
                        <a href={`mailto:${SITE.email}`} className="text-primary underline underline-offset-4">
                            {SITE.email}
                        </a>
                    </p>

                    <p className="text-base text-slate-600 border-t border-slate-200 pt-6">
                        {t('disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}
