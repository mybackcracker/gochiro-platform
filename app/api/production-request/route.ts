import { NextRequest, NextResponse } from "next/server";
import { sendProductionRequestEmails, type ProductionRequestInput } from "@/lib/productionRequestEmail";

const ROLES = ["Tour Manager", "Production Manager", "Artist Management", "Venue", "Promoter", "Artist / Performer", "Other"];
const CONTACTS = ["Text", "Email", "Phone call", "No preference"];
const COVERAGE_TYPES = ["Care for one person", "On-site care available to multiple people", "Not sure — help me determine the best arrangement"];
const PEOPLE = ["1–4", "5–8", "9–12", "13+", "Not sure"];
const SERVICES = ["Massage therapy", "Possibly — tell me what’s available", "No"];
const AUDIENCES = ["Artists / Musicians", "Dancers / Performers", "Cast", "Touring Crew", "Production Staff", "Other"];

function clean(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string): boolean {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots often fill hidden website fields. Return success so they
  // have no useful signal while avoiding spam email delivery.
  if (clean(raw.website)) return NextResponse.json({ success: true });

  const input: ProductionRequestInput = {
    name: clean(raw.name, 100),
    role: clean(raw.role, 60),
    preferredContact: clean(raw.preferredContact, 40),
    mobile: clean(raw.mobile, 40),
    email: clean(raw.email, 160),
    productionName: clean(raw.productionName, 160),
    productionDate: clean(raw.productionDate, 20),
    multipleDates: raw.multipleDates === true,
    additionalDates: clean(raw.additionalDates, 200),
    venue: clean(raw.venue, 160),
    city: clean(raw.city, 100),
    venueNotConfirmed: raw.venueNotConfirmed === true,
    coverageType: clean(raw.coverageType, 100),
    approximatePeople: clean(raw.approximatePeople, 30),
    audiences: Array.isArray(raw.audiences) ? raw.audiences.map((item) => clean(item, 60)).filter((item) => AUDIENCES.includes(item)).slice(0, AUDIENCES.length) : [],
    coverageTimeKnown: raw.coverageTimeKnown === true,
    coverageTime: clean(raw.coverageTime, 100),
    additionalServices: clean(raw.additionalServices, 80),
    notes: clean(raw.notes, 1500),
  };

  if (!input.name || !ROLES.includes(input.role) || !CONTACTS.includes(input.preferredContact) || !input.productionDate || !input.city || !COVERAGE_TYPES.includes(input.coverageType) || !PEOPLE.includes(input.approximatePeople) || !SERVICES.includes(input.additionalServices)) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }
  if (!input.venueNotConfirmed && !input.venue) return NextResponse.json({ error: "Please enter the venue or mark it as not confirmed." }, { status: 400 });
  if (input.multipleDates && !input.additionalDates) return NextResponse.json({ error: "Please enter the additional dates or date range." }, { status: 400 });
  if (input.coverageTimeKnown && !input.coverageTime) return NextResponse.json({ error: "Please enter the approximate coverage time." }, { status: 400 });
  if (!validEmail(input.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (input.preferredContact === "Email" && !input.email) return NextResponse.json({ error: "Please enter an email address." }, { status: 400 });
  if (["Text", "Phone call"].includes(input.preferredContact) && !input.mobile) return NextResponse.json({ error: "Please enter a mobile number." }, { status: 400 });
  if (input.preferredContact === "No preference" && !input.mobile && !input.email) return NextResponse.json({ error: "Please enter a mobile number or email address." }, { status: 400 });

  try {
    await sendProductionRequestEmails(input);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Production request email delivery failed.", error);
    return NextResponse.json({ error: "Unable to send your request right now. Please call or text GoChiroMobile." }, { status: 500 });
  }
}
