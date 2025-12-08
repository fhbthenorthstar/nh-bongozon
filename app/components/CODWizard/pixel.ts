"use client";

import { newEventId } from "@/app/lib/eventIds";
import { ttqTrack, ttqIdentifyOnce, normalizePhoneBD } from "@/app/lib/tiktok";

import {
  CURRENCY,
  PRODUCT_ID,
  PRODUCT_NAME,
  TT_PRODUCT_CATEGORY,
  UNIT_PRICE,
} from "./constants";
import {
  baseUrl,
  contentsForCAPI,
} from "./event-helpers";
import type { Bundle } from "./types";

/** TikTok AddToCart (matches v1) */
export async function trackTikTokAddToCart(bundle: Bundle) {
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

/** TikTok InitiateCheckout (matches v1) */
export async function trackTikTokInitiateCheckout(
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

/** TikTok Purchase */
export async function trackTikTokPurchase(
  bundle: Bundle,
  customer: { name?: string; phone?: string; address?: string },
  forcedOrderId?: string
) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const orderId =
    forcedOrderId ?? `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const eventID = `tt-pur-${newEventId()}`;

  await ttqIdentifyOnce({
    phone: customer.phone,
    external_id: normalizePhoneBD(customer.phone || ""),
  });

  ttqTrack(
    "Purchase",
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

  await fetch("/api/tiktok/purchase", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event_id: eventID,
      event_source_url: baseUrl(),
      value,
      currency: CURRENCY,
      order_id: orderId,
      content_type: "product",
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_category: TT_PRODUCT_CATEGORY,
      contents: contentsForCAPI(bundle.qty),
      phone: customer.phone,
      name: customer.name,
      address: customer.address,
      external_id: normalizePhoneBD(customer.phone || ""),
    }),
  }).catch(() => {});

  return { orderId, eventID };
}
