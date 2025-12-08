"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Card = {
  id: number;
  title: string;
  imgSrc: string;
  imgAlt: string;
  bullets: string[];
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "রক্ত সঞ্চালন ও শক্তি",
    imgSrc: "/Ingredient-1.png",
    imgAlt: "মধু, জিনসেং, কালোজিরা, রসুন, শিমুল-মূল",
    bullets: [
      "জিনসেং: যৌন শক্তি বাড়ায়, দুর্বলতা কমায়, ইচ্ছা বাড়ায়",
      "কালোজিরা: শুক্রাণুর মান ভালো করতে ও পুরুষের শক্তি বাড়ায়",
      "রসুন: রক্ত সঞ্চালন ভালো করে, ইরেকশন শক্ত রাখতে সাহায্য করে",
      "মধু: তাত্ক্ষণিক শক্তি দেয়, ক্লান্তি কমায়, যৌন ইচ্ছা বাড়ায়",
      "শিমুল-মূল: দীর্ঘসময় সহবাসে সহায়ক, স্ট্যামিনা ও শুক্র বৃদ্ধি করে",
    ],
  },
  {
    id: 2,
    title: "শক্তি ও সহনশীলতা",
    imgSrc: "/Ingredient-2.png",
    imgAlt: "অশ্বগন্ধা, লবঙ্গ, কাটিলা গাম, শতমূল, তালমাখানা",
    bullets: [
      "অশ্বগন্ধা: টেনশন কমায়, মন শান্ত করে, স্ট্যামিনা বাড়ায়",
      "লবঙ্গ: রক্তসঞ্চালন ভালো রেখে শক্তি ও উত্তেজনা ধরে রাখে",
      "কাটিলা গাম: শরীর ঠান্ডা রাখে, পানিশূন্যতা কমায়, এনার্জি ধরে রাখে",
      "শতমূল: দুর্বলতা কমায়, সহ্যশক্তি ও স্ট্যামিনা বাড়ায়",
      "তালমাখানা: নিয়মিত খেলে শক্তি ও পুরুষত্বে সহায়তা করে",
    ],
  },
  {
    id: 3,
    title: "পুষ্টি ও ব্যালান্স",
    imgSrc: "/Ingredient-3.png",
    imgAlt: "কাঠ বাদাম, খেজুর, কাজুবাদাম, কিশমিশ, আখরোট",
    bullets: [
      "কাঠ বাদাম: প্রোটিন ও ভালো চর্বি, দ্রুত এনার্জি, সহনশীলতা বাড়ায়",
      "খেজুর: প্রাকৃতিক মিষ্টি ও আয়রন, তাত্ক্ষণিক শক্তি বাড়ায়, ক্লান্তি কমায়",
      "কাজুবাদাম: জিঙ্ক/ম্যাগনেসিয়াম পুরুষের শক্তি ও নার্ভ শান্ত রাখে",
      "কিশমিশ: আয়রন ও অ্যান্টিঅক্সিডেন্ট রক্তের ঘাটতি কমায়, স্ট্যামিনা বাড়ায়",
      "আখরোট: ওমেগা-৩ রক্ত সঞ্চালন বাড়ায়, মস্তিষ্ক ও হরমোন সাপোর্ট দেয়",
    ],
  },
  {
    id: 4,
    title: "স্বাভাবিক ডিটক্স ও সাপোর্ট",
    imgSrc: "/Ingredient-4.png",
    imgAlt: "মাকা পাউডার, গোলমরিচ, তেঁতুল বীজ, দারুচিনি, গোখরু",
    bullets: [
      "মাকা পাউডার: শরীর ফ্রেশ রাখে, শক্তি ও যৌন ইচ্ছা বাড়ায়",
      "গোলমরিচ: হজম ভালো করে, রক্ত সঞ্চালন বাড়ায়, এনার্জি বাড়ায়",
      "তেঁতুল বীজ: শরীর ঠান্ডা/পেট পরিষ্কার, দীর্ঘসময় সহনশীলতা বাড়ায়",
      "দারুচিনি: রক্তপ্রবাহ উন্নত করে শরীর গরম রাখে, ইরেকশন শক্ত করে",
      "গোখরু: শুক্রবর্ধক হিসেবে পরিচিত, স্ট্যামিনা ও শক্তি বাড়ায়",
    ],
  },
];

/** (Optional) word jamming if you ever want to add a single ZWNJ inside very sensitive words.
 * Disabled by default since bullets are drawn to canvas anyway.
 */
const JAM_SENSITIVE = false;
const ZWNJ = "\u200C";
const SENSITIVE = ["যৌন", "বীর্য", "পুরুষত্ব", "উত্তেজনা", "ইরেকশন"];
const gentlyJam = (s: string) => {
  if (!JAM_SENSITIVE) return s;
  for (const w of SENSITIVE) {
    const i = s.indexOf(w);
    if (i >= 0) {
      const mid = Math.max(1, Math.floor(w.length / 2));
      s = s.replace(w, w.slice(0, mid) + ZWNJ + w.slice(mid));
    }
  }
  return s;
};

/** Draw one bullet as a crisp PNG (no background; looks like normal text) */
function bulletToDataURL(
  text: string,
  {
    fontFamily = "Noto Sans Bengali, Noto Sans, Segoe UI, Helvetica, Arial, sans-serif",
    fontSize = 16, // same size for desktop & mobile as requested
    textColor = "rgba(15,23,42,0.95)", // slate-900-ish to match your card
    paddingX = 0, // no pill bg → just text; keep padding 0
    paddingY = 0,
  } = {}
): string {
  const dpr =
    typeof window !== "undefined"
      ? Math.max(1, window.devicePixelRatio || 1)
      : 1;

  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  if (!ctx) return "";

  // Measure at CSS pixels
  ctx.font = `${fontSize}px ${fontFamily}`;
  const m = ctx.measureText(text);
  const cssW = Math.ceil(m.width + paddingX * 2);
  const cssH = Math.ceil(fontSize + paddingY * 2);

  // Paint at device pixels → crisp on retina
  c.width = cssW * dpr;
  c.height = cssH * dpr;

  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);
  g.font = `${fontSize}px ${fontFamily}`;
  g.fillStyle = textColor;
  g.textBaseline = "alphabetic";
  g.fillText(text, paddingX, cssH - 3); // small baseline nudge for nicer alignment

  return c.toDataURL("image/png");
}

export default function HowItWorks() {
  // Store a map from card.id -> array of bullet images
  const [chipMap, setChipMap] = useState<Record<number, string[]>>({});

  const prepared: Card[] = useMemo(
    () =>
      CARDS.map((c) => ({
        ...c,
        bullets: c.bullets.map(gentlyJam),
      })),
    []
  );

  useEffect(() => {
    const build = () => {
      const map: Record<number, string[]> = {};
      for (const card of prepared) {
        map[card.id] = card.bullets.map((b) => bulletToDataURL(b));
      }
      setChipMap(map);
    };
    build();

    // If you want to regenerate on DPR change / zoom, you could add listeners here.
  }, [prepared]);

  return (
    <section
      className="
        relative isolate w-full overflow-hidden
        bg-[#111214] text-white
      "
    >
      {/* subtle background glows */}
      <div className="pointer-events-none absolute -top-[18vw] left-1/2 h-[45vw] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/18 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-[22vw] right-1/2 h-[40vw] w-[110vw] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            নাইট হর্সের উপাদান সমূহ
          </h2>
          <p className="mt-3 text-white">
            বাংলাদেশে এখনো কেও ৩২টি উপাদানের সংমিশ্রনে এই পণ্য তৈরি করে না। সবাই
            ৮-১০ উপাদান ব্যবহার করে তাই আমরা নিয়ে এসেছি ৩২টি উপাদানের সংমিশ্রণ
            যা আপনার দুর্বলতাকে গোড়া থেকে ধংস করবে ইনশাল্লাহ।
          </p>
        </div>

        {/* Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {prepared.map((card) => (
            <div key={card.id}>
              <div className="">
                <Image
                  src={card.imgSrc}
                  alt={card.imgAlt}
                  width={1600}
                  height={420}
                  sizes="(min-width:1024px) 560px, (min-width:768px) 640px, 100vw"
                  className="w-full h-auto rounded-md"
                  priority={card.id === 1}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA (unchanged) */}
        <div className="mt-7 md:mt-10 flex justify-center px-4">
          <Link
            href="/#order-wizard"
            className="text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] transition-colors"
          >
            আমি অর্ডার করতে চাই
          </Link>
        </div>
      </div>
    </section>
  );
}
