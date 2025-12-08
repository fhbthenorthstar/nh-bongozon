// app/contact/page.tsx
"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* --- inline icons (no extra deps) --- */
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      {...props}
    >
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" {...props}>
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.42 0 .06 5.36.06 11.98c0 2.11.55 4.15 1.59 5.96L0 24l6.2-1.6a11.94 11.94 0 0 0 5.85 1.51h.01c6.62 0 11.99-5.36 11.99-11.98 0-3.2-1.25-6.21-3.53-8.45ZM12.06 21.3c-1.97 0-3.89-.52-5.58-1.51l-.4-.24-3.68.95.98-3.58-.26-.41a9.38 9.38 0 0 1-1.46-5.02c0-5.19 4.22-9.41 9.42-9.41 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.77 6.65c0 5.19-4.23 9.41-9.45 9.41Zm5.42-7.04c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.48.13-.63.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.6-.48-.52-.67-.53h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1-1.04 2.45 0 1.45 1.06 2.85 1.2 3.05.15.2 2.08 3.18 5.03 4.45.7.3 1.25.47 1.67.6.7.22 1.33.2 1.83.12.56-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.14-.27-.23-.57-.38Z" />
    </svg>
  );
}

export default function ContactPage() {
  // public webhook (baked at build time)
  const WEBHOOK = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!WEBHOOK) {
      console.error("Missing NEXT_PUBLIC_DISCORD_WEBHOOK");
      return;
    }
    setSubmitting(true);
    setOk(null);

    const content = [
      "**New Contact Form Submission**",
      `**Name:** ${form.name || "—"}`,
      `**Phone:** ${form.phone || "—"}`,
      "",
      `**Message:**`,
      form.message || "—",
    ].join("\n");

    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Failed to post to Discord");
      setOk(true);
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801623103248";

  return (
    <Fragment>
      {/* SEO: ContactPage + Organization contactPoint */}
     <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact — Night Horse",
      url: "https://nighthorse.shop/contact",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://nighthorse.shop",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: "https://nighthorse.shop/contact",
          },
        ],
      },
      mainEntity: {
        "@type": "Organization",
        "@id": "https://nighthorse.shop#org",
        name: "Night Horse",
        url: "https://nighthorse.shop",
        logo: "https://nighthorse.shop/Night-Horse-Logo.png",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+8801623103248",
            availableLanguage: ["bn", "en"],
            areaServed: "BD",
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support (WhatsApp)",
            telephone: "+8801623103248",
            url: "https://wa.me/8801623103248",
            availableLanguage: ["bn", "en"],
            areaServed: "BD",
          },
        ],
      },
    }),
  }}
/>


      <main
        className="
        relative isolate w-full overflow-hidden
        bg-[#111214] text-white
        min-h-screen supports-[min-height:100dvh]:min-h-[100dvh]
        pb-[env(safe-area-inset-bottom)]
      "
      >
        {/* soft glow accents (match other pages) */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/20 via-emerald-400/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/2 h-72 w-[46rem] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />

        {/* Glass brand strip (centered) */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div
              className="
              flex items-center gap-3 sm:gap-4
              rounded-2xl border border-white/10 bg-white/5
              px-4 sm:px-5 py-2.5 sm:py-3
              backdrop-blur-md ring-1 ring-white/10 shadow-xl
            "
            >
              <Link
                href="/"
                aria-label="Night Horse — Home"
                className="flex items-center gap-3 sm:gap-4"
              >
                {/* Logo inside the glass card */}
                <span className="relative block h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <Image
                    src="/Night-Horse-Logo.png"
                    alt="Night Horse logo"
                    fill
                    sizes="(min-width: 768px) 64px, 48px"
                    className="object-contain"
                    priority
                  />
                </span>

                {/* Texts on the right */}
                <span className="min-w-0 leading-tight select-none">
                  <span className="block truncate font-semibold tracking-tight text-base sm:text-xl md:text-lg">
                    নাইট হর্স হলো
                  </span>
                  <span className="block truncate text-[11px] sm:text-xs md:text-sm text-white/75">
                    হাজারো পুরুষের আস্থা
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          {/* Title & intro */}
          <h1 className="text-center text-2xl sm:text-2xl font-extrabold tracking-tight">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="mt-3 text-center text-white/80">
            ফর্মটি পূরণ করলে আমরা সাধারণত{" "}
            <span className="font-semibold text-white">সবচেয়ে দ্রুত</span>{" "}
            সাড়া দিই—হোয়াটসঅ্যাপে মেসেজের চেয়ে দ্রুত। আপনার প্রশ্ন বা সমস্যার
            সংক্ষিপ্ত বিবরণ লিখে পাঠান, টিম যত তাড়াতাড়ি সম্ভব রিপ্লাই দেবে।
          </p>

          {/* Quick info — 2 equal cards */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Address card */}
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <MapPinIcon />
              </span>
              <div className="leading-tight">
                <p className="text-xs uppercase tracking-wide text-white/60">
                  অফিস লোকেশন
                </p>
                <p className="mt-0.5 font-medium text-white">
                  সুরজনগর, শিবচর থানা,
                  <br />
                  মাদারীপুর জেলা — ঢাকা, বাংলাদেশ
                </p>
              </div>
            </div>

            {/* WhatsApp card */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex flex-col gap-4">
                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                    <WhatsappIcon />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs uppercase tracking-wide text-white/60">
                      হোয়াটসঅ্যাপ
                    </p>
                    <p className="mt-0.5 font-semibold text-white">
                      <a
                        className="hover:underline"
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {whatsapp}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gentle nudge */}
          <div className="mt-6 rounded-xl bg-emerald-500/10 border border-emerald-400/20 ring-1 ring-emerald-400/10 px-4 py-3">
            <p className="text-emerald-200 text-sm text-center sm:text-left">
              <span className="font-semibold">দ্রুত সহায়তা চান?</span> নিচের
              ফর্মে তথ্য পাঠান—টিম তাৎক্ষণিকভাবে টিকিট তৈরি করে অগ্রাধিকার
              ভিত্তিতে উত্তর দেয়। 👇
            </p>
          </div>

          {/* Form (no email) */}
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/80">
                  নাম <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={onChange("name")}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#bdd62d]"
                  placeholder="আপনার নাম"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">
                  ফোন নম্বর <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  pattern="^0[1-9][0-9]{8,9}$"
                  title="বাংলাদেশি মোবাইল নাম্বার (০১XXXXXXXXX)"
                  value={form.phone}
                  onChange={onChange("phone")}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#bdd62d]"
                  placeholder="০১XXXXXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80">
                বার্তা / বিস্তারিত
              </label>
              <textarea
                value={form.message}
                onChange={onChange("message")}
                rows={5}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#bdd62d]"
                placeholder="সমস্যা/প্রশ্ন/অর্ডার সংক্রান্ত যা জানতে চান লিখুন…"
              />
            </div>

            {/* Status messages */}
            {ok === true && (
              <p className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 ring-1 ring-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                ধন্যবাদ! আপনার বার্তা পেয়েছি। খুব দ্রুতই আমরা যোগাযোগ করব।
              </p>
            )}
            {ok === false && (
              <p className="rounded-lg bg-rose-500/10 border border-rose-400/20 ring-1 ring-rose-400/10 px-3 py-2 text-sm text-rose-200">
                দুঃখিত—কিছুটা ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#8AE233] to-[#66C214] px-8 py-4 text-[18px] font-semibold text-neutral-900 transition-colors hover:bg-[#6BC111] disabled:opacity-60"
            >
              {submitting ? "পাঠানো হচ্ছে…" : "বার্তা পাঠান"}
            </button>

            <p className="text-center text-xs text-white/60">
              * তথ্য গোপনীয় রাখা হয়
            </p>
          </form>
        </section>
      </main>
    </Fragment>
  );
}
