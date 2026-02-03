"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Testimonials() {
    const t = useTranslations('testimonials');
    const items = ['1', '2', '3'];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t('title')}</h2>
                    <p className="text-lg text-slate-600">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {items.map((id, i) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-slate-600 leading-relaxed italic">
                                        "{t(`items.${id}.text`)}"
                                    </p>
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="font-bold text-slate-900">{t(`items.${id}.name`)}</p>
                                        <p className="text-sm text-primary font-medium">{t(`items.${id}.problem`)}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
