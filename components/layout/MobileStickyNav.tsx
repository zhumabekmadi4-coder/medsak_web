"use client";

import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MobileStickyNav() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);

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
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 md:hidden flex gap-3 shadow-top-lg"
        >
            <a href="tel:+77760202140" className="flex-1">
                <Button variant="outline" className="w-full rounded-xl gap-2 font-bold h-12 border-slate-300 text-slate-700">
                    <Phone className="w-5 h-5" />
                    Позвонить
                </Button>
            </a>
            <a href="https://wa.me/77760202140" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full rounded-xl gap-2 font-bold h-12 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-500/20">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                </Button>
            </a>
        </motion.div>
    );
}
