import { NextRequest } from "next/server";
import { sendTikTokEvent } from "../_shared";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  return sendTikTokEvent(req, "InitiateCheckout", body);
}
