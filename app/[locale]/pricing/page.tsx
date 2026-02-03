"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from "lucide-react";

// Separate component for individual pricing cards to manage state
function PricingCard({ service, title, price, description, benefits, bookButtonLabel }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    service: any,
    title: string,
    price: string,
    description: string,
    benefits: { consultation: string, plan: string, support: string },
    bookButtonLabel: string
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Split description by double newline to separate introductory paragraph
    // If no double newline, parts will have length 1
    const parts = description.split('\n\n');
    const hasMore = parts.length > 1;
    const intro = parts[0];
    const details = parts.slice(1).join('\n\n');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 border border-slate-100 flex flex-col relative h-full"
        >
            <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-6 overflow-hidden`}>
                <img
                    src={service.iconPath}
                    alt={title}
                    className="w-8 h-8 object-contain"
                />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2 min-h-[64px] flex items-center">{title}</h3>
            <p className="text-3xl font-bold text-primary mb-6">{price}</p>

            <div className="text-slate-600 mb-6 flex-grow">
                <p className="whitespace-pre-line mb-3">{intro}</p>

                {hasMore && (
                    <>
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="whitespace-pre-line text-sm mt-4 pt-4 border-t border-slate-100">
                                        {details}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-primary font-semibold text-sm flex items-center gap-1 mt-2 hover:underline focus:outline-none"
                        >
                            {isExpanded ? (
                                <>
                                    Скрыть детали <ChevronUp className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    Подробнее о программе <ChevronDown className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </>
                )}
            </div>

            <ul className="space-y-3 mb-8 text-sm text-slate-500 mt-auto">
                <li className="flex items-center gap-2">
                    <span className="w-4 h-4 text-green-500">✓</span>
                    <span>{benefits.consultation}</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-4 h-4 text-green-500">✓</span>
                    <span>{benefits.plan}</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-4 h-4 text-green-500">✓</span>
                    <span>{benefits.support}</span>
                </li>
            </ul>

            <a
                href={`https://wa.me/77760202140?text=${bookButtonLabel}: ${title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
            >
                <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-primary">
                    {bookButtonLabel}
                </Button>
            </a>
        </motion.div>
    );
}

export default function PricingPage() {
    const t = useTranslations('pricing');
    const tServices = useTranslations('services_data');

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-white/60 backdrop-blur-sm">
                <div className="container mx-auto text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('title')}</h1>
                    <p className="text-lg text-slate-600">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Pricing List */}
            <section className="py-12 bg-transparent container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => {
                        return (
                            <PricingCard
                                key={service.id}
                                service={service}
                                title={tServices(`${service.id}.title`)}
                                price={service.price}
                                description={tServices(`${service.id}.fullDesc`) || tServices(`${service.id}.desc`)}
                                benefits={{
                                    consultation: t('benefits.consultation'),
                                    plan: t('benefits.plan'),
                                    support: t('benefits.support')
                                }}
                                bookButtonLabel={t('bookButton')}
                            />
                        );
                    })}
                </div>
            </section>

            <Contact />
        </main>
    );
}
