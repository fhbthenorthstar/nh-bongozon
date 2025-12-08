// app/api/pathao/score/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Hermes base (works for token + user/success)
const BASE = "https://api-hermes.pathao.com";

// ⚠️ Inline creds for quick testing. Move to env + rotate after.
const CREDS = {
  client_id: "MYermjEdOB",
  client_secret: "SzUudvLfRbBFX8vy9gysC7neJqqf73P42xy8xYuV",
  grant_type: "password",
  username: "support@nighthorse.shop",
  password: "$$$Night1111Horse$$$",
};

type TokenResp = {
  token_type?: string;
  access_token?: string;
  expires_in?: number;
};

type SuccessResp = {
  data?: {
    customer_rating?: string | null;
  } | null;
};

function extractPhone(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null;
  const p = (body as { phone?: unknown }).phone;
  return typeof p === "string" ? p : null;
}

function extractAccessToken(json: unknown): string | undefined {
  if (typeof json !== "object" || json === null) return undefined;
  const at = (json as TokenResp).access_token;
  return typeof at === "string" && at.length > 0 ? at : undefined;
}

function extractRating(json: unknown): string | null {
  if (typeof json !== "object" || json === null) return null;
  const d = (json as SuccessResp).data;
  if (typeof d !== "object" || d === null) return null;
  const r = d.customer_rating;
  return typeof r === "string" ? r : null;
}

export async function POST(req: NextRequest) {
  try {
    const bodyUnknown = (await req.json().catch(() => null)) as unknown;
    const phone = extractPhone(bodyUnknown);

    if (!phone) {
      return NextResponse.json({ error: "Expected { phone: string }" }, { status: 400 });
    }

    // 1) issue token (Aladdin)
    const tokenRes = await fetch(`${BASE}/aladdin/api/v1/issue-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(CREDS),
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      return NextResponse.json(
        { error: "Failed to obtain access token", status: tokenRes.status },
        { status: 502 }
      );
    }

    const tokenJson = (await tokenRes.json().catch(() => null)) as unknown;
    const accessToken = extractAccessToken(tokenJson);

    if (!accessToken) {
      return NextResponse.json({ error: "No access_token in response" }, { status: 502 });
    }

    // 2) reputation lookup (rating only)
    const repRes = await fetch(`${BASE}/aladdin/api/v1/user/success`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ phone }),
      cache: "no-store",
    });

    if (!repRes.ok) {
      const text = await repRes.text().catch(() => "");
      return NextResponse.json(
        {
          error: "Pathao user/success error",
          status: repRes.status,
          details: text.slice(0, 300),
        },
        { status: 502 }
      );
    }

    const repJson = (await repRes.json().catch(() => null)) as unknown;
    const rating = extractRating(repJson);

    return NextResponse.json({ ok: true, rating });
  } catch (err) {
    const details = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unexpected server error", details },
      { status: 500 }
    );
  }
}
