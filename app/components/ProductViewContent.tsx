"use client";

import { useEffect, useRef } from "react";
import { fbq, newEventId } from "../lib/fbpixel";

const PRODUCT_ID = "night-horse-500g";
const PRODUCT_NAME = "Night Horse";
const PRODUCT_CATEGORY = "Herbal Food Supplements"
const UNIT_PRICE = 1600; // BDT

export default function ProductViewContent() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const eventID = `vc-${newEventId()}`;

    // Pixel (can include rich fields)
    fbq(
      "track",
      "ViewContent",
      {
        currency: "BDT",
        value: UNIT_PRICE,
        content_type: "product",
        content_ids: [PRODUCT_ID],
        content_name: PRODUCT_NAME,
        content_category: PRODUCT_CATEGORY,
      },
      { eventID }
    );

    // CAPI mirror (contents[] must ONLY have allowed keys)
    fetch("/api/meta/viewcontent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event_id: eventID,
        event_source_url: window.location.href,
        currency: "BDT",
        value: UNIT_PRICE,
        content_type: "product",
        content_ids: [PRODUCT_ID],
        content_name: PRODUCT_NAME,
        content_category: PRODUCT_CATEGORY,
        contents: [
          {
            id: PRODUCT_ID,
            quantity: 1,
            item_price: UNIT_PRICE,
            // delivery_category: "home_delivery", // optional, allowed
          },
        ],
      }),
    }).catch(() => {});
  }, []);

  return null;
}
