export type Region = "East" | "West" | "Central" | "MainLine" | "WestChester";

export interface BusyEvent {
  region: Region;
  start: Date;
  end: Date;
}

export interface SlotRequest {
  region: Region;
  visitDurationMin: number;
  dayStart: Date;
  dayEnd: Date;
  existingEvents: BusyEvent[];
  slotIncrementMin?: number;
  sameRegionBufferMin?: number;
}

const BUFFER_MINUTES: Record<Region, Partial<Record<Region, number>>> = {
  East:        { West: 35, Central: 40, MainLine: 50, WestChester: 60 },
  West:        { East: 35, Central: 40, MainLine: 60, WestChester: 50 },
  Central:     { East: 40, West: 40, MainLine: 40, WestChester: 40 },
  MainLine:    { East: 50, West: 60, Central: 40, WestChester: 50 },
  WestChester: { East: 60, West: 50, Central: 40, MainLine: 50 },
};

function bufferBetween(a: Region, b: Region, sameRegionBufferMin: number): number {
  if (a === b) return sameRegionBufferMin;
  return BUFFER_MINUTES[a][b] ?? sameRegionBufferMin;
}

function addMinutes(d: Date, mins: number): Date {
  return new Date(d.getTime() + mins * 60000);
}

export function computeAvailableSlots(req: SlotRequest): Date[] {
  const {
    region,
    visitDurationMin,
    dayStart,
    dayEnd,
    existingEvents,
    slotIncrementMin = 30,
    sameRegionBufferMin = 15,
  } = req;

  const valid: Date[] = [];

  // dayEnd bounds the slot's START time, not its end — the last bookable
  // slot of the day starts exactly at close, even if the visit runs past it.
  for (
    let slotStart = new Date(dayStart);
    slotStart.getTime() <= dayEnd.getTime();
    slotStart = addMinutes(slotStart, slotIncrementMin)
  ) {
    const slotEnd = addMinutes(slotStart, visitDurationMin);
    let conflict = false;

    for (const ev of existingEvents) {
      const buf = bufferBetween(region, ev.region, sameRegionBufferMin);
      const busyStart = addMinutes(ev.start, -buf);
      const busyEnd = addMinutes(ev.end, buf);

      if (slotStart.getTime() < busyEnd.getTime() && slotEnd.getTime() > busyStart.getTime()) {
        conflict = true;
        break;
      }
    }

    if (!conflict) {
      valid.push(new Date(slotStart));
    }
  }

  return valid;
}
