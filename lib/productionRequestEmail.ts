import "next/dist/compiled/server-only";

import { sendEmail } from "./gmail";
import { BOOKING_NOTIFICATION_EMAIL, BUSINESS_NAME, BUSINESS_PHONE, PUBLIC_CONTACT_EMAIL } from "./gochiro";

export interface ProductionRequestInput {
  name: string;
  role: string;
  preferredContact: string;
  mobile: string;
  email: string;
  productionName: string;
  productionDate: string;
  multipleDates: boolean;
  additionalDates: string;
  venue: string;
  city: string;
  venueNotConfirmed: boolean;
  coverageType: string;
  approximatePeople: string;
  audiences: string[];
  coverageTimeKnown: boolean;
  coverageTime: string;
  additionalServices: string;
  notes: string;
}

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function display(value: string): string {
  return value.trim() || "Not provided";
}

export async function sendProductionRequestEmails(input: ProductionRequestInput): Promise<void> {
  const production = display(input.productionName);
  const venue = input.venueNotConfirmed ? "Not confirmed yet" : display(input.venue);
  const audiences = input.audiences.length ? input.audiences.join(", ") : "Not specified";
  const coverageTime = input.coverageTimeKnown ? display(input.coverageTime) : "Schedule still being determined";
  const dates = input.multipleDates ? `${input.productionDate}; ${display(input.additionalDates)}` : input.productionDate;

  const doctorText = [
    "NEW TOURING PRODUCTION REQUEST",
    "",
    `Contact: ${input.name}`,
    `Role: ${input.role}`,
    `Preferred contact: ${input.preferredContact}`,
    `Mobile: ${display(input.mobile)}`,
    `Email: ${display(input.email)}`,
    "",
    `Production / tour / artist: ${production}`,
    `Date(s): ${dates}`,
    `Venue: ${venue}`,
    `City: ${input.city}`,
    `Coverage requested: ${input.coverageType}`,
    `Approximate people: ${input.approximatePeople}`,
    `Care available to: ${audiences}`,
    `Preferred coverage time: ${coverageTime}`,
    `Additional services: ${input.additionalServices}`,
    `Notes: ${display(input.notes)}`,
  ].join("\n");

  await sendEmail({
    to: BOOKING_NOTIFICATION_EMAIL,
    fromName: BUSINESS_NAME,
    fromAddress: PUBLIC_CONTACT_EMAIL,
    subject: `Production Request — ${input.city}${input.productionName ? ` — ${input.productionName}` : ""}`,
    text: doctorText,
    html: `<pre style="font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;font-size:15px;line-height:1.5;">${esc(doctorText)}</pre>`,
  });

  if (input.email.trim()) {
    const contactText = [
      `Hi ${input.name},`,
      "",
      "Your production coverage request has been received.",
      "",
      `Date: ${dates}`,
      `Location: ${venue}, ${input.city}`,
      `Requested coverage: ${input.coverageType}`,
      "",
      "We’ll review the production needs and follow up regarding availability and the most appropriate coverage arrangement.",
      "",
      "This request is not a confirmed booking until arrangements are accepted by both parties.",
      "",
      `Questions? Call or text ${BUSINESS_PHONE}.`,
      "",
      BUSINESS_NAME,
    ].join("\n");

    await sendEmail({
      to: input.email,
      toName: input.name,
      fromName: BUSINESS_NAME,
      fromAddress: PUBLIC_CONTACT_EMAIL,
      subject: `Production Coverage Request Received — ${BUSINESS_NAME}`,
      text: contactText,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#222;"><p>Hi ${esc(input.name)},</p><p>Your production coverage request has been received.</p><p><strong>Date:</strong> ${esc(dates)}<br><strong>Location:</strong> ${esc(venue)}, ${esc(input.city)}<br><strong>Requested coverage:</strong> ${esc(input.coverageType)}</p><p>We’ll review the production needs and follow up regarding availability and the most appropriate coverage arrangement.</p><p><strong>This request is not a confirmed booking</strong> until arrangements are accepted by both parties.</p><p>Questions? Call or text ${esc(BUSINESS_PHONE)}.</p><p>${esc(BUSINESS_NAME)}</p></div>`,
    });
  }
}
