"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { newEventId } from "../lib/eventIds";
import { ttqTrack } from "../lib/tiktok";

export default function TikTokPageView() {
  const pathname = usePathname();
  const search = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const searchKey = search?.toString() ?? "";
    const url = `${pathname}${searchKey ? `?${searchKey}` : ""}`;
    if (!pathname || lastTracked.current === url) return;

    const eventID = `tt-pv-${newEventId()}`;
    lastTracked.current = url;

    // Small delay to reduce race with pixel bootstrap
    const t = setTimeout(() => {
      const href = typeof window !== "undefined" ? window.location.href : url;
      ttqTrack("PageView", {}, eventID);
      fetch("/api/tiktok/pageview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event_id: eventID,
          event_source_url: href,
        }),
        keepalive: true,
      }).catch(() => {});
    }, 600);

    return () => clearTimeout(t);
  }, [pathname, search]);

  return null;
}
