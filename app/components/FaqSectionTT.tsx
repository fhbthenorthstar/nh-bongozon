// components/FaqSection.tsx
"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "আপনাদের অফিস কোথায়?",
    a: "আপনাদের সুবিধার জন্য পণ্য পাঠানো এবং অর্ডার নিশ্চিত করার জন্য আলাদা ঠিকানা রয়েছে। আপনাদের অর্ডার করা পণ্যটি: সূর্যনগর, শিবচর, মাদারীপুর থেকে সারা বাংলাদেশে ডেলিভারি দেওয়া হয়।",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="
        relative z-0 isolate w-full overflow-hidden
    bg-[#111214] text-white
      "
    >
      {/* soft background glows (clipped, so no side scroll) */}
      <div className="pointer-events-none absolute -top-[18vw] left-1/2 h-[45vw] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/18 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-[22vw] right-1/2 h-[40vw] w-[110vw] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            কমন প্রশ্নের উত্তর
          </h2>
          <p className="mt-2 text-white/80">
            আপনাদের সাধারণ প্রশ্নগুলোর সংক্ষিপ্ত উত্তর।
          </p>
        </div>

        {/* FAQ list (cards remain white) */}
        <div className="mt-8 space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="text-[15px] sm:text-[16px] font-semibold text-slate-900">
                    {item.q}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-none text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.127l3.71-3.896a.75.75 0 111.08 1.04l-4.24 4.455a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  className={`px-4 sm:px-5 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOpen ? "max-h-[400px] pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-700">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer / policy block under FAQ (styled for dark bg) */}
        <div className="mt-10 sm:mt-12">
          <div className="mx-auto max-w-5xl">
            {/* Glass warning card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ring-1 ring-rose-400/15 backdrop-blur-md shadow-2xl antialiased">
              {/* soft red/amber glow washes */}
              <div className="pointer-events-none absolute inset-x-0 -top-28 h-56 bg-gradient-to-b from-rose-500/15 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute inset-x-0 -bottom-28 h-56 bg-gradient-to-t from-amber-400/10 to-transparent blur-2xl" />

              <div className="relative px-5 sm:px-8 py-6 sm:py-8">
                {/* pill badge */}
                <div className="mx-auto w-fit">
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-700 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-rose-300/30">
                    টাকা না সুস্থতা আমাদের উদ্দেশ্য।
                  </span>
                </div>

                {/* title */}
                <h3 className="mt-3 text-center text-2xl sm:text-3xl font-extrabold tracking-tight">
                  আপনার জানা জরুরি
                </h3>

                {/* main text */}
                <p className="mx-auto mt-3  text-center sm:mt-4 max-w-3xl text-balance text-white text-[13.5px] sm:text-[16px] leading-[1.9] tracking-[.01em]">
                  ডেলিভারি চার্জ <strong className="text-white">ফ্রি*</strong>{" "}
                  আপনি ১০০% নিশ্চিত না হয়ে যদি অর্ডার করতে চান বা আগামী ২–৪
                  দিনের মধ্যে আপনার দেয়া লোকেশনে পার্সেল রিসিভ করতে না পারেন
                  তাহলে আপনি অর্ডার না করলেই আমরা খুশি হবো। কারণ এখন আপনি অর্ডার
                  করলে, ২–৪ ঘন্টার মধ্যে আমাদের টিম ফোন দিয়ে কনফার্ম করবে, তারপর
                  আপনার জন্য পার্সেল প্যাক করতে হবে (নাইট হর্স কাঁচের জারে থাকে,
                  তাই অতিরিক্ত যত্ন লাগে) এবং কুরিয়ারে পাঠাতেও ৮০–১৩৫ টাকা খরচ
                  হয়। শেষে ডেলিভারিম্যান যখন আপনার লোকেশনে পৌঁছাবে - একবার
                  ভাবুন, আপনি যদি না নেন/রিটার্ন করেন/ ফোন না ধরেন - কতজনের সময়,
                  শ্রম ও নগদ টাকার ক্ষতি হয়। দয়া করে অন্যের ক্ষতি করা থেকে বিরত
                  থাকুন।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
