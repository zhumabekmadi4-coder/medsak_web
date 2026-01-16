import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Medsak | Клиника восстановительной медицины",
  description: "Лечение позвоночника и суставов без операции в Караганде.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="bg-transparent">
      <body
        className={cn(
          "min-h-screen font-sans antialiased relative bg-transparent",
          inter.variable
        )}
      >
        {/* Site-wide Fixed Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Direct Image Tag to ensure visibility avoiding CSS url issues */}
          <img
            src="/spine-bg-right.png"
            alt="Background"
            className="w-full h-full object-cover object-right md:object-center opacity-40 md:opacity-80 transition-opacity duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/40" />
        </div>

        {children}
      </body>
    </html>
  );
}
