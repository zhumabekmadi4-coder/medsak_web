import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-sans",
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
    // Await params to get locale (Next.js 15 requirement)
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning className="bg-transparent">
            <body
                className={cn(
                    "min-h-screen font-sans antialiased relative bg-transparent",
                    inter.variable
                )}
            >
                {/* Site-wide Fixed Background */}
                <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                    <img
                        src="/spine-bg-right.png"
                        alt="Background"
                        className="w-full h-full object-cover object-right md:object-center opacity-40 md:opacity-80 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-white/40" />
                </div>

                {/* Schema.org Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "MedicalClinic",
                            "name": "Sak Clinic",
                            "description": "Клиника восстановительной медицины. Лечение позвоночника и суставов без операций.",
                            "url": "https://medsak-web.vercel.app",
                            "telephone": "+77760202140",
                            "email": "sakclinic2025@gmail.com",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "ул. Абая 81",
                                "addressLocality": "Караганда",
                                "addressCountry": "KZ"
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                "opens": "09:00",
                                "closes": "18:00"
                            },
                            "priceRange": "7000₸ - 250000₸",
                            "medicalSpecialty": ["Orthopedics", "PhysicalTherapy", "PainMedicine"]
                        })
                    }}
                />

                <NextIntlClientProvider messages={messages}>
                    {children}
                    <WhatsAppButton />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
