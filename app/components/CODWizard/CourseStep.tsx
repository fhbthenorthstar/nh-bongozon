"use client";

import { BtnContent } from "./ui";
import { UNIT_PRICE, compareAt, fmtBDT } from "./constants";
import type { Bundle, BundleKey } from "./types";

export default function CourseStep({
  selectedKey,
  setSelectedKey,
  bundles,
  loadingNext,
  onNext,
  hideNext = false,
}: {
  selectedKey: BundleKey;
  setSelectedKey: (k: BundleKey) => void;
  bundles: Bundle[];
  loadingNext: boolean;
  onNext: () => Promise<void>;
  hideNext?: boolean;
}) {
  return (
    <div>
     

      <div className="mt-2 text-base text-center rounded-lg border border-white/15 bg-emerald-900 p-3 text-white ring-1 ring-lime-300/20">
        <span className="block text-lg font-extrabold">
          ভাই, সঠিক প্ল্যানটি বেছে নিন
        </span>
        <span className="block text-xs leading-tight mt-1">
         যারা নিজেকে ১ বসরের বেশি সময় ধরে দুর্বল মনে করেন, তাদের জন্য আমাদের ফুল প্ল্যানটি বিশেষভাবে প্রস্তাবিত সেরা ফলাফলের জন্য।
        </span>
      </div>

      <fieldset className="mt-3 space-y-3 sm:space-y-4">
        {bundles.map((b) => {
          const active = selectedKey === b.key;
          const thisBase = b.qty * UNIT_PRICE;
          const thisPrice = thisBase - b.discountBDT;
          const thisCmp = compareAt(thisPrice);
          return (
            <label
              key={b.key}
              className={`group relative flex w-full cursor-pointer gap-3 rounded-xl border px-3 py-3 transition ${
                active
                  ? "border-lime-400/60 ring-1 ring-lime-300/40 bg-white/5"
                  : "border-white/15 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="pt-0.5 shrink-0">
                <span
                  aria-hidden
                  className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                    active ? "border-lime-500" : "border-white/40"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      active
                        ? "scale-100 bg-gradient-to-b from-[#8AE233] to-[#66C214]"
                        : "scale-0"
                    }`}
                  />
                </span>
              </div>

              <div className="flex w-full items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-[15px] font-bold text-white sm:text-base">
                    {b.label}
                  </h3>

                  <div className="mt-1 inline-flex flex-wrap items-center gap-2">
                    <span className="text-[12px] font-semibold text-white">{b.timing}</span>
                    {b.discountBDT > 0 && (
                      <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
                        কোর্সে ছাড়: {fmtBDT(b.discountBDT)}
                      </span>
                    )}
                    {/* <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                      নীট ওজন: {totalGrams} গ্রাম
                    </span> */}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-[20px] font-extrabold text-white sm:text-2xl">
                    {fmtBDT(thisPrice)}
                  </div>
                  <div className="text-[12px] text-white/60 line-through sm:text-sm">
                    {fmtBDT(thisCmp)}
                  </div>
                </div>
              </div>

              <input
                className="sr-only"
                type="radio"
                name="bundle"
                checked={active}
                onChange={() => setSelectedKey(b.key)}
              />
            </label>
          );
        })}
      </fieldset>

      {!hideNext && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onNext}
            disabled={loadingNext}
            aria-busy={loadingNext}
            className="inline-flex w-full max-w-[720px] items-center justify-center rounded-xl px-8 sm:px-12 py-4 text-[18px] sm:text-[22px] font-semibold bg-gradient-to-b from-[#8AE233] to-[#66C214] transition-colors"
          >
            <BtnContent loading={loadingNext} label="অর্ডার করতে ক্লিক করুন" tone="dark" />
          </button>
        </div>
      )}
    </div>
  );
}
