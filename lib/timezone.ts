// Timezone-safe date helpers for the scheduling system. The business runs on
// Eastern time regardless of where this app is deployed — the server
// process's own local timezone must never leak into a business-hours or
// lead-time calculation. No dependency is added: everything here is built on
// Intl.DateTimeFormat, which is part of the JS runtime.

export const BUSINESS_TIME_ZONE = "America/New_York";

/**
 * Minutes to ADD to a UTC timestamp to get the wall-clock time `date`
 * represents in `timeZone` (e.g. -240 during EDT, -300 during EST).
 */
function timeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUTC = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return (asUTC - date.getTime()) / 60000;
}

/**
 * The one safe way to turn a wall-clock date/time (e.g. "9:00 AM on
 * 2026-09-07") into an absolute instant in `timeZone` (defaults to the
 * business's Eastern timezone) — without depending on the server process's
 * own local timezone. Business hours (9am-6pm) never fall in a DST-transition
 * gap/overlap (those happen at 2am), so a single-pass offset lookup is exact.
 */
export function zonedTimeToUtc(
  year: number,
  month: number, // 1-12
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
  timeZone: string = BUSINESS_TIME_ZONE
): Date {
  const guess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const offsetMin = timeZoneOffsetMinutes(guess, timeZone);
  return new Date(guess.getTime() - offsetMin * 60000);
}

/** Splits a YYYY-MM-DD string into numeric parts — pure calendar math, no timezone involved. */
export function parseDateOnly(dateISO: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateISO.split("-").map(Number);
  return { year, month, day };
}

/**
 * Day of week (0=Sun..6=Sat) for a plain YYYY-MM-DD calendar date. A bare
 * calendar date's weekday doesn't depend on timezone at all — "September 7,
 * 2026" is a Monday everywhere — so this is computed in UTC deliberately,
 * never via the server's own local Date methods.
 */
export function dayOfWeekFromDateString(dateISO: string): number {
  const { year, month, day } = parseDateOnly(dateISO);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

/**
 * The YYYY-MM-DD calendar date that `date` falls on in `timeZone` (defaults
 * to Eastern) — the fix for reading a calendar date back off an instant
 * without leaking the server's own local timezone (e.g. `date.getDate()`).
 */
export function dateStringInTimeZone(date: Date, timeZone: string = BUSINESS_TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
