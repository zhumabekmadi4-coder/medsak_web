"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations('nav');
    const tHero = useTranslations('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t('about'), href: "/#about" },
        { name: t('services'), href: "/#services" },
        { name: t('pricing'), href: "/pricing" },
        { name: t('team'), href: "/#doctors" },
        { name: t('contact'), href: "/#contact" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If it's a hash link on the home page (or current page)
        if (href.includes("#")) {
            e.preventDefault();
            const id = href.split("#")[1];
            const element = document.getElementById(id);
            if (element) {
                const offset = 80; // Navbar height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            // Close mobile menu if open
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-4"
                )}
            >
                <div className="container px-4 md:px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Sak Clinic Logo"
                            className="h-10 w-10 md:h-12 md:w-12 transition-all duration-300"
                        />
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                            Sak Clinic
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-medium text-slate-700 hover:text-primary transition-colors hover:bg-slate-50 px-3 py-2 rounded-lg"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                            <LanguageSwitcher />
                            <a href="tel:+77760202140">
                                <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm">
                                    <Phone className="w-4 h-4 mr-2" />
                                    {tHero('phone')}
                                </Button>
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <button className="p-2 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-[72px] left-0 right-0 bg-white border-b shadow-lg z-40 md:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-slate-900 py-3 px-4 rounded-lg hover:bg-slate-50"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-2 border-t border-slate-100 grid gap-3">
                                <a href="tel:+77760202140" className="w-full">
                                    <Button variant="outline" className="w-full justify-start border-slate-200">
                                        <Phone className="w-4 h-4 mr-2 text-primary" />
                                        {tHero('phone')}
                                    </Button>
                                </a>
                                <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold">
                                    {t('bookButton') || 'Записаться на прием'}
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
