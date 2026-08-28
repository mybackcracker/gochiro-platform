import { NextRequest, NextResponse } from "next/server";
import { listEvents } from "@/lib/googleCalendar";
import { computeAvailableSlots, type Region } from "@/lib/scheduling";
import {
  VISITS,
  SAME_REGION_BUFFER_MIN,
  leadDays,
  isBusinessDay,
  groupVisitDurationMin,
  isValidGroupVisitComposition,
  type VisitType,
} from "@/lib/gochiro";

const VALID_REGIONS: Region[] = ["East", "West", "Central", "MainLine", "WestChester"];
const WORK_START_HOUR = 9;

// Mon-Thu close at 6pm everywhere. Friday closes earlier: 4pm normally, but
// 2pm for the two regions whose Friday hours run short.
const FRIDAY_EARLY_CLOSE_REGIONS: Region[] = ["WestChester", "MainLine"];

function workEndHourFor(region: Region, dayOfWeek: number): number {
  const isFriday = dayOfWeek === 5;
  if (!isFriday) return 18;
  return FRIDAY_EARLY_CLOSE_REGIONS.includes(region) ? 14 : 16;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const region = searchParams.get("region") as Region | null;
  const visit = searchParams.get("visit") as VisitType | null;
  const dateParam = searchParams.get("date"); // YYYY-MM-DD

  if (!region || !VALID_REGIONS.includes(region)) {
    return NextResponse.json({ error: "Missing or invalid region." }, { status: 400 });
  }
  if (!visit || !VISITS[visit]) {
    return NextResponse.json({ error: "Missing or invalid visit type." }, { status: 400 });
  }
  if (!dateParam) {
    return NextResponse.json({ error: "Missing date (YYYY-MM-DD)." }, { status: 400 });
  }

  // Group Visit duration depends on participant composition, not a fixed
  // per-type value — see lib/gochiro.ts's VISITS["group-visit"] comment.
  let durationMinOverride: number | null = null;
  if (visit === "group-visit") {
    const newCount = Number(searchParams.get("newCount"));
    const existingCount = Number(searchParams.get("existingCount"));
    const composition = { newCount, existingCount };
    if (!isValidGroupVisitComposition(composition)) {
      return NextResponse.json(
        { error: "Missing or invalid Group Visit participant counts." },
        { status: 400 }
      );
    }
    durationMinOverride = groupVisitDurationMin(composition);
  }

  const dayStart = new Date(`${dateParam}T00:00:00`);
  const dayEnd = new Date(`${dateParam}T23:59:59`);
  if (isNaN(dayStart.getTime())) {
    return NextResponse.json({ error: "Invalid date format." }, { status: 400 });
  }

  // Closed weekends — this is a fixed business rule, not something inferred
  // from the calendar (an empty Saturday would otherwise look wide open).
  if (!isBusinessDay(dateParam)) {
    return NextResponse.json({ slots: [] });
  }

  const workStart = new Date(dayStart);
  workStart.setHours(WORK_START_HOUR, 0, 0, 0);
  const workEnd = new Date(dayStart);
  workEnd.setHours(workEndHourFor(region, dayStart.getDay()), 0, 0, 0);

  try {
    const existingEvents = await listEvents(dayStart, dayEnd);
    const durationMin = durationMinOverride ?? VISITS[visit].durationMin;

    const slots = computeAvailableSlots({
      region,
      visitDurationMin: durationMin,
      sameRegionBufferMin: SAME_REGION_BUFFER_MIN[visit],
      dayStart: workStart,
      dayEnd: workEnd,
      existingEvents: existingEvents
        .filter((e) => e.region !== null)
        .map((e) => ({ region: e.region as Region, start: e.start, end: e.end })),
    });

    // Events whose region we couldn't detect (sloppy/legacy calendar titles,
    // e.g. "Pat") were previously dropped entirely here, so this endpoint
    // would happily offer a slot that directly overlaps one of them. The
    // /api/book recheck (isSlotStillFree) has no such blind spot — it treats
    // any overlapping event as a real conflict, since the doctor can't be in
    // two places regardless of whether we can parse which region an event
    // belongs to. That mismatch let this endpoint offer slots /api/book
    // would then reject with 409. Apply the same plain overlap check here
    // (no buffer, since we don't know a region to look one up for) so both
    // endpoints agree on what's actually bookable.
    const unknownRegionEvents = existingEvents.filter((e) => e.region === null);
    const noHiddenConflict = (slotStart: Date) => {
      const slotEnd = new Date(slotStart.getTime() + durationMin * 60000);
      return !unknownRegionEvents.some((e) => slotStart.getTime() < e.end.getTime() && slotEnd.getTime() > e.start.getTime());
    };

    // Enforce the lead-time/buffer rule server-side, per slot start time — not
    // just in the UI, and not at day granularity (which would wrongly reject
    // an entire day just because part of it falls inside the buffer window).
    const minLeadDays = VISITS[visit].minLeadDays;
    const eligibleSlots = slots.filter((s) => leadDays(s) >= minLeadDays && noHiddenConflict(s));

    return NextResponse.json({ slots: eligibleSlots.map((s) => s.toISOString()) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load availability." },
      { status: 500 }
    );
  }
}
