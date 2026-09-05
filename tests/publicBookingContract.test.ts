import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("public booking responses expose neither Calendar identifiers nor internal exceptions", () => {
  const source = fs.readFileSync("app/api/book/route.ts", "utf8");
  assert.match(source, /NextResponse\.json\(\{ success: true \}\)/);
  assert(!source.includes("htmlLink:"));
  assert(!source.includes("eventId:"));
  assert(!source.includes("err instanceof Error ? err.message"));
});

test("new-patient email wording is three-hour and single-use; group has no intake URL", () => {
  const source = fs.readFileSync("lib/bookingEmail.ts", "utf8");
  assert(source.includes("Complete your intake within three hours of booking."));
  assert(source.includes("This secure link can be used only once."));
  const groupSection = source.slice(source.indexOf("function buildHostTextEmail"));
  assert(!groupSection.includes("INTAKE_URL"));
  assert(!groupSection.includes("intakeLink"));
});
