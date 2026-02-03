"use client";

import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";

export function About() {
    const t = useTranslations('about_section');

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="about">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">
                            {t('title')}
                        </h2>
                        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                            {t('subtitle')}
                        </h3>
                    </motion.div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.2
                                    }
                                }
                            }}
                            className="space-y-6 text-lg text-slate-700 leading-relaxed"
                        >
                            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                {t('p1')}
                            </motion.p>
                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="font-medium text-slate-900"
                            >
                                {t('p2')}
                            </motion.p>

                            <motion.div
                                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                                className="py-6 border-t border-b border-slate-100 my-8"
                            >
                                <h4 className="text-xl font-bold text-slate-900 mb-6">{t('approach_title')}:</h4>
                                <ul className="grid md:grid-cols-2 gap-4">
                                    {['approach_1', 'approach_2', 'approach_3', 'approach_4', 'approach_5', 'approach_6', 'approach_7'].map((item, i) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            <span>{t(item)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.p
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="italic text-slate-600"
                            >
                                {t('p3')}
                            </motion.p>

                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center mt-8"
                            >
                                <p className="text-xl font-bold text-slate-900 mb-2">{t('slogan_1')}</p>
                                <p className="text-lg text-primary font-medium">{t('slogan_2')}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100/50 to-transparent -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
