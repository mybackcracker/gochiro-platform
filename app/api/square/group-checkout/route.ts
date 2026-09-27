import { NextResponse } from "next/server";
import {
  groupVisitTotal,
  isValidGroupVisitComposition,
  type GroupVisitComposition,
  type Region,
} from "@/lib/gochiro";

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
  if (process.env.SQUARE_ENVIRONMENT !== "sandbox") {
    return NextResponse.json(
      { error: "Square sandbox checkout is not enabled in this environment." },
      { status: 503 }
    );
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) {
    return NextResponse.json(
      { error: "Square sandbox credentials are not configured." },
      { status: 503 }
    );
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

  const totalDollars = groupVisitTotal(body.region, composition, body.dateISO);
  const amountCents = Math.round(totalDollars * 100);

  const squareBody: Record<string, unknown> = {
    idempotency_key: crypto.randomUUID(),
    description: "GoChiroMobile Group Visit sandbox checkout",
    quick_pay: {
      name: "GoChiroMobile Group Visit",
      price_money: {
        amount: amountCents,
        currency: "USD",
      },
      location_id: locationId,
    },
    payment_note: `Group Visit — ${body.dateISO}; ${composition.newCount} new, ${composition.existingCount} existing`,
  };

  if (body.buyerEmail?.trim()) {
    squareBody.pre_populated_data = {
      buyer_email: body.buyerEmail.trim(),
    };
  }

  const squareResponse = await fetch("https://connect.squareupsandbox.com/v2/online-checkout/payment-links", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": "2026-09-16",
    },
    body: JSON.stringify(squareBody),
    cache: "no-store",
  });

  const data = (await squareResponse.json()) as {
    payment_link?: { url?: string; id?: string; order_id?: string };
    errors?: Array<{ detail?: string; code?: string }>;
  };

  if (!squareResponse.ok || !data.payment_link?.url) {
    const detail =
      data.errors?.map((error) => error.detail || error.code).filter(Boolean).join(" ") ||
      "Square could not create a sandbox checkout link.";
    return NextResponse.json({ error: detail }, { status: 502 });
  }

  return NextResponse.json({
    url: data.payment_link.url,
    amount: totalDollars,
    paymentLinkId: data.payment_link.id,
    orderId: data.payment_link.order_id,
    environment: "sandbox",
  });
}
