// app/contact/layout.tsx
export const metadata = {
  title: "Contact | Night Horse",
  description: "Get in touch with Night Horse support team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "https://nighthorse.shop/contact",
    title: "Contact — Night Horse",
    description: "Get in touch with Night Horse support team",
    images: ["/night-horse-og-image.webp"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
