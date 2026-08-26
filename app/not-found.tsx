import Link from "next/link";
import { SITE } from "@/lib/site-config";

/**
 * Root 404.
 *
 * Needs its own html/body: the root layout renders bare children and the real
 * document shell lives in app/[locale]/layout.tsx. Without this file Next fell
 * back to its unstyled English "This page could not be found" screen.
 */
export default function NotFound() {
    return (
        <html lang="ru">
            <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#F8FAFC", color: "#1E293B" }}>
                <main
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.25rem",
                        padding: "1.5rem",
                        textAlign: "center",
                    }}
                >
                    <p style={{ fontSize: "3.5rem", fontWeight: 700, color: "#1D4ED8", margin: 0 }}>404</p>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Такой страницы нет</h1>
                    <p style={{ margin: 0, maxWidth: "34rem", lineHeight: 1.6 }}>
                        Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную или позвоните нам — подскажем.
                    </p>
                    <Link
                        href="/ru"
                        style={{
                            background: "#1D4ED8",
                            color: "#fff",
                            padding: "0.9rem 1.6rem",
                            borderRadius: "0.75rem",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        На главную
                    </Link>
                    <a href={SITE.phone.tel} style={{ color: "#1D4ED8", fontWeight: 600 }}>
                        {SITE.phone.display}
                    </a>
                </main>
            </body>
        </html>
    );
}
