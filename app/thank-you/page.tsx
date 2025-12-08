"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Copy, Home, MessageCircle } from "lucide-react";

/** ---------- small helpers ---------- **/
function fmtBDT(n?: number | string) {
  const num = typeof n === "string" ? Number(n) : n ?? 0;
  return `৳${Math.round(num).toLocaleString("bn-BD")}`;
}

type DataLayerEvent = Record<string, unknown>;
const dlPush = (evt: DataLayerEvent) => {
  const w = window as Window & { dataLayer?: DataLayerEvent[] };
  (w.dataLayer ||= []).push(evt);
};

export default function ThankYouPage() {
  const [oid, setOid] = useState(""); // optional, rarely present now
  const [ph, setPh] = useState(""); // passed from wizard
  const [bundle, setBundle] = useState("");
  const [price, setPrice] = useState("");

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801623103248";

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const _oid = sp.get("oid") || `tmp-${Date.now()}`;
    const _ph = sp.get("ph") || "";
    const _bundle = sp.get("bundle") || "Night Horse";
    const _priceStr = sp.get("price") || "0";
    const _price = Number(_priceStr) || 0;

    setOid(_oid);
    setPh(_ph);
    setBundle(_bundle);
    setPrice(_priceStr);

    // Push user_data again on TY so the purchase includes UPD
    try {
      const addrRaw = sessionStorage.getItem("nh_user_addr") || "{}";
      const address =
        ((): Record<string, unknown> => {
          try { return JSON.parse(addrRaw) as Record<string, unknown>; }
          catch { return {}; }
        })();

      const ud = {
        phone_number: sessionStorage.getItem("nh_user_phone") || undefined,
        first_name: sessionStorage.getItem("nh_user_name_first") || undefined,
        last_name: sessionStorage.getItem("nh_user_name_last") || undefined,
        address,
      };

      if (ud.phone_number) {
        dlPush({ event: "set_user_data", user_data: ud });
      }
    } catch {}

    // GA4 purchase event (GTM listens)
    dlPush({
      event: "purchase",
      transaction_id: _oid,
      currency: "BDT",
      value: _price,
      affiliation: "Night Horse Online",
      shipping: 0,
      tax: 0,
      coupon: undefined,
      items: [
        {
          item_id: "NH-1",
          item_name: _bundle || "Night Horse",
          item_brand: "Night Horse",
          item_category: "Course",
          item_variant: _bundle,
          price: _price,
          quantity: 1,
          discount: 0,
        },
      ],
    });
  }, []);

  const supMsg = `আমার অর্ডারটি কনফার্ম করলাম ভাই। আমার অর্ডার আইডি হলো ${oid}. বান্ডেল: ${
    bundle || "—"
  }, দাম: ${fmtBDT(price)}, আমার ফোন: ${ph || "—"}.`;

  const copyText = async (txt: string) => {
    if (!txt) return;
    try {
      await navigator.clipboard.writeText(txt);
      alert("কপি হয়েছে!");
    } catch {
      alert("কপি করা যায়নি, একটু পরে আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="relative isolate w-full overflow-hidden bg-[#111214] text-white min-h-screen supports-[min-height:100dvh]:min-h-[100dvh] pb-[env(safe-area-inset-bottom)]">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/20 via-emerald-400/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/2 h-72 w-[46rem] translate-x-1/2 rounded-full bg-gradient-to-tl from-cyan-400/10 via-fuchsia-400/10 to-transparent blur-3xl" />

      {/* Brand strip */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3 backdrop-blur-md ring-1 ring-white/10 shadow-xl">
            <Link href="/" aria-label="Night Horse — Home" className="flex items-center gap-3 sm:gap-4">
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
              <span className="min-w-0 leading-tight select-none">
                <span className="block truncate font-semibold tracking-tight text-base sm:text-xl md:text-lg">
                  নাইট হর্স হলো
                </span>
                <span className="block truncate text-[11px] sm:text-xs md:text-sm text-white/75">
                  হাজারো পুরুষের আস্থা
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="mx-auto w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center rounded-full p-2 bg-emerald-500/20">
              <CheckCircle2 className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            </div>
            <div className="inline-flex items-center rounded-full px-2.5 py-1 text-sm font-medium bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
              আলহামদুলিল্লাহ
            </div>
          </div>

          <h1 className="mt-4 text-xl sm:text-xl font-extrabold tracking-tight">আপনার অর্ডারটি কনফার্ম হয়েছে ভাই!</h1>
          <p className="mt-2 mb-2 text-white/80">
            খুবই দ্রুত আপনার সাথে যোগাযোগ করে পার্সেলটি পাঠাবো। ইনশাল্লাহ আপনার নেক উদ্দেশ্য আল্লাহতালা পূরণ করবে।
          </p>

          {/* Dua block */}
          <div>
            <div className="mt-2 relative rounded-2xl border border-white/15 bg-emerald-900 p-5 sm:p-6 text-white shadow-2xl backdrop-blur-xl">
              <h3 className="text-xs font-semibold tracking-wide text-white/70 sm:text-sm">সূরা আশ-শু‘রা 26:80</h3>
              <p className="mt-2 text-1xl sm:text-3xl font-bold leading-relaxed">وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ</p>
              <p className="mt-2 text-sm sm:text-base text-white/80">Wa idhā mariḍtu fa-huwa yashfīn.</p>
              <p className="mt-2 text-sm sm:text-base text-white/90">আর যখন আমি অসুস্থ হই, তখন তিনিই আমাকে আরোগ্য দান করেন - ইবরাহিম (আ.)</p>
            </div>
          </div>

          {/* Summary block */}
          <div className="mt-4 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <div className="text-xs text-white">অর্ডার স্ট্যাটাস</div>
                <div className="text-sm font-semibold">অর্ডারটি আমরা পেয়েছি।</div>
              </div>
              <div>
                <div className="text-xs text-white">প্যাকেজ</div>
                <div className="text-sm font-semibold">{bundle || "—"}</div>
              </div>
              <div>
                <div className="text-xs text-white">দাম</div>
                <div className="text-sm font-semibold">{fmtBDT(price)}</div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <div className="text-xs text-white">ফোন</div>
                <div className="text-sm font-semibold break-words">{ph || "—"}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-white">অর্ডার আইডি</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold break-words">{oid ? `#${oid}` : "—"}</div>
                  {!!oid && (
                    <button
                      onClick={() => copyText(oid)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/15 px-2.5 py-1.5 text-xs text-white/90"
                    >
                      <Copy className="h-4 w-4" />
                      কপি
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 text-[13px] text-white">
              ভাই, আপনি চাইলে আপনার অর্ডার আইডিটা আমাদের হোয়াটস্যাপএ দিতে পারেন। তাহলে আপনার সাথে আমরা বেশি দ্রুত যোগাযোগ করতে পারবো।
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(supMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-3 font-semibold text-[15px] text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              হোয়াটসাপে মেসেজ দিন
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 px-4 py-3 font-semibold text-[15px] text-white transition-colors"
            >
              <Home className="h-4 w-4" />
              হোমপেজে ফিরে যান
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-white">
            ডেলিভারি ফ্রি তবে পণ্য পৌঁছাতে আপনার অবস্থানভেদে ২/৩ দিন সময় লাগতে পারে। সুস্থতায় কেন তাড়াহুড়ো করতে নেই।
          </p>
        </div>
      </div>
    </main>
  );
}
