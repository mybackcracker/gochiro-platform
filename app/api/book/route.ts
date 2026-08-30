import { NextRequest, NextResponse } from "next/server";
import { createAppointment, isSlotStillFree } from "@/lib/googleCalendar";
import { sendBookingEmails, sendGroupBookingEmails } from "@/lib/bookingEmail";
import {
  VISITS,
  leadDays,
  visitTypesForLeadTime,
  isBusinessDay,
  groupVisitDurationMin,
  isValidGroupVisitComposition,
  type VisitType,
  type GroupVisitComposition,
} from "@/lib/gochiro";
import type { Region } from "@/lib/scheduling";
import { dateStringInTimeZone } from "@/lib/timezone";

const VALID_REGIONS: Region[] = ["East", "West", "Central", "MainLine", "WestChester"];

interface BookRequestBody {
  region: Region;
  visit: VisitType;
  start: string; // ISO timestamp, must be one of the values returned by /api/slots
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  addressLine2?: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  // Group Visit only:
  newCount?: number;
  existingCount?: number;
}

export async function POST(req: NextRequest) {
  let body: BookRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    region,
    visit,
    start,
    firstName,
    lastName,
    phone,
    email,
    address,
    addressLine2,
    addressCity,
    addressState,
    addressZip,
    newCount,
    existingCount,
  } = body;

  if (!region || !VALID_REGIONS.includes(region)) {
    return NextResponse.json({ error: "Missing or invalid region." }, { status: 400 });
  }
  if (!visit || !VISITS[visit]) {
    return NextResponse.json({ error: "Missing or invalid visit type." }, { status: 400 });
  }
  if (!start || isNaN(new Date(start).getTime())) {
    return NextResponse.json({ error: "Missing or invalid start time." }, { status: 400 });
  }
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !phone?.trim() ||
    !email?.trim() ||
    !address?.trim() ||
    !addressCity?.trim() ||
    !addressState?.trim() ||
    !addressZip?.trim()
  ) {
    return NextResponse.json({ error: "Missing patient contact information." }, { status: 400 });
  }

  // Group Visit: validate participant composition. Only the host's contact
  // info is collected — individual attendees are not identified during
  // booking (GROUP_VISIT_SPECIFICATION.md §8; the host relays the intake
  // link to new-patient attendees, see lib/bookingEmail.ts).
  let composition: GroupVisitComposition | null = null;
  if (visit === "group-visit") {
    composition = { newCount: Number(newCount), existingCount: Number(existingCount) };
    if (!isValidGroupVisitComposition(composition)) {
      return NextResponse.json({ error: "Missing or invalid Group Visit participant counts." }, { status: 400 });
    }
  }

  const startTime = new Date(start);

  // The business's calendar date, in America/New_York — not the server
  // process's own local timezone (see lib/timezone.ts). A late-evening
  // Eastern slot can fall on a different UTC calendar date, so reading this
  // back via startTime.getDate()/getMonth()/getFullYear() would pick up
  // whatever timezone the server happens to run in instead.
  const startDateStr = dateStringInTimeZone(startTime);
  if (!isBusinessDay(startDateStr)) {
    return NextResponse.json({ error: "That day is not available for booking." }, { status: 400 });
  }

  const days = leadDays(startTime);
  if (!visitTypesForLeadTime(days).includes(visit)) {
    return NextResponse.json(
      { error: `${VISITS[visit].label} is not offered for a date ${days.toFixed(1)} days out.` },
      { status: 400 }
    );
  }

  const durationMin = composition ? groupVisitDurationMin(composition) : VISITS[visit].durationMin;
  const endTime = new Date(startTime.getTime() + durationMin * 60000);

  try {
    // Recheck availability right before writing — closes the gap between
    // when the patient loaded the slot list and when they hit confirm.
    const stillFree = await isSlotStillFree(region, startTime, endTime);
    if (!stillFree) {
      return NextResponse.json(
        { error: "That slot was just taken. Please choose another time." },
        { status: 409 }
      );
    }

    const trimmedInput = {
      region,
      visit,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      addressLine2: addressLine2?.trim() || undefined,
      addressCity: addressCity.trim(),
      addressState: addressState.trim(),
      addressZip: addressZip.trim(),
    };

    const event = await createAppointment({
      ...trimmedInput,
      visitLabel: VISITS[visit].label,
      start: startTime,
      end: endTime,
      groupComposition: composition ?? undefined,
    });

    // The appointment is already booked at this point — email delivery is a
    // bonus, not a gate. sendBookingEmails/sendGroupBookingEmails swallow
    // their own per-email failures (logged, not thrown), and this catch is
    // defense-in-depth on top of that, so nothing here can turn a successful
    // booking into an error response for the patient.
    try {
      if (composition) {
        await sendGroupBookingEmails({
          ...trimmedInput,
          start: startTime,
          composition,
        });
      } else {
        await sendBookingEmails({ ...trimmedInput, start: startTime });
      }
    } catch (err) {
      console.error("Booking email step threw unexpectedly:", err);
    }

    return NextResponse.json({ success: true, eventId: event.id, htmlLink: event.htmlLink });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create appointment." },
      { status: 500 }
    );
  }
}
