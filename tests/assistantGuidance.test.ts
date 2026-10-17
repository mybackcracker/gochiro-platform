import assert from "node:assert/strict";
import test from "node:test";
import {
  ASSISTANT_TOPICS,
  assistantTopic,
  assistantZipResult,
} from "../lib/assistantGuidance";

test("guided assistant has unique, informative choices with working internal paths", () => {
  assert.equal(ASSISTANT_TOPICS.length, 9);
  assert.equal(new Set(ASSISTANT_TOPICS.map((choice) => choice.id)).size, ASSISTANT_TOPICS.length);
  for (const topic of ASSISTANT_TOPICS) {
    assert.ok(topic.question.length > 4);
    assert.ok(topic.answer.length > 40);
    assert.ok(topic.links.every((link) => link.href.startsWith("/")));
    assert.equal(assistantTopic(topic.id).question, topic.question);
  }
});

test("covered ZIP links follow the same booking routes as the homepage", () => {
  const result = assistantZipResult("19061");
  assert.equal(result.kind, "booking");
  assert.deepEqual(result.links.map((link) => link.href), [
    "/book?start=new&zip=19061",
    "/book?start=returning&zip=19061",
    "/book?start=group&zip=19061",
  ]);
  assert.match(result.message, /scheduler will confirm/i);
});

test("Pennsylvania ZIPs outside regular coverage use the location request form", () => {
  const result = assistantZipResult("19103");
  assert.equal(result.kind, "request");
  assert.equal(result.links[0].href, "/check-your-location?zip=19103");
  assert.match(result.message, /by arrangement/i);
});

test("unserved out-of-state or invalid ZIPs cannot enter the booking flow", () => {
  const outside = assistantZipResult("19810");
  assert.equal(outside.kind, "outside");
  assert.equal(outside.links[0].href, "/contact");
  const invalid = assistantZipResult("abc");
  assert.equal(invalid.kind, "incomplete");
  assert.equal(invalid.links.length, 0);
});

test("booking and patient guidance keeps clinically sensitive questions out of the assistant", () => {
  assert.match(assistantTopic("returning").answer, /48 hours/);
  assert.match(assistantTopic("group").answer, /six people/);
  assert.match(assistantTopic("group").answer, /individual visit instead/);
  assert.match(assistantTopic("pricing").answer, /scheduler shows the applicable fee/i);
  assert.match(assistantTopic("insurance").answer, /self-pay/i);
  assert.equal(assistantTopic("pricing").needsZip, true);
  assert.equal(assistantTopic("area").needsZip, true);
});
