import assert from "node:assert/strict";
import test from "node:test";
import { completeBookedAppointment } from "../lib/bookingCompletion";
import type { BookingEmailInput, GroupBookingEmailInput } from "../lib/bookingEmail";

const input: BookingEmailInput = { region:"East", visit:"new-patient", start:new Date("2026-09-05T20:00:00Z"), firstName:"Synthetic", lastName:"Person", phone:"5555555555", email:"synthetic@example.invalid", address:"1 Test St", addressCity:"Test", addressState:"PA", addressZip:"19000" };

test("ledger failure keeps completion successful, warns, and confirms without a link", async () => {
  let confirmation: string | undefined | null = null;
  let warnings = 0;
  const logs: string[] = [];
  await assert.doesNotReject(() => completeBookedAppointment("opaque", input, undefined, {
    intakeEnabled:"true", issueLink:async()=>{throw new Error("secret internal detail");},
    sendIndividual:async (_input, link)=>{confirmation = link ?? null;}, sendWarning:async()=>{warnings++;}, report:(m)=>logs.push(m),
  }));
  assert.equal(confirmation, null);
  assert.equal(warnings, 1);
  assert.deepEqual(logs, ["Secure intake-link issuance failed."]);
  assert(!logs.join(" ").includes("secret internal detail"));
});

test("new-patient confirmation receives the single-use three-hour secure link", async () => {
  let link: string | undefined;
  await completeBookedAppointment("opaque", input, undefined, { intakeEnabled:"true", issueLink:async()=>"https://intake.invalid/?t=synthetic", sendIndividual:async(_i, value)=>{link=value;} });
  assert.equal(link, "https://intake.invalid/?t=synthetic");
});

test("maintenance receives no intake link and Group Visits receive one secure link per new patient", async () => {
  let issued = 0;
  let individualLink: string | undefined;
  await completeBookedAppointment("opaque", {...input, visit:"maintenance"}, undefined, {
    intakeEnabled:"true",
    issueLink:async()=>{issued++; return "bad";},
    sendIndividual:async(_i,v)=>{individualLink=v;},
  });
  assert.equal(issued, 0);
  assert.equal(individualLink, undefined);

  const refs: string[] = [];
  let groupLinks: string[] = [];
  await completeBookedAppointment(
    "opaque",
    {...input, visit:"group-visit"},
    {...input, composition:{newCount:2,existingCount:1}} as GroupBookingEmailInput,
    {
      intakeEnabled:"true",
      issueLink:async(ref)=>{refs.push(ref); return `https://intake.invalid/?t=${refs.length}`;},
      sendGroup:async(_group, links)=>{groupLinks=links;},
    },
  );
  assert.deepEqual(refs, ["opaque:group-new-1", "opaque:group-new-2"]);
  assert.deepEqual(groupLinks, ["https://intake.invalid/?t=1", "https://intake.invalid/?t=2"]);
});
