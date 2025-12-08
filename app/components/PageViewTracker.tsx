// app/components/PageViewTracker.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { fbq, newEventId } from "../lib/fbpixel";

export default function PageViewTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const searchKey = search?.toString() ?? ""; // stable primitive for deps
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    const url = `${pathname}${searchKey ? `?${searchKey}` : ""}`;
    if (lastTrackedUrl.current === url) return;

    const fire = () => {
      lastTrackedUrl.current = url;
      const eventID = `pv-${newEventId()}`;

      // Browser
      fbq("track", "PageView", {}, { eventID });

      // Server mirror
      fetch("/api/meta/pageview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event_id: eventID,
          event_source_url: window.location.href,
        }),
        keepalive: true,
      }).catch(() => {});
    };

    // small delay helps ensure fbq is ready after navigation
    const t = setTimeout(fire, 1200);
    return () => clearTimeout(t);
  }, [pathname, searchKey]);

  return null;
}
