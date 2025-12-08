import { NextResponse } from "next/server";

const GS_WEBHOOK_URL = process.env.GS_WEBHOOK_URL ?? "";

export async function POST(req: Request) {
  if (!GS_WEBHOOK_URL) {
    return NextResponse.json(
      { ok: false, error: "GS_WEBHOOK_URL missing" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const r = await fetch(GS_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await r.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    if (!r.ok) {
      return NextResponse.json(
        { ok: false, status: r.status, data: parsed },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed ?? { ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
