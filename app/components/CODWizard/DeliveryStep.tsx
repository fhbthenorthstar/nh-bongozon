"use client";

import { BtnContent } from "./ui";

export default function DeliveryStep({
  name,
  phone,
  address,
  setName,
  setPhone,
  setAddress,
  canNext,
  loadingNext,
  onNext,
}: {
  name: string;
  phone: string;
  address: string;
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  setAddress: (v: string) => void;
  canNext: boolean;
  loadingNext: boolean;
  onBack: () => void;
  onNext: () => Promise<void>;
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!canNext || loadingNext) return;
        await onNext();
      }}
      className="space-y-3 sm:space-y-4"
    >
      {/* <h2 className="mt-2 text-base font-extrabold text-white sm:text-lg">
        
      </h2> */}

      <div className="mt-2 text-base text-center rounded-lg border border-white/15 bg-emerald-900 p-3 text-white ring-1 ring-lime-300/20">
        <span className="block text-lg font-extrabold">
          নিচে ডেলিভারি ইনফরমেশন দিন
        </span>
        <span className="block text-xs leading-tight mt-1">
          ফ্রি ডেলিভারি তাই <b>ফেক অর্ডার</b>  করে আমাদের ব্যাবসায়িক ক্ষতি করবেন না। আমরা একান্তই আপনার সুস্থতা কামনা করি।
        </span>
      </div>

      <div className="grid gap-3">
        <label className="block">
          <span className="mb-1 block text-[13px] text-white/80">
            আপনার পুরো নাম
          </span>
          <input
            type="text"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none ring-1 ring-inset ring-white/10 focus:ring-lime-300/40"
            placeholder="আপনার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[13px] text-white/80">
            মোবাইল/হোয়াটস্যাপ নাম্বার
          </span>
          <input
            type="tel"
            inputMode="numeric"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none ring-1 ring-inset ring-white/10 focus:ring-lime-300/40"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[13px] text-white/80">
            ডেলিভারি ঠিকানা দিলে অর্ডার কন্ফার্ম করতে পারবেন
          </span>
          <textarea
            className="min-h-[92px] w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 outline-none ring-1 ring-inset ring-white/10 focus:ring-lime-300/40"
            placeholder="বাড়ি/রোড/এলাকা/থানা/জেলা"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-3">
        <button
          type="submit"
          disabled={!canNext || loadingNext}
          aria-busy={loadingNext}
          className="w-full h-12 inline-flex items-center justify-center rounded-xl px-6 text-[15px] font-extrabold text-neutral-900 shadow-md transition enabled:hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-b from-[#8AE233] to-[#66C214]"
        >
          <BtnContent
            loading={loadingNext}
            label="অর্ডার কন্ফার্ম করুন"
            tone="dark"
          />
        </button>
      </div>
    </form>
  );
}
