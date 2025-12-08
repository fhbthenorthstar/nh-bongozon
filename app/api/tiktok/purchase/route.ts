import { NextRequest } from "next/server";
import { sendTikTokEvent } from "../_shared";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  // NOTE: Your Events Manager shows “Purchase”. If you see no data, switch this event to "CompletePayment" in _shared caller.
  return sendTikTokEvent(req, "Purchase", body);
}
