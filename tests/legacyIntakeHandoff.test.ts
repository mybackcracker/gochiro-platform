import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { buildPatientTextEmail, buildPatientHtmlEmail } from "../lib/bookingEmail";
import { INTAKE_URL, INTAKE_DEADLINE_HOURS, type VisitType } from "../lib/gochiro";
import { completeBookedAppointment } from "../lib/bookingCompletion";
import type { BookingEmailInput } from "../lib/bookingEmail";

// This suite guards the hotfix that restored the pre-PR-#2 fallback intake
// link (lib/gochiro.ts INTAKE_URL) for new patients whenever the still-
// disabled secure token system (GOCHIRO_INTAKE_LINKS_ENABLED) does not
// supply a link — that fallback had regressed to bare policy text with no
// link at all.

const baseEmailData = {
  patientName: "Synthetic Person",
  patientFirstName: "Synthetic",
  patientEmail: "synthetic@example.invalid",
  patientPhone: "5555555555",
  fullAddress: "1 Test St\nTest, PA 19000",
  region: "East" as const,
  regionLabel: "East",
  dateStr: "Friday, September 5, 2026",
  timeStr: "3:00 PM",
  arrivalStartStr: "2:45 PM",
  arrivalEndStr: "3:15 PM",
  price: 100,
  paymentLink: "https://square.example/pay",
};

test("new-patient confirmations contain the restored working legacy intake link when no secure link is supplied", () => {
  const data = { ...baseEmailData, visit: "new-patient" as const, visitLabel: "New Patient, First Visit", intakeLink: undefined };
  const text = buildPatientTextEmail(data);
  const html = buildPatientHtmlEmail(data);
  assert(text.includes(INTAKE_URL), "text confirmation must include the working intake link");
  assert(text.includes(`at least ${INTAKE_DEADLINE_HOURS} hours`));
  assert(html.includes(INTAKE_URL), "html confirmation must include the working intake link");
  assert(html.includes("Complete Intake Forms"));
});

test("the secure single-use link, when issued, is used instead of — not in addition to — the legacy link", () => {
  const secureLink = "https://intake.invalid/?t=synthetic";
  const data = { ...baseEmailData, visit: "new-patient" as const, visitLabel: "New Patient, First Visit", intakeLink: secureLink };
  const text = buildPatientTextEmail(data);
  const html = buildPatientHtmlEmail(data);
  assert(text.includes(secureLink));
  assert(!text.includes(INTAKE_URL));
  assert(html.includes(secureLink));
  assert(!html.includes(INTAKE_URL));
});

test("existing-patient, maintenance, priority, care-plan, and group visit types behave as they did previously: no intake section at all", () => {
  const unaffectedVisits: VisitType[] = ["maintenance", "priority-standard", "priority-upgraded", "priority-accident", "care-plan"];
  for (const visit of unaffectedVisits) {
    const data = { ...baseEmailData, visit, visitLabel: "Visit", intakeLink: undefined };
    const text = buildPatientTextEmail(data);
    const html = buildPatientHtmlEmail(data);
    assert(!text.includes("INTAKE FORM"), `${visit} text email must not include an intake section`);
    assert(!text.includes(INTAKE_URL), `${visit} text email must not include the intake link`);
    assert(!html.includes("Intake Form"), `${visit} html email must not include an intake section`);
    assert(!html.includes(INTAKE_URL), `${visit} html email must not include the intake link`);
  }
});

test("group confirmations remain unaffected: still no intake link in the host email", () => {
  const source = fs.readFileSync("lib/bookingEmail.ts", "utf8");
  const groupSection = source.slice(source.indexOf("function buildHostTextEmail"));
  assert(!groupSection.includes("INTAKE_URL"));
  assert(!groupSection.includes("intakeLink"));
});

test("booking responses still expose no Calendar identifiers or internal errors (unchanged by this hotfix)", () => {
  const source = fs.readFileSync("app/api/book/route.ts", "utf8");
  assert.match(source, /NextResponse\.json\(\{ success: true \}\)/);
  assert(!source.includes("htmlLink:"));
  assert(!source.includes("eventId:"));
  assert(!source.includes("err instanceof Error ? err.message"));
});

test("the disabled secure-token feature cannot suppress the restored legacy intake link", async () => {
  const input: BookingEmailInput = {
    region: "East",
    visit: "new-patient",
    start: new Date("2026-09-05T20:00:00Z"),
    firstName: "Synthetic",
    lastName: "Person",
    phone: "5555555555",
    email: "synthetic@example.invalid",
    address: "1 Test St",
    addressCity: "Test",
    addressState: "PA",
    addressZip: "19000",
  };

  let issueLinkCalls = 0;
  let deliveredLink: string | undefined = "unset" as unknown as undefined;
  await completeBookedAppointment("opaque-event", input, undefined, {
    intakeEnabled: "false", // GOCHIRO_INTAKE_LINKS_ENABLED=false, the current production setting
    issueLink: async () => {
      issueLinkCalls++;
      return "https://secure-link-should-not-be-reachable.invalid";
    },
    sendIndividual: async (_input, link) => {
      deliveredLink = link;
    },
  });

  // With issuance disabled, the token system is never even consulted...
  assert.equal(issueLinkCalls, 0);
  assert.equal(deliveredLink, undefined);

  // ...and the confirmation email built from that undefined link still
  // carries the restored, working legacy intake link — the disabled feature
  // cannot leave the patient with no way to complete intake.
  const data = { ...baseEmailData, visit: "new-patient" as const, visitLabel: "New Patient, First Visit", intakeLink: deliveredLink };
  assert(buildPatientTextEmail(data).includes(INTAKE_URL));
  assert(buildPatientHtmlEmail(data).includes(INTAKE_URL));
});
