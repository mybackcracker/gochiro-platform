import { sendEmail } from "./gmail";
import {
  BOOKING_NOTIFICATION_EMAIL,
  PUBLIC_CONTACT_EMAIL,
  BUSINESS_NAME,
  DOCTOR_NAME,
  BUSINESS_PHONE,
  VENMO_LINK,
  VENMO_LAST4,
  INTAKE_DEADLINE_HOURS,
  VISITS,
  priceFor,
  paymentLinkFor,
  groupVisitTotal,
  groupVisitTravelFee,
  GROUP_VISIT_NEW_PATIENT_PRICE,
  GROUP_VISIT_EXISTING_PATIENT_PRICE,
  type VisitType,
  type Region,
  type GroupVisitComposition,
} from "./gochiro";

const TIME_ZONE = "America/New_York";

export interface BookingEmailInput {
  region: Region;
  visit: VisitType;
  start: Date;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  addressLine2?: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
}

interface BookingEmailData {
  patientName: string;
  patientFirstName: string;
  patientEmail: string;
  patientPhone: string;
  fullAddress: string;
  region: Region;
  regionLabel: string;
  visit: VisitType;
  visitLabel: string;
  dateStr: string;
  timeStr: string;
  arrivalStartStr: string;
  arrivalEndStr: string;
  price: number | null;
  paymentLink: string;
  intakeLink?: string;
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

function formatTime(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

function buildBookingEmailData(input: BookingEmailInput, intakeLink?: string): BookingEmailData {
  const arrivalStart = new Date(input.start.getTime() - 15 * 60000);
  const arrivalEnd = new Date(input.start.getTime() + 15 * 60000);
  const streetLine = input.addressLine2 ? `${input.address}, ${input.addressLine2}` : input.address;

  return {
    patientName: `${input.firstName} ${input.lastName}`,
    patientFirstName: input.firstName,
    patientEmail: input.email,
    patientPhone: input.phone,
    fullAddress: `${streetLine}\n${input.addressCity}, ${input.addressState} ${input.addressZip}`,
    region: input.region,
    regionLabel: input.region.replace("MainLine", "Main Line").replace("WestChester", "West Chester"),
    visit: input.visit,
    visitLabel: VISITS[input.visit].label,
    dateStr: formatDate(input.start),
    timeStr: formatTime(input.start),
    arrivalStartStr: formatTime(arrivalStart),
    arrivalEndStr: formatTime(arrivalEnd),
    price: priceFor(input.region, input.visit),
    paymentLink: paymentLinkFor(input.region, input.visit),
    intakeLink,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(str: string): string {
  return str.replace(/\n/g, "<br>");
}

// Only new-patient visits get the "your Care Plan Visit will be discussed"
// note, the intake-forms policy section, and the treatment-table prep line —
// ported as-is from the old script, which special-cased new-patient the
// same way.
function getPreparationLines(visit: VisitType): string[] {
  const lines = [
    "Wear loose, comfortable clothing.",
    "Please do not apply topical pain gels, creams, or patches before your appointment.",
    "If you can safely do so, avoid anti-inflammatory or over-the-counter pain medication for 24 hours before your visit.",
    "Continue prescribed medication as directed unless your prescribing clinician has told you otherwise.",
  ];
  if (visit === "new-patient") {
    lines.push("Please have an area available for the portable treatment table.");
  }
  lines.push("Arrival times are approximate. Please keep the full ETA range available.");
  return lines;
}

export function buildPatientTextEmail(b: BookingEmailData): string {
  let body = "";
  body += `Hi ${b.patientFirstName},\n\n`;
  body += `Your ${b.visitLabel} has been confirmed.\n\n`;
  body += "APPOINTMENT DETAILS\n";
  body += `Date: ${b.dateStr}\n`;
  body += `Time: ${b.timeStr}\n`;
  body += `ETA range: ${b.arrivalStartStr} - ${b.arrivalEndStr}\n`;
  body += `Location:\n${b.fullAddress}\n`;

  if (b.visit === "new-patient") {
    body += "\nYour Care Plan Visit will be discussed with you during this visit.\n";
  }

  body += "\nPREPARING FOR YOUR VISIT\n";
  body += getPreparationLines(b.visit)
    .map((l) => `• ${l}`)
    .join("\n");
  body += "\n\n";

  body += "PAYMENT\n";
  if (b.price === null) {
    body += "This visit bills directly to your insurance or claim. No payment is due from you at the time of the visit.\n\n";
  } else {
    body += `Visit fee: $${b.price}\n`;
    body += "Payment must be made before or at the time of the visit.\n";
    if (b.paymentLink) {
      body += `Pay by Square: ${b.paymentLink}\n`;
    }
    body += `Pay with Venmo: ${VENMO_LINK}\n`;
    body += `Last four: ${VENMO_LAST4}\n`;
    body += "Cash or check is also accepted.\n\n";
  }

  if (b.visit === "new-patient") {
    body += "IMPORTANT INTAKE FORM POLICY\n";
    if (b.intakeLink) {
      body += "Complete your intake within three hours of booking. This secure link can be used only once.\n\n";
      body += `Complete your intake forms here:\n${b.intakeLink}\n\n`;
    } else {
      body += `Your intake forms must be completed at least ${INTAKE_DEADLINE_HOURS} hours before your scheduled appointment. `;
      body += "Failure to complete the forms by this deadline may result in your appointment being canceled and a missed appointment fee being applied to your account.\n\n";
    }
  }

  body += `Questions? Call or text ${BUSINESS_PHONE}.\n\n`;
  body += `${DOCTOR_NAME}\n`;
  body += `${BUSINESS_NAME}\n`;
  body += BUSINESS_PHONE;

  return body;
}

export function buildPatientHtmlEmail(b: BookingEmailData): string {
  const prepText = getPreparationLines(b.visit)
    .map((l) => `• ${escapeHtml(l)}`)
    .join("<br>");

  let html = "";
  html += '<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.45;color:#222222;margin:0;padding:0;">';
  html += `<p style="margin:0 0 16px 0;">Hi ${escapeHtml(b.patientFirstName)},</p>`;
  html += `<p style="margin:0 0 16px 0;">Your <strong>${escapeHtml(b.visitLabel)}</strong> has been confirmed.</p>`;
  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#173B57;">Appointment Details</h2>';
  html += `<p style="margin:0 0 6px 0;"><strong>Date:</strong> ${escapeHtml(b.dateStr)}</p>`;
  html += `<p style="margin:0 0 6px 0;"><strong>Time:</strong> ${escapeHtml(b.timeStr)}</p>`;
  html += `<p style="margin:0 0 6px 0;"><strong>ETA range:</strong> ${escapeHtml(b.arrivalStartStr)} - ${escapeHtml(b.arrivalEndStr)}</p>`;
  html += `<p style="margin:0 0 16px 0;"><strong>Location:</strong><br>${nl2br(escapeHtml(b.fullAddress))}</p>`;

  if (b.visit === "new-patient") {
    html += '<p style="margin:0 0 16px 0;">Your Care Plan Visit will be discussed with you during this visit.</p>';
  }

  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#173B57;">Preparing for Your Visit</h2>';
  html += `<p style="margin:0 0 16px 0;">${prepText}</p>`;
  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#173B57;">Payment</h2>';

  if (b.price === null) {
    html +=
      '<p style="margin:0 0 16px 0;">This visit bills directly to your insurance or claim. No payment is due from you at the time of the visit.</p>';
  } else {
    html += `<p style="margin:0 0 8px 0;"><strong>Visit fee:</strong> $${b.price}</p>`;
    html +=
      '<p style="margin:0 0 14px 0;color:#991b1b;"><strong><u>Payment must be made before or at the time of the visit.</u></strong></p>';

    if (b.paymentLink) {
      html += `<p style="margin:16px 0;"><a href="${escapeHtml(b.paymentLink)}" style="display:block;background:#173B57;color:#ffffff;text-align:center;text-decoration:none;padding:14px 16px;border-radius:6px;font-weight:bold;">Pay by Square</a></p>`;
    }

    html += `<p style="margin:16px 0 6px 0;"><a href="${escapeHtml(VENMO_LINK)}" style="display:block;background:#173B57;color:#ffffff;text-align:center;text-decoration:none;padding:14px 16px;border-radius:6px;font-weight:bold;">Pay with Venmo</a></p>`;
    html += `<p style="margin:0 0 14px 0;">Last four: ${escapeHtml(VENMO_LAST4)}</p>`;
    html += '<p style="margin:0 0 16px 0;">Cash or check is also accepted.</p>';
  }

  if (b.visit === "new-patient") {
    html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
    html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#991b1b;">Important Intake Form Policy</h2>';
    if (b.intakeLink) {
      html += '<p style="margin:0 0 16px 0;color:#991b1b;"><strong>Complete your intake within three hours of booking.</strong> This secure link can be used only once.</p>';
      html += `<p style="margin:16px 0;"><a href="${escapeHtml(b.intakeLink)}" style="display:block;background:#15803d;color:#ffffff;text-align:center;text-decoration:none;padding:14px 16px;border-radius:6px;font-weight:bold;">Complete Intake Forms</a></p>`;
    } else {
      html += `<p style="margin:0 0 16px 0;color:#991b1b;"><strong><u>Your intake forms must be completed at least ${INTAKE_DEADLINE_HOURS} hours before your scheduled appointment.</u></strong> Failure to complete the forms by this deadline may result in your appointment being canceled and a missed appointment fee being applied to your account.</p>`;
    }
  }

  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += `<p style="margin:0 0 16px 0;">Questions? Call or text <strong>${escapeHtml(BUSINESS_PHONE)}</strong>.</p>`;
  html += `<p style="margin:22px 0 0 0;">${escapeHtml(DOCTOR_NAME)}<br>${escapeHtml(BUSINESS_NAME)}<br>${escapeHtml(BUSINESS_PHONE)}</p>`;
  html += "</div>";
  return html;
}

function buildDoctorEmail(b: BookingEmailData): { subject: string; text: string; html: string } {
  const subject = `New Booking: ${b.visitLabel} — ${b.regionLabel}`;
  const feeStr = b.price === null ? "Bills to insurance/claim" : `$${b.price}`;

  let text = "New appointment booked:\n\n";
  text += `Patient: ${b.patientName}\n`;
  text += `Email: ${b.patientEmail}\n`;
  text += `Phone: ${b.patientPhone}\n`;
  text += `Visit: ${b.visitLabel}\n`;
  text += `Region: ${b.regionLabel}\n`;
  text += `Date: ${b.dateStr}\n`;
  text += `Time: ${b.timeStr}\n`;
  text += `ETA: ${b.arrivalStartStr} - ${b.arrivalEndStr}\n`;
  text += `Address:\n${b.fullAddress}\n`;
  text += `Fee: ${feeStr}`;

  const html = `<pre style="font-family:inherit;white-space:pre-wrap;">${escapeHtml(text)}</pre>`;

  return { subject, text, html };
}

// Best-effort — errors are caught and logged by the caller (app/api/book),
// never allowed to fail the booking itself. The calendar event is already
// created by the time these run, so email delivery is a bonus, not gating.
export async function sendPatientConfirmationEmail(input: BookingEmailInput, intakeLink?: string): Promise<void> {
  const b = buildBookingEmailData(input, intakeLink);
  await sendEmail({
    to: b.patientEmail,
    toName: b.patientName,
    fromName: BUSINESS_NAME,
    fromAddress: PUBLIC_CONTACT_EMAIL,
    subject: `Your ${b.visitLabel} is Confirmed — ${BUSINESS_NAME}`,
    text: buildPatientTextEmail(b),
    html: buildPatientHtmlEmail(b),
  });
}

export async function sendDoctorNotificationEmail(input: BookingEmailInput): Promise<void> {
  const b = buildBookingEmailData(input);
  const { subject, text, html } = buildDoctorEmail(b);
  await sendEmail({
    to: BOOKING_NOTIFICATION_EMAIL,
    fromName: BUSINESS_NAME,
    subject,
    text,
    html,
  });
}

export async function sendBookingEmails(input: BookingEmailInput, intakeLink?: string): Promise<void> {
  const results = await Promise.allSettled([sendPatientConfirmationEmail(input, intakeLink), sendDoctorNotificationEmail(input)]);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Booking email failed to send.");
    }
  }
}

export async function sendIntakeIssuanceWarning(): Promise<void> {
  await sendEmail({
    to: BOOKING_NOTIFICATION_EMAIL,
    fromName: BUSINESS_NAME,
    subject: "Scheduler intake-link issuance warning",
    text: "A secure intake link could not be issued for a completed booking. Review the protected intake authorization service.",
    html: "<p>A secure intake link could not be issued for a completed booking. Review the protected intake authorization service.</p>",
  });
}

// ---------------------------------------------------------------------------
// Group Visit emails (GROUP_VISIT_SPECIFICATION.md, resolved 2026-08-28).
// The host is the booking contact (firstName/lastName/phone/email/address
// above are the host's) and the sole point of contact — individual
// attendees are not identified during booking. Group intake links require a
// separate multi-patient design and are intentionally unsupported. Per the
// V1 payment decision, there is no
// Square link here: the total is quoted, the host is told they're
// responsible for it, and the visit books without requiring advance
// payment.
// ---------------------------------------------------------------------------

export interface GroupBookingEmailInput {
  region: Region;
  start: Date;
  firstName: string; // host
  lastName: string; // host
  phone: string; // host
  email: string; // host
  address: string;
  addressLine2?: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  composition: GroupVisitComposition;
}

interface GroupBookingEmailData {
  hostName: string;
  hostFirstName: string;
  hostEmail: string;
  hostPhone: string;
  fullAddress: string;
  regionLabel: string;
  dateStr: string;
  timeStr: string;
  arrivalStartStr: string;
  arrivalEndStr: string;
  newCount: number;
  existingCount: number;
  newSubtotal: number;
  existingSubtotal: number;
  travelFee: number;
  total: number;
}

function buildGroupBookingEmailData(input: GroupBookingEmailInput): GroupBookingEmailData {
  const arrivalStart = new Date(input.start.getTime() - 15 * 60000);
  const arrivalEnd = new Date(input.start.getTime() + 15 * 60000);
  const streetLine = input.addressLine2 ? `${input.address}, ${input.addressLine2}` : input.address;
  const { newCount, existingCount } = input.composition;

  return {
    hostName: `${input.firstName} ${input.lastName}`,
    hostFirstName: input.firstName,
    hostEmail: input.email,
    hostPhone: input.phone,
    fullAddress: `${streetLine}\n${input.addressCity}, ${input.addressState} ${input.addressZip}`,
    regionLabel: input.region.replace("MainLine", "Main Line").replace("WestChester", "West Chester"),
    dateStr: formatDate(input.start),
    timeStr: formatTime(input.start),
    arrivalStartStr: formatTime(arrivalStart),
    arrivalEndStr: formatTime(arrivalEnd),
    newCount,
    existingCount,
    newSubtotal: newCount * GROUP_VISIT_NEW_PATIENT_PRICE,
    existingSubtotal: existingCount * GROUP_VISIT_EXISTING_PATIENT_PRICE,
    travelFee: groupVisitTravelFee(input.region),
    total: groupVisitTotal(input.region, input.composition),
  };
}

function buildHostTextEmail(b: GroupBookingEmailData): string {
  let body = "";
  body += `Hi ${b.hostFirstName},\n\n`;
  body += "Your Group Visit has been confirmed.\n\n";
  body += "APPOINTMENT DETAILS\n";
  body += `Date: ${b.dateStr}\n`;
  body += `Time: ${b.timeStr}\n`;
  body += `ETA range: ${b.arrivalStartStr} - ${b.arrivalEndStr}\n`;
  body += `Location:\n${b.fullAddress}\n\n`;

  body += "GROUP TOTAL\n";
  if (b.newCount > 0) body += `${b.newCount} new patient(s) x $${GROUP_VISIT_NEW_PATIENT_PRICE} = $${b.newSubtotal}\n`;
  if (b.existingCount > 0) {
    body += `${b.existingCount} existing patient(s) x $${GROUP_VISIT_EXISTING_PATIENT_PRICE} = $${b.existingSubtotal}\n`;
  }
  body += `Travel fee: $${b.travelFee}\n`;
  body += `Total: $${b.total}\n`;
  body += "As the host, you're responsible for the full amount above. Payment isn't required to book — pay at or before the visit.\n\n";

  body += "PAYMENT\n";
  body += "Cash, check, credit card (HSA/FSA eligible), and Venmo are all accepted.\n";
  body += `Pay with Venmo: ${VENMO_LINK}\n`;
  body += `Last four: ${VENMO_LAST4}\n\n`;


  body += `Questions? Call or text ${BUSINESS_PHONE}.\n\n`;
  body += `${DOCTOR_NAME}\n`;
  body += `${BUSINESS_NAME}\n`;
  body += BUSINESS_PHONE;

  return body;
}

function buildHostHtmlEmail(b: GroupBookingEmailData): string {
  let html = "";
  html += '<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.45;color:#222222;margin:0;padding:0;">';
  html += `<p style="margin:0 0 16px 0;">Hi ${escapeHtml(b.hostFirstName)},</p>`;
  html += '<p style="margin:0 0 16px 0;">Your <strong>Group Visit</strong> has been confirmed.</p>';
  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#173B57;">Appointment Details</h2>';
  html += `<p style="margin:0 0 6px 0;"><strong>Date:</strong> ${escapeHtml(b.dateStr)}</p>`;
  html += `<p style="margin:0 0 6px 0;"><strong>Time:</strong> ${escapeHtml(b.timeStr)}</p>`;
  html += `<p style="margin:0 0 6px 0;"><strong>ETA range:</strong> ${escapeHtml(b.arrivalStartStr)} - ${escapeHtml(b.arrivalEndStr)}</p>`;
  html += `<p style="margin:0 0 16px 0;"><strong>Location:</strong><br>${nl2br(escapeHtml(b.fullAddress))}</p>`;

  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#173B57;">Group Total</h2>';
  if (b.newCount > 0) {
    html += `<p style="margin:0 0 6px 0;">${b.newCount} new patient(s) &times; $${GROUP_VISIT_NEW_PATIENT_PRICE} = $${b.newSubtotal}</p>`;
  }
  if (b.existingCount > 0) {
    html += `<p style="margin:0 0 6px 0;">${b.existingCount} existing patient(s) &times; $${GROUP_VISIT_EXISTING_PATIENT_PRICE} = $${b.existingSubtotal}</p>`;
  }
  html += `<p style="margin:0 0 6px 0;">Travel fee: $${b.travelFee}</p>`;
  html += `<p style="margin:8px 0;font-size:18px;"><strong>Total: $${b.total}</strong></p>`;
  html +=
    '<p style="margin:0 0 16px 0;color:#991b1b;"><strong><u>As the host, you\'re responsible for the full amount above.</u></strong> Payment isn\'t required to book — pay at or before the visit.</p>';

  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += '<h2 style="font-size:18px;line-height:1.3;margin:0 0 10px 0;color:#173B57;">Payment</h2>';
  html += '<p style="margin:0 0 8px 0;">Cash, check, credit card (HSA/FSA eligible), and Venmo are all accepted.</p>';
  html += `<p style="margin:16px 0 6px 0;"><a href="${escapeHtml(VENMO_LINK)}" style="display:block;background:#173B57;color:#ffffff;text-align:center;text-decoration:none;padding:14px 16px;border-radius:6px;font-weight:bold;">Pay with Venmo</a></p>`;
  html += `<p style="margin:0 0 16px 0;">Last four: ${escapeHtml(VENMO_LAST4)}</p>`;


  html += '<hr style="border:none;border-top:1px solid #dddddd;margin:20px 0;">';
  html += `<p style="margin:0 0 16px 0;">Questions? Call or text <strong>${escapeHtml(BUSINESS_PHONE)}</strong>.</p>`;
  html += `<p style="margin:22px 0 0 0;">${escapeHtml(DOCTOR_NAME)}<br>${escapeHtml(BUSINESS_NAME)}<br>${escapeHtml(BUSINESS_PHONE)}</p>`;
  html += "</div>";
  return html;
}

function buildDoctorGroupEmail(b: GroupBookingEmailData): { subject: string; text: string; html: string } {
  const subject = `New Group Visit Booking — ${b.regionLabel}`;

  let text = "New Group Visit booked:\n\n";
  text += `Host: ${b.hostName}\n`;
  text += `Host email: ${b.hostEmail}\n`;
  text += `Host phone: ${b.hostPhone}\n`;
  text += `Region: ${b.regionLabel}\n`;
  text += `Date: ${b.dateStr}\n`;
  text += `Time: ${b.timeStr}\n`;
  text += `ETA: ${b.arrivalStartStr} - ${b.arrivalEndStr}\n`;
  text += `Address:\n${b.fullAddress}\n`;
  text += `Participants: ${b.newCount} new, ${b.existingCount} existing\n`;
  text += `Total: $${b.total} (host responsible)`;

  const html = `<pre style="font-family:inherit;white-space:pre-wrap;">${escapeHtml(text)}</pre>`;

  return { subject, text, html };
}

export async function sendGroupBookingEmails(input: GroupBookingEmailInput): Promise<void> {
  const b = buildGroupBookingEmailData(input);

  const sends: Promise<void>[] = [
    sendEmail({
      to: b.hostEmail,
      toName: b.hostName,
      fromName: BUSINESS_NAME,
      fromAddress: PUBLIC_CONTACT_EMAIL,
      subject: `Your Group Visit is Confirmed — ${BUSINESS_NAME}`,
      text: buildHostTextEmail(b),
      html: buildHostHtmlEmail(b),
    }),
    (() => {
      const { subject, text, html } = buildDoctorGroupEmail(b);
      return sendEmail({ to: BOOKING_NOTIFICATION_EMAIL, fromName: BUSINESS_NAME, subject, text, html });
    })(),
  ];

  const results = await Promise.allSettled(sends);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Group booking email failed to send.");
    }
  }
}
