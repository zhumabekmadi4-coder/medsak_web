"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "О клинике", href: "/#about" },
        { name: "Услуги", href: "/#services" },
        { name: "Прайс", href: "/pricing" },
        { name: "Врачи", href: "/#doctors" },
        { name: "Контакты", href: "/#contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                )}
            >
                <div className="container px-4 md:px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Sak Clinic Logo"
                            className="h-12 w-12 md:h-14 md:w-14"
                        />
                        <span className={cn("text-xl font-bold tracking-tight", scrolled ? "text-slate-900" : "text-slate-900")}>
                            Sak Clinic
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button size="sm" className="rounded-full bg-secondary hover:bg-secondary/90 text-slate-900 font-semibold shadow-none border border-secondary/20">
                            <Phone className="w-4 h-4 mr-2" />
                            +7 (776) 020-21-40
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-[60px] left-0 right-0 bg-white border-b shadow-lg z-40 md:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-slate-900 py-2 border-b border-slate-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button className="w-full bg-primary text-white">
                                Записаться на прием
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
