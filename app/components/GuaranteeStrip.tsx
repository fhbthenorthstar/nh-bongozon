// components/GuaranteeStrip.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import MuxVideo from "./MuxVideo";

type GuaranteeStripProps = {
  playbackId?: string;
  poster?: string;
  aspectRatio?: number | string;
};

export default function GuaranteeStrip({
  playbackId = "ev3gkLZqhqKJyN9ND6wYDFRt9TLy1rU7vZXB8GaO0274",
  poster = "https://image.mux.com/ev3gkLZqhqKJyN9ND6wYDFRt9TLy1rU7vZXB8GaO0274/animated.gif?width=320",
  aspectRatio = 1,
}: GuaranteeStripProps) {
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
      <MuxVideo
        playbackId={playbackId}
        poster={poster}
        aspectRatio={aspectRatio}
      />
      <div className="mt-2 flex justify-center px-4">
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
