"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

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
                    {/* Logo Emblem */}


                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] pt-4 md:pt-0 font-heading text-slate-900">
                        {t('title_start')} <br />
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            {t('title_highlight')}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <a
                            href="https://wa.me/77760202140"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button size="lg" className="w-full rounded-2xl h-14 md:h-16 px-8 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-xl shadow-orange-500/20 transition-transform active:scale-95">
                                <Calendar className="mr-2 h-5 w-5" />
                                {t('bookAppointment')}
                            </Button>
                        </a>
                        <a href="tel:+77760202140" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full rounded-2xl h-14 md:h-16 px-8 text-lg font-bold border-2 border-primary/20 text-primary bg-white/50 hover:bg-primary/5 hover:border-primary">
                                <Phone className="mr-2 h-5 w-5" />
                                {t('phone')}
                            </Button>
                        </a>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500 pt-8" >
                        <div className="flex -space-x-3">
                            {['avatar_asian_1.png', 'avatar_asian_2.png', 'avatar_asian_3.png', 'avatar_asian_4.png'].map((img, i) => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden relative shadow-sm`}>
                                    <img
                                        src={`/images/avatars/${img}`}
                                        alt="Patient"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <AnimatedCounter />
                    </div>
                </motion.div>

                {/* Right side left empty to reveal background art */}
            </div>
        </section>
    );
}

function AnimatedCounter() {
    const [count, setCount] = useState(5000);
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('hero');

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            // Random increment between 3 and 22
            setCount(prev => prev + Math.floor(Math.random() * (22 - 3 + 1) + 3));
        }, 12000); // 4x slower than 3000

        return () => clearInterval(interval);
    }, []);

    // Prevent hydration mismatch by rendering a static placeholder on server
    if (!mounted) {
        return (
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/50 shadow-sm">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-mono tracking-tight text-blue-600">
                            5 000
                        </span>
                        <span className="text-xs font-bold text-primary">+</span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        {t('patientsRecovered')}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all cursor-default">
            <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 font-mono tracking-tight tabular-nums">
                        {count.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-xs font-bold text-primary">+</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    {t('patientsRecovered')}
                </span>
            </div>
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-sm"></span>
            </div>
        </div>
    );
}
