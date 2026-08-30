import { google } from "googleapis";
import { loadServiceAccountKey } from "./googleAuth";

// Reuses the same service-account JSON key as lib/googleCalendar.ts, just
// impersonating the mailbox with the gmail.send scope instead of calendar.
// This only works because contact@mybackcracker.com is a Google Workspace
// account with domain-wide delegation already set up for Calendar — see
// the setup notes in the PR/conversation for the one extra admin-console
// step (adding gmail.send to that same service account's delegated scopes).
//
// IMPERSONATED_MAILBOX is the delegated/authenticated account the service
// account impersonates via JWT `subject` — this must stay
// contact@mybackcracker.com regardless of what a message's visible From
// address is. It does NOT have to match the From header: Gmail lets a
// mailbox send as any of its own verified "Send mail as" aliases (Gmail
// Settings -> Accounts) without separate delegation for that alias — the API
// just needs the raw message's From header to match one of the
// authenticated account's verified identities. contact@gochiromobile.com is
// already configured and verified as a send-as alias on this mailbox (per
// business owner confirmation), so callers may pass a different
// `fromAddress` to sendEmail() for patient-facing sends.
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
const IMPERSONATED_MAILBOX = process.env.GOCHIRO_EMAIL_SENDER || "contact@mybackcracker.com";

let cachedAuth: InstanceType<typeof google.auth.JWT> | null = null;

function getAuth(): InstanceType<typeof google.auth.JWT> {
  if (cachedAuth) return cachedAuth;

  const key = loadServiceAccountKey();

  cachedAuth = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: SCOPES,
    subject: IMPERSONATED_MAILBOX,
  });

  return cachedAuth;
}

function gmailClient() {
  return google.gmail({ version: "v1", auth: getAuth() });
}

// RFC 2047-encodes header values (subject, display names) so non-ASCII
// characters like em dashes survive intact instead of getting mangled.
function encodeHeaderValue(value: string): string {
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, "utf-8").toString("base64")}?=`;
}

function mimePart(contentType: string, body: string): string {
  return [
    `Content-Type: ${contentType}; charset="UTF-8"`,
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(body, "utf-8").toString("base64"),
  ].join("\r\n");
}

function buildRawMessage(opts: {
  to: string;
  toName?: string;
  fromName: string;
  fromAddress: string;
  subject: string;
  text: string;
  html: string;
}): string {
  const boundary = `gochiro_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const toHeader = opts.toName ? `${encodeHeaderValue(opts.toName)} <${opts.to}>` : opts.to;

  const headers = [
    `From: ${encodeHeaderValue(opts.fromName)} <${opts.fromAddress}>`,
    `To: ${toHeader}`,
    `Subject: ${encodeHeaderValue(opts.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const body = [
    `--${boundary}`,
    mimePart("text/plain", opts.text),
    `--${boundary}`,
    mimePart("text/html", opts.html),
    `--${boundary}--`,
  ].join("\r\n");

  const message = `${headers}\r\n\r\n${body}`;

  return Buffer.from(message, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendEmail(opts: {
  to: string;
  toName?: string;
  fromName: string;
  // Visible From address. Defaults to the impersonated mailbox (previous
  // behavior) — pass a different, verified send-as alias (e.g.
  // PUBLIC_CONTACT_EMAIL) for patient-facing sends.
  fromAddress?: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const gmail = gmailClient();
  const raw = buildRawMessage({ ...opts, fromAddress: opts.fromAddress || IMPERSONATED_MAILBOX });
  await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
}
