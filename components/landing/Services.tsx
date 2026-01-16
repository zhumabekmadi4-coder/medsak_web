"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

import { services } from "@/data/services";

// Filter only featured services for the landing page
const displayedServices = services.filter(s => s.featured);

export function Services() {
    return (
        <section className="py-24 bg-white/60 backdrop-blur-sm relative" id="services">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Наши Услуги</h2>
                    <p className="text-lg text-slate-600">
                        Мы используем проверенные методики и современное оборудование для вашего здоровья.
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
                                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader>
                                        <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4 overflow-hidden`}>
                                            <img
                                                src={item.iconPath}
                                                alt={item.title}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-900">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-500 mb-4">{item.desc}</p>
                                        <div className="text-2xl font-bold text-primary">
                                            {item.price}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href="/pricing" className="w-full">
                                            <Button className="w-full rounded-xl bg-slate-100 text-slate-900 hover:bg-primary hover:text-white transition-colors">
                                                Подробнее
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
