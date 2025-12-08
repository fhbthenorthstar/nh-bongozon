// app/api/meta/viewcontent/route.ts
export const runtime = "nodejs";

import { buildUserData, ok, bad, sendToMeta, pageUrlFrom, sanitizeContents } from "../_shared";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      event_id,
      event_source_url,
      currency = "BDT",
      value,
      content_ids = [],
      contents = [],
      content_name,
      content_category,
    } = body || {};
    if (!event_id) return bad("event_id required");

    const src = event_source_url || pageUrlFrom(req.headers);
    const user_data = await buildUserData({ event_source_url: src }, req.headers);

    console.log("[CAPI] event_source_url ", event_source_url);

    const resp = await sendToMeta({
      event_name: "ViewContent",
      event_id,
      event_source_url: src,
      user_data,
      custom_data: {
        currency,
        value,
        content_type: "product",
        content_ids,
        contents: sanitizeContents(contents), // ✅ only allowed keys
        content_name,
        content_category,
      },
    });

    return ok({ ok: true, resp });
  }  catch (e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  return bad(msg, 500);
}

}
