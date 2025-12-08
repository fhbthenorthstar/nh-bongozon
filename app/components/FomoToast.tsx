"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

// Bangla bundle labels matching your wizard
const BUNDLES = [
  { key: "course20", label: "১৫ দিনের কোর্স" },
  { key: "course40", label: "৩০ দিনের কোর্স" },
  { key: "course60", label: "৪৫ দিনের কোর্স" },
] as const;

// Popular Bangladeshi male names
const NAMES = [
  "আরিফ","হাসান","জামাল","কামাল","নাসির","ওমর","সাইফ","জুবায়ের",
  "ফারহান","মেহেদী","রায়হান","সোহেল","আকাশ","আশিক","ফয়সাল",
  "জুনায়েদ","মুনির","পলাশ","রাজু","রিফাত","সাগর","তারেক","জাহিদ",
  "আলমগীর","বাপ্পি","মিজান","নাহিদ","তুহিন","সোহাগ","ইব্রাহিম",
];

// Locations (Dhaka + major cities)
const LOCATIONS = [
  "ঢাকা","চট্টগ্রাম","রাজশাহী","সিলেট","বরিশাল","খুলনা","রংপুর","ময়মনসিংহ",
  "কুমিল্লা","নারায়ণগঞ্জ","গাজীপুর","বগুড়া","যশোর","কক্সবাজার","ফরিদপুর",
  "নোয়াখালী","টাঙ্গাইল","পাবনা","ধানমন্ডি","গুলশান","বনানী","উত্তরা","মিরপুর",
  "মোহাম্মদপুর","মতিঝিল","ফার্মগেট",
];

// 5m .. 10h (600m)
function randomMinutesAgo() {
  return Math.floor(5 + Math.random() * (600 - 5));
}
function humanAgo(m: number) {
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r < 5 ? `${h}h ago` : `${h}h ${r}m ago`;
}
const pick = <T,>(arr: ReadonlyArray<T>) => arr[Math.floor(Math.random() * arr.length)];

type Notice = {
  name: string;
  city: string;
  bundle: string;
  minutesAgo: number;
};

function buildNotice(): Notice {
  return {
    name: pick(NAMES),
    city: pick(LOCATIONS),
    bundle: pick(BUNDLES).label,
    minutesAgo: randomMinutesAgo(),
  };
}

export default function FomoToast({
  initialDelayMs = 2000,
  intervalMinMs = 12000,
  intervalMaxMs = 22000,
  position = "bottom-left",
}: {
  initialDelayMs?: number;
  intervalMinMs?: number;
  intervalMaxMs?: number;
  position?: "bottom-left" | "bottom-right";
}) {
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState<Notice>(() => buildNotice());
  const timerRef = useRef<number | null>(null);

  // Mobile center, desktop corner
  const posCls = useMemo(() => {
    const mobile = "left-1/2 -translate-x-1/2";
    if (position === "bottom-right") return `${mobile} sm:left-auto sm:right-6 sm:translate-x-0`;
    return `${mobile} sm:left-6 sm:right-auto sm:translate-x-0`;
  }, [position]);

  const schedule = (delay: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setNotice(buildNotice());
      setVisible(true);
      const hideT = window.setTimeout(() => {
        setVisible(false);
        const next = Math.floor(intervalMinMs + Math.random() * (intervalMaxMs - intervalMinMs));
        schedule(next);
      }, 5000);
      timerRef.current = hideT as unknown as number;
    }, delay) as unknown as number;
  };

  useEffect(() => {
    schedule(initialDelayMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!notice) return null;

  return (
    <div
      className={`
        fixed ${posCls} bottom-4 z-50
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
      `}
    >
      <div
        className="
          flex items-start gap-3
          rounded-xl border border-black/10
          bg-black/60 supports-[backdrop-filter]:bg-black/40
          backdrop-blur-md backdrop-saturate-150
          px-3 py-2.5 sm:px-3.5 sm:py-3
          shadow-2xl ring-1 ring-white/15
          max-w-[92vw] sm:max-w-sm
        "
      >
        <div className="mt-0.5 rounded-md bg-black/30 p-1.5 ring-1 ring-white/10">
          <ShoppingBag className="h-4 w-4 text-lime-300" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white/90">
            {notice.name} — {notice.city}
          </div>
          <div className="truncate text-[13px] text-white/80">
            <span className="font-medium text-white">{notice.bundle}</span> কিনেছেন
            <span className="ml-2 text-white/60">• {humanAgo(notice.minutesAgo)}</span>
          </div>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="ml-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70 hover:bg-white/10"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
