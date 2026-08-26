'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        ym?: (id: number, method: string, ...args: unknown[]) => void;
        gtag?: (command: string, target: string, params?: AnalyticsParams) => void;
    }
}

export function Analytics() {
    // usePathname only — useSearchParams would opt every route out of static
    // rendering (and break `output: 'export'`). Both counters read the query
    // string from location themselves.
    const pathname = usePathname();

    // Get IDs from environment - these are embedded at build time
    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '';
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

    // Track page views on route change
    useEffect(() => {
        if (!pathname) return;

        const url = pathname + window.location.search;

        if (yandexId && window.ym) {
            window.ym(Number(yandexId), 'hit', url);
        }

        if (gaId && window.gtag) {
            window.gtag('config', gaId, { page_path: url });
        }
    }, [pathname, yandexId, gaId]);

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
                  defer:true,
                  clickmap:false,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:false
                });
              `,
                        }}
                    />
                    {/*
                      defer:true — the effect above sends the first hit, so init must not
                      send its own (the visit used to be counted twice).
                      webvisor/clickmap disabled: session recording on a medical site
                      captures what a visitor read about their condition, which is health
                      data leaving Kazakhstan without consent or a privacy policy.
                    */}
                    <noscript>
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  send_page_view: false
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
export function trackEvent(eventName: string, eventParams?: AnalyticsParams) {
    if (typeof window === 'undefined') return;

    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '';
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

    if (yandexId && window.ym) {
        window.ym(Number(yandexId), 'reachGoal', eventName, eventParams);
    }

    if (gaId && window.gtag) {
        window.gtag('event', eventName, eventParams);
    }
}
