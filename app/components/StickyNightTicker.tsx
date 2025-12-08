// app/components/StickyProductTicker.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MESSAGES = [
  "দেশব্যাপী ৮০,০০০+ খুশি কাস্টমার।",
  "সারাদেশে ফ্রি ডেলিভারি।",
  "প্রিমিয়াম ভেষজ উপাদানে তৈরি।",
  "আজই আপনার সুস্থতার যাত্রা শুরু করুন।",
  "নিশ্চিত না হয়ে অর্ডার করবেন না।",
];

type Props = {
  items?: string[];
  /** seconds; optional override */
  speedSeconds?: number;
};

export default function StickyProductTicker({
  items = MESSAGES,
  speedSeconds,
}: Props) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [barH, setBarH] = useState<number>(0);

  // apply custom speed if provided
  useEffect(() => {
    if (!speedSeconds) return;
    document.documentElement.style.setProperty(
      "--nh-ticker-speed",
      `${Math.max(10, speedSeconds)}s`
    );
    return () => {
      // restore default when unmounts
      document.documentElement.style.removeProperty("--nh-ticker-speed");
    };
  }, [speedSeconds]);

  // measure ASAP so spacer is correct (useLayoutEffect to avoid flash/overlap)
  useLayoutEffect(() => {
    const measure = () => setBarH(barRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      {/* FIXED glass header (always on) */}
      <div
        ref={barRef}
        className="
          fixed top-0 left-0 right-0 z-[1100]
           bg-gradient-to-b from-[#8AE233] to-[#66C214]
        "
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="relative overflow-hidden">
          {/* track contains two identical halves for perfect seamless loop */}
          <div
            className="nh-marquee flex items-center"
            style={{ width: "fit-content" }}
          >
            <TickerHalf items={items} />
            <TickerHalf items={items} ariaHidden />
          </div>
        </div>
      </div>

      {/* Spacer uses a safe CSS default immediately, then snaps to measured height */}
      <div style={{ height: barH ? `${barH}px` : "var(--nh-ticker-h)" }} />
    </>
  );
}

function TickerHalf({
  items,
  ariaHidden,
}: {
  items: string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="
        flex items-center
        gap-10 sm:gap-14 md:gap-16
        px-4 sm:px-5 py-1.5 sm:py-2 md:py-2.5
        whitespace-nowrap font-semibold
        text-black
        leading-[1.7] tracking-[.005em]
        antialiased
        text-[13px] sm:text-[14px] md:text-[15px]
      "
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((m, i) => (
        <li key={`${m}-${i}`} className="whitespace-nowrap text-relaxed">
          {m}
        </li>
      ))}
    </ul>
  );
}
