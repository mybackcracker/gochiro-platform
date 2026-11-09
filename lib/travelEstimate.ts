import { priceFor } from "./gochiro";

export const TRAVEL_ESTIMATE_POLICY = "2026-11-05-address-v2";
export const TRAVEL_HOURLY_RATE = 100;
export const TRAVEL_ROUNDING = 25;
export const ESTIMATE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export interface TravelEstimate {
  policy: string;
  zip: string;
  destinationAddress: string;
  outboundSeconds: number;
  returnSeconds: number;
  travelFee: number;
  appointmentFee: number;
  total: number;
  issuedAt: number;
}
export interface SignedTravelEstimate { estimate: TravelEstimate; token: string }

export function travelCharge(roundTripSeconds: number): number {
  if (!Number.isFinite(roundTripSeconds) || roundTripSeconds < 0) throw new Error("Invalid driving time");
  return Math.round((roundTripSeconds / 3600 * TRAVEL_HOURLY_RATE) / TRAVEL_ROUNDING) * TRAVEL_ROUNDING;
}
export function normalizedVisitAddress(street: string, city: string, zip: string): string {
  if (typeof street !== "string" || typeof city !== "string" || typeof zip !== "string") throw new Error("Invalid address");
  const clean = (part: string) => part.trim().replace(/\s+/g, " ");
  const a = clean(street), c = clean(city);
  if (a.length < 5 || a.length > 200 || (c.length > 0 && c.length < 2) || c.length > 100 || !/^\d{5}$/.test(zip) || /[\r\n]/.test(a + c)) throw new Error("Invalid address");
  return [a, c, "PA " + zip].filter(Boolean).join(", ");
}

export function makeTravelEstimate(zip: string, outboundSeconds: number, returnSeconds: number, now = Date.now(), destinationAddress = ""): TravelEstimate {
  if (!/^\d{5}$/.test(zip) || [outboundSeconds, returnSeconds].some(s => !Number.isFinite(s) || s <= 0 || s > 7 * 24 * 3600)) throw new Error("Invalid route");
  const travelFee = travelCharge(outboundSeconds + returnSeconds);
  const appointmentFee = priceFor("West", "new-patient");
  if (appointmentFee === null) throw new Error("New-patient pricing unavailable");
  return { policy: TRAVEL_ESTIMATE_POLICY, zip, destinationAddress, outboundSeconds, returnSeconds, travelFee, appointmentFee, total: appointmentFee + travelFee, issuedAt: now };
}
export function qualifiesExtendedAreaRequest(hasVerifiedEstimate: boolean, acknowledgedEstimate: boolean, requestedManualQuote: boolean): boolean {
  return hasVerifiedEstimate ? acknowledgedEstimate : requestedManualQuote;
}
export function estimateSummary(estimate: TravelEstimate): string[] {
  return [
    `Estimate reference: ${estimate.policy} / ${new Date(estimate.issuedAt).toISOString()} / ${estimate.zip}`,
    `Quoted visit address: ${estimate.destinationAddress}`,
    `Estimated driving time: ${Math.round(estimate.outboundSeconds / 60)} minutes outward + ${Math.round(estimate.returnSeconds / 60)} minutes return (Google Maps; address-based, without live traffic)`,
    `New-patient appointment estimate: $${estimate.appointmentFee}`,
    `Travel estimate: $${estimate.travelFee} ($100 per round-trip driving hour, rounded to nearest $25; gas included)`,
    `ESTIMATED TOTAL SHOWN TO REQUESTER: $${estimate.total}`,
    "Additional people at the same location during this visit pay their applicable appointment fees, with no additional travel charge.",
    "Estimate only: confirm exact address, care needs, timing and final price before accepting. Weekend and short-notice pricing may differ.",
  ];
}
