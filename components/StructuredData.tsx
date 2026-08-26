import { doctors } from "@/data/doctors";
import { SITE, SITE_URL } from "@/lib/site-config";

const DESCRIPTION: Record<string, string> = {
    ru: "Клиника восстановительной медицины в Караганде. Безоперационное лечение позвоночника и суставов: SVF, PRP-терапия, физиотерапия, ЛФК.",
    kk: "Қарағандыдағы қалпына келтіру медицинасы клиникасы. Омыртқа мен буындарды операциясыз емдеу: SVF, PRP-терапия, физиотерапия, ЕДШ.",
};

export function StructuredData({
    locale,
    doctorNames,
}: {
    locale: string;
    doctorNames: Record<string, { name: string; specialty: string }>;
}) {
    const data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["MedicalClinic", "LocalBusiness"],
                "@id": `${SITE_URL}/#clinic`,
                name: SITE.name,
                alternateName: ["Сак Клиник", "Sak Clinic Караганда"],
                description: DESCRIPTION[locale] ?? DESCRIPTION.ru,
                url: `${SITE_URL}/${locale}`,
                logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.webp` },
                image: [`${SITE_URL}/og-image.jpg`],
                telephone: SITE.phone.raw,
                email: SITE.email,
                // Was "7000₸ - 250000₸" — no such price exists; the cheapest
                // service in the price list is 10 000 ₸.
                priceRange: "10000₸ - 250000₸",
                currenciesAccepted: "KZT",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: SITE.address.street,
                    addressLocality: SITE.address.city,
                    addressRegion: SITE.address.region,
                    addressCountry: SITE.address.country,
                },
                hasMap: SITE.map2gis,
                areaServed: [
                    { "@type": "City", name: "Караганда" },
                    { "@type": "AdministrativeArea", name: "Карагандинская область" },
                ],
                availableLanguage: [
                    { "@type": "Language", name: "Russian", alternateName: "ru" },
                    { "@type": "Language", name: "Kazakh", alternateName: "kk" },
                ],
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        opens: "09:00",
                        closes: "18:00",
                    },
                ],
                // Only values from the schema.org MedicalSpecialty enumeration —
                // "Orthopedics" and "PainMedicine" are not in it and failed validation.
                medicalSpecialty: ["Musculoskeletal", "Physiotherapy", "Rheumatologic"],
                isAcceptingNewPatients: true,
                sameAs: [SITE.social.instagram, SITE.social.youtube],
                employee: doctors.map((doctor) => ({
                    "@type": "Physician",
                    name: doctorNames[doctor.id]?.name,
                    jobTitle: doctorNames[doctor.id]?.specialty,
                    image: `${SITE_URL}${doctor.image}`,
                    worksFor: { "@id": `${SITE_URL}/#clinic` },
                })),
            },
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE.name,
                inLanguage: locale === "kk" ? "kk-KZ" : "ru-KZ",
                publisher: { "@id": `${SITE_URL}/#clinic` },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
