// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import Footer from "./components/Footer";
import FacebookPixel from "./components/FacebookPixel";
import SeoJsonLd from "./components/SeoJsonLd";
import TikTokPixel from "./components/TikTokPixel";
import EngagementAndPixels from "./components/EngagementAndPixels";
import { Suspense } from "react";
import TikTokClickIdSetter from "./components/TikTokClickIdSetter";

const SITE_URL = "https://nighthorse.shop";
const OG_IMAGE = "/night-horse-og-image.webp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "নাইট হর্স — হাজারো মানুষের আস্থা",
    template: "%s | নাইট হর্স",
  },

  description:
    "নাইট হর্স — নিরাপদ রিকভারি ফুড সাপ্লিমেন্ট",

  verification: {
    other: {
      "facebook-domain-verification": "gy6lheotw63wivjymizgs0wqjs1xfr",
    },
  },

  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "নাইট হর্স",
    title: "নাইট হর্স — হাজারো মানুষের আস্থা",
    description:
      "নিরাপদ ভেষজ রিকভারি ফুড সাপ্লিমেন্ট",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "নাইট হর্স",
      },
    ],
    locale: "bn_BD",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "নাইট হর্স — হাজারো মানুষের আস্থা",
    description:
      "নিরাপদ ভেষজ/হার্বাল রিকভারি ফুড সাপ্লিমেন্ট - কোনো সাইড ইফেক্ট নেই।",
    images: [OG_IMAGE],
  },

  other: {
    google: "notranslate",
  },

  // Robots (Google-friendly defaults)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // PWA-ish niceties (optional icons you already have)
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

const GTM_ID = "GTM-PB2DBDQG";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" translate="no">
      <body className="overflow-x-clip">
          <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SeoJsonLd />
        <EngagementAndPixels>
          <FacebookPixel />
          <TikTokPixel />
          <Suspense fallback={null}>
             <TikTokClickIdSetter />
          </Suspense>
        </EngagementAndPixels>
        {children}
        <Footer />
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Night Horse",
              url: SITE_URL,
              logo: `${SITE_URL}/Night-Horse-Logo.png`,
              sameAs: [
                "https://www.facebook.com/nighthorseshop",
                "https://x.com/nighthorseshop",
                "https://www.tiktok.com/@nighthorseshop",
              ],
            }),
          }}
        />
         {/* GTM — HEAD loader (uses GTM_ID, not G-...) */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

      </body>
    </html>
  );
}
