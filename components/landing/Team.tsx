"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { doctors } from "@/data/doctors";

export function Team() {
    return (
        <section className="py-24 bg-white relative overflow-hidden" id="doctors">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1">Наши специалисты</Badge>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-slate-900">
                        Забота от <span className="text-primary">профессионалов</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Врачи высшей категории с многолетним опытом работы. Мы сопровождаем вас на каждом этапе выздоровления.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <Card className="border-none shadow-none hover:shadow-xl transition-all duration-300 bg-slate-50 overflow-hidden group">
                                <div className={`h-32 w-full ${doctor.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg mx-auto -mt-12 overflow-hidden flex items-center justify-center text-2xl font-bold text-slate-300 relative">
                                    {doctor.image ? (
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerText = doctor.name[0];
                                            }}
                                        />
                                    ) : (
                                        doctor.name[0]
                                    )}
                                </div>

                                <CardContent className="text-center pt-6 pb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{doctor.name}</h3>
                                    <div className="inline-block bg-white text-slate-600 px-3 py-1 rounded-full text-sm shadow-sm border border-slate-100 mb-4">
                                        {doctor.specialty}
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {doctor.experience}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
