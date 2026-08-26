import { MapPin, Phone, Mail, Instagram, Clock, Send, Youtube, type LucideIcon } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE, waLink } from "@/lib/site-config";

type ContactProps = {
    /** "section" is used on the dedicated /contact page, where a footer role would be wrong. */
    as?: "footer" | "section";
    headingLevel?: 1 | 2;
};

export function Contact({ as = "footer", headingLevel = 2 }: ContactProps = {}) {
    const t = useTranslations('contact');
    const tNav = useTranslations('nav');
    const tLegal = useTranslations('legal');

    const Wrapper = as;
    const Heading = headingLevel === 1 ? "h1" : "h2";

    return (
        <Wrapper className="bg-slate-900 text-white py-16 lg:py-24 overflow-hidden relative" id="contact">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info */}
                    <div className="space-y-8">
                        <div>
                            <Heading className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
                                {t('title')}
                            </Heading>
                            <p className="text-slate-300 text-lg">
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <ContactItem icon={MapPin} title={t('address')} text={t('addressValue')} />
                            <ContactItem icon={Phone} title={t('phone')} text={SITE.phone.display} href={SITE.phone.tel} />
                            <ContactItem icon={Mail} title={t('email')} text={SITE.email} href={`mailto:${SITE.email}`} />
                            <ContactItem icon={Clock} title={t('hours')} text={t('hoursValue')} />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <SocialButton icon={Instagram} href={SITE.social.instagram} label="Instagram" />
                            <SocialButton icon={Youtube} href={SITE.social.youtube} label="YouTube" />
                            <SocialButton icon={Send} href={waLink(t('waMessage'))} label="WhatsApp" />
                        </div>
                    </div>

                    {/* Right Column: Map */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 h-[400px] relative bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/map-preview.webp"
                            alt={t('mapAlt')}
                            width={800}
                            height={400}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 left-6 right-6">
                            <a
                                href={SITE.map2gis}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full min-h-[48px] px-5 rounded-md bg-white text-slate-900 hover:bg-slate-100 shadow-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                {t('openIn2GIS')}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Medical advertising disclaimer — required for a clinic in Kazakhstan */}
                <p className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-300 leading-relaxed max-w-4xl">
                    {tLegal('disclaimer')}
                </p>

                {/* Legal details. Rendered only once the clinic supplies them. */}
                {(SITE.legal.entityName || SITE.legal.bin || SITE.legal.licenseNumber) && (
                    <div className="mt-6 text-sm text-slate-400 space-y-1">
                        {SITE.legal.entityName && <p>{SITE.legal.entityName}</p>}
                        {SITE.legal.bin && <p>{tLegal('binLabel')}: {SITE.legal.bin}</p>}
                        {SITE.legal.licenseNumber && (
                            <p>{tLegal('licenseNumberLabel')}: {SITE.legal.licenseNumber}</p>
                        )}
                    </div>
                )}

                <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm text-slate-400">
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label={tNav('footerNav')}>
                        <Link href="/about" className="py-2 hover:text-white transition-colors">{tNav('about')}</Link>
                        <Link href="/pricing" className="py-2 hover:text-white transition-colors">{tNav('pricing')}</Link>
                        <Link href="/contact" className="py-2 hover:text-white transition-colors">{tNav('contact')}</Link>
                        <Link href="/license" className="py-2 underline underline-offset-4 hover:text-white transition-colors">{t('license')}</Link>
                        <Link href="/privacy" className="py-2 underline underline-offset-4 hover:text-white transition-colors">{t('privacy')}</Link>
                    </nav>
                </div>
            </div>
        </Wrapper>
    );
}

function ContactItem({ icon: Icon, title, text, href }: { icon: LucideIcon; title: string; text: string; href?: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                <Icon className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-300 mb-0.5">{title}</p>
                {href ? (
                    <a href={href} className="text-lg font-semibold text-white hover:underline underline-offset-4 transition-colors">
                        {text}
                    </a>
                ) : (
                    <p className="text-lg font-semibold text-white">{text}</p>
                )}
            </div>
        </div>
    );
}

function SocialButton({ icon: Icon, href, label }: { icon: LucideIcon; href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 min-h-[48px] rounded-full border border-slate-700 transition-all font-medium text-base"
        >
            <Icon className="w-4 h-4" aria-hidden="true" />
            {label}
        </a>
    );
}
