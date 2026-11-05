import "next/dist/compiled/server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { zipRoute } from "./zipRouting";
import { ESTIMATE_MAX_AGE_MS, makeTravelEstimate, TRAVEL_ESTIMATE_POLICY, type TravelEstimate, type SignedTravelEstimate } from "./travelEstimate";

export class TravelEstimateError extends Error {
  constructor(public readonly code: string) { super(code); this.name = "TravelEstimateError"; }
}
const SAFE_PROVIDER_REASONS = new Set(["API_KEY_INVALID", "API_KEY_SERVICE_BLOCKED", "SERVICE_DISABLED", "BILLING_DISABLED", "BILLING_NOT_ACTIVE", "API_KEY_HTTP_REFERRER_BLOCKED", "API_KEY_IP_ADDRESS_BLOCKED", "RATE_LIMIT_EXCEEDED", "QUOTA_EXCEEDED", "API_KEY_EXPIRED", "CONSUMER_INVALID"]);
const ENDPOINT = "https://routes.googleapis.com/directions/v2:computeRoutes";
function secret(): string {
  const key = process.env.GOOGLE_ROUTES_API_KEY;
  if (!key) throw new TravelEstimateError("MISSING_API_KEY");
  return key;
}
function signature(payload: string): string {
  return createHmac("sha256", secret()).update(`gochiro-travel-estimate-v1:${payload}`).digest("base64url");
}
export function signEstimate(estimate: TravelEstimate): SignedTravelEstimate {
  const payload = Buffer.from(JSON.stringify(estimate)).toString("base64url");
  return { estimate, token: `${payload}.${signature(payload)}` };
}
export function verifyEstimate(token: unknown, zip: string, now = Date.now()): TravelEstimate | null {
  if (typeof token !== "string" || token.length > 2000 || !process.env.GOOGLE_ROUTES_API_KEY) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payload, signed] = parts;
    const supplied = Buffer.from(signed, "base64url");
    const expected = Buffer.from(signature(payload), "base64url");
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
    const e = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as TravelEstimate;
    if (e.zip !== zip || e.policy !== TRAVEL_ESTIMATE_POLICY || !Number.isFinite(e.issuedAt) || e.issuedAt > now + 60_000 || now - e.issuedAt > ESTIMATE_MAX_AGE_MS) return null;
    const calculated = makeTravelEstimate(zip, e.outboundSeconds, e.returnSeconds, e.issuedAt);
    if (e.travelFee !== calculated.travelFee || e.appointmentFee !== calculated.appointmentFee || e.total !== calculated.total) return null;
    return e;
  } catch { return null; }
}
async function drivingSeconds(origin: string, destination: string, fetcher: typeof fetch): Promise<number> {
  const response = await fetcher(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Goog-Api-Key": secret(), "X-Goog-FieldMask": "routes.duration" },
    body: JSON.stringify({ origin: { address: origin }, destination: { address: destination }, travelMode: "DRIVE", routingPreference: "TRAFFIC_UNAWARE", regionCode: "US", computeAlternativeRoutes: false }),
    signal: AbortSignal.timeout(8000), cache: "no-store",
  });
  // Provider bodies may contain operational details. Never log or return them to a visitor.
  if (!response.ok) {
    let code = `GOOGLE_HTTP_${response.status}`;
    try {
      const body = await response.json();
      const details: unknown = body?.error?.details;
      if (Array.isArray(details)) {
        const reason = details.map(d => d?.reason).find(r => typeof r === "string" && SAFE_PROVIDER_REASONS.has(r));
        if (reason) code = reason;
      }
    } catch { /* Ignore provider text: it must not appear in logs or responses. */ }
    throw new TravelEstimateError(code);
  }
  const result = await response.json();
  const duration: unknown = result.routes?.[0]?.duration;
  if (typeof duration !== "string" || !/^\d+(\.\d+)?s$/.test(duration)) throw new TravelEstimateError("NO_ROUTE");
  const seconds = Number(duration.slice(0, -1));
  if (!Number.isFinite(seconds) || seconds <= 0) throw new TravelEstimateError("NO_ROUTE");
  return seconds;
}
export async function calculateTravelEstimate(zip: string, fetcher: typeof fetch = fetch): Promise<SignedTravelEstimate> {
  if (zipRoute(zip) !== "request") throw new Error("ZIP does not require an extended-area estimate");
  const origin = process.env.GOOGLE_ROUTES_ORIGIN;
  if (!origin) throw new TravelEstimateError("MISSING_ORIGIN");
  const destination = `${zip}, Pennsylvania, USA`;
  const [outbound, returning] = await Promise.all([drivingSeconds(origin, destination, fetcher), drivingSeconds(destination, origin, fetcher)]);
  return signEstimate(makeTravelEstimate(zip, outbound, returning));
}
