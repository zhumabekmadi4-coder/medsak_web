import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sak Clinic | Лечение позвоночника и суставов в Караганде",
  description: "Капитальный ремонт вашего здоровья. Безоперационное лечение позвоночника и суставов: SVF, PRP терапия, мануальная терапия. 5000+ пациентов восстановлено. Запись: +7 (776) 020-21-40",
  keywords: ["лечение позвоночника Караганда", "лечение суставов", "SVF терапия", "PRP терапия", "безоперационное лечение", "клиника Караганда"],
  openGraph: {
    title: "Sak Clinic — Лечение позвоночника и суставов без операций",
    description: "Капитальный ремонт вашего здоровья. SVF и PRP терапия, мануальная терапия. Более 5000 пациентов восстановлено в Караганде.",
    url: "https://medsak-web.vercel.app",
    siteName: "Sak Clinic",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Sak Clinic - Лечение позвоночника и суставов"
    }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sak Clinic - Лечение позвоночника и суставов",
    description: "Капитальный ремонт вашего здоровья. 5000+ пациентов восстановлено в Караганде.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="bg-transparent">
      <body
        className={cn(
          "min-h-screen font-sans antialiased relative bg-transparent",
          inter.variable
        )}
      >
        {/* Site-wide Fixed Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Direct Image Tag to ensure visibility avoiding CSS url issues */}
          <img
            src="/spine-bg-right.png"
            alt="Background"
            className="w-full h-full object-cover object-right md:object-center opacity-40 md:opacity-80 transition-opacity duration-500"
          />
          {/* Overlay */}
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

        {children}
      </body>
    </html>
  );
}
