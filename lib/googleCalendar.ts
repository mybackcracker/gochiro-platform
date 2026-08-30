import { google } from "googleapis";
import { loadServiceAccountKey } from "./googleAuth";
import type { Region } from "./scheduling";
import type { GroupVisitComposition } from "./gochiro";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const IMPERSONATE = process.env.GOCHIRO_CALENDAR_OWNER || "contact@mybackcracker.com";
const CALENDAR_ID = process.env.GOCHIRO_CALENDAR_ID || IMPERSONATE;

let cachedAuth: InstanceType<typeof google.auth.JWT> | null = null;

function getAuth(): InstanceType<typeof google.auth.JWT> {
  if (cachedAuth) return cachedAuth;

  const key = loadServiceAccountKey();

  cachedAuth = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: SCOPES,
    subject: IMPERSONATE,
  });

  return cachedAuth;
}

function calendarClient() {
  return google.calendar({ version: "v3", auth: getAuth() });
}

export function detectRegion(location: string, title: string): Region | null {
  const loc = (location || "").toLowerCase();
  const t = (title || "").toLowerCase();

  if (loc.includes("wc region") || t.includes("wc region")) return "WestChester";
  if (loc.includes("main line") || t.includes("main line")) return "MainLine";
  if (loc.includes("central") || t.includes("central")) return "Central";
  if (loc.includes("east") || t.includes("east")) return "East";
  if (loc.includes("west") || t.includes("west")) return "West";

  return null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  region: Region | null;
  start: Date;
  end: Date;
}

export async function listEvents(timeMin: Date, timeMax: Date): Promise<CalendarEvent[]> {
  const calendar = calendarClient();
  const res = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return (res.data.items || [])
    .filter((ev) => ev.start?.dateTime && ev.end?.dateTime)
    .map((ev) => {
      const location = ev.location || "";
      const title = ev.summary || "";
      return {
        id: ev.id || "",
        title,
        location,
        region: detectRegion(location, title),
        start: new Date(ev.start!.dateTime!),
        end: new Date(ev.end!.dateTime!),
      };
    });
}

export interface CreateAppointmentInput {
  region: Region;
  visitLabel: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  addressLine2?: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  start: Date;
  end: Date;
  // Present only for Group Visit bookings — firstName/lastName/email above
  // are the host's, not a participant's.
  groupComposition?: GroupVisitComposition;
}

export async function createAppointment(input: CreateAppointmentInput) {
  const calendar = calendarClient();
  const regionLabel = input.region.replace("MainLine", "Main Line").replace("WestChester", "WC Region");
  const streetLine = input.addressLine2 ? `${input.address}, ${input.addressLine2}` : input.address;
  const fullAddress = `${streetLine}, ${input.addressCity}, ${input.addressState} ${input.addressZip}`;

  const groupSuffix = input.groupComposition
    ? ` (Group: ${input.groupComposition.newCount} new / ${input.groupComposition.existingCount} existing)`
    : "";
  const summary = input.groupComposition
    ? `${regionLabel} GROUP VISIT - Host ${input.firstName} ${input.lastName}${groupSuffix}`
    : `${regionLabel} ${input.firstName} ${input.lastName} - ${input.visitLabel}`;
  const description = input.groupComposition
    ? `Group Visit host • ${input.firstName} ${input.lastName} (${input.email})\nPhone: ${input.phone}\nAddress: ${fullAddress}\nParticipants: ${input.groupComposition.newCount} new, ${input.groupComposition.existingCount} existing`
    : `Guest • ${input.firstName} ${input.lastName} (${input.email})\nPhone: ${input.phone}\nAddress: ${fullAddress}`;

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary,
      // Keep location as the region label (not the street address) — detectRegion()
      // parses this field on read, so replacing it would break region lookups.
      location: regionLabel,
      description,
      start: { dateTime: input.start.toISOString() },
      end: { dateTime: input.end.toISOString() },
      attendees: [{ email: input.email, displayName: `${input.firstName} ${input.lastName}` }],
    },
  });

  return res.data;
}

export async function isSlotStillFree(
  region: Region,
  start: Date,
  end: Date,
  maxBufferMin = 60
): Promise<boolean> {
  const windowStart = new Date(start.getTime() - maxBufferMin * 60000);
  const windowEnd = new Date(end.getTime() + maxBufferMin * 60000);
  const events = await listEvents(windowStart, windowEnd);

  return !events.some((e) => e.start.getTime() < end.getTime() && e.end.getTime() > start.getTime());
}

export async function testConnection(): Promise<{ ok: true; eventCount: number } | { ok: false; error: string }> {
  try {
    const now = new Date();
    const weekOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const events = await listEvents(now, weekOut);
    return { ok: true, eventCount: events.length };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
