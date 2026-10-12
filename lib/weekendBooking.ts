export type WeekendDay = 0 | 6;

export function matchesWeekendDay(dateISO: string, day: WeekendDay): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return false;
  const date = new Date(`${dateISO}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateISO && date.getUTCDay() === day;
}

export function weekendDates(startISO: string, day: WeekendDay, count = 4): string[] {
  const date = new Date(`${startISO}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return [];
  const results: string[] = [];
  while (results.length < count) {
    if (date.getUTCDay() === day) results.push(date.toISOString().slice(0, 10));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return results;
}
