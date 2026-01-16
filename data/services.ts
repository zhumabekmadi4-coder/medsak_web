
import { Activity, Bone, HeartPulse, User, Stethoscope, Syringe } from "lucide-react";

export const services = [
    {
        id: "consultation",
        title: "Первичная Консультация",
        price: "7 000 ₸",
        rawPrice: 7000,
        desc: "Осмотр врача, сбор анамнеза, составление плана лечения.",
        fullDesc: "Включает полный осмотр опорно-двигательного аппарата, анализ снимков МРТ/КТ и постановку предварительного диагноза.",
        icon: Stethoscope,
        color: "text-slate-600",
        bg: "bg-slate-100",
        featured: false
    },
    {
        id: "spine",
        title: "Лечение позвоночника",
        price: "35 000 ₸",
        rawPrice: 35000,
        desc: "Полный курс восстановления. 7 этапов лечения спины.",
        fullDesc: "Комплексная программа, включающая вытяжение, физиотерапию, массаж и коррекцию осанки. Цена за сеанс комплексной терапии.",
        icon: Activity,
        color: "text-blue-600",
        bg: "bg-blue-50",
        featured: true
    },
    {
        id: "knee",
        title: "Коленный сустав",
        price: "30 000 ₸",
        rawPrice: 30000,
        desc: "Снятие боли и возвращение подвижности без операции.",
        fullDesc: "Безоперационное лечение артроза, артрита и травм мениска. Включает ударно-волновую терапию и лазер.",
        icon: Bone,
        color: "text-teal-600",
        bg: "bg-teal-50",
        featured: true
    },
    {
        id: "shoulder",
        title: "Плечевой сустав",
        price: "27 000 ₸",
        rawPrice: 27000,
        desc: "Лечение артрозов и травм. Возврат амплитуды.",
        fullDesc: "Восстановление при плечелопаточном периартрите, травмах вращательной манжеты и привычных вывихах.",
        icon: User,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        featured: true
    },
    {
        id: "svf",
        title: "SVF Терапия (Стволовые)",
        price: "250 000 ₸",
        rawPrice: 250000,
        desc: "Премиум восстановление хрящевой ткани за 1 процедуру.",
        fullDesc: "Инъекция стромально-васкулярной фракции (SVF) из собственной жировой ткани пациента. Мощная регенерация суставов.",
        icon: HeartPulse,
        color: "text-rose-600",
        bg: "bg-rose-50",
        featured: true
    },
    {
        id: "prp",
        title: "PRP Терапия",
        price: "25 000 ₸",
        rawPrice: 25000,
        desc: "Плазмолифтинг суставов для ускорения заживления.",
        fullDesc: "Введение обогащенной тромбоцитами плазмы пациента. Снимает воспаление и запускает процессы роста тканей.",
        icon: Syringe,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        featured: false
    }
];
