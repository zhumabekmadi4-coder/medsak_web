"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Contact } from "@/components/landing/Contact";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Simple spacer for fixed navbar */}
            <div className="pt-24">
                <Contact />
            </div>
        </main>
    )
}
