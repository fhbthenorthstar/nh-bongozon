// app/lib/tiktok.ts
export const TTK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";

type TrackParams = Record<string, unknown>;

interface TTQ {
  track: (event: string, params?: TrackParams) => void;
  identify: (params: Record<string, string>) => void;
}

declare global {
  interface Window {
    ttq?: TTQ;
    __ttk_identified?: boolean;
  }
}

/** Queue-safe track with optional event_id */
export function ttqTrack(
  event: string,
  params: TrackParams = {},
  eventID?: string
): void {
  if (typeof window === "undefined") return;
  const ttq = window.ttq;
  if (!ttq || !TTK_PIXEL_ID) return;
  const payload = eventID ? { event_id: eventID, ...params } : params;
  try {
    ttq.track(event, payload);
  } catch {
    // ignore
  }
}

/** SHA-256 (lowercased) using Web Crypto */
export async function sha256HexLower(input?: string): Promise<string> {
  const s = (input ?? "").trim().toLowerCase();
  if (!s) return "";
  const enc = new TextEncoder().encode(s);
  const buf = (await globalThis.crypto.subtle.digest("SHA-256", enc)) as ArrayBuffer;
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Normalize Bangladeshi phone to +880XXXXXXXXXX */
export function normalizePhoneBD(raw?: string): string {
  const d = (raw ?? "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("880")) return `+${d}`;
  if (d.startsWith("01")) return `+880${d}`;
  if (d.startsWith("1") && d.length === 10) return `+880${d}`;
  if (d.startsWith("88")) return `+${d}`;
  return raw?.startsWith("+") ? (raw as string) : `+${raw}`;
}

/** Call once when you have PII (before IC/Purchase) */
export async function ttqIdentifyOnce(opts: {
  email?: string;
  phone?: string;
  external_id?: string;
}): Promise<void> {
  if (typeof window === "undefined") return;
  const ttq = window.ttq;
  if (!ttq || window.__ttk_identified) return;

  const payload: Record<string, string> = {};

  if (opts.email) {
    payload.email = await sha256HexLower(opts.email);
  }
  if (opts.phone) {
    payload.phone_number = await sha256HexLower(normalizePhoneBD(opts.phone));
  }
  if (opts.external_id) {
    payload.external_id = await sha256HexLower(opts.external_id);
  }

  if (Object.keys(payload).length > 0) {
    try {
      ttq.identify(payload);
      window.__ttk_identified = true;
    } catch {
      // ignore
    }
  }
}
