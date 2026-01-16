"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";
import { services } from "@/data/services";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-white/60 backdrop-blur-sm">
                <div className="container mx-auto text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Стоимость Лечения</h1>
                    <p className="text-lg text-slate-600">
                        Честные цены без скрытых доплат. Мы подбираем только то лечение, которое вам действительно необходимо.
                    </p>
                </div>
            </section>

            {/* Pricing List */}
            <section className="py-12 bg-transparent container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 border border-slate-100 flex flex-col"
                            >
                                <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-6`}>
                                    <Icon className={`w-6 h-6 ${service.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                                <p className="text-3xl font-bold text-primary mb-6">{service.price}</p>
                                <p className="text-slate-600 mb-6 flex-grow">{service.fullDesc || service.desc}</p>

                                <ul className="space-y-3 mb-8 text-sm text-slate-500">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>Консультация специалиста</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>Индивидуальный план</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>Сопровождение 24/7</span>
                                    </li>
                                </ul>

                                <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-primary">
                                    Записаться
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <Contact />
        </main>
    );
}
