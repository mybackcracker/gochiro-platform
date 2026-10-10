import test from "node:test";
import assert from "node:assert/strict";
import { matchesWeekendDay, weekendDates } from "../lib/weekendBooking";

test("weekend choices include today and cross month and year boundaries", () => {
  assert.deepEqual(weekendDates("2026-10-10", 6, 2), ["2026-10-10", "2026-10-17"]);
  assert.deepEqual(weekendDates("2026-12-31", 0, 2), ["2027-01-03", "2027-01-10"]);
});
test("Saturday and Sunday paths stay separate when starting midweek", () => {
  const saturdays = weekendDates("2026-10-14", 6);
  const sundays = weekendDates("2026-10-14", 0);
  assert.equal(saturdays[0], "2026-10-17");
  assert.equal(sundays[0], "2026-10-18");
  assert.ok(saturdays.every(date => matchesWeekendDay(date, 6)));
  assert.ok(sundays.every(date => matchesWeekendDay(date, 0)));
});
test("later-date selection rejects weekdays, the other weekend day, and invalid dates", () => {
  assert.equal(matchesWeekendDay("2026-10-16", 6), false);
  assert.equal(matchesWeekendDay("2026-10-18", 6), false);
  assert.equal(matchesWeekendDay("2026-02-31", 0), false);
  assert.equal(matchesWeekendDay("", 6), false);
});
