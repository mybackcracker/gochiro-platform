import { NextRequest, NextResponse } from "next/server";
import { calculateTravelEstimate, TravelEstimateError } from "@/lib/travelEstimateServer";
import { zipRoute } from "@/lib/zipRouting";

export const runtime = "nodejs";
// Per-instance burst guard; configure a provider quota and Vercel firewall limits as the durable cost ceiling.
const recent = new Map<string, { count: number; until: number }>();
export async function POST(req: NextRequest) {
  const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) return json({ error: "Invalid request origin." }, 403);
  let zip: unknown, street: unknown, city: unknown;
  try {
    const body = await req.text();
    if (body.length > 600) return json({ error: "Invalid address." }, 400);
    const data = JSON.parse(body);
    zip = data.zip; street = data.street; city = data.city ?? "";
  } catch { return json({ error: "Invalid ZIP request." }, 400); }
  if (typeof zip !== "string" || zipRoute(zip) !== "request" || typeof street !== "string" || typeof city !== "string" || street.trim().length < 5 || (city.trim().length > 0 && city.trim().length < 2) || street.length > 200 || city.length > 100) return json({ error: "Please enter a complete Pennsylvania street address." }, 400);
  const now = Date.now();
  for (const [key, value] of recent) if (value.until < now) recent.delete(key);
  const key = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = recent.get(key) || { count: 0, until: now + 60_000 };
  if (limit.count >= 10 || recent.size > 5000) return json({ error: "Please wait a minute before checking again, or request a personal quote." }, 429);
  limit.count++; recent.set(key, limit);
  try { return json(await calculateTravelEstimate(zip, street, city)); }
  catch (error) {
    const code = error instanceof TravelEstimateError ? error.code : "ROUTING_UNAVAILABLE";
    console.warn("Travel estimate unavailable", { code });
    return json({ error: "An automatic estimate is unavailable. You can still request a personal quote before booking.", reference: code }, 503);
  }
}
