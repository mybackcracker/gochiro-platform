import assert from "node:assert/strict";
import test from "node:test";
import { VISITS, groupVisitDurationMin, groupVisitTotal, isValidGroupVisitComposition, priceFor, resolvePriorityVisit, visitTypesForLeadTime } from "../lib/gochiro";
import { computeAvailableSlots } from "../lib/scheduling";

test("existing pricing, lead-time, priority, and group rules remain intact", () => {
  assert.equal(priceFor("East", "new-patient"), 100);
  assert.equal(priceFor("Central", "new-patient"), 160);
  assert(!visitTypesForLeadTime(1).includes("maintenance"));
  assert(visitTypesForLeadTime(2).includes("maintenance"));
  assert.equal(VISITS["care-plan"].minLeadDays, 8 / 24);
  assert.equal(resolvePriorityVisit(false, false, false), "priority-standard");
  assert.equal(resolvePriorityVisit(false, true, false), "priority-upgraded");
  assert.equal(resolvePriorityVisit(true, false, false), "priority-accident");
  assert(isValidGroupVisitComposition({newCount:1, existingCount:1}));
  assert.equal(groupVisitDurationMin({newCount:1, existingCount:1}), 30);
  assert.equal(groupVisitTotal("East", {newCount:1, existingCount:1}), 120);
});

test("existing calendar overlap and buffer behavior remains intact", () => {
  const dayStart = new Date("2026-09-07T13:00:00Z");
  const dayEnd = new Date("2026-09-07T14:00:00Z");
  const slots = computeAvailableSlots({ region:"East", visitDurationMin:20, dayStart, dayEnd, sameRegionBufferMin:10, existingEvents:[{region:"East", start:new Date("2026-09-07T13:30:00Z"), end:new Date("2026-09-07T13:50:00Z")}] });
  assert.deepEqual(slots.map(d=>d.toISOString()), ["2026-09-07T13:00:00.000Z", "2026-09-07T14:00:00.000Z"]);
});
