import type { Metadata } from "next";

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

// Root layout - metadata only
// The locale-specific layout (app/[locale]/layout.tsx) provides html/body tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
