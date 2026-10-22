'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        ym?: (id: number, method: string, ...args: unknown[]) => void;
        gtag?: (command: string, target: string, params?: AnalyticsParams) => void;
        fbq?: (command: string, event: string, params?: AnalyticsParams) => void;
    }
}

// Meta Pixel ID supplied by the clinic; env var allows overriding per build.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1800233397852518';

export function Analytics() {
    // usePathname only — useSearchParams would opt every route out of static
    // rendering (and break `output: 'export'`). Both counters read the query
    // string from location themselves.
    const pathname = usePathname();

    // Get IDs from environment - these are embedded at build time
    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID || '';
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
    const pixelId = META_PIXEL_ID;
    const isFirstPixelView = useRef(true);

    // Track page views on route change
    useEffect(() => {
        if (!pathname) return;

        // The pixel's init snippet sends the first PageView itself, so only
        // client-side navigations are reported here.
        if (isFirstPixelView.current) {
            isFirstPixelView.current = false;
        } else if (pixelId && window.fbq) {
            window.fbq('track', 'PageView');
        }

        const url = pathname + window.location.search;

        if (yandexId && window.ym) {
            window.ym(Number(yandexId), 'hit', url);
        }

        if (gaId && window.gtag) {
            window.gtag('config', gaId, { page_path: url });
        }
    }, [pathname, yandexId, gaId, pixelId]);

    // Don't render if no IDs are configured
    if (!yandexId && !gaId && !pixelId) {
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

            {/* Meta Pixel */}
            {pixelId && (
                <>
                    <Script
                        id="meta-pixel"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `,
                        }}
                    />
                    <noscript>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            height="1"
                            width="1"
                            style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
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
