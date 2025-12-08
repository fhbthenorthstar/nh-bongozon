"use client";

import { useEffect, useRef } from "react";
import { newEventId } from "../lib/eventIds";
import { ttqTrack } from "../lib/tiktok";

const PRODUCT_ID = "night-horse-500g";
const PRODUCT_NAME = "Night Horse";
const PRODUCT_CATEGORY = "Beauty & Personal Care";
const UNIT_PRICE = 1600;
const CURRENCY = "BDT";

export default function ProductViewContentTikTok() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const eventID = `tt-vc-${newEventId()}`;

    // Browser pixel
    ttqTrack(
      "ViewContent",
      {
        contents: [
          {
            content_id: PRODUCT_ID,
            content_type: "product",
            content_name: PRODUCT_NAME,
            price: UNIT_PRICE,
          },
        ],
        value: UNIT_PRICE,
        currency: CURRENCY,
      },
      eventID
    );

    // Server mirror
    fetch("/api/tiktok/viewcontent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event_id: eventID,
        event_source_url: window.location.href,
        // TikTok properties
        contents: [{ id: PRODUCT_ID, item_price: UNIT_PRICE, quantity: 1 }],
        content_type: "product",
        content_name: PRODUCT_NAME,
        content_category: PRODUCT_CATEGORY,
        value: UNIT_PRICE,
        currency: CURRENCY,
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
