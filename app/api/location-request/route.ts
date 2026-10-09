import { NextRequest, NextResponse } from "next/server";
import { parseLocationRequest, LOCATION_POLICY_VERSION } from "@/lib/locationRequest";
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
  if (!input) return NextResponse.json({error:"Please complete the required fields, use a Pennsylvania address and acknowledge the quote and deposit terms."},{status:400});
  const text = ["NEW LOCATION CHECK — NOT A BOOKING", `Name: ${input.name}`, `Reply by ${input.contactMethod}: ${input.contact}`, `Address: ${input.address}, ${input.city}, ${input.state} ${input.zip}`, `Parking / access: ${input.access}`, `Timing: ${input.timing}`, `Quote and deposit acknowledgment: accepted (policy ${LOCATION_POLICY_VERSION})`, `Submitted: ${new Date().toISOString()}`, "Review location first, then agree on care, price and scheduling. No appointment or payment has been created."].join("\n");
  try {
    await sendEmail({to:BOOKING_NOTIFICATION_EMAIL,fromName:BUSINESS_NAME,fromAddress:PUBLIC_CONTACT_EMAIL,subject:"New location-check request",text,html:`<pre>${text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>`});
    return NextResponse.json({success:true});
  } catch {
    console.error("Location-check notification failed.");
    return NextResponse.json({error:"We could not send your request. Please call or text 610-494-0412."},{status:503});
  }
}
