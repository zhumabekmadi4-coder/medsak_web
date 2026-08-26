/**
 * Single source of truth for clinic contacts, links and legal details.
 * Previously the phone number was hardcoded in 9 places and the domain in 9 more.
 */

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://sakclinic.kz';

export const SITE = {
    url: SITE_URL,
    name: 'Sak Clinic',

    phone: {
        raw: '+77760202140',
        display: '+7 (776) 020-21-40',
        tel: 'tel:+77760202140',
    },

    whatsappNumber: '77760202140',

    email: 'sakclinic2025@gmail.com',

    address: {
        street: 'ул. Абая, 81',
        city: 'Караганда',
        region: 'Карагандинская область',
        country: 'KZ',
        full: 'ул. Абая, 81, Караганда',
    },

    map2gis: 'https://go.2gis.com/jPMKm',

    social: {
        instagram: 'https://www.instagram.com/sak_karaganda',
        youtube: 'https://www.youtube.com/@sakclinic09',
    },

    /**
     * Legal details required for a medical organisation in Kazakhstan.
     * TODO: fill in from the clinic's licence and registration documents.
     * Empty values are simply not rendered — no placeholders leak to production.
     */
    legal: {
        entityName: '',   // ТОО «...» / ИП «...»
        bin: '',          // БИН / ИИН
        legalAddress: '',
        licenseNumber: '',
        licenseDate: '',
        licenseAuthority: '',
    },
} as const;

/**
 * Builds a WhatsApp deep link with a pre-filled first message.
 * An empty chat is a known drop-off point: the visitor has to compose the
 * opening line themselves, and the operator cannot tell where they came from.
 */
export function waLink(text?: string): string {
    const base = `https://wa.me/${SITE.whatsappNumber}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
