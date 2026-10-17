import assert from "node:assert/strict";
import test from "node:test";
import {
  ASSISTANT_TOPICS,
  ASSISTANT_PAIN_REGIONS,
  assistantTopic,
  assistantZipResult,
  assistantBookingHref,
  assistantIndividualPrices,
  assistantGroupPrices,
} from "../lib/assistantGuidance";
import { findRegion, groupVisitTotal, priceFor, priceForDate } from "../lib/gochiro";

test("the five approved opening questions appear in the agreed order", () => {
  assert.deepEqual(ASSISTANT_TOPICS.map((item) => item.question), [
    "Do you come to my location?",
    "How much does a visit cost?",
    "Can you help with my pain?",
    "I'd like to schedule a visit",
    "Tell me about Group Visits",
  ]);
  assert.equal(new Set(ASSISTANT_TOPICS.map((item) => item.id)).size, 5);
  for (const item of ASSISTANT_TOPICS) {
    assert.equal(assistantTopic(item.id).question, item.question);
  }
});

test("every symptom choice leads to a short explanation and an existing condition hub or page", () => {
  assert.equal(ASSISTANT_PAIN_REGIONS.length, 8);
  assert.equal(new Set(ASSISTANT_PAIN_REGIONS.map((item) => item.id)).size, 8);
  for (const item of ASSISTANT_PAIN_REGIONS) {
    assert.ok(item.summary.length < 150);
    assert.ok(item.href.startsWith("/conditions"));
  }
  assert.equal(ASSISTANT_PAIN_REGIONS.find((item) => item.id === "neck")?.href, "/conditions/neck-pain");
  assert.equal(ASSISTANT_PAIN_REGIONS.find((item) => item.id === "sciatica")?.href, "/conditions/sciatica");
});

test("covered ZIP confirms service without promising a particular appointment", () => {
  const result = assistantZipResult("19061");
  assert.equal(result.kind, "booking");
  assert.match(result.message, /appointment availability is confirmed/i);
  assert.deepEqual(result.links.map((link) => link.href), [
    "/book?start=new&zip=19061",
    "/book?start=returning&zip=19061",
    "/book?start=group&zip=19061",
  ]);
});

test("direct bookings carry visit category and previously checked ZIP", () => {
  assert.equal(assistantBookingHref("19061", "new"), "/book?start=new&zip=19061");
  assert.equal(assistantBookingHref("19061", "returning"), "/book?start=returning&zip=19061");
  assert.equal(assistantBookingHref("19061", "group"), "/book?start=group&zip=19061");
  assert.equal(assistantBookingHref("19103", "new"), null);
  assert.equal(assistantBookingHref("19810", "group"), null);
  assert.equal(assistantBookingHref("abc", "returning"), null);
});

test("special arrangement and out-of-state ZIPs never enter online booking", () => {
  const request = assistantZipResult("19103");
  assert.equal(request.kind, "request");
  assert.deepEqual(request.links.map((link) => link.href), ["/check-your-location?zip=19103"]);
  assert.match(request.message, /arrangement/i);
  const outside = assistantZipResult("19810");
  assert.equal(outside.kind, "outside");
  assert.equal(outside.links[0].href, "/contact");
  const invalid = assistantZipResult("not-a-zip");
  assert.equal(invalid.kind, "incomplete");
  assert.deepEqual(invalid.links, []);
});

test("individual weekday and weekend prices derive from scheduler pricing", () => {
  const zip = "19061";
  const region = findRegion(zip);
  assert.ok(region);
  const prices = assistantIndividualPrices(zip, "new");
  assert.ok(prices);
  assert.equal(prices.weekday, "$" + priceFor(region, "new-patient"));
  assert.equal(prices.saturday, "$" + priceForDate(region, "new-patient", "2026-10-03"));
  assert.equal(prices.sunday, "$" + priceForDate(region, "new-patient", "2026-10-04"));
  const maintenance = assistantIndividualPrices(zip, "maintenance");
  assert.equal(maintenance?.sunday, "Not offered");
  const priority = assistantIndividualPrices(zip, "priority");
  assert.ok(priority?.weekday.startsWith("$"));
  assert.equal(assistantIndividualPrices("19103", "new"), null);
});

test("group totals match scheduler for valid compositions and reject invalid groups", () => {
  const region = findRegion("19061");
  assert.ok(region);
  const p = assistantGroupPrices("19061", 1, 2);
  assert.ok(p);
  assert.equal(p.weekday, "$" + groupVisitTotal(region, { newCount: 1, existingCount: 2 }));
  assert.equal(p.saturday, "$" + groupVisitTotal(region, { newCount: 1, existingCount: 2 }, "2026-10-03"));
  assert.equal(p.sunday, "$" + groupVisitTotal(region, { newCount: 1, existingCount: 2 }, "2026-10-04"));
  assert.equal(assistantGroupPrices("19061", 0, 1), null);
  assert.equal(assistantGroupPrices("19061", 3, 4), null);
  assert.equal(assistantGroupPrices("19103", 1, 2), null);
});
