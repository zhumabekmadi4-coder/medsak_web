import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Testimonials } from "@/components/landing/Testimonials";
import { Team } from "@/components/landing/Team";
import { Contact } from "@/components/landing/Contact";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Testimonials />
            <Team />
            <Contact />
        </main>
    );
}
