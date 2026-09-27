import { NextResponse } from "next/server";
import { isValidGroupVisitComposition, type GroupVisitComposition, type Region } from "@/lib/gochiro";
import { createGroupCheckoutLink } from "@/lib/squareCheckout";

const REGIONS: Region[] = ["East", "West", "Central", "MainLine", "WestChester"];

type RequestBody = {
  region?: Region;
  dateISO?: string;
  newCount?: number;
  existingCount?: number;
  buyerEmail?: string;
};

function isRegion(value: unknown): value is Region {
  return typeof value === "string" && REGIONS.includes(value as Region);
}

function isDateISO(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function POST(request: Request) {
  // This endpoint exists only to exercise the exact same Square helper used
  // by production bookings while the branch is running in Vercel Preview.
  // It is deliberately unavailable when the deployment has production
  // Square credentials.
  if (process.env.SQUARE_ENVIRONMENT !== "sandbox") {
    return NextResponse.json({ error: "Sandbox checkout is not available here." }, { status: 404 });
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isRegion(body.region) || !isDateISO(body.dateISO)) {
    return NextResponse.json({ error: "Invalid region or appointment date." }, { status: 400 });
  }

  const composition: GroupVisitComposition = {
    newCount: Number(body.newCount),
    existingCount: Number(body.existingCount),
  };

  if (
    !Number.isInteger(composition.newCount) ||
    !Number.isInteger(composition.existingCount) ||
    !isValidGroupVisitComposition(composition)
  ) {
    return NextResponse.json({ error: "Invalid group composition." }, { status: 400 });
  }

  try {
    const result = await createGroupCheckoutLink({
      region: body.region,
      dateISO: body.dateISO,
      composition,
      buyerEmail: body.buyerEmail,
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Square could not create a sandbox checkout link.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
