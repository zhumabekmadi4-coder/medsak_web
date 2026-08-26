"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE, waLink } from "@/lib/site-config";
import { trackEvent } from "@/components/Analytics";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const t = useTranslations('nav');
    const tHero = useTranslations('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        // passive: the listener never calls preventDefault, and without this
        // flag it blocks the scroll thread on every event.
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the mobile menu on Escape and return focus to the toggle.
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: t('about'), href: "/#about" },
        { name: t('services'), href: "/#services" },
        { name: t('pricing'), href: "/pricing" },
        { name: t('team'), href: "/#doctors" },
        { name: t('contact'), href: "/#contact" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.includes("#")) {
            setMobileMenuOpen(false);
            return;
        }

        const id = href.split("#")[1];
        const element = document.getElementById(id);

        // On /pricing or /contact the anchor does not exist. Previously the click
        // was swallowed here and the link did nothing — let it navigate instead.
        if (!element) {
            setMobileMenuOpen(false);
            return;
        }

        e.preventDefault();
        const offset = 80; // Navbar height
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
            top: offsetPosition,
            behavior: prefersReduced ? "auto" : "smooth",
        });
        setMobileMenuOpen(false);
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.webp"
                            alt="Sak Clinic"
                            width={48}
                            height={48}
                            fetchPriority="high"
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
                            <Button
                                asChild
                                size="sm"
                                className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm"
                            >
                                <a
                                    href={SITE.phone.tel}
                                    onClick={() => trackEvent('phone_click', { location: 'navbar' })}
                                >
                                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                                    {tHero('phone')}
                                </a>
                            </Button>
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <LanguageSwitcher />
                        <button
                            ref={menuButtonRef}
                            type="button"
                            className="p-3 -mr-1 min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-900 rounded-lg"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
                        >
                            {mobileMenuOpen
                                ? <X className="w-7 h-7" aria-hidden="true" />
                                : <Menu className="w-7 h-7" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
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
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full justify-start border-slate-200 min-h-[52px] text-base"
                                >
                                    <a
                                        href={SITE.phone.tel}
                                        onClick={() => trackEvent('phone_click', { location: 'mobile_menu' })}
                                    >
                                        <Phone className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
                                        {tHero('phone')}
                                    </a>
                                </Button>
                                {/* Was a bare <Button> with no href and a missing translation key,
                                    so it rendered the literal text "nav.bookButton" and did nothing. */}
                                <Button
                                    asChild
                                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold min-h-[52px] text-base"
                                >
                                    <a
                                        href={waLink(t('bookButton'))}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            trackEvent('whatsapp_click', { location: 'mobile_menu' });
                                            setMobileMenuOpen(false);
                                        }}
                                    >
                                        {t('bookButton')}
                                    </a>
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
