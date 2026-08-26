/**
 * Presentation data for staff. Names, roles and biographies live in
 * messages/*.json under `doctors_data.<id>` so both locales stay in step.
 */

export type DoctorId = 'ruslan' | 'nurgali' | 'aknur' | 'rustam' | 'perizat';

export type Doctor = {
    id: DoctorId;
    image: string;
    color: string;
};

/** Medical staff — shown in the "Doctors" section. */
export const doctors: Doctor[] = [
    { id: "ruslan", image: "/doctors/isataev.webp", color: "bg-blue-100 text-blue-700" },
    { id: "nurgali", image: "/doctors/abzhaliyev.webp", color: "bg-teal-100 text-teal-700" },
    { id: "rustam", image: "/doctors/tapi.webp", color: "bg-cyan-100 text-cyan-700" },
    { id: "aknur", image: "/doctors/tuyakbaeva.webp", color: "bg-purple-100 text-purple-700" },
];

/** Non-medical staff — listed separately so the "Doctors" heading stays true. */
export const administration: Doctor[] = [
    { id: "perizat", image: "/doctors/perizat.webp", color: "bg-pink-100 text-pink-700" },
];
