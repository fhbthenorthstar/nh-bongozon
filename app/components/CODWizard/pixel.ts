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
import { baseUrl, contentsForCAPI } from "./event-helpers";
import type { Bundle } from "./types";

/** TikTok AddToCart (matches v1) */
export async function trackTikTokAddToCart(bundle: Bundle) {
  const value = bundle.qty * UNIT_PRICE - bundle.discountBDT;
  const eventID = `tt-atc-${newEventId()}`;
  const contents = contentsForCAPI(bundle.qty);

  ttqTrack(
    "AddToCart",
    {
      contents: contents.map((c) => ({
        content_id: c.id,
        content_type: c.content_type,
        content_name: `${PRODUCT_NAME} — ${bundle.label}`,
        price: c.item_price,
        quantity: c.quantity,
        brand: c.brand,
      })),
      value,
      currency: CURRENCY,
      content_category: TT_PRODUCT_CATEGORY,
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      content_type: "product",
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
      contents,
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
  const contents = contentsForCAPI(bundle.qty);

  await ttqIdentifyOnce({
    phone: customer.phone,
    external_id: normalizePhoneBD(customer.phone || ""),
  });

  ttqTrack(
    "InitiateCheckout",
    {
      contents: contents.map((c) => ({
        content_id: c.id,
        content_type: c.content_type,
        content_name: `${PRODUCT_NAME} — ${bundle.label}`,
        content_category: c.content_category,
        price: c.item_price,
        quantity: c.quantity,
        brand: c.brand,
      })),
      value,
      currency: CURRENCY,
      content_category: TT_PRODUCT_CATEGORY,
      content_type: "product",
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
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
      contents,
      phone: customer.phone,
      name: customer.name,
      address: customer.address,
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
  const contents = contentsForCAPI(bundle.qty);

  await ttqIdentifyOnce({
    phone: customer.phone,
    external_id: normalizePhoneBD(customer.phone || ""),
  });

  ttqTrack(
    "Purchase",
    {
      contents: contents.map((c) => ({
        content_id: c.id,
        content_type: c.content_type,
        content_name: `${PRODUCT_NAME} — ${bundle.label}`,
        content_category: c.content_category,
        price: c.item_price,
        quantity: c.quantity,
        brand: c.brand,
      })),
      value,
      currency: CURRENCY,
      content_category: TT_PRODUCT_CATEGORY,
      content_type: "product",
      content_name: `${PRODUCT_NAME} — ${bundle.label}`,
      order_id: orderId,
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
      contents,
      phone: customer.phone,
      name: customer.name,
      address: customer.address,
      external_id: normalizePhoneBD(customer.phone || ""),
    }),
  }).catch(() => {});

  return { orderId, eventID };
}
