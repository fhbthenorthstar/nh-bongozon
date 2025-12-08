// app/components/FacebookPixel.tsx
"use client";
import Script from "next/script";
import { FB_PIXEL_ID } from "../lib/fbpixel";
import { usePathname } from "next/navigation";

export default function FacebookPixel() {
  const pathname = usePathname() || "";
  if (!FB_PIXEL_ID) return null;
  if (pathname.startsWith("/orders")) return null; // extra guard

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.defer=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${FB_PIXEL_ID}');
          `.trim(),
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(FB_PIXEL_ID)}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
