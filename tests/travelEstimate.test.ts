import test from "node:test";
import assert from "node:assert/strict";
import { estimateSummary, makeTravelEstimate, travelCharge, ESTIMATE_MAX_AGE_MS } from "../lib/travelEstimate";
import { calculateTravelEstimate, signEstimate, verifyEstimate, TravelEstimateError } from "../lib/travelEstimateServer";
import { locationRequestPath } from "../lib/zipRouting";

process.env.GOOGLE_ROUTES_API_KEY = "synthetic-unit-test-key-not-a-credential";
process.env.GOOGLE_ROUTES_ORIGIN = "100 Synthetic Origin Street, Test City";
const now = Date.now();

test("travel charges follow actual round-trip time, including gas, with $25 half-up rounding", () => {
  for (const [oneWayMinutes, travel] of [[30, 100], [45, 150], [60, 200], [42, 150], [48, 150]]) {
    const e = makeTravelEstimate("19446", oneWayMinutes * 60, oneWayMinutes * 60, now);
    assert.equal(e.travelFee, travel);
    assert.equal(e.total, travel + e.appointmentFee);
    assert.equal(e.appointmentFee, 100);
  }
  assert.equal(travelCharge(4050), 125); // $112.50 rounds up
  assert.equal(travelCharge(4049), 100);
  assert.equal(makeTravelEstimate("19446", 1800, 2700).travelFee, 125); // differing legs
  for (const invalid of [-1, NaN, Infinity]) assert.throws(() => travelCharge(invalid));
});

test("signed estimate preserves the displayed total; edited, wrong-ZIP, expired and malformed tokens fail", () => {
  const original = makeTravelEstimate("19446", 3600, 3600, now);
  const signed = signEstimate(original);
  assert.deepEqual(verifyEstimate(signed.token, "19446", now + 60_000), original);
  assert.equal(verifyEstimate(signed.token, "18938", now), null);
  assert.equal(verifyEstimate(signed.token, "19446", now + ESTIMATE_MAX_AGE_MS + 1), null);
  assert.equal(verifyEstimate(signed.token, "19446", now - 120_000), null);
  const [, sig] = signed.token.split(".");
  const tampered = Buffer.from(JSON.stringify({...original, total: 1})).toString("base64url");
  assert.equal(verifyEstimate(`${tampered}.${sig}`, "19446", now), null);
  for (const invalid of [null, 3, "", "a.b.c", "a.b", "x".repeat(3000)]) assert.equal(verifyEstimate(invalid, "19446", now), null);
  const url = new URL(locationRequestPath("19446", signed.token), "https://example.invalid");
  assert.equal(url.searchParams.get("zip"), "19446");
  assert.equal(url.searchParams.get("estimate"), signed.token);
  assert.ok(estimateSummary(original).includes("ESTIMATED TOTAL SHOWN TO REQUESTER: $300"));
});

test("routing requests use server-only credentials and both driving directions; snapshot omits origin and credentials", async () => {
  const calls: {origin: {address: string}; destination: {address: string}}[] = [];
  const mock: typeof fetch = async (url, init) => {
    assert.equal(url, "https://routes.googleapis.com/directions/v2:computeRoutes");
    const body = JSON.parse(init?.body as string);
    assert.equal(body.routingPreference, "TRAFFIC_UNAWARE");
    assert.equal(body.travelMode, "DRIVE");
    assert.equal(new Headers(init?.headers).get("X-Goog-FieldMask"), "routes.duration");
    calls.push(body);
    return new Response(JSON.stringify({routes:[{duration: calls.length === 1 ? "1800s" : "2700s"}]}));
  };
  const signed = await calculateTravelEstimate("19446", mock);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].origin.address, calls[1].destination.address);
  assert.equal(calls[0].destination.address, "19446, Pennsylvania, USA");
  assert.equal(signed.estimate.travelFee, 125);
  const exposed = JSON.stringify(signed) + Buffer.from(signed.token.split(".")[0], "base64url").toString("utf8");
  assert.ok(!exposed.includes("Synthetic Origin"));
  assert.ok(!exposed.includes(process.env.GOOGLE_ROUTES_API_KEY!));
  await assert.rejects(calculateTravelEstimate("19061", mock));
  await assert.rejects(calculateTravelEstimate("19985", mock));
  assert.equal(calls.length, 2);
});

test("provider failures never create a zero or fabricated estimate", async () => {
  for (const value of [{routes:[]}, {routes:[{duration:"NaNs"}]}, {routes:[{duration:"0s"}]}]) {
    await assert.rejects(calculateTravelEstimate("19446", async () => new Response(JSON.stringify(value))));
  }
  await assert.rejects(calculateTravelEstimate("19446", async () => new Response("provider details", {status:403})));
  await assert.rejects(calculateTravelEstimate("19446", async () => { throw new Error("Timeout"); }));
});


test("routing diagnostics identify configuration and provider restrictions without returning private error text", async () => {
  const savedOrigin = process.env.GOOGLE_ROUTES_ORIGIN;
  delete process.env.GOOGLE_ROUTES_ORIGIN;
  try { await assert.rejects(calculateTravelEstimate("19446"), (e: unknown) => e instanceof TravelEstimateError && e.code === "MISSING_ORIGIN"); }
  finally { process.env.GOOGLE_ROUTES_ORIGIN = savedOrigin; }
  const savedKey = process.env.GOOGLE_ROUTES_API_KEY;
  delete process.env.GOOGLE_ROUTES_API_KEY;
  try { await assert.rejects(calculateTravelEstimate("19446"), (e: unknown) => e instanceof TravelEstimateError && e.code === "MISSING_API_KEY"); }
  finally { process.env.GOOGLE_ROUTES_API_KEY = savedKey; }
  for (const reason of ["BILLING_DISABLED", "API_KEY_SERVICE_BLOCKED", "API_KEY_HTTP_REFERRER_BLOCKED", "SERVICE_DISABLED"]) {
    await assert.rejects(calculateTravelEstimate("19446", async () => new Response(JSON.stringify({error: {message: "private upstream details", details: [{reason}]}}), {status:403})), (e: unknown) => e instanceof TravelEstimateError && e.code === reason && !e.message.includes("private"));
  }
  await assert.rejects(calculateTravelEstimate("19446", async () => new Response(JSON.stringify({error: {details: [{reason:"private user-supplied text"}]}}), {status:403})), (e: unknown) => e instanceof TravelEstimateError && e.code === "GOOGLE_HTTP_403");
});
