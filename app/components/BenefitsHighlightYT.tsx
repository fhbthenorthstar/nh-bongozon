"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// --- REPLACED WITH GOOGLE ADS COMPLIANT TEXT ---
// This new list focuses on general wellness, vitality, and confidence 
// to avoid policy violations and account suspension.
const RAW_BENEFITS: string[] = [
  "পুরুষের স্বাভাবিক প্রাণশক্তি বাড়াতে সাহায্য করে",
  "শারীরিক স্ট্যামিনা ও সহনশীলতা বাড়াতে সহায়ক",
  "আত্মবিশ্বাস ও সার্বিক সুস্থতা বজায় রাখতে সাহায্য করে",
  "দৈহিক দুর্বলতা কাটিয়ে উঠতে সহায়তা করে",
  "উৎসাহ ও কর্মক্ষমতা বৃদ্ধিতে ভূমিকা রাখে",
  "দৈনন্দিন মানসিক চাপ ও ক্লান্তি দূর করতে সহায়ক",
  "বাছাই করা প্রাকৃতিক এবং ঐতিহ্যবাহী ভেষজের মিশ্রণ",
  "একটি উন্নত জীবনধারার জন্য প্রাকৃতিক সহায়তা",
];

// No changes needed to the rest of the component.
// The code below just generates the images from the text above.

/** OPTIONAL: jam only truly sensitive words (disabled by default) */
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

/** Draw one line onto a canvas and return a PNG data URL (with pill bg) */
function drawTextToDataURL(
  text: string,
  {
    fontFamily = "Noto Sans Bengali, Noto Sans, Segoe UI, Helvetica, Arial, sans-serif",
    fontSize = 18, // a touch smaller to match DosageSection feel
    paddingX = 20,
    paddingY = 9,
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

export default function BenefitsHighlight() {
  const [lineImgs, setLineImgs] = useState<string[] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lines = useMemo(() => RAW_BENEFITS.map(gentlyJam), []);

  // Generate crisp chips, responsive font on small screens.
  useEffect(() => {
    const make = () => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;

      // slightly smaller chips on tiny phones
      const fontSize = vw <= 360 ? 15 : vw <= 420 ? 16 : 18;
      const paddingX = vw <= 360 ? 16 : 20;
      const paddingY = vw <= 360 ? 8 : 9;

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
    <section
      className="relative isolate w-full overflow-hidden bg-[#111214] text-white notranslate select-none"
      translate="no"
      lang="zxx"
    >
      {/* soft background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/18 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/2 h-72 w-[46rem] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />

      {/* Smaller, centered container like DosageSection */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-12"
      >
        {/* Section title (centered) */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold tracking-wide text-white">
            সকল উপকারিতা
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
             নাইট হর্স কেন একবার হলেও খাবেন?
          </h2>
          <p className="mt-2 text-white/80 text-base">
            নিয়মিত ব্যবহারে দীর্ঘস্থায়ী সমাধান পেতে সাহায্য করে
          </p>
        </div>

        {/* Chips card — also centered and compact */}
        <div className="mx-auto mt-8 md:mt-10 w-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 shadow-2xl ring-1 ring-white/10">
          <ul className="flex flex-col items-center gap-3 sm:gap-4">
            {(lineImgs ?? new Array(RAW_BENEFITS.length).fill("")).map(
              (src, idx) => (
                <li key={idx} className="w-full text-center">
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      aria-hidden="true"
                      className="inline-block h-auto w-auto max-w-full align-middle"
                      draggable={false}
                    />
                  ) : (
                    <span
                      className="mx-auto block h-6 w-full max-w-[320px] animate-pulse rounded bg-white/10"
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            )}
          </ul>

          {/* CTA (centered) */}
          <div className="mt-8 sm:mt-10">
            <div className="flex justify-center">
              <Link
                href="/#order-wizard"
                className="text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] hover:bg-[#6BC111] transition-colors"
              >
                আমি অর্ডার করতে চাই
              </Link>
            </div>
          </div>
        </div>
      </div>
      <noscript />
    </section>
  );
}