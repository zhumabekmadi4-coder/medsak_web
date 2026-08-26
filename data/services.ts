/**
 * Presentation data for services. All user-facing text lives in messages/*.json
 * and is looked up by `id` — keeping Russian copies here produced a second,
 * unread source of truth that had already drifted out of sync.
 */

export const SERVICE_IDS = [
    'consultation',
    'spine',
    'joints',
    'svf',
    'prp',
    'ultrasound',
    'blockade',
    'shockwave',
    'magnet',
    'ultrasound_therapy',
    'stimulation',
    'laser',
    'exercise',
    'vtes',
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export type Service = {
    id: ServiceId;
    /** Formatted price, empty when the price is set during consultation. */
    price: string;
    rawPrice: number;
    iconPath: string;
    bg: string;
    /** Shown on the landing page, not only in the price list. */
    featured: boolean;
};

export const services: Service[] = [
    { id: "consultation", price: "10 000 ₸", rawPrice: 10000, iconPath: "/icons/consultation.png", bg: "bg-slate-100", featured: false },
    { id: "spine", price: "35 000 ₸", rawPrice: 35000, iconPath: "/icons/spine.png", bg: "bg-blue-50", featured: true },
    { id: "joints", price: "25 000 ₸", rawPrice: 25000, iconPath: "/icons/joints.png", bg: "bg-teal-50", featured: true },
    { id: "svf", price: "250 000 ₸", rawPrice: 250000, iconPath: "/icons/svf.png", bg: "bg-rose-50", featured: true },
    { id: "prp", price: "25 000 ₸", rawPrice: 25000, iconPath: "/icons/prp.png", bg: "bg-emerald-50", featured: false },
    { id: "ultrasound", price: "10 000 ₸", rawPrice: 10000, iconPath: "/icons/ultrasound.png", bg: "bg-sky-50", featured: true },
    { id: "blockade", price: "10 000 ₸", rawPrice: 10000, iconPath: "/icons/injection.png", bg: "bg-amber-50", featured: false },
    { id: "shockwave", price: "", rawPrice: 0, iconPath: "/icons/shockwave.png", bg: "bg-orange-50", featured: false },
    { id: "magnet", price: "", rawPrice: 0, iconPath: "/icons/magnet.png", bg: "bg-violet-50", featured: false },
    { id: "ultrasound_therapy", price: "", rawPrice: 0, iconPath: "/icons/ultrasound-therapy.png", bg: "bg-blue-50", featured: false },
    { id: "stimulation", price: "", rawPrice: 0, iconPath: "/icons/stimulation.png", bg: "bg-cyan-50", featured: false },
    { id: "laser", price: "", rawPrice: 0, iconPath: "/icons/laser.png", bg: "bg-red-50", featured: false },
    { id: "exercise", price: "", rawPrice: 0, iconPath: "/icons/exercise.png", bg: "bg-green-50", featured: false },
    { id: "vtes", price: "", rawPrice: 0, iconPath: "/icons/vtes.png", bg: "bg-yellow-50", featured: false },
];
