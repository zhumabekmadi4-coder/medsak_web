'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Type definitions for Yandex Metrica
declare global {
    interface Window {
        ym?: (id: number, method: string, ...args: any[]) => void;
        gtag?: (...args: any[]) => void;
    }
}

export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get IDs from environment - these are embedded at build time
    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '';
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

    // Track page views on route change
    useEffect(() => {
        if (!pathname) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // Yandex Metrica page view
        if (yandexId && window.ym) {
            window.ym(Number(yandexId), 'hit', url);
        }

        // Google Analytics page view
        if (gaId && window.gtag) {
            window.gtag('config', gaId, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, yandexId, gaId]);

    // Don't render if no IDs are configured
    if (!yandexId && !gaId) {
        return null;
    }

    return (
        <>
            {/* Yandex Metrica */}
            {yandexId && (
                <>
                    <Script
                        id="yandex-metrica"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(${yandexId}, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
                });
              `,
                        }}
                    />
                    <noscript>
                        <div>
                            <img
                                src={`https://mc.yandex.ru/watch/${yandexId}`}
                                style={{ position: 'absolute', left: '-9999px' }}
                                alt=""
                            />
                        </div>
                    </noscript>
                </>
            )}

            {/* Google Analytics */}
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
                        }}
                    />
                </>
            )}
        </>
    );
}

// Helper function to track custom events
export function trackEvent(
    eventName: string,
    eventParams?: Record<string, any>
) {
    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '';
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

    // Yandex Metrica event
    if (yandexId && window.ym) {
        window.ym(Number(yandexId), 'reachGoal', eventName, eventParams);
    }

    // Google Analytics event
    if (gaId && window.gtag) {
        window.gtag('event', eventName, eventParams);
    }
}
