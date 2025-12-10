// components/GuaranteeStrip.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type GuaranteeStripProps = {
  /** pass different video IDs per page */
  mediaId?: string;
  /** keep previous look: 1 = square, or use 16/9 etc. */
  aspectRatio?: number;
};

export default function GuaranteeStrip({
  mediaId = "63uv4q1q2u",
  aspectRatio = 1,
}: GuaranteeStripProps) {
  // Wistia's new web component loader (fallback blur + padding baked in)
  const padTop = `${100 / aspectRatio}%`;
  const swatchStyle = `
    wistia-player[media-id='${mediaId}']:not(:defined) {
      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
      display: block;
      filter: blur(5px);
      padding-top: ${padTop};
    }
  `;

  // Load Wistia scripts on the client only once per mediaId
  useEffect(() => {
    const ensureScript = (id: string, src: string, type?: string) => {
      if (document.getElementById(id)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.id = id;
      if (type) s.type = type;
      document.head.appendChild(s);
    };

    ensureScript("wistia-player-core", "https://fast.wistia.com/player.js");
    ensureScript(
      `wistia-embed-${mediaId}`,
      `https://fast.wistia.com/embed/${mediaId}.js`,
      "module"
    );
  }, [mediaId]);

  return (
    <section
      className="
        relative isolate w-full overflow-hidden text-black
        p-6 bg-[#111214]
      "
    >
      <div className="relative mx-auto max-w-7xl ">
        <div className="flex justify-center">
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
              <span className="min-w-0 leading-tight select-none text-white">
                <span className="block truncate font-semibold tracking-tight text-base sm:text-xl md:text-lg">
                  নাইট হর্স হলো
                </span>
                <span className="block truncate text-[11px] sm:text-xs md:text-sm">
                  হাজারো মানুষের আস্থা
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl text-center text-white py-4">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          অতীতের অনিয়মের খেসারত আর নয়, ভেতর থেকে হারানো জোশ ও পুরুষালী তেজ ফিরে পেতে সাহায্য করবে নাইট হর্স!
        </h2>
        <p className="mt-3">
          ২/৩ দিনের মধ্যে পণ্য হাতে পাবেন। সকালে ও রাতে খাবার পর ২ চা চামচ খাবেন। নিচের পুরো ভিডিওটা দেখলেই নাইট হর্সএর উপকারিতা সম্পর্কে জানতে পারবেন।
        </p>
      </div>
      <div className="mx-auto w-full max-w-screen-2xl">
        {/* Wistia video — reserved height prevents badge pop-under */}
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative w-full">
            {/* Reserve height immediately to avoid layout shift */}
            <div style={{ paddingTop: padTop }} />
            {/* Wistia custom element fills reserved box once scripts load */}
            <div className="absolute inset-0">
              <style dangerouslySetInnerHTML={{ __html: swatchStyle }} />
              <wistia-player
                media-id={mediaId}
                aspect={aspectRatio}
                className="h-full w-full block"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 md:mt-10 flex justify-center px-4">
        <Link
          href="/#order-wizard"
          className="text-black inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] transition-colors"
        >
          আমি অর্ডার করতে চাই
        </Link>
      </div>
    </section>
  );
}
