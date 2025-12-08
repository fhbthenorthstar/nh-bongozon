"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { ttqIdentifyOnce, normalizePhoneBD } from "@/app/lib/tiktok";

import CourseStep from "./CourseStep";
import DeliveryStep from "./DeliveryStep";

import {
  BUNDLES,
  UNIT_PRICE,
  compareAt,
  CURRENCY,
  TT_PRODUCT_CATEGORY,
  PRODUCT_ID,
  PRODUCT_NAME,
} from "./constants";
import { choicesFromBundle } from "./mapping";
import type { Bundle, BundleKey } from "./types";

import {
  trackTikTokAddToCart,
  trackTikTokInitiateCheckout,
  trackTikTokPurchase,
} from "./pixel";

// ====== CONFIG ======
const SHEET_API = "/api/order-to-sheet";
const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || "";

// ---------- tiny utilities ----------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fetchWithTimeout = async (
  url: string,
  init: RequestInit = {},
  timeoutMs = 10000
) => {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
};

// Safe dataLayer pusher (prevents TS/ESLint issues)
type DataLayerEvent = Record<string, unknown>;
const dlPush = (evt: DataLayerEvent) => {
  const w = window as Window & { dataLayer?: DataLayerEvent[] };
  (w.dataLayer ||= []).push(evt);
};

// WhatsApp helper
function buildWhatsAppLinkBD(rawPhone: string, message: string) {
  const digits = (rawPhone || "").replace(/\D/g, "");
  let intl = digits;
  if (digits.startsWith("8801")) intl = digits;
  else if (digits.startsWith("01") && digits.length === 11)
    intl = `88${digits}`;
  else if (digits.startsWith("1") && digits.length === 10)
    intl = `880${digits}`;
  else if (digits.startsWith("88") && digits[2] === "0") intl = digits;
  else if (!digits.startsWith("88")) intl = `880${digits}`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}

const msg =
  "আপনার নাইট হর্স পার্সেলটা এই লোকেশনে পাঠিয়ে দিয়েছি এবং আপনার পার্সেলটি প্যাকেজ করে কুরিয়ার করতে আমাদের ওই টাকা খরচ হয়েছে। পার্সেলটা রিসিভ করে খাওয়া শুরু করেন ইনশাল্লাহ খুবই দ্রুত আল্লাহ্পাক আপনাকে সুস্থ করে তুলবেন। ডেলিভারি চার্জ ফ্রি কিন্তু কোন কারণে আপনি পার্সেল রিসিভ করতে না পারলে আপনাকে পার্সেলটি পাঠানোর জন্যে কুরিয়ার কোম্পনিকে ঐ টাকা আমাদের জরিমানা দিতে হবে। আর অবশ্যই আপনার কোনো প্রশ্ন থাকলে জানাবেন ভাই!!";

// POST with retry
type JsonRecord = Record<string, unknown>;
async function postJSONWithRetry<T = unknown>(
  url: string,
  body: JsonRecord,
  tries = 4
): Promise<{ ok: true; json: T } | { ok: false; error: string }> {
  let lastErr: unknown = null;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        },
        12000
      );
      if (res.ok) {
        let j: T;
        try {
          j = (await res.json()) as T;
        } catch {
          j = {} as T;
        }
        return { ok: true, json: j };
      }
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await sleep(600 * (i + 1));
  }
  return { ok: false, error: String(lastErr ?? "Unknown error") };
}

// Normalize to 11-digit local BD (01XXXXXXXXX) for sheet
function toLocalBDPhone(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.startsWith("8801") && digits.length === 13)
    return "0" + digits.slice(3);
  if (digits.startsWith("01") && digits.length === 11) return digits;
  if (digits.startsWith("1") && digits.length === 10) return "0" + digits;
  if (digits.startsWith("88") && digits.length > 2 && digits[2] === "0")
    return digits.slice(2);
  return digits;
}

/** ---------- Google UPD helpers ---------- **/
function toE164BD(phone: string) {
  const d = (phone || "").replace(/\D/g, "");
  if (d.startsWith("8801")) return d;
  if (d.startsWith("01") && d.length === 11) return `88${d}`;
  if (d.startsWith("1") && d.length === 10) return `880${d}`;
  if (d.startsWith("88") && d[2] === "0") return d;
  return d.startsWith("88") ? d : `880${d}`;
}

function splitName(full: string) {
  const parts = (full || "").trim().split(/\s+/);
  if (!parts.length) return { first_name: undefined, last_name: undefined };
  if (parts.length === 1) return { first_name: parts[0], last_name: undefined };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

function parseAddressBD(addr: string) {
  const a = (addr || "").trim();
  const postal = (a.match(/\b(\d{4,5})\b/) || [])[1];
  const chunks = a
    .replace(postal || "", "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const street = chunks[0] || a;
  const city = chunks[1];
  const region = chunks[2];
  return {
    street,
    city: city || undefined,
    region: region || undefined,
    postal_code: postal || undefined,
    country: "BD",
  };
}

export default function OrderWizardv3({ channel = "Unknown" }) {
  const [selectedKey, setSelectedKey] = useState<BundleKey>("course20");
  const selected = useMemo(
    () => BUNDLES.find((b) => b.key === selectedKey)!,
    [selectedKey]
  );

  const basePrice = selected.qty * UNIT_PRICE;
  const bundlePrice = basePrice - selected.discountBDT;
  const cmpPrice = compareAt(bundlePrice);
  const priceBDT = Math.round(bundlePrice);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const canSubmit =
    name.trim().length >= 2 &&
    phone.trim().length >= 10 &&
    address.trim().length >= 10;

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const firedATC = useRef(false);
  const firedIC = useRef(false);
  const lastIdentified = useRef<string | null>(null);

  useEffect(() => {
    if (!firedATC.current) {
      trackTikTokAddToCart(selected).catch(() => {});
      firedATC.current = true;
    }

    dlPush({
      event: "begin_checkout",
      currency: CURRENCY,
      value: priceBDT,
      coupon: undefined,
      affiliation: "Night Horse Online",
      items: [
        {
          item_id: PRODUCT_ID,
          item_name: PRODUCT_NAME,
          item_brand: "Night Horse",
          item_category: TT_PRODUCT_CATEGORY,
          item_variant: selected.label,
          price: UNIT_PRICE,
          quantity: selected.qty,
          discount: selected.discountBDT || 0,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // once

  // Early identification once we have a plausible phone
  useEffect(() => {
    const normalized = normalizePhoneBD(phone || "");
    if (!normalized || normalized.length < 12) return;
    if (lastIdentified.current === normalized) return;
    const t = setTimeout(() => {
      lastIdentified.current = normalized;
      ttqIdentifyOnce({ phone, external_id: normalized }).catch(() => {});
    }, 500);
    return () => clearTimeout(t);
  }, [phone]);

  // Fire IC once when form is ready with user data
  useEffect(() => {
    if (firedIC.current || !canSubmit) return;
    firedIC.current = true;
    trackTikTokInitiateCheckout(selected, { name, phone, address }).catch(() => {});
  }, [address, canSubmit, name, phone, selected]);

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#111214] py-8"
      id="order-wizard"
    >
      <div className="mx-auto max-w-3xl text-center mt-5">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-gradient-to-b from-[#8AE233] to-[#66C214] text-xl font-semibold tracking-wide text-black">
          ভাইজান
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
          নিচে নির্দ্বিধায় অর্ডার করুন
        </h2>
        <p className="mt-2 text-white text-[15px] px-3">
          আর্থিক সমস্যা থাকলে অর্ডার করবেন না। অর্ডার করলে ৪ ঘন্টার মধ্যে আপনাকে ফোন করে আপনার সকল প্রশ্নের উত্তর দিয়ে আমরা পণ্য পাঠাবো।
        </p>
      </div>

      <div className="mx-auto max-w-3xl p-4 sm:p-5">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md ring-1 ring-white/10 sm:p-5">
          <div className="grid gap-5 sm:gap-6">
            <CourseStep
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              bundles={BUNDLES as Bundle[]}
              loadingNext={false}
              onNext={async () => {}}
              hideNext
            />

            <DeliveryStep
              name={name}
              phone={phone}
              address={address}
              setName={setName}
              setPhone={setPhone}
              setAddress={setAddress}
              canNext={canSubmit}
              loadingNext={isPlacingOrder}
              onBack={() => {}}
              onNext={async () => {
                if (!canSubmit || isPlacingOrder) return;
                setIsPlacingOrder(true);

                // 0) Build & log (console)
                const c = choicesFromBundle(selected);
                const payload = {
                  customerName: name,
                  customerPhone: phone,
                  deliveryAddress: address,
                  selectedKey,
                  unitPrice: UNIT_PRICE,
                  quantity: selected.qty,
                  basePrice,
                  bundlePrice,
                  cmpPrice,
                  currency: CURRENCY,
                  creativeId: new URL(window.location.href).searchParams.get(
                    "creative_id"
                  ),
                  selectedLabel: selected.label,
                  timingChoice: c.timingChoice,
                  durationChoice: c.durationChoice,
                  pathaoRating: null,
                  channel: channel,
                };
                console.log("ORDER_SUBMIT (logged only):", payload);

                // Google UPD: push user_data
                try {
                  const { first_name, last_name } = splitName(name);
                  const addr = parseAddressBD(address);
                  const user_data = {
                    phone_number: toE164BD(phone),
                    first_name,
                    last_name,
                    address: addr,
                  };
                  sessionStorage.setItem(
                    "nh_user_phone",
                    user_data.phone_number || ""
                  );
                  sessionStorage.setItem(
                    "nh_user_name_first",
                    first_name || ""
                  );
                  sessionStorage.setItem("nh_user_name_last", last_name || "");
                  sessionStorage.setItem("nh_user_addr", JSON.stringify(addr));
                  dlPush({ event: "set_user_data", user_data });
                } catch {}

                // 1) Write to Google Sheet (primary DB)
                const sheetBody = {
                  name: name.trim(),
                  phone: toLocalBDPhone(phone),
                  address: address.trim(),
                  confirmation: "Pending",
                  dispatch_date: "",
                  wa_message: buildWhatsAppLinkBD(phone, msg),
                  bundle_label: selected.label,
                  price_bdt: priceBDT,
                  channel: channel,
                };
                const sheetRes = await postJSONWithRetry(
                  SHEET_API,
                  sheetBody,
                  4
                );

                // 2) Fire Purchase events regardless
                const commonOrderId = `ORD-${Date.now()}`;
                const ttInstant = trackTikTokPurchase(
                  selected,
                  { name, phone, address },
                  commonOrderId
                );

                await Promise.allSettled([ttInstant]);

                // 3) Discord fallback log
                try {
                  const discordEmbed = {
                    embeds: [
                      {
                        title: sheetRes.ok
                          ? "✅ New Order (Sheet OK)"
                          : "⚠️ New Order (Sheet FAILED)",
                        color: sheetRes.ok ? 5763719 : 16753920,
                        fields: [
                          { name: "Name", value: name, inline: true },
                          {
                            name: "Phone",
                            value: toLocalBDPhone(phone),
                            inline: true,
                          },
                          { name: "Channel", value: channel, inline: true },
                          {
                            name: "Address",
                            value: address || "-",
                            inline: false,
                          },
                          {
                            name: "Bundle",
                            value: `${selected.label} (qty ${selected.qty})`,
                            inline: true,
                          },
                          {
                            name: "Price",
                            value: `৳${priceBDT.toLocaleString("bn-BD")}`,
                            inline: true,
                          },
                          {
                            name: "OrderId",
                            value: commonOrderId,
                            inline: true,
                          },
                        ],
                        timestamp: new Date().toISOString(),
                      },
                    ],
                  };
                  await fetch(DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(discordEmbed),
                  });
                } catch {}

                setIsPlacingOrder(false);

                // Redirect (no PII in URL)
                window.location.href =
                  `/thank-you?status=pending` +
                  `&oid=${encodeURIComponent(commonOrderId)}` +
                  `&ph=${encodeURIComponent(toLocalBDPhone(phone))}` +
                  `&bundle=${encodeURIComponent(selected.label)}` +
                  `&price=${encodeURIComponent(String(priceBDT))}`;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
