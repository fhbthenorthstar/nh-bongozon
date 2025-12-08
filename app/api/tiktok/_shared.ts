// api/tiktok/_shared.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = "nodejs"; // ensure Node runtime (crypto)

// Env
const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN ?? "";
const PIXEL_ID =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ??
  process.env.TIKTOK_PIXEL_ID ??
  "";
const TEST_EVENT_CODE = (process.env.TIKTOK_TEST_EVENT_CODE ?? "").trim(); // ← optional

// v1.3 Events API
const TIKTOK_ENDPOINT =
  "https://business-api.tiktok.com/open_api/v1.3/event/track/";

/** =========================
 *  Types
 *  ========================= */
type TikTokEventName =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase";

interface MinimalCookie {
  name: string;
  value: string;
}
interface CookieStoreLike {
  get: (name: string) => MinimalCookie | undefined;
}

interface ContentItemIn {
  id?: string;
  content_id?: string;
  content_type?: string;
  content_name?: string;
  price?: number;
  item_price?: number;
  quantity?: number;
  num_items?: number;
  brand?: string;
}

export interface TikTokServerEventInput {
  event_id?: string;
  event_source_url?: string;
  email?: string;
  phone?: string;
  // --- START MODIFICATION ---
  name?: string; 
  address?: string;
  // --- END MODIFICATION ---
  external_id?: string;
  test_event_code?: string;

  value?: number;
  currency?: string;
  num_items?: number;
  order_id?: string;

  content_type?: string;
  content_name?: string;
  content_category?: string;
  contents?: ContentItemIn[];

  [k: string]: unknown;
}

/** =========================
 *  Helpers
 *  ========================= */
function sha256Lower(s?: string): string | undefined {
  if (!s) return undefined;
  return crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex");
}

export function normalizePhoneBD(raw?: string): string {
  if (!raw) return "";
  const d = raw.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("880")) return `+${d}`;
  if (d.startsWith("01")) return `+880${d}`;
  if (d.startsWith("1") && d.length === 10) return `+880${d}`;
  if (d.startsWith("88")) return `+${d}`;
  return raw.startsWith("+") ? raw : `+${raw}`;
}

// --- START MODIFICATION ---
// Helper functions to parse name and address, added for EMQ improvement
function splitName(full?: string) {
  if (!full) return { fn: undefined, ln: undefined };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 0) return { fn: undefined, ln: undefined };
  if (parts.length === 1) return { fn: parts[0], ln: undefined };
  return { fn: parts[0], ln: parts.slice(1).join(" ") };
}

function parseAddressBD(addr?: string) {
    if (!addr) return { st: undefined, ct: undefined, stt: undefined, zp: undefined };
    const a = addr.trim();
    const postal = (a.match(/\b(\d{4,5})\b/) || [])[1];
    const chunks = a.replace(postal || "", "").split(",").map(s => s.trim()).filter(Boolean);
    const street = chunks[0] || a;
    const city = chunks[1];
    const region = chunks[2];
    return { st: street, ct: city, stt: region, zp: postal };
}
// --- END MODIFICATION ---

// compat: Next >=14.3 may return a Promise; older versions were sync
async function getCookieStore(): Promise<CookieStoreLike | undefined> {
  const c = cookies() as unknown;
  const maybeThen = (c as { then?: unknown })?.then;
  if (typeof maybeThen === "function") {
    const awaited = c as Promise<unknown>;
    return (await awaited) as CookieStoreLike;
  }
  return c as CookieStoreLike;
}

/** =========================
 *  Sender (Events API v1.3)
 *  ========================= */
export async function sendTikTokEvent(
  req: NextRequest,
  event: TikTokEventName,
  body: TikTokServerEventInput
) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    return NextResponse.json(
      { ok: false, error: "Missing TikTok credentials" },
      { status: 500 }
    );
  }

  const {
    event_id,
    event_source_url,
    email,
    phone,
    // --- START MODIFICATION ---
    name,       // Destructure the new fields from the body
    address,
    // --- END MODIFICATION ---
    external_id,
    test_event_code, // body-supplied (env takes precedence)
    ...props
  } = body ?? {};

  // Require event_id so browser + server can de-duplicate reliably
  if (!event_id) {
    return NextResponse.json(
      { ok: false, error: "event_id required" },
      { status: 400 }
    );
  }

  const url = new URL(req.url);
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    undefined;
  const ua = req.headers.get("user-agent") || "";

  // await cookies store (handles both sync and async returns)
  const jar = await getCookieStore();
  const ttp = jar?.get("_ttp")?.value;
  // Your TikTokClickIdSetter component sets this cookie
  const ttclid = jar?.get("ttclid")?.value || url.searchParams.get("ttclid") || undefined;

  // Map contents[] (id,item_price,quantity,brand) → TikTok shape
  const contents = Array.isArray(props.contents)
    ? (props.contents as ContentItemIn[]).map((c) => ({
        content_id: c.id || c.content_id,
        content_type: (props.content_type as string) || c.content_type || "product",
        content_name: (props.content_name as string) || c.content_name,
        price: c.item_price ?? c.price,
        quantity: c.quantity ?? c.num_items ?? 1,
        brand: c.brand,
      }))
    : undefined;

  const properties: Record<string, unknown> = {
    ...props,
    ...(contents ? { contents } : {}),
  };
  
  // --- START MODIFICATION ---
  // Parse the name and address if they exist
  const { fn, ln } = splitName(name as string | undefined);
  const { st, ct, stt, zp } = parseAddressBD(address as string | undefined);
  // --- END MODIFICATION ---

  // v1.3 requires event_time as integer (epoch seconds)
  const item = {
    event,
    event_id,
    event_time: Math.floor(Date.now() / 1000),
    url: event_source_url || url.toString(),
    user: {
      email: email ? sha256Lower(email) : undefined,
      phone: phone ? sha256Lower(normalizePhoneBD(phone)) : undefined,
      // --- START MODIFICATION ---
      // Add the new hashed user data fields
      first_name: fn ? sha256Lower(fn) : undefined,
      last_name: ln ? sha256Lower(ln) : undefined,
      street: st ? sha256Lower(st) : undefined,
      city: ct ? sha256Lower(ct) : undefined,
      state: stt ? sha256Lower(stt) : undefined,
      zip: zp, // Zip codes are not hashed
      country: "BD", // Country codes are not hashed
      // --- END MODIFICATION ---
      external_id: external_id ? sha256Lower(external_id) : undefined,
      ttclid,
      ttp,
      ip,
      user_agent: ua,
    },
    properties,
  };

  // Prefer env test code; fall back to body; omit entirely if empty → real events
  const effectiveTestCode = (TEST_EVENT_CODE || test_event_code || "").trim();

  const payload = {
    event_source: "web",
    event_source_id: PIXEL_ID,
    data: [item],
    ...(effectiveTestCode ? { test_event_code: effectiveTestCode } : {}),
  };

  try {
    const res = await fetch(TIKTOK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": ACCESS_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const ok =
      res.ok &&
      (((data?.data as { status?: string } | undefined)?.status === "success") ||
        (data?.message as string | undefined) === "OK");

    return NextResponse.json(
      { ok, status: res.status, data },
      { status: ok ? 200 : 502 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
