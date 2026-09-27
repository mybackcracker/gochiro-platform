import "next/dist/compiled/server-only";

import {
  groupVisitTotal,
  isValidGroupVisitComposition,
  type GroupVisitComposition,
  type Region,
} from "./gochiro";

type SquareEnvironment = "sandbox" | "production";

export interface GroupCheckoutInput {
  region: Region;
  dateISO: string;
  composition: GroupVisitComposition;
  buyerEmail?: string;
  idempotencyKey?: string;
}

export interface GroupCheckoutResult {
  url: string;
  amount: number;
  paymentLinkId?: string;
  orderId?: string;
  environment: SquareEnvironment;
}

function squareEnvironment(): SquareEnvironment {
  return process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";
}

function squareBaseUrl(environment: SquareEnvironment): string {
  return environment === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

export async function createGroupCheckoutLink(input: GroupCheckoutInput): Promise<GroupCheckoutResult> {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const environment = squareEnvironment();

  if (!accessToken || !locationId) {
    throw new Error("Square credentials are not configured.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.dateISO)) {
    throw new Error("Invalid appointment date.");
  }
  if (!isValidGroupVisitComposition(input.composition)) {
    throw new Error("Invalid Group Visit composition.");
  }

  const amount = groupVisitTotal(input.region, input.composition, input.dateISO);
  const squareBody: Record<string, unknown> = {
    idempotency_key: input.idempotencyKey || crypto.randomUUID(),
    description: "GoChiroMobile Group Visit",
    quick_pay: {
      name: "GoChiroMobile Group Visit",
      price_money: {
        amount: Math.round(amount * 100),
        currency: "USD",
      },
      location_id: locationId,
    },
    payment_note: `Group Visit — ${input.dateISO}; ${input.composition.newCount} new, ${input.composition.existingCount} existing`,
  };

  if (input.buyerEmail?.trim()) {
    squareBody.pre_populated_data = { buyer_email: input.buyerEmail.trim() };
  }

  const response = await fetch(`${squareBaseUrl(environment)}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": "2026-09-16",
    },
    body: JSON.stringify(squareBody),
    cache: "no-store",
  });

  const data = (await response.json()) as {
    payment_link?: { url?: string; id?: string; order_id?: string };
    errors?: Array<{ detail?: string; code?: string }>;
  };

  if (!response.ok || !data.payment_link?.url) {
    const detail =
      data.errors?.map((error) => error.detail || error.code).filter(Boolean).join(" ") ||
      "Square could not create a checkout link.";
    throw new Error(detail);
  }

  return {
    url: data.payment_link.url,
    amount,
    paymentLinkId: data.payment_link.id,
    orderId: data.payment_link.order_id,
    environment,
  };
}
