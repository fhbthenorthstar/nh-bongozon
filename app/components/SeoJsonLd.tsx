// app/components/SeoJsonLd.tsx
"use client";

export default function SeoJsonLd() {
  const site = "https://nighthorse.shop";
  const logo = `${site}/Night-Horse-Logo.png`;
  const ogImage = `${site}/night-horse-og-image.webp`;
  const priceValidUntil = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // ~6 months
    .toISOString()
    .slice(0, 10);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Night Horse",
    url: site,
    logo,
    sameAs: [
      "https://www.facebook.com/nighthorseshop",
      "https://www.instagram.com/nighthorseshop",
      "https://twitter.com/nighthorseshop",
      "https://www.tiktok.com/@nighthorseshop",
    ],
    areaServed: "BD",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Night Horse",
    url: site,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Night Horse",
    description:
      "Herbal recovery food supplement (রিকভারি ফুড সাপ্লিমেন্ট) — দৈনন্দিন পুষ্টি ও স্ট্যামিনায় সহায়তা করার জন্য তৈরি।",
    category: "https://schema.org/DietarySupplement",
    url: site,
    image: [ogImage, logo],
    brand: { "@type": "Brand", name: "Night Horse" },
    manufacturer: { "@type": "Organization", name: "Shifaa Organic BD" },
    countryOfOrigin: { "@type": "Country", name: "Bangladesh" },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Steroid/Preservative",
        value: "None",
      },
    ],
    sku: "NH-500G",
    offers: [
      {
        "@type": "Offer",
        sku: "NH-500G",
        url: site,
        price: "1600",
        priceCurrency: "BDT",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil,
      },
      {
        "@type": "Offer",
        sku: "NH-2X500G",
        url: site,
        price: "3000",
        priceCurrency: "BDT",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil,
      },
      {
        "@type": "Offer",
        sku: "NH-3X500G",
        url: site,
        price: "4200",
        priceCurrency: "BDT",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil,
      },
    ],
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buy Night Horse",
        item: `${site}/#order-wizard`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
