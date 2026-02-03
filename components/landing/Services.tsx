"use client";

import { motion } from "framer-motion";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

import { services } from "@/data/services";

// Filter only featured services for the landing page
const displayedServices = services.filter(s => s.featured);

export function Services() {
    const t = useTranslations('services');
    const tServices = useTranslations('services_data');

    return (
        <section className="py-24 bg-white/60 backdrop-blur-sm relative" id="services">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-heading">{t('title')}</h2>
                    <p className="text-lg text-slate-600">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedServices.map((item, i) => {
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 overflow-hidden`}>
                                            <img
                                                src={item.iconPath}
                                                alt={tServices(`${item.id}.title`)}
                                                className="w-6 h-6 object-contain"
                                            />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-900 font-heading">
                                            {tServices(`${item.id}.title`)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-slate-500 mb-4">{tServices(`${item.id}.desc`)}</p>
                                        {item.price && (
                                            <div className="text-2xl font-bold text-primary">
                                                {item.price}
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="mt-auto">
                                        <Link href="/pricing" className="w-full">
                                            <Button className="w-full rounded-xl bg-slate-100 text-slate-900 hover:bg-primary hover:text-white transition-colors">
                                                {t('learnMore')}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
