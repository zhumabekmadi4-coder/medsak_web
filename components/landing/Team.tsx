"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from 'next-intl';

import { doctors, administration, type Doctor } from "@/data/doctors";

export function Team() {
    const t = useTranslations('team');

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="doctors">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1">{t('badge')}</Badge>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-slate-900">
                        {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Four medical staff — a 4-column row fills evenly, where a
                    3-column grid left a single card stranded on its own line. */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {doctors.map((doctor, index) => (
                        <PersonCard key={doctor.id} person={doctor} index={index} />
                    ))}
                </div>

                {/* Administration listed apart so the "Doctors" heading stays accurate. */}
                {administration.length > 0 && (
                    <div className="mt-16 max-w-6xl mx-auto">
                        <h3 className="text-center text-lg font-semibold text-slate-700 mb-8">
                            {t('adminTitle')}
                        </h3>
                        {/* Flex, not grid: with a single person a 4-column grid
                            would park the card against the left edge. */}
                        <div className="flex flex-wrap justify-center gap-8">
                            {administration.map((person, index) => (
                                <div key={person.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                                    <PersonCard person={person} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function PersonCard({ person, index }: { person: Doctor; index: number }) {
    const tDoctors = useTranslations('doctors_data');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
        >
            <Card className="h-full border-none shadow-none hover:shadow-xl transition-all duration-300 bg-slate-50 overflow-hidden group">
                <div className={`h-32 w-full ${person.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg mx-auto -mt-12 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={person.image}
                        alt=""
                        width={192}
                        height={192}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                    />
                </div>

                <CardContent className="text-center pt-6 pb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{tDoctors(`${person.id}.name`)}</h3>
                    <div className="inline-block bg-white text-slate-700 px-3 py-1 rounded-full text-sm shadow-sm border border-slate-200 mb-4">
                        {tDoctors(`${person.id}.specialty`)}
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-4">
                        {tDoctors(`${person.id}.experience`)}
                    </p>
                    {/* Biographies were written but never rendered — the strongest
                        expertise signal on the site was sitting unused in data/. */}
                    <p className="text-sm text-slate-600 leading-relaxed text-left">
                        {tDoctors(`${person.id}.desc`)}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
