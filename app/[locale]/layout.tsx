import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileStickyNav } from "@/components/layout/MobileStickyNav";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { doctors, administration } from "@/data/doctors";

// Figtree was dropped: it ships no Cyrillic, so every Russian and Kazakh
// heading fell back to a system font while still costing a preload.
// cyrillic-ext carries ә ғ қ ң ө ұ ү һ — without it Kazakh text renders in a
// second typeface mid-word.
const notoSans = Noto_Sans({
    subsets: ["latin", "cyrillic", "cyrillic-ext"],
    variable: "--font-noto-sans",
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Required for static rendering: without it next-intl reads headers() and
    // every route becomes dynamic, which also breaks `output: 'export'`.
    setRequestLocale(locale);

    const messages = await getMessages();
    const tDoctors = await getTranslations('doctors_data');
    const tA11y = await getTranslations('a11y');

    const doctorNames = Object.fromEntries(
        [...doctors, ...administration].map((person) => [
            person.id,
            {
                name: tDoctors(`${person.id}.name`),
                specialty: tDoctors(`${person.id}.specialty`),
            },
        ])
    );

    return (
        <html lang={locale} suppressHydrationWarning className="bg-transparent">
            <body
                className={cn(
                    "min-h-screen font-sans antialiased relative bg-background overflow-x-hidden",
                    notoSans.variable
                )}
            >
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-6 focus:py-4 focus:text-lg focus:font-bold focus:text-white"
                >
                    {tA11y('skipToContent')}
                </a>

                {/* Site-wide Fixed Background */}
                <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
                    <picture>
                        <source media="(max-width: 768px)" srcSet="/spine-bg-right-640.webp" type="image/webp" />
                        <source srcSet="/spine-bg-right.webp" type="image/webp" />
                        <img
                            src="/spine-bg-right.webp"
                            alt=""
                            width={1280}
                            height={1280}
                            fetchPriority="high"
                            decoding="async"
                            className="w-full h-full object-cover object-right md:object-center opacity-40 md:opacity-70"
                        />
                    </picture>
                    {/* Heavier scrim: headline text sits directly on this image and
                        its contrast would otherwise depend on the photo's pixels. */}
                    <div className="absolute inset-0 bg-white/70 md:bg-white/55" />
                </div>

                <StructuredData locale={locale} doctorNames={doctorNames} />

                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    {/* pb-24 keeps the sticky mobile bar from covering page content */}
                    <main id="main" className="flex min-h-screen flex-col pb-24 md:pb-0">
                        {children}
                    </main>
                    <Contact />
                    <MobileStickyNav />
                    <WhatsAppButton />
                    <Analytics />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
