import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

// Global defaults only. Per-page titles, descriptions, canonical URLs and
// hreflang come from generateMetadata via lib/seo.ts — previously this file was
// the single source for the whole site, so all eight URLs shared one title and
// the Kazakh pages carried Russian metadata.
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Sak Clinic — лечение позвоночника и суставов в Караганде",
        template: "%s",
    },
    applicationName: "Sak Clinic",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

// The locale-specific layout (app/[locale]/layout.tsx) provides html/body tags
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
