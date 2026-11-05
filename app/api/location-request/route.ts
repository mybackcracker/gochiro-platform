import { verifyEstimate } from "@/lib/travelEstimateServer";
import { estimateSummary, qualifiesExtendedAreaRequest, normalizedVisitAddress } from "@/lib/travelEstimate";
import { zipRoute } from "@/lib/zipRouting";
import { NextRequest, NextResponse } from "next/server";
import { parseLocationRequest, LOCATION_POLICY_VERSION, locationMapsUrl } from "@/lib/locationRequest";
import { sendEmail } from "@/lib/gmail";
import { BOOKING_NOTIFICATION_EMAIL, BUSINESS_NAME, PUBLIC_CONTACT_EMAIL } from "@/lib/gochiro";
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) return NextResponse.json({error:"Invalid request origin."},{status:403});
  let raw: unknown;
  try {
    const body = await req.text();
    if (body.length > 6000) return NextResponse.json({error:"Request too large."},{status:413});
    raw = JSON.parse(body);
  } catch { return NextResponse.json({error:"Invalid request."},{status:400}); }
  if (raw && typeof raw === "object" && "website" in raw && raw.website) return NextResponse.json({success:true});
  const input = parseLocationRequest(raw);
  if (!input) return NextResponse.json({error:"Please check the address and required fields, and acknowledge the quote and deposit terms. For a location this form cannot accept, call or text (610) 494-0412."},{status:400});
  if (zipRoute(input.zip) !== "request") return NextResponse.json({error:"This ZIP belongs in the regular booking area or cannot be estimated."},{status:400});
  let destination: string;
  try { destination = normalizedVisitAddress(input.address, input.city, input.zip); }
  catch { return NextResponse.json({error:"Please check the full visit address."},{status:400}); }
  const token = raw && typeof raw === "object" && "estimateToken" in raw ? raw.estimateToken : undefined;
  const estimate = token ? verifyEstimate(token, input.zip, Date.now(), destination) : null;
  if (token && !estimate) return NextResponse.json({error:"Your estimate has expired or no longer matches this ZIP. Refresh the page to update it before sending."},{status:400});
  const submitted = raw as Record<string, unknown>;
  const acknowledgedEstimate = submitted.estimateAcknowledged === "true";
  const requestedManualQuote = submitted.manualQuoteRequested === "true";
  if (!qualifiesExtendedAreaRequest(Boolean(estimate), acknowledgedEstimate, requestedManualQuote)) return NextResponse.json({error:"Please acknowledge the estimated total or request a personal quote before sending."},{status:400});
  const mapsUrl = locationMapsUrl(input);
  const text = ["NEW LOCATION CHECK — NOT A BOOKING", `Name: ${input.name}`, `Reply by ${input.contactMethod}: ${input.contact}`, `Address: ${input.address}, ${input.city}, ${input.state} ${input.zip}`, `Google Maps: ${mapsUrl}`, `Private / reserved parking: ${input.privateParking}`, `Stairs: ${input.stairs}`, `Elevator: ${input.elevator}`, `Timing: ${input.timing}`, ...(estimate ? [...estimateSummary(estimate), "Estimated care-and-travel total acknowledged: yes; requester interested at approximately this cost."] : ["Automatic estimate unavailable; requester explicitly asked for a personal quote before deciding whether to book."]), `Quote and deposit acknowledgment: accepted (policy ${LOCATION_POLICY_VERSION})`, `Submitted: ${new Date().toISOString()}`, "Review location first, then agree on care, price and scheduling. No appointment or payment has been created."].join("\n");
  try {
    await sendEmail({to:BOOKING_NOTIFICATION_EMAIL,fromName:BUSINESS_NAME,fromAddress:PUBLIC_CONTACT_EMAIL,subject:"New location-check request",text,html:`<p><a href="${mapsUrl}">Open visit location in Google Maps</a></p><pre>${text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>`});
    return NextResponse.json({success:true, estimate: estimate ? { total: estimate.total } : null});
  } catch {
    console.error("Location-check notification failed.");
    return NextResponse.json({error:"We could not send your request. Please call or text 610-494-0412."},{status:503});
  }
}
