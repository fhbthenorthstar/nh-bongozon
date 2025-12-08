// app/lib/fbpixel.ts
export type FBQMethod = (
  method: "init" | "set" | "track" | "trackCustom",
  nameOrId?: string,
  params?: Record<string, unknown>,
  options?: Record<string, unknown>
) => void;

type FBQLike = FBQMethod & {
  callMethod?: FBQMethod;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: FBQMethod;
};

declare global {
  interface Window {
    fbq?: FBQLike;
    __META_DEBUG__?: unknown[];
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export function fbq(...args: Parameters<FBQMethod>): void {
  if (typeof window === "undefined") return;
  const fn = window.fbq as unknown;
  if (typeof fn === "function") {
    (fn as FBQMethod)(...args);
  }
}

export const newEventId = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export function trackPageView(): string {
  const eventID = `pv-${newEventId()}`;
  fbq("track", "PageView", {}, { eventID });
  if (typeof window !== "undefined") {
    window.__META_DEBUG__ = window.__META_DEBUG__ || [];
    window.__META_DEBUG__!.push({ name: "PageView", eventID, ts: Date.now() });
  }
  return eventID;
}
