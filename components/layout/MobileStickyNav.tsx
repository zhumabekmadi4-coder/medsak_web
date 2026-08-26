"use client";

import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SITE, waLink } from "@/lib/site-config";
import { trackEvent } from "@/components/Analytics";

export function MobileStickyNav() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);
    const t = useTranslations("mobileNav");

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show after scrolling down 100px
        const shouldShow = latest > 100;
        if (shouldShow !== visible) {
            setVisible(shouldShow);
        }
    });

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: visible ? 0 : 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg border-t border-slate-200 md:hidden flex gap-3 shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.12)]"
        >
            <Button
                asChild
                className="flex-1 rounded-xl gap-2 font-bold h-14 text-base bg-primary hover:bg-primary/90 text-white"
            >
                <a
                    href={SITE.phone.tel}
                    onClick={() => trackEvent('phone_click', { location: 'sticky_nav' })}
                >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    {t("call")}
                </a>
            </Button>
            {/* #128C7E is WhatsApp's own dark green: white on #25D366 measures
                1.98:1, well under the 4.5:1 minimum. */}
            <Button
                asChild
                className="flex-1 rounded-xl gap-2 font-bold h-14 text-base bg-[#128C7E] hover:bg-[#0e6f63] text-white shadow-lg"
            >
                <a
                    href={waLink(t("waMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'sticky_nav' })}
                >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    WhatsApp
                </a>
            </Button>
        </motion.div>
    );
}
