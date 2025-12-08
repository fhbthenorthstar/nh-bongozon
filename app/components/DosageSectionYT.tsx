"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Static import keeps intrinsic ratio (no CLS)
import Banner from "@/public/night-horse-product-image.webp";

/** === Moved from BenefitsHighlight === */
const RAW_BENEFITS: string[] = [
  "আপনার ভেতরের শক্তি ও আত্মবিশ্বাসের জন্য।",
  "তারুণ্যের উদ্যম এবং প্রাণশক্তিকে সহায়তা করতে।",
  "স্ট্যামিনা এবং পারফর্মেন্সে সহায়তা করতে।",
  "আপনার সুস্থতার যাত্রায় একটি নতুন অধ্যায়।",
  "প্রাকৃতিকভাবে সহনশীলতা সমর্থনে।",
  "একটি শান্ত ও মনোযোগী মনকে সহায়তা করতে।",
  "ভারসাম্যপূর্ণ জীবনযাপনের জন্য একটি প্রাকৃতিক পথ।",
  "নাইট হর্স: আপনার নতুন সংস্করণের চাবিকাঠি।",
];

// OPTIONAL: jam sensitive words (kept false)
const JAM_SENSITIVE = false;
const ZWNJ = "\u200C";
const SENSITIVE = ["যৌন", "বীর্য", "পুরুষত্ব", "শক্তি", "উত্তেজিত"];
function gentlyJam(line: string): string {
  if (!JAM_SENSITIVE) return line;
  let out = line;
  for (const w of SENSITIVE) {
    const i = out.indexOf(w);
    if (i >= 0) {
      const mid = Math.floor(w.length / 2);
      out = out.replace(w, w.slice(0, mid) + ZWNJ + w.slice(mid));
    }
  }
  return out;
}

/** Draw a pill chip to a canvas and return a PNG data URL */
function drawTextToDataURL(
  text: string,
  {
    fontFamily = "Noto Sans Bengali, Noto Sans, Segoe UI, Helvetica, Arial, sans-serif",
    fontSize = 20,
    paddingX = 22,
    paddingY = 10,
    textColor = "rgba(255,255,255,0.92)",
    bgColor = "rgba(255,255,255,0.06)",
    borderColor = "rgba(255,255,255,0.12)",
    radius = 18,
  } = {}
): string {
  const dpr =
    typeof window !== "undefined"
      ? Math.max(1, window.devicePixelRatio || 1)
      : 1;

  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  if (!ctx) return "";

  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);

  const cssW = Math.ceil(textWidth + paddingX * 2);
  const cssH = Math.ceil(fontSize + paddingY * 2);

  c.width = cssW * dpr;
  c.height = cssH * dpr;

  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);
  g.font = `${fontSize}px ${fontFamily}`;

  // pill background
  roundRect(g, 0.5, 0.5, cssW - 1, cssH - 1, radius);
  g.fillStyle = bgColor;
  g.fill();

  // subtle border
  g.strokeStyle = borderColor;
  g.lineWidth = 1;
  roundRect(g, 0.5, 0.5, cssW - 1, cssH - 1, radius);
  g.stroke();

  // text
  g.fillStyle = textColor;
  g.textBaseline = "middle";
  g.fillText(text, paddingX, cssH / 2);

  return c.toDataURL("image/png");

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }
}
/** === /Moved from BenefitsHighlight === */

export default function DosageSection() {
  // chip images state (from BenefitsHighlight)
  const [lineImgs, setLineImgs] = useState<string[] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lines = useMemo(() => RAW_BENEFITS.map(gentlyJam), []);

  // generate crisp chips (responsive)
  useEffect(() => {
    const make = () => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const fontSize = vw <= 360 ? 15 : vw <= 420 ? 16 : 18;
      const paddingX = vw <= 360 ? 16 : 22;
      const paddingY = vw <= 360 ? 8 : 10;
      const urls = lines.map((line) =>
        drawTextToDataURL(line, { fontSize, paddingX, paddingY })
      );
      setLineImgs(urls);
    };

    make();

    const ro =
      "ResizeObserver" in window && containerRef.current
        ? new ResizeObserver(make)
        : null;
    window.addEventListener("resize", make);
    window.addEventListener("orientationchange", make);
    if (ro && containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", make);
      window.removeEventListener("orientationchange", make);
      ro?.disconnect();
    };
  }, [lines]);

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#111214] text-white">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/20 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/2 h-72 w-[46rem] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />

      <div
        ref={containerRef}
        className="mx-auto max-w-screen-xl px-4 sm:px-6 py-8"
      >
        {/* Label + header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#8AE233] px-3 py-1 text-xl font-semibold tracking-wide text-black">
            খাবার নিয়ম ও উপকারিতা
          </span>

          <p className="mt-3 text-base leading-relaxed text-white sm:text-lg">
            পরিপূর্ণ ফল পেতে সকালে ও রাতে খাবার এক ঘণ্টা পর ২ চা চামচ করে খাবেন।
            দুপুরে রোদের সময় খাবেন না। <br />
            এই প্রাকৃতিক ভেষজ উপাদানগুলো একটি ব্যস্ত জীবনযাত্রার মাঝেও শরীরের
            পুষ্টির ভারসাম্যকে সহায়তা করে, যা আপনাকে মানসিক ও শারীরিকভাবে
            আত্মবিশ্বাসী থাকতে সাহায্য করে।
          </p>
        </div>

        {/* Image card (Dosage banner) */}
        <div className="mx-auto mt-8 md:mt-10 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl ring-1 ring-white/10">
            <Image
              src={Banner}
              alt="সেবন নির্দেশনা ব্যানার"
              priority
              sizes="(min-width:1024px) 960px, 100vw"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center mt-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            নাইট হর্সের কার্যকারিতা
          </h2>
          <p className="mt-3 text-white/80">
            আমরা প্রোডাক্টের গুণগত মান আন্তর্জাতিক পর্যায়ে নেয়ার সর্বোচ্চ
            প্রচেষ্টায় আছি কারণ আগামী বসরের শুরু থেকে আমাদের নাইট হর্স সিঙ্গাপুর
            এবং মালয়েশিয়ায় বাজারজাত হবে।
          </p>
        </div>
        {/* === REPLACED caution box with benefit chips list === */}
        <div className="mx-auto mt-8 md:mt-10 max-w-3xl">
          <div className="order-2 lg:order-none rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 lg:p-8 shadow-2xl ring-1 ring-black/5">
            <ul className="space-y-3 sm:space-y-4 flex flex-col items-center">
              {(lineImgs ?? new Array(RAW_BENEFITS.length).fill("")).map(
                (src, idx) => (
                  <li key={idx} className="w-full flex justify-center">
                    {src ? (
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="mx-auto max-w-full h-auto"
                        draggable={false}
                      />
                    ) : (
                      <span
                        className="block h-6 w-full max-w-[320px] sm:max-w-[720px] mx-auto animate-pulse rounded bg-white/10"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                )
              )}
            </ul>

            {/* CTA (kept at bottom) */}
            <div className="mt-8 sm:mt-10">
              <div className="flex justify-center">
                <Link
                  href="/#order-wizard"
                  className=" text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] hover:bg-[#6BC111] transition-colors"
                >
                  আমি অর্ডার করতে চাই
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
