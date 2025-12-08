// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

/** Minimal inline social icons (no external deps) */
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.01 3.66 9.17 8.44 9.94v-7.03H7.9V12.1h2.54v-2.2c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.87h-2.3V22c4.78-.77 8.43-4.93 8.43-9.94Z" />
    </svg>
  );
}
function IconTwitter(props: React.SVGProps<SVGSVGElement>) {
  // classic bird — recognizable and compact
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.954 4.569c-.885.392-1.83.657-2.825.775a4.94 4.94 0 0 0 2.163-2.723 9.86 9.86 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.97 13.97 0 0 1 1.67 3.149a4.92 4.92 0 0 0 1.523 6.574 4.9 4.9 0 0 1-2.229-.616v.063a4.93 4.93 0 0 0 3.95 4.827 4.93 4.93 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.417 9.87 9.87 0 0 1-6.11 2.105c-.397 0-.79-.023-1.178-.069a13.93 13.93 0 0 0 7.548 2.212c9.056 0 14.009-7.506 14.009-14.009 0-.213-.005-.425-.015-.636a10.01 10.01 0 0 0 2.46-2.548z" />
    </svg>
  );
}
function IconTiktok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.5 7.6a6.4 6.4 0 0 1-3.63-1.12 6.7 6.7 0 0 1-1.61-1.63V15a4.75 4.75 0 1 1-2.5-4.16V8.73a7.25 7.25 0 1 0 3.5 6.27V3h2.02a6.5 6.5 0 0 0 2.22 3.08A6.5 6.5 0 0 0 22 7.02v2.03a7.9 7.9 0 0 1-2.5-1.45Z" />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        inline-flex h-9 w-9 items-center justify-center rounded-full
        border border-white/10 bg-white/5
        hover:bg-white/10 hover:border-white/20
        transition
        focus:outline-none focus:ring-2 focus:ring-lime-300/40
      "
    >
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      href: "https://www.facebook.com/nighthorseshop",
      label: "Facebook",
      Icon: IconFacebook,
    },
    {
      href: "https://x.com/nighthorseshop",
      label: "Twitter",
      Icon: IconTwitter,
    },
    {
      href: "https://www.tiktok.com/@nighthorseshop",
      label: "TikTok",
      Icon: IconTiktok,
    },
  ];

  return (
    <footer className="w-full bg-black text-slate-300">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-6">
        {/* Top row: brand + socials + links */}
        <div className="flex flex-col items-center gap-6 py-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-center md:gap-4 md:text-left">
            <div className="flex items-center gap-3">
              <Link href="/" aria-label="Night Horse — Home">
                <Image
                  src="/Night-Horse-Logo.png"
                  alt="Night Horse logo"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-md object-contain"
                  priority
                />
              </Link>
              <Image
                src="/bfsa-logo.png"
                alt="Bangladesh Food Safety Authority"
                width={60}
                height={60}
                className="h-16 w-16 rounded-full bg-white/5 p-1 object-contain"
              />
            </div>

            <div>
              <p className="text-white font-semibold text-xl leading-tight">NIGHT HORSE SHOP</p>
              <p className="text-sm text-white">ব্যাক্তি, বয়স ও অভ্ভাস ভেদে ফলাফল ভিন্ন হতে পারে।</p>
            </div>
          </div>

          {/* Socials (center block) */}
          <div className="flex items-center justify-center gap-3 md:gap-4">
            {socials.map(({ href, label, Icon }) => (
              <SocialButton key={label} href={href} label={label}>
                <Icon className="h-5 w-5 text-white/90" />
              </SocialButton>
            ))}
          </div>

          {/* Links (right block) */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
          >
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom row: divider + copyright */}
        <div className="border-t border-white/10 py-6 flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
          <p className="text-xs text-slate-400 text-center md:text-left">
            © {year} Night Horse. All rights reserved.
          </p>

          <p className="text-[11px] text-slate-500 text-center md:text-left max-w-[36ch] md:max-w-none">
            Not affiliated with Meta Platforms, Inc. Facebook &amp; Instagram are trademarks of Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
