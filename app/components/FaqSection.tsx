// components/FaqSection.tsx
"use client";

import Link from "next/link";
import MuxVideo from "./MuxVideo";

export default function FaqSection() {
  return (
    <section
      className="
        relative z-0 isolate w-full overflow-hidden
    bg-[#111214] text-white p-4
      "
    >
      {/* soft background glows (clipped, so no side scroll) */}
      <div className="pointer-events-none absolute -top-[18vw] left-1/2 h-[45vw] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/18 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-[22vw] right-1/2 h-[40vw] w-[110vw] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />
 <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-center">
            নিশ্চিত না হয়ে অর্ডার করবেন না। অন্যের নাম অর্ডার করবেন না।
          </h2>
      <MuxVideo
        playbackId="dAMC02jrZMiXIp46dcreg7veB1jpfZnH8HJ9VotXA00FU"
        poster="https://image.mux.com/dAMC02jrZMiXIp46dcreg7veB1jpfZnH8HJ9VotXA00FU/animated.gif?width=320"
      />
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
