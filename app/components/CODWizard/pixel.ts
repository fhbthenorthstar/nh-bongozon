"use client";

import { fbq, newEventId, FB_PIXEL_ID } from "@/app/lib/fbpixel";
import { readFBP, readFBC } from "@/lib/fbcookies";
import { fbqInitOnce } from "@/lib/fbpixelInitOnce";
import { ttqTrack, ttqIdentifyOnce, normalizePhoneBD } from "@/app/lib/tiktok";

import {
  CURRENCY,
  PRODUCT_CATEGORY,
  PRODUCT_ID,
  PRODUCT_NAME,
  TT_PRODUCT_CATEGORY,
  UNIT_PRICE,
} from "./constants";
import {
  baseUrl,
  contentsForCAPI,
  contentsForPixel,
  guessCityFromAddress,
  phoneE164BD,
  splitName,
} from "./event-helpers";
import type { Bundle } from "./types";

/** AddToCart (FB + CAPI) */
export async function emitAddToCart(bundle: Bundle) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const eventID = `atc-${newEventId()}`;

  fbq(
    "track",
    "AddToCart",
    {
      currency: CURRENCY,
      value,
      content_type: "product",
      content_ids: [PRODUCT_ID],
      contents: contentsForPixel(bundle.qty),
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: PRODUCT_CATEGORY,
    },
    { eventID }
  );

  await fetch("/api/meta/addtocart", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event_id: eventID,
      event_source_url: baseUrl(),
      currency: CURRENCY,
      value,
      num_items: bundle.qty,
      content_type: "product",
      content_ids: [PRODUCT_ID],
      contents: contentsForCAPI(bundle.qty),
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: PRODUCT_CATEGORY,
      fbp: readFBP(),
      fbc: readFBC(),
    }),
  }).catch(() => {});
}

/** TikTok AddToCart (matches v1) */
export async function ttkAddToCart(bundle: Bundle) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const eventID = `tt-atc-${newEventId()}`;

  ttqTrack(
    "AddToCart",
    {
      contents: [
        {
          content_id: PRODUCT_ID,
          content_type: "product",
          content_name: `${PRODUCT_NAME} — ${bundle.label}`,
          price: UNIT_PRICE,
          num_items: bundle.qty,
          brand: "Night Horse",
        },
      ],
      value,
      currency: CURRENCY,
      content_category: TT_PRODUCT_CATEGORY,
    },
    eventID
  );

  await fetch("/api/tiktok/addtocart", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event_id: eventID,
      event_source_url: baseUrl(),
      value,
      currency: CURRENCY,
      content_type: "product",
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      // IMPORTANT: same category as v1 for AddToCart
      content_category: TT_PRODUCT_CATEGORY,
      contents: [
        {
          id: PRODUCT_ID,
          item_price: UNIT_PRICE,
          quantity: bundle.qty,
          brand: "Night Horse",
        },
      ],
    }),
    keepalive: true,
  })
    .then((r) => r.json())
    .then(console.log)
    .catch(() => {});
}

/** InitiateCheckout (FB + CAPI) */
export async function emitInitiateCheckout(
  bundle: Bundle,
  customer: { name?: string; phone?: string; address?: string }
) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const eventID = `ic-${newEventId()}`;

  try {
    if (FB_PIXEL_ID) {
      const { fn, ln } = splitName(customer.name);
      const ph = phoneE164BD(customer.phone);
      const ct = guessCityFromAddress(customer.address);
      fbqInitOnce(FB_PIXEL_ID, {
        ph,
        fn,
        ln,
        ct,
        country: "bd",
        external_id: ph || undefined,
      });
    }
  } catch {}

  fbq(
    "track",
    "InitiateCheckout",
    {
      currency: CURRENCY,
      value,
      num_items: bundle.qty,
      content_type: "product",
      content_ids: [PRODUCT_ID],
      contents: contentsForPixel(bundle.qty),
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: PRODUCT_CATEGORY,
    },
    { eventID }
  );

  await fetch("/api/meta/initiatecheckout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event_id: eventID,
      event_source_url: baseUrl(),
      currency: CURRENCY,
      value,
      num_items: bundle.qty,
      content_type: "product",
      content_ids: [PRODUCT_ID],
      contents: contentsForCAPI(bundle.qty),
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: PRODUCT_CATEGORY,
      name: customer.name,
      phone: customer.phone,
      city: guessCityFromAddress(customer.address),
      country: "bd",
      fbp: readFBP(),
      fbc: readFBC(),
    }),
  }).catch(() => {});
}

/** TikTok InitiateCheckout (matches v1) */
export async function ttkInitiateCheckout(
  bundle: Bundle,
  customer: { name?: string; phone?: string; address?: string }
) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const eventID = `tt-ic-${newEventId()}`;

  await ttqIdentifyOnce({
    phone: customer.phone,
    external_id: normalizePhoneBD(customer.phone || ""),
  });

  ttqTrack(
    "InitiateCheckout",
    {
      contents: [
        {
          content_id: PRODUCT_ID,
          content_type: "product",
          content_name: `${PRODUCT_NAME} — ${bundle.label}`,
          content_category: TT_PRODUCT_CATEGORY,
          price: UNIT_PRICE,
          num_items: bundle.qty,
          brand: "Night Horse",
        },
      ],
      value,
      currency: CURRENCY,
    },
    eventID
  );

  await fetch("/api/tiktok/initiatecheckout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event_id: eventID,
      event_source_url: baseUrl(),
      value,
      currency: CURRENCY,
      content_type: "product",
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      // IMPORTANT: same category as v1 for InitiateCheckout
      content_category: TT_PRODUCT_CATEGORY,
      contents: [
        {
          id: PRODUCT_ID,
          item_price: UNIT_PRICE,
          quantity: bundle.qty,
          brand: "Night Horse",
        },
      ],
      phone: customer.phone,
      external_id: normalizePhoneBD(customer.phone || ""),
    }),
  })
    .then((r) => r.json())
    .then(console.log)
    .catch(() => {});
}

/** Purchase (FB + CAPI) — TT handled inline in index.tsx */
export async function emitPurchase(
  bundle: Bundle,
  customer: { name?: string; phone?: string; address?: string },
  forcedOrderId?: string
) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const orderId =
    forcedOrderId ?? `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const eventID = `pur-${newEventId()}`;

  fbq(
    "track",
    "Purchase",
    {
      currency: CURRENCY,
      value,
      num_items: bundle.qty,
      content_type: "product",
      content_ids: [PRODUCT_ID],
      contents: contentsForPixel(bundle.qty),
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: PRODUCT_CATEGORY,
      order_id: orderId,
    },
    { eventID }
  );

  await fetch("/api/meta/purchase", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event_id: eventID,
      event_source_url: baseUrl(),
      currency: CURRENCY,
      value,
      order_id: orderId,
      num_items: bundle.qty,
      content_type: "product",
      content_ids: [PRODUCT_ID],
      contents: contentsForCAPI(bundle.qty),
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: PRODUCT_CATEGORY,
      name: customer.name,
      phone: customer.phone,
      city: guessCityFromAddress(customer.address),
      country: "bd",
      fbp: readFBP(),
      fbc: readFBC(),
    }),
  }).catch(() => {});

  return { orderId, eventID };
}
