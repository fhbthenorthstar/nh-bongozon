// app/api/meta/_shared.ts
import crypto from "crypto";
import { cookies } from "next/headers";

/* ─────────── Env ─────────── */
export const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!;
export const ACCESS_TOKEN = process.env.FB_PIXEL_ACCESS_TOKEN!;
export const TEST_EVENT_CODE = process.env.NEXT_PUBLIC_FB_PIXEL_TEST_EVENT_CODE;

if (!PIXEL_ID) throw new Error("Missing env NEXT_PUBLIC_FB_PIXEL_ID");
if (!ACCESS_TOKEN) throw new Error("Missing env FB_PIXEL_ACCESS_TOKEN");

export const META_ENDPOINT =
  `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

/* ─────────── Utils ─────────── */
export const nowEpoch = () => Math.floor(Date.now() / 1000);
export const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

export function normPhoneBD(raw?: string) {
  if (!raw) return "";
  const d = raw.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("880")) return `+${d}`;
  if (d.startsWith("01")) return `+880${d}`;
  if (d.startsWith("1") && d.length === 10) return `+880${d}`;
  if (d.startsWith("+")) return d;
  return `+${d}`;
}
export const normLower = (s?: string) => (s || "").trim().toLowerCase();

export function splitName(n?: string) {
  const parts = normLower(n).split(/\s+/).filter(Boolean);
  if (!parts.length) return { fn: "", ln: "" };
  if (parts.length === 1) return { fn: parts[0], ln: "" };
  return { fn: parts.slice(0, -1).join(" "), ln: parts.at(-1)! };
}

/* ─────────── Types for CAPI ─────────── */
export type HeaderLike = Headers | { get(name: string): string | null };

export interface ContentsItem {
  id: string;
  quantity?: number;
  item_price?: number;
  delivery_category?: "in_store" | "curbside" | "home_delivery" | string;
}

export interface CustomData {
  currency?: string;
  value?: number;
  order_id?: string;
  num_items?: number;
  content_type?: "product" | "product_group" | string;
  content_ids?: string[];
  contents?: ContentsItem[];
  content_name?: string;
  content_category?: string;
  [k: string]: unknown;
}

export interface UserData {
  // not-hashed
  client_user_agent?: string;
  client_ip_address?: string;
  fbp?: string;
  fbc?: string;
  // hashed identifiers
  ph?: string; em?: string;
  fn?: string; ln?: string;
  ct?: string; st?: string; zp?: string;
  country?: string;
  external_id?: string;
  [k: string]: unknown;
}

export interface MetaEventPayload {
  event_name: string;
  event_id: string;
  event_time?: number;
  event_source_url?: string;
  action_source?: "website";
  user_data: UserData;
  custom_data?: CustomData;
}

interface MetaBatchRequest {
  data: Array<{
    event_name: string;
    event_time: number;
    action_source: "website";
    event_source_url: string;
    event_id: string;
    user_data: UserData;
    custom_data: CustomData;
  }>;
  test_event_code?: string;
}

/* ─────────── Helpers ─────────── */
export function firstIp(h: HeaderLike) {
  const xff = h.get("x-forwarded-for");
  return (xff?.split(",")[0] || "").trim();
}
export function pageUrlFrom(h: HeaderLike, fallback?: string) {
  return fallback || h.get("referer") || "";
}

export async function fbpFromCookies() {
  const store = await cookies();
  return store.get("_fbp")?.value;
}
export async function fbcFromCookiesOrUrl(url?: string) {
  const urlObj = url ? new URL(url) : undefined;
  const fbclid = urlObj?.searchParams.get("fbclid");
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  const store = await cookies();
  return store.get("_fbc")?.value;
}

/** Keep only allowed keys in contents[]. */
export function sanitizeContents(contents: unknown[] = []): ContentsItem[] {
  return contents
    .filter((c): c is Record<string, unknown> => typeof c === "object" && c !== null)
    .map((c) => {
      const out: ContentsItem = { id: String(c.id ?? "") };
      if (c.quantity != null) out.quantity = Number(c.quantity);
      if (c.item_price != null) out.item_price = Number(c.item_price);
      if (c.delivery_category != null)
        out.delivery_category = String(c.delivery_category);
      return out;
    });
}

/** Build user_data with highest EMQ (hash everything except IP/UA/FBP/FBC). */
export async function buildUserData(
  input: {
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;      // default "bd" (will be hashed)
    event_source_url?: string;
  },
  h: HeaderLike
): Promise<UserData> {
  const ua = h.get("user-agent") || "";
  const ip = firstIp(h);
  const fbp = await fbpFromCookies();
  const fbc = await fbcFromCookiesOrUrl(input.event_source_url);

  const { fn, ln } = splitName(input.name);
  const ph = normPhoneBD(input.phone);
  const countryRaw = normLower(input.country) || "bd";

  const user_data: UserData = {
    client_user_agent: ua,
    client_ip_address: ip || undefined,
    fbp,
    fbc,
    country: sha256(countryRaw),
  };

  if (ph) {
    user_data.ph = sha256(ph);
    user_data.external_id = sha256(ph);
  }
  if (input.email) user_data.em = sha256(normLower(input.email));
  if (fn) user_data.fn = sha256(fn);
  if (ln) user_data.ln = sha256(ln);
  if (input.city) user_data.ct = sha256(normLower(input.city));
  if (input.state) user_data.st = sha256(normLower(input.state));
  if (input.zip) user_data.zp = sha256(normLower(input.zip));

  return user_data;
}

export async function sendToMeta(event: MetaEventPayload) {
  const body: MetaBatchRequest = {
    data: [
      {
        event_name: event.event_name,
        event_time: event.event_time || nowEpoch(),
        action_source: event.action_source || "website",
        event_source_url: event.event_source_url || "",
        event_id: event.event_id,
        user_data: event.user_data,
        custom_data: event.custom_data || {},
      },
    ],
  };
  if (TEST_EVENT_CODE) body.test_event_code = TEST_EVENT_CODE;

  let res: Response;
  try {
    res = await fetch(META_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (e: unknown) {
    console.error("[CAPI] network error", e);
    throw e;
  }

  const json = (await res.json().catch(() => ({}))) as unknown;
  if (!res.ok) {
    console.error("[CAPI] error response", res.status, res.statusText, json);
    throw new Error(`Meta CAPI error: ${res.status} ${res.statusText}`);
  }
  return json;
}

export function ok<T>(data: T, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...(init || {}),
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
  });
}
export function bad(msg: string, code = 400) {
  return ok({ error: msg }, { status: code });
}
