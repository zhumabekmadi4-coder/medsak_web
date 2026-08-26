"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
    const t = useTranslations('testimonials');
    const items = ['1', '2'];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t('title')}</h2>
                    <p className="text-lg text-slate-600">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Diagnoses removed from each card: publishing "name + condition"
                    is patient health data, and a hardcoded 5-star rating is not data. */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {items.map((id, i) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 relative">
                                <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" aria-hidden="true" />
                                <CardContent className="space-y-4 pt-8">
                                    <p className="text-slate-700 leading-relaxed">
                                        «{t(`items.${id}.text`)}»
                                    </p>
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="font-bold text-slate-900">{t(`items.${id}.name`)}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-10 text-sm text-slate-600 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('disclaimer')}
                </p>
            </div>
        </section>
    );
}
