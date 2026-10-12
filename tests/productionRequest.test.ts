import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import { NextRequest } from "next/server";
import * as options from "../lib/productionRequestOptions";
import * as business from "../lib/gochiro";
import type { ProductionRequestInput } from "../lib/productionRequestEmail";

function loadSource(path: string, mocks: Record<string, unknown>) {
  const output = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: Record<string, unknown> = {};
  vm.runInNewContext(output, { exports, console, require: (name: string) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    throw new Error(`Unexpected dependency: ${name}`);
  } });
  return exports;
}

const valid = {
  name: "Synthetic Coordinator", role: "Production Coordinator", preferredContact: "Email",
  email: "coordinator@example.invalid", mobile: "", productionType: "Film / television",
  productionName: "Synthetic Production", productionDate: "2026-11-01", venue: "Synthetic Studio",
  city: "Philadelphia", coverageType: "On-site care available to multiple people",
  approximatePeople: "5–8", audiences: ["Cast", "Film / TV Crew"], additionalServices: "No",
};

async function request(input: Record<string, unknown>) {
  const sent: ProductionRequestInput[] = [];
  const api = loadSource("app/api/production-request/route.ts", {
    "next/server": await import("next/server"),
    "@/lib/productionRequestOptions": options,
    "@/lib/productionRequestEmail": { sendProductionRequestEmails: async (data: ProductionRequestInput) => { sent.push(data); } },
  });
  const post = api.POST as (req: NextRequest) => Promise<Response>;
  const response = await post(new NextRequest("https://example.invalid/api/production-request", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input),
  }));
  return { response, sent };
}

test("film inquiries accept coordinator, line producer and crew roles and retain the production type", async () => {
  for (const role of ["Production Coordinator", "Line Producer", "Cast / Crew"]) {
    const { response, sent } = await request({ ...valid, role });
    assert.equal(response.status, 200);
    assert.equal(sent[0].productionType, "Film / television");
    assert.equal(sent[0].audiences.join(","), "Cast,Film / TV Crew");
  }
});

test("cached touring forms without a production type continue to submit", async () => {
  const { response, sent } = await request({ ...valid, role: "Tour Manager", productionType: undefined });
  assert.equal(response.status, 200);
  assert.equal(sent.length, 1);
});

test("unknown production types are rejected before notification delivery", async () => {
  const { response, sent } = await request({ ...valid, productionType: "unrecognized" });
  assert.equal(response.status, 400);
  assert.equal(sent.length, 0);
});

test("no-preference contacts accept email only but reject no contact details", async () => {
  assert.equal((await request({ ...valid, preferredContact: "No preference" })).response.status, 200);
  assert.equal((await request({ ...valid, preferredContact: "No preference", email: "" })).response.status, 400);
});

test("both production emails identify the production type and keep the request unconfirmed", async () => {
  const messages: Array<{ text: string; html: string }> = [];
  const email = loadSource("lib/productionRequestEmail.ts", {
    "next/dist/compiled/server-only": {}, "./gochiro": business,
    "./gmail": { sendEmail: async (data: { text: string; html: string }) => { messages.push(data); } },
  });
  const send = email.sendProductionRequestEmails as (input: ProductionRequestInput) => Promise<void>;
  await send({ ...valid, multipleDates: false, additionalDates: "", venueNotConfirmed: false,
    coverageTimeKnown: false, coverageTime: "", notes: "" });
  assert.equal(messages.length, 2);
  for (const message of messages) {
    assert.match(message.text, /Production type: Film \/ television/);
    assert.match(message.html, /Film \/ television/);
  }
  assert.match(messages[0].text, /NEW PRODUCTION COVERAGE REQUEST/);
  assert.match(messages[1].text, /not a confirmed booking/);
});
