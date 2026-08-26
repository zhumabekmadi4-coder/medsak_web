import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Testimonials } from "@/components/landing/Testimonials";
import { Team } from "@/components/landing/Team";
import { buildMetadata, type Locale } from "@/lib/seo";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
    const { locale } = await params;
    return buildMetadata(locale, "home");
}

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Hero />
            <About />
            <Services />
            <Team />
            <Testimonials />
        </>
    );
}
