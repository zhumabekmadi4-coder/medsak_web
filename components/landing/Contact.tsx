"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Clock, Send, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

export function Contact() {
    const t = useTranslations('contact');

    return (
        <footer className="bg-slate-900 text-white py-16 lg:py-24 overflow-hidden relative" id="contact">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">
                                {t('title')}
                            </h2>
                            <p className="text-slate-400 text-lg">
                                {t('subtitle')}
                            </p>
                        </div>


                        <div className="space-y-6">
                            <ContactItem icon={MapPin} title={t('address')} text={t('addressValue')} />
                            <ContactItem icon={Phone} title={t('phone')} text="+7 (776) 020-21-40" href="tel:+77760202140" />
                            <ContactItem icon={Mail} title={t('email')} text="sakclinic2025@gmail.com" href="mailto:sakclinic2025@gmail.com" />
                            <ContactItem icon={Clock} title={t('hours')} text={t('hoursValue')} />
                        </div>


                        <div className="flex gap-4 pt-4">
                            <SocialButton icon={Instagram} href="https://www.instagram.com/sak_karaganda" label="Instagram" />
                            <SocialButton icon={Youtube} href="https://www.youtube.com/@sakclinic09" label="YouTube" />
                            <SocialButton icon={Send} href="https://wa.me/77760202140" label="WhatsApp" />
                        </div>
                    </div>

                    {/* Right Column: Map or Form */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 h-[400px] relative bg-slate-800">
                        <img
                            src="/map-preview.png"
                            alt="Карта проезда"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                            <Button className="w-full bg-white/90 text-slate-900 hover:bg-white pointer-events-auto shadow-lg" onClick={() => window.open('https://go.2gis.com/jPMKm', '_blank')}>
                                {t('openIn2GIS')}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                    <div className="flex gap-6">
                        <span className="cursor-pointer hover:text-white transition-colors">{t('license')}</span>
                        <span className="cursor-pointer hover:text-white transition-colors">{t('privacy')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function ContactItem({ icon: Icon, title, text, href }: { icon: any, title: string, text: string, href?: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-400 mb-0.5">{title}</p>
                {href ? (
                    <a href={href} className="text-lg font-semibold text-white hover:text-primary transition-colors">
                        {text}
                    </a>
                ) : (
                    <p className="text-lg font-semibold text-white">{text}</p>
                )}
            </div>
        </div>
    );
}

function SocialButton({ icon: Icon, href, label }: { icon: any, href: string, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full border border-slate-700 transition-all font-medium text-sm"
        >
            <Icon className="w-4 h-4" />
            {label}
        </a>
    )
}
