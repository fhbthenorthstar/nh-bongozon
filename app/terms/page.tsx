// app/terms/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Night Horse",
  description:
    "The terms that govern your use of the Night Horse website and purchases of our products.",
  alternates: { canonical: "/terms" }, // or "/terms"
  openGraph: {
    modifiedTime: "2025-09-15T00:00:00+06:00", // update when you truly edit
  },
};

export default function TermsPage() {
  return (
    <main
      className="
        relative isolate w-full overflow-hidden
        bg-[#111214] text-white
        min-h-screen supports-[min-height:100dvh]:min-h-[100dvh]
        pb-[env(safe-area-inset-bottom)]
      "
    >
      {/* soft glow accents (match thank-you/privacy) */}
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Last updated: 11 Sep 2025
          </p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-sm text-white/80">
              These Terms &amp; Conditions (“Terms”) govern your access to and
              use of the{" "}
              <strong className="text-white">Shifaa Organic BD</strong> (DBA)
              <strong className="text-white"> Night Horse</strong> website, and
              your purchases of our products (“Products”). By using our site or
              placing an order, you agree to these Terms.
            </p>
          </div>
        </header>

        {/* TOC */}
        <nav
          aria-label="Table of contents"
          className="
            mb-10 grid gap-2 rounded-xl
            border border-white/10 bg-white/5 p-4 ring-1 ring-white/10
            text-sm md:grid-cols-2
          "
        >
          <a href="#eligibility" className="hover:underline text-white/90">
            1) Eligibility & Account
          </a>
          <a href="#orders" className="hover:underline text-white/90">
            2) Orders, Pricing & Taxes
          </a>
          <a href="#shipping" className="hover:underline text-white/90">
            3) Shipping, Risk of Loss & Delivery
          </a>
          <a href="#returns" className="hover:underline text-white/90">
            4) Returns, Refunds & Exchanges
          </a>
          <a href="#health" className="hover:underline text-white/90">
            5) Health & Medical Disclaimer
          </a>
          <a href="#ip" className="hover:underline text-white/90">
            6) Intellectual Property & License
          </a>
          <a href="#acceptable-use" className="hover:underline text-white/90">
            7) Acceptable Use
          </a>
          <a href="#third-parties" className="hover:underline text-white/90">
            8) Third-Party Services & Links
          </a>
          <a href="#communications" className="hover:underline text-white/90">
            9) Electronic Communications & SMS/Email
          </a>
          <a href="#warranties" className="hover:underline text-white/90">
            10) Disclaimers & Limitation of Liability
          </a>
          <a href="#indemnity" className="hover:underline text-white/90">
            11) Indemnification
          </a>
          <a href="#law" className="hover:underline text-white/90">
            12) Governing Law, Disputes & Venue
          </a>
          <a href="#changes" className="hover:underline text-white/90">
            13) Changes to these Terms
          </a>
          <a href="#contact" className="hover:underline text-white/90">
            14) Contact
          </a>
        </nav>

        {/* 1. Eligibility */}
        <section id="eligibility" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            1) Eligibility & Account
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>
              You must be at least the age of majority in your jurisdiction to
              purchase.
            </li>
            <li>
              If you create an account, you are responsible for maintaining the
              confidentiality of your login and for all activities under your
              account.
            </li>
            <li>
              We may refuse service, close accounts, or cancel orders in our
              sole discretion.
            </li>
          </ul>
        </section>

        {/* 2. Orders */}
        <section id="orders" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            2) Orders, Pricing & Taxes
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>
              All orders are offers to buy Products. We may accept or reject any
              order after receipt (e.g., due to stock, pricing error, suspected
              fraud).
            </li>
            <li>
              Prices, promotions, and availability are subject to change without
              notice. Displayed prices may exclude shipping, handling, taxes,
              customs or duties unless stated otherwise.
            </li>
            <li>
              You are responsible for applicable taxes/duties. If a pricing or
              availability error occurs, we may cancel and refund the order.
            </li>
          </ul>
        </section>

        {/* 3. Shipping */}
        <section id="shipping" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            3) Shipping, Risk of Loss & Delivery
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We ship via selected carriers. Delivery timeframes shown at checkout
            are estimates only. Title and risk of loss pass to you upon our
            delivery to the carrier. Please inspect packages on arrival and
            contact us promptly about any issues.
          </p>
        </section>

        {/* 4. Returns */}
        <section id="returns" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            4) Returns, Refunds & Exchanges
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We want you to be satisfied. Where a money-back guarantee or return
            window is advertised on a Product page, those specific terms control
            for that Product. Unless otherwise stated:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>Contact support for an RMA before sending anything back.</li>
            <li>
              Return shipping is your responsibility unless the item is
              defective or we shipped in error.
            </li>
            <li>
              Refunds are issued to the original payment method after we receive
              and verify returned items. Shipping/handling are generally
              non-refundable.
            </li>
          </ul>
          <p className="mt-3 text-xs text-white/60">
            * Results vary by individual. See product page for any specific
            guarantee (e.g., a 10-day satisfaction window) and conditions
            (minimum remaining product, packaging, etc.).
          </p>
        </section>

        {/* 5. Health */}
        <section id="health" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            5) Health & Medical Disclaimer
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>
              Information on this site is for educational purposes only and is
              not medical advice. Products are not intended to diagnose, treat,
              cure, or prevent any disease.
            </li>
            <li>
              Consult a qualified healthcare professional before use, especially
              if you have a medical condition, take medication, or are pregnant
              or nursing.
            </li>
            <li>
              Discontinue use and seek medical help if you experience adverse
              reactions.
            </li>
          </ul>
        </section>

        {/* 6. IP */}
        <section id="ip" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            6) Intellectual Property & License
          </h2>
          <p className="mt-3 text-sm text-white/80">
            All content on the site (text, graphics, logos, images, video, code,
            trademarks) is owned by Night Horse or its licensors and protected
            by law. We grant you a limited, non-exclusive, non-transferable
            license to access and use the site for personal, non-commercial
            purposes. You may not copy, modify, distribute, reverse engineer, or
            create derivative works from our content without prior written
            permission.
          </p>
        </section>

        {/* 7. Acceptable use */}
        <section id="acceptable-use" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            7) Acceptable Use
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>No illegal, infringing, harmful, or deceptive activity.</li>
            <li>
              No scraping, automated access, or interference with the site.
            </li>
            <li>
              No attempts to bypass security, test vulnerabilities, or misuse
              our systems.
            </li>
          </ul>
        </section>

        {/* 8. Third parties */}
        <section id="third-parties" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            8) Third-Party Services & Links
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We may link to or integrate third-party tools (e.g., payment,
            analytics, Meta advertising). We do not control their practices.
            Your use of third-party services is subject to their terms and
            privacy policies.
          </p>
        </section>

        {/* 9. Comms */}
        <section id="communications" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            9) Electronic Communications & SMS/Email
          </h2>
          <p className="mt-3 text-sm text-white/80">
            By contacting us or placing an order, you consent to receive
            transactional communications (order notifications, support, etc.) by
            email/SMS. Marketing messages are optional; you can opt-out via the
            link in any email/SMS or by contacting us. Message and data rates
            may apply.
          </p>
        </section>

        {/* 10. Disclaimers */}
        <section id="warranties" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            10) Disclaimers & Limitation of Liability
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-white/80">
            <li>
              The site and Products are provided “as is” and “as available”
              without warranties of any kind except as expressly stated in
              writing.
            </li>
            <li>
              To the fullest extent permitted by law, Night Horse is not liable
              for any indirect, incidental, special, consequential, exemplary or
              punitive damages, or for lost profits, revenue, data or goodwill.
            </li>
            <li>
              Our aggregate liability for any claim is limited to the amount you
              paid to us for the Product.
            </li>
          </ul>
        </section>

        {/* 11. Indemnity */}
        <section id="indemnity" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            11) Indemnification
          </h2>
          <p className="mt-3 text-sm text-white/80">
            You agree to defend, indemnify, and hold harmless Night Horse and
            its affiliates from any claims, liabilities, damages, losses, and
            expenses (including reasonable attorneys’ fees) arising out of your
            breach of these Terms or misuse of the site or Products.
          </p>
        </section>

        {/* 12. Law */}
        <section id="law" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            12) Governing Law, Disputes & Venue
          </h2>
          <p className="mt-3 text-sm text-white/80">
            These Terms are governed by the laws of{" "}
            <strong className="text-white">Bangladesh</strong> without regard to
            conflict-of-law principles. You agree to the exclusive jurisdiction
            and venue of the courts located in{" "}
            <strong className="text-white">Dhaka, Bangladesh</strong> for any
            dispute, unless another forum is required by law. You and Night
            Horse agree to first attempt informal resolution by contacting{" "}
            <a href="mailto:support@nighthorse.shop" className="underline">
              support@nighthorse.shop
            </a>
            .
          </p>
        </section>

        {/* 13. Changes */}
        <section id="changes" className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            13) Changes to these Terms
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We may update these Terms from time to time. If we make material
            changes, we will post them here and update the “Last updated” date.
            Continued use of the site after changes means you accept the revised
            Terms.
          </p>
        </section>

        {/* 14. Contact */}
        <section id="contact" className="mb-6">
          <h2 className="text-xl font-semibold text-white">14) Contact</h2>
          <p className="mt-3 text-sm text-white/80">
            Questions about these Terms? Contact us at{" "}
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
