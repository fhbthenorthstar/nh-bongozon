// app/api/meta/pageview/route.ts
export const runtime = "nodejs";

import { buildUserData, ok, bad, sendToMeta, pageUrlFrom } from "../_shared";

export async function POST(req: Request) {
  try {
    const { event_id, event_source_url } = await req.json().catch(() => ({}));
    if (!event_id) return bad("event_id required");

    const src = event_source_url || pageUrlFrom(req.headers);
    const user_data = await buildUserData({ event_source_url: src }, req.headers);

    console.log("[CAPI] event_source_url ", event_source_url);

    const resp = await sendToMeta({
      event_name: "PageView",
      event_id,
      event_source_url: src,
      user_data,
    });

    return ok({ ok: true, resp });
  }  catch (e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  return bad(msg, 500);
}
}
