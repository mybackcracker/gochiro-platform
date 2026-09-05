import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import {
  GoogleSheetsIntakeLedger,
  INTAKE_AUTH_HEADERS,
  TOKEN_DOMAIN,
  generateIntakeToken,
  hashIntakeToken,
  tokenHashesEqual,
  validateLedgerHeaders,
  type IntakeAuthorizationRecord,
} from "../lib/intakeAuthorization";
import { intakeExpiration, issueIntakeLink, visitQualifiesForIntake } from "../lib/intakeIssuance";

const record: IntakeAuthorizationRecord = {
  tokenHash: "a".repeat(64), appointmentReference: "opaque-event-123", expiresAtUtc: "2026-09-05T13:00:00.000Z",
  status: "ACTIVE", createdAtUtc: "2026-09-05T10:00:00.000Z", consumedAtUtc: "", revokedAtUtc: "",
};

test("tokens contain at least 256 random bits in unpadded base64url", () => {
  const tokens = new Set(Array.from({ length: 32 }, generateIntakeToken));
  assert.equal(tokens.size, 32);
  for (const token of tokens) {
    assert.match(token, /^[A-Za-z0-9_-]{43}$/);
    assert.equal(Buffer.from(token, "base64url").length, 32);
  }
});

test("hashing is deterministic, SHA-256, and domain separated", () => {
  const raw = "synthetic-token";
  const expected = createHash("sha256").update(TOKEN_DOMAIN + raw).digest("hex");
  assert.equal(hashIntakeToken(raw), expected);
  assert.notEqual(hashIntakeToken(raw), createHash("sha256").update(raw).digest("hex"));
  assert(tokenHashesEqual(expected, hashIntakeToken(raw)));
  assert(!tokenHashesEqual(expected, "b".repeat(64)));
});

test("expiration is three server hours or appointment start, whichever is sooner", () => {
  const booked = new Date("2026-09-05T10:00:00.000Z");
  assert.equal(intakeExpiration(booked, new Date("2026-09-05T20:00:00.000Z")).toISOString(), "2026-09-05T13:00:00.000Z");
  assert.equal(intakeExpiration(booked, new Date("2026-09-05T11:00:00.000Z")).toISOString(), "2026-09-05T11:00:00.000Z");
});

test("only stable new-patient visits qualify", () => {
  assert(visitQualifiesForIntake("new-patient"));
  for (const visit of ["maintenance", "priority", "care-plan", "group-visit"]) assert(!visitQualifiesForIntake(visit));
});

test("feature flag must be exactly true", async () => {
  let touched = false;
  const ledger = { createIfNoActiveAuthorization: async () => { touched = true; return true; } };
  assert.equal(await issueIntakeLink("event", new Date(), { enabled: "TRUE", ledger }), null);
  assert.equal(touched, false);
});

test("ledger requires the exact header schema", () => {
  assert.doesNotThrow(() => validateLedgerHeaders([[...INTAKE_AUTH_HEADERS]]));
  assert.throws(() => validateLedgerHeaders([[...INTAKE_AUTH_HEADERS].reverse()]));
  assert.throws(() => validateLedgerHeaders(undefined));
  assert.throws(() => validateLedgerHeaders([[...INTAKE_AUTH_HEADERS, "Extra"]]));
});

test("ledger stores only the hash fields and prevents duplicate active records", async () => {
  const appended: unknown[][] = [];
  const rows: unknown[][] = [[...INTAKE_AUTH_HEADERS]];
  const sheets = { spreadsheets: { values: {
    get: async () => ({ data: { values: rows } }),
    append: async (request: { requestBody: { values: unknown[][] } }) => { appended.push(...request.requestBody.values); rows.push(...request.requestBody.values); },
  } } };
  const ledger = new GoogleSheetsIntakeLedger("synthetic-sheet", sheets as never);
  assert.equal(await ledger.createIfNoActiveAuthorization(record), true);
  assert.deepEqual(appended[0], Object.values(record));
  assert(!JSON.stringify(appended).includes("raw-secret"));
  assert.equal(await ledger.createIfNoActiveAuthorization({ ...record, tokenHash: "b".repeat(64) }), false);
  assert.equal(appended.length, 1);
});

test("issuance stores no raw token and logs no token, hash, or URL", async () => {
  const raw = "A".repeat(43);
  let stored: IntakeAuthorizationRecord | undefined;
  const messages: string[] = [];
  const original = console.error;
  console.error = (...args) => messages.push(args.join(" "));
  try {
    const link = await issueIntakeLink("opaque", new Date("2026-09-05T20:00:00Z"), {
      enabled: "true", baseUrl: "https://intake.invalid/form?discarded=yes", generateToken: () => raw,
      now: () => new Date("2026-09-05T10:00:00Z"),
      ledger: { createIfNoActiveAuthorization: async (value) => { stored = value; return true; } },
    });
    assert.equal(link, `https://intake.invalid/form?t=${raw}`);
    assert(stored);
    assert(!JSON.stringify(stored).includes(raw));
    assert.equal(messages.length, 0);
    assert(!messages.join(" ").includes(stored.tokenHash));
    assert(!messages.join(" ").includes(link!));
  } finally { console.error = original; }
});
