// Meta Pixel ID supplied by the clinic; env var allows overriding per build.
// Kept here, not in the client Analytics module: a server component importing
// a value from a "use client" file gets a client reference, not the value.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1800233397852518";

// Rendered as a plain <script> in <head> (not next/script): Meta's Event Setup
// Tool and Pixel Helper inspect the raw HTML and do not see scripts that Next
// injects on the client. Client-side navigations are tracked in Analytics.
export function MetaPixelHead() {
    if (!META_PIXEL_ID) return null;
    return (
        <script
            id="meta-pixel"
            dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
            }}
        />
    );
}

export function MetaPixelNoscript() {
    if (!META_PIXEL_ID) return null;
    return (
        <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
            />
        </noscript>
    );
}
