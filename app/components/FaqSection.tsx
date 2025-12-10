// components/FaqSection.tsx
"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "এইটা কি সত্যি কাজ করবে?",
    a: "জি ভাই; আমাদের এই পণ্যতে কোনো জাদু নেই তবে আছে ৩২ টির বেশি প্রাকৃতিক ভেষজ/হার্বাল উপাদান যা আপনাদের সুস্থ করতে বাধ্য। এই উপাদানে যদি কারো সমাধান না হয় তাহলে বুঝে নিতে হবে তার আর অন্য ওষুধ ও কাজে দিবে না কারণ প্রাকৃতিক উপাদানের উপর কোনো সমাধান হয় না। প্রত্যেক মানুষের শারীরিক অবস্থা ভিন্ন তাই যদি আমরা বলি এইটা সত্যিই কাজ করবে তাহলে সেটা কিছুটা হলেও অনেক কাস্টমারের ক্ষেত্রে মিথ্যা প্রমাণিত হতে পারে। তবে আল্লাহর ওপর এবং তার তৈরি ভেষজ/হার্বাল উপাদানে বিস্বাস রাখলে আপনার কোনো ক্ষতি হবে না ইনশাল্লাহ। নিন, খান, সুস্থ হন এবং অন্যদের কাছে আমাদের পণ্য সম্পর্কে জানান।",
  },
  {
    q: "আপনাদের অফিস কোথায়?",
    a: "আপনাদের সুবিধার জন্য পণ্য পাঠানো এবং অর্ডার নিশ্চিত করার জন্য আলাদা ঠিকানা রয়েছে। আপনাদের অর্ডার করা পণ্যটি: সূর্যনগর, শিবচর, মাদারীপুর থেকে সারা বাংলাদেশে ডেলিভারি দেওয়া হয়।",
  },
  {
    q: "হাই প্রেশার / ডায়াবেটিস রোগী কি খেতে পারবেন?",
    a: "ডাক্তারের চলতি পরামর্শ মেনে চলুন। সাধারণত হাই প্রেশার বা ডায়াবেটিস থাকলে দিনে ১ বার দিয়ে শুরু করুন, পানি বেশি খান, কোনো অস্বস্তি হলে সেবন বন্ধ করে চিকিৎসকের সাথে কথা বলুন।",
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

      </div>
    </section>
  );
}
