"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section of About Page */}
            <section className="pt-32 pb-16 px-4 bg-slate-50">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
                    >
                        О Клинике Medsak
                    </motion.h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Мы — команда врачей, объединивших классическую медицину и передовые технологии.
                        Наша цель — вернуть вам свободу движения без операций.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-lg text-slate-700">
                        <p>
                            Клиника <strong>Medsak</strong> была основана с идеей, что человеческий организм — это совершенная биологическая машина,
                            которую можно &quot;починить&quot;, если правильно подойти к диагностике и лечению.
                        </p>
                        <p>
                            Мы специализируемся на безоперационном лечении позвоночника (грыжи, протрузии, сколиоз)
                            и крупных суставов (артрозы, артриты).
                        </p>
                        <div className="pl-4 border-l-4 border-primary italic text-slate-600 my-8">
                            &quot;Мы не просто снимаем боль. Мы устраняем причину её появления, восстанавливая биомеханику тела.&quot;
                        </div>
                        <p>
                            В нашем арсенале — новейшие методы регенеративной терапии, включая <strong>SVF</strong> (стромально-васкулярную фракцию)
                            и <strong>PRP-терапию</strong>, которые позволяют восстанавливать ткани на клеточном уровне.
                        </p>
                    </div>

                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                        {/* Placeholder for Clinic Interior Photo */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                            Фото клиники
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
        </main>
    )
}
