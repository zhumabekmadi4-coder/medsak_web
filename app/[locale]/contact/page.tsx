import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import { Contact } from "@/components/landing/Contact";
import { buildMetadata, type Locale } from "@/lib/seo";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: Locale }> }
): Promise<Metadata> {
    const { locale } = await params;
    return buildMetadata(locale, "contact");
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Rendered as a section with an h1 — the page previously consisted of
    // nothing but the site footer, so it had no h1 at all.
    return (
        <div className="pt-24">
            <Contact as="section" headingLevel={1} />
        </div>
    );
}
