// app/thank-you/layout.tsx
export const metadata = {
  title: "Thank you",
  description: "Order received.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "https://nighthorse.shop/thank-you",
    title: "Thank you — Night Horse",
    description: "Order received.",
    images: ["/night-horse-og-image.webp"],
  },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
