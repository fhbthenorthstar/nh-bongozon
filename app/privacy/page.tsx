// app/privacy/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Night Horse",
  description:
    "How Night Horse collects, uses, and shares information, including use of Meta Pixel/Conversions API and your privacy rights.",
  alternates: { canonical: "/privacy" }, // or "/terms"
  openGraph: {
    modifiedTime: "2025-09-15T00:00:00+06:00", // update when you truly edit
  },
};

export default function PrivacyPage() {
  return (
    <main
      className="
        relative isolate w-full overflow-hidden
        bg-[#111214] text-white
        min-h-screen supports-[min-height:100dvh]:min-h-[100dvh]
        pb-[env(safe-area-inset-bottom)]
      "
    >
      {/* soft glow accents (match thank-you page) */}
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
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {/* Header */}
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Last updated: 11 Sep 2025
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-sm text-white/80">
              This Privacy Policy describes how{" "}
              <strong className="text-white">Shifaa Organic BD</strong> (DBA)
              <strong className="text-white"> Night Horse</strong> (“we”, “us”,
              or “our”) collects, uses, and shares information when you visit
              our website, make a purchase, contact us, or interact with our
              advertising on Meta (Facebook/Instagram) and other platforms.
            </p>
          </div>
        </header>

        {/* Business & contact */}
        <section aria-labelledby="who-we-are" className="mb-10">
          <h2 id="who-we-are" className="text-xl font-semibold text-white">
            Who we are & how to contact us
          </h2>
          <div className="mt-3 space-y-1 text-sm text-white/80">
            <p>
              <strong className="text-white">Business name:</strong> Night Horse
            </p>
            <p>
              <strong className="text-white">Email:</strong>{" "}
              <a href="mailto:support@nighthorse.shop" className="underline">
                support@nighthorse.shop
              </a>
            </p>
            <p>
              <strong className="text-white">Address:</strong>{" "}
              <span className="text-white/80">
                Surjanagar, Shibchar Thana, Madaripur District - Dhaka, BD
              </span>
            </p>
          </div>
          <p className="mt-3 text-xs text-white/60">
            This page is provided for transparency. It is not medical or legal
            advice.
          </p>
        </section>

        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="
            mb-10 grid gap-2 rounded-xl
            border border-white/10 bg-white/5 p-4 ring-1 ring-white/10
            text-sm md:grid-cols-2
          "
        >
          <a
            href="#information-we-collect"
            className="hover:underline text-white/90"
          >
            1) Information we collect
          </a>
          <a href="#how-we-use" className="hover:underline text-white/90">
            2) How we use information
          </a>
          <a href="#sharing" className="hover:underline text-white/90">
            3) How we share information
          </a>
          <a href="#cookies" className="hover:underline text-white/90">
            4) Cookies, Meta Pixel & Conversions API
          </a>
          <a href="#your-choices" className="hover:underline text-white/90">
            5) Your choices & opt-out
          </a>
          <a href="#rights" className="hover:underline text-white/90">
            6) Your privacy rights (GDPR/UK/CPRA)
          </a>
          <a href="#security" className="hover:underline text-white/90">
            7) Data security & retention
          </a>
          <a href="#children" className="hover:underline text-white/90">
            8) Children’s privacy
          </a>
          <a href="#transfers" className="hover:underline text-white/90">
            9) International data transfers
          </a>
          <a href="#changes" className="hover:underline text-white/90">
            10) Changes to this policy
          </a>
          <a href="#contact" className="hover:underline text-white/90">
            11) Contact
          </a>
        </nav>

        {/* 1. Information we collect */}
        <section id="information-we-collect" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            1) Information we collect
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>
              <strong className="text-white">Identifiers:</strong> name, email,
              phone, billing/shipping address, order details.
            </li>
            <li>
              <strong className="text-white">Commercial information:</strong>{" "}
              products viewed or purchased, cart activity, support history.
            </li>
            <li>
              <strong className="text-white">Device & usage data:</strong> IP
              address, device type, browser, approximate location, pages viewed,
              interactions, timestamps.
            </li>
            <li>
              <strong className="text-white">Cookies & similar tech:</strong>{" "}
              pixels, tags, SDKs (including Meta Pixel) for analytics &
              advertising.
            </li>
            <li>
              <strong className="text-white">Inferences:</strong> interests or
              preferences derived from your interactions with our site/ads.
            </li>
          </ul>
          <p className="mt-3 text-sm text-white/80">
            We collect data directly from you, automatically via your device,
            and from partners (e.g., analytics or ad platforms).
          </p>
        </section>

        {/* 2. How we use */}
        <section id="how-we-use" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            2) How we use information
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>Provide, operate, and improve our website and services</li>
            <li>Process orders, payments, deliveries, and customer support</li>
            <li>Personalize content and measure site performance</li>
            <li>
              Deliver and measure advertising (including on Meta/Facebook &
              Instagram), and run retargeting
            </li>
            <li>Detect, prevent, and address fraud or misuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* 3. Sharing */}
        <section id="sharing" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            3) How we share information
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We may share limited data with trusted service providers (e.g.,
            hosting, analytics, payment, logistics, customer support) and
            advertising partners (e.g., Meta, Google) to help us operate our
            business. When we work with Meta (including Meta Pixel and
            Conversions API), we and Meta may act as{" "}
            <strong className="text-white">independent controllers</strong> for
            certain processing activities. Your data may also be disclosed when
            legally required or to protect our rights.
          </p>
        </section>

        {/* 4. Cookies & Meta */}
        <section id="cookies" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            4) Cookies, Meta Pixel & Conversions API
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We use cookies and similar technologies to remember your settings,
            analyze site performance, and deliver relevant ads. The{" "}
            <strong className="text-white">Meta Pixel</strong> and/or{" "}
            <strong className="text-white">Meta Conversions API</strong> help us
            measure ad performance, reach people likely to be interested in our
            products, and run retargeting. Data collected may include device
            identifiers, page views, events (e.g., add-to-cart, purchase), and
            hashed contact information (if provided).
          </p>
          <p className="mt-3 text-sm text-white/80">
            For details on how Meta processes data, see Meta’s Privacy Policy
            and Ad Preferences tools:
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm text-white/80">
            <li>
              Meta Privacy Policy:{" "}
              <a
                href="https://www.facebook.com/privacy/policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                facebook.com/privacy/policy
              </a>
            </li>
            <li>
              Facebook Ad Preferences:{" "}
              <a
                href="https://www.facebook.com/adpreferences/ad_settings"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                facebook.com/adpreferences/ad_settings
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm text-white/80">
            You can manage cookies via your browser settings or our cookie
            preferences tool (where available).
          </p>
        </section>

        {/* 5. Choices */}
        <section id="your-choices" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            5) Your choices & opt-out
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>
              <strong className="text-white">Cookies/Pixels:</strong> Adjust
              your browser settings or use our{" "}
              <a href="#do-not-sell" className="underline">
                Privacy Preferences / “Do Not Sell or Share”
              </a>{" "}
              link to manage advertising cookies (where offered).
            </li>
            <li>
              <strong className="text-white">Meta ads:</strong> Use{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                href="https://www.facebook.com/adpreferences/ad_settings"
              >
                Facebook Ad Preferences
              </a>{" "}
              and Instagram ad settings.
            </li>
            <li>
              <strong className="text-white">Email:</strong> You can unsubscribe
              via any message or contact us.
            </li>
            <li>
              <strong className="text-white">Broad ad choices:</strong>{" "}
              <a
                href="https://optout.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                aboutads.info/choices
              </a>{" "}
              ·{" "}
              <a
                href="https://youradchoices.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                youradchoices.ca
              </a>{" "}
              ·{" "}
              <a
                href="https://www.youronlinechoices.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                youronlinechoices.eu
              </a>
            </li>
          </ul>
        </section>

        {/* 6. Rights */}
        <section id="rights" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            6) Your privacy rights (GDPR/UK/CPRA)
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Depending on your location, you may have rights to access, correct,
            delete, restrict or object to processing, portability, and to
            withdraw consent (where applicable). California residents may also
            have rights to know, delete, correct, and to opt-out of{" "}
            <strong className="text-white">“sale” or “sharing”</strong> of
            personal information for cross-context behavioral advertising.
          </p>
          <p className="mt-3 text-sm text-white/80">
            To exercise rights, contact us at{" "}
            <a href="mailto:support@nighthorse.shop" className="underline">
              support@nighthorse.shop
            </a>
            . We may need to verify your request.
          </p>

          <div
            id="do-not-sell"
            className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4 ring-1 ring-white/10"
          >
            <p className="text-sm text-white/80">
              <strong className="text-white">“Do Not Sell or Share”:</strong> If
              you are in a region where this applies, you can opt-out of
              cross-context behavioral advertising via your browser’s cookie
              controls or the link labeled{" "}
              <em>
                “Privacy Preferences” / “Do Not Sell or Share My Personal
                Information”
              </em>{" "}
              in our site footer (when available).
            </p>
          </div>
        </section>

        {/* 7. Security & retention */}
        <section id="security" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            7) Data security & retention
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We use reasonable technical and organizational measures to protect
            personal data. No method of transmission or storage is 100% secure.
            We retain data only as long as necessary for the purposes described
            in this policy (e.g., to fulfill orders, comply with law, resolve
            disputes, and enforce agreements).
          </p>
        </section>

        {/* 8. Children */}
        <section id="children" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            8) Children’s privacy
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Our services are not directed to children under the age of 13 (or
            the age defined by local law). We do not knowingly collect personal
            information from children. If you believe a child has provided us
            data, please contact us to request deletion.
          </p>
        </section>

        {/* 9. Transfers */}
        <section id="transfers" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            9) International data transfers
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We may process and store information outside of your country. Where
            required, we implement appropriate safeguards to protect personal
            data when it is transferred internationally.
          </p>
        </section>

        {/* 10. Changes */}
        <section id="changes" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            10) Changes to this policy
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We may update this Privacy Policy from time to time. If we make
            material changes, we will post a notice on this page and update the
            “Last updated” date above.
          </p>
        </section>

        {/* 11. Contact */}
        <section id="contact" className="mb-10">
          <h2 className="text-xl font-semibold text-white">11) Contact</h2>
          <p className="mt-3 text-sm text-white/80">
            If you have questions or requests about this Privacy Policy, contact
            us at{" "}
            <a href="mailto:support@nighthorse.shop" className="underline">
              support@nighthorse.shop
            </a>{" "}
            or by mail at:{" "}
            <span className="text-white/80">
              Surjanagar, Shibchar Thana, Madaripur District - Dhaka, BD
            </span>
            .
          </p>
        </section>

        {/* Glossary — English terms kept, Bangla explanations */}
        <section
          aria-labelledby="glossary"
          className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10"
        >
          <h2 id="glossary" className="text-xl font-semibold">
            সহজ ভাষায় গুরুত্বপূর্ণ টার্ম (English kept)
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>SKU</strong>: ইনভেন্টরি/স্টকের জন্য প্রতিটি পণ্য বা
                ভ্যারিয়েন্টের ইউনিক কোড। যেমন:{" "}
                <span className="whitespace-nowrap">NH-500G</span>,{" "}
                <span className="whitespace-nowrap">NH-2X500G</span>।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>BFSA</strong>: Bangladesh Food Safety Authority — খাদ্য
                ব্যবসা, লেবেল, হাইজিন ইত্যাদি তদারকি।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>BSTI</strong>: Bangladesh Standards and Testing
                Institution — যেসব আইটেম বাধ্যতামূলক তালিকায় আছে (যেমন
                Honey/কিছু মসলা), সেগুলোর মান সার্টিফিকেশন করে।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>Meta Pixel</strong>: ওয়েবসাইটে অ্যাড পারফরম্যান্স
                মাপা/ইভেন্ট পাঠানোর ব্রাউজার টুল।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>Conversions API (CAPI)</strong>: সার্ভার-সাইডে একই
                ইভেন্টের কপি পাঠিয়ে মাপা আরও নির্ভুল করা।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>Independent Controller</strong>: কিছু প্রসেসিং-এ আমরা ও
                Meta আলাদা কন্ট্রোলার হিসেবে ডেটা প্রক্রিয়া করি।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>Cookies</strong>: ব্রাউজারে সংরক্ষিত ছোট
                ডেটা—প্রেফারেন্স, অ্যানালিটিক্স ও বিজ্ঞাপনের সেটিংস রাখতে
                ব্যবহৃত।
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm">
                <strong>Opt-out / “Do Not Sell or Share”</strong>:
                বিজ্ঞাপন/ট্র্যাকিংয়ের জন্য ডেটা ব্যবহারে সীমাবদ্ধতা দেওয়ার অপশন।
              </div>
            </div>
          </div>
        </section>

        {/* Back links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/" className="underline text-white/90 hover:text-white">
            Home
          </Link>
          <Link
            href="/privacy"
            className="underline text-white/90 hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="underline text-white/90 hover:text-white"
          >
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
