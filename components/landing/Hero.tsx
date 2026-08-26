"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { useTranslations } from 'next-intl';
import { SITE, waLink } from "@/lib/site-config";

export function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background is now global in layout.tsx */}

            <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 text-slate-900 mt-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] pt-4 md:pt-0 font-heading text-slate-900">
                        {t('title_start')} <br />
                        {/* Plain colour, not a clipped gradient: transparent text
                            disappears entirely in Windows High Contrast Mode. */}
                        <span className="text-primary">
                            {t('title_highlight')}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-700 max-w-lg leading-relaxed font-medium">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto rounded-2xl h-14 md:h-16 px-8 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-xl transition-transform active:scale-95"
                        >
                            <a
                                href={waLink(t('waMessage'))}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                                {t('bookAppointment')}
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto rounded-2xl h-14 md:h-16 px-8 text-lg font-bold border-2 border-primary/30 text-primary bg-white/50 hover:bg-primary/5 hover:border-primary"
                        >
                            <a href={SITE.phone.tel}>
                                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                                {t('phone')}
                            </a>
                        </Button>
                    </div>

                    <PatientsBadge />
                </motion.div>

                {/* Right side left empty to reveal background art */}
            </div>
        </section>
    );
}

/**
 * Static trust badge.
 *
 * Replaces a counter that incremented by a random 3–22 every 12 seconds and
 * reset to 5000 on reload, next to stock portraits labelled alt="Patient".
 * Both fabricated social proof on a medical site; the figure now stands still
 * and the stock faces are gone.
 */
function PatientsBadge() {
    const t = useTranslations('hero');

    return (
        <div className="pt-8">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/60 shadow-sm">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary tracking-tight tabular-nums">
                            5 000
                        </span>
                        <span className="text-sm font-bold text-primary">+</span>
                    </div>
                    <span className="text-sm text-slate-600 font-medium">
                        {t('patientsRecovered')}
                    </span>
                </div>
            </div>
        </div>
    );
}
