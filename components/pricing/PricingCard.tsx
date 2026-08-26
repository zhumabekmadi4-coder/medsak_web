"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Service } from "@/data/services";
import { waLink } from "@/lib/site-config";
import { trackEvent } from "@/components/Analytics";

type PricingCardProps = {
    service: Service;
    title: string;
    description: string;
    benefits: { consultation: string; plan: string; support: string };
    bookButtonLabel: string;
    priceOnRequestLabel: string;
    showDetailsLabel: string;
    hideDetailsLabel: string;
    waMessage: string;
};

export function PricingCard({
    service,
    title,
    description,
    benefits,
    bookButtonLabel,
    priceOnRequestLabel,
    showDetailsLabel,
    hideDetailsLabel,
    waMessage,
}: PricingCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Split description by double newline to separate introductory paragraph
    const parts = description.split('\n\n');
    const hasMore = parts.length > 1;
    const intro = parts[0];
    const details = parts.slice(1).join('\n\n');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 border border-slate-100 flex flex-col relative h-full"
        >
            <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-6 overflow-hidden`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={service.iconPath}
                    alt=""
                    aria-hidden="true"
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 object-contain"
                />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2 min-h-[64px] flex items-center">{title}</h3>

            {/* Seven of fourteen services have no price. This used to render an
                empty element — a blank gap where a number was expected. */}
            {service.price ? (
                <p className="text-3xl font-bold text-primary mb-6">{service.price}</p>
            ) : (
                <p className="text-lg font-medium text-slate-600 mb-6">{priceOnRequestLabel}</p>
            )}

            <div className="text-slate-700 mb-6 flex-grow">
                <p className="whitespace-pre-line mb-3">{intro}</p>

                {hasMore && (
                    <>
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    id={`details-${service.id}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="whitespace-pre-line text-sm mt-4 pt-4 border-t border-slate-100">
                                        {details}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
                            aria-controls={`details-${service.id}`}
                            className="text-primary font-semibold text-base flex items-center gap-1 mt-2 min-h-[44px] px-2 -mx-2 rounded-md hover:underline"
                        >
                            {isExpanded ? (
                                <>
                                    {hideDetailsLabel} <ChevronUp className="w-4 h-4" aria-hidden="true" />
                                </>
                            ) : (
                                <>
                                    {showDetailsLabel} <ChevronDown className="w-4 h-4" aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </>
                )}
            </div>

            <ul className="space-y-3 mb-8 text-sm text-slate-600 mt-auto">
                {[benefits.consultation, benefits.plan, benefits.support].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                        <span className="w-4 h-4 text-green-700" aria-hidden="true">✓</span>
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>

            <Button
                asChild
                className="w-full rounded-xl bg-slate-900 text-white hover:bg-primary min-h-[48px] text-base"
            >
                <a
                    href={waLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'pricing_card', service: service.id })}
                >
                    {bookButtonLabel}
                </a>
            </Button>
        </motion.div>
    );
}
