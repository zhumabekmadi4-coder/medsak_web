import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export const LOCALES = ["ru", "kk"] as const;
export type Locale = (typeof LOCALES)[number];
export type PageKey = "home" | "about" | "contact" | "pricing" | "license" | "privacy";

const PATHS: Record<PageKey, string> = {
    home: "",
    about: "/about",
    contact: "/contact",
    pricing: "/pricing",
    license: "/license",
    privacy: "/privacy",
};

const COPY: Record<Locale, Record<PageKey, { title: string; description: string }>> = {
    ru: {
        home: {
            title: "Лечение позвоночника и суставов в Караганде без операции — Sak Clinic",
            description:
                "Безоперационное лечение грыжи, протрузии, остеохондроза и артроза в Караганде. SVF и PRP-терапия, физиотерапия, ЛФК. Приём: ул. Абая, 81. Запись: +7 776 020-21-40.",
        },
        about: {
            title: "О клинике Sak Clinic — врачи и методы лечения, Караганда",
            description:
                "Sak Clinic — клиника восстановительной медицины в Караганде. Травматологи-ортопеды и реабилитологи, лечение позвоночника и суставов без операций.",
        },
        contact: {
            title: "Контакты Sak Clinic — Караганда, ул. Абая, 81",
            description:
                "Адрес Sak Clinic: Караганда, ул. Абая, 81. Телефон +7 776 020-21-40, WhatsApp. Часы работы Пн–Сб 09:00–18:00. Схема проезда и запись на приём.",
        },
        pricing: {
            title: "Цены на лечение позвоночника и суставов в Караганде — Sak Clinic",
            description:
                "Прайс Sak Clinic: консультация 10 000 ₸, программа для позвоночника 35 000 ₸, для суставов 25 000 ₸, PRP и SVF-терапия. Караганда, ул. Абая, 81.",
        },
        license: {
            title: "Лицензия и реквизиты — Sak Clinic",
            description:
                "Сведения о лицензии на медицинскую деятельность Sak Clinic, реквизиты клиники и порядок обращений.",
        },
        privacy: {
            title: "Политика конфиденциальности — Sak Clinic",
            description:
                "Порядок обработки персональных данных посетителей сайта sakclinic.kz.",
        },
    },
    kk: {
        home: {
            title: "Қарағандыда омыртқа мен буындарды операциясыз емдеу — Sak Clinic",
            description:
                "Қарағандыда омыртқа жарығын, протрузияны, остеохондрозды және артрозды операциясыз емдеу. SVF және PRP-терапия, физиотерапия, ЕДШ. Абай көшесі, 81. Тел: +7 776 020-21-40.",
        },
        about: {
            title: "Клиника туралы — Sak Clinic, Қарағанды",
            description:
                "Sak Clinic — Қарағандыдағы қалпына келтіру медицинасы клиникасы. Травматолог-ортопедтер мен реабилитологтар, операциясыз емдеу.",
        },
        contact: {
            title: "Байланыс — Sak Clinic, Қарағанды, Абай көшесі, 81",
            description:
                "Sak Clinic мекенжайы: Қарағанды, Абай көшесі, 81. Телефон +7 776 020-21-40, WhatsApp. Жұмыс уақыты Дс–Сн 09:00–18:00.",
        },
        pricing: {
            title: "Емдеу бағалары — Sak Clinic, Қарағанды",
            description:
                "Sak Clinic бағалары: кеңес беру 10 000 ₸, омыртқа бағдарламасы 35 000 ₸, буындар 25 000 ₸, PRP және SVF-терапия. Қарағанды, Абай көшесі, 81.",
        },
        license: {
            title: "Лицензия және деректемелер — Sak Clinic",
            description:
                "Sak Clinic медициналық қызметіне лицензия туралы мәліметтер, клиника деректемелері және өтініш беру тәртібі.",
        },
        privacy: {
            title: "Құпиялылық саясаты — Sak Clinic",
            description:
                "sakclinic.kz сайтына келушілердің дербес деректерін өңдеу тәртібі.",
        },
    },
};

const OG_ALT: Record<Locale, string> = {
    ru: "Sak Clinic — лечение позвоночника и суставов в Караганде",
    kk: "Sak Clinic — Қарағандыда омыртқа мен буындарды емдеу",
};

export function buildMetadata(locale: Locale, page: PageKey): Metadata {
    const path = PATHS[page];
    const { title, description } = COPY[locale][page];
    const url = `${SITE_URL}/${locale}${path}`;

    return {
        title,
        description,
        alternates: {
            // Per-page and reciprocal. The previous hand-written <link> tags
            // pointed every page at the home page, so Google discarded the set.
            canonical: url,
            languages: {
                ru: `${SITE_URL}/ru${path}`,
                kk: `${SITE_URL}/kk${path}`,
                "x-default": `${SITE_URL}/ru${path}`,
            },
        },
        openGraph: {
            type: "website",
            siteName: "Sak Clinic",
            url,
            title,
            description,
            locale: locale === "kk" ? "kk_KZ" : "ru_RU",
            alternateLocale: locale === "kk" ? ["ru_RU"] : ["kk_KZ"],
            images: [{ url: "/og-image.png", width: 1024, height: 1024, alt: OG_ALT[locale] }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og-image.png"],
        },
    };
}
