import test from "node:test";
import assert from "node:assert/strict";
import { parseLocationRequest, locationMapsUrl, locationRequestNotification } from "../lib/locationRequest";
const valid = {name:"Test",contactMethod:"Text",contact:"6105550100",address:"100 Test Street",city:"Philadelphia",state:"PA",zip:"19103",privateParking:"Unsure",stairs:"Unsure",elevator:"Unsure",timing:"My timing is flexible",acknowledged:true};
test("location checks accept flexible timing without a visit date/type",()=>{assert.ok(parseLocationRequest(valid));});
test("reject missing consent, invalid contacts and unsupported state",()=>{for(const patch of [{acknowledged:false},{contact:"123"},{contactMethod:"Email",contact:"invalid"},{state:"DE"},{zip:"abcde"},{privateParking:""},{stairs:"invalid"},{elevator:""}])assert.equal(parseLocationRequest({...valid,...patch}),null);});
test("reject malformed or oversized input without throwing",()=>{for(const raw of [null,[],"test",{...valid,name:"x".repeat(101)}])assert.equal(parseLocationRequest(raw),null);});

test("map link preserves the full address without executing address punctuation",()=>{
  const input = {...valid,address:"100 Test Street #2 & Main"};
  const url = new URL(locationMapsUrl(input));
  assert.equal(url.origin,"https://www.google.com");
  assert.equal(url.searchParams.get("query"),"100 Test Street #2 & Main, Philadelphia, PA 19103");
  assert.equal(url.searchParams.get("api"),"1");
});

test("short address-first form works without parking and access questions", () => {
  const { privateParking, stairs, elevator, ...shortRequest } = valid;
  const parsed = parseLocationRequest(shortRequest);
  assert.ok(parsed);
  assert.equal(parsed.privateParking, "Unsure");
  assert.equal(parsed.stairs, "Unsure");
  assert.equal(parsed.elevator, "Unsure");
});

test("a request without city preserves the quoted destination and clickable reply", () => {
  const parsed = parseLocationRequest({ ...valid, city: undefined, name: "Test <request>" });
  assert.ok(parsed);
  const destination = "100 Test Street, PA 19103";
  const notification = locationRequestNotification(parsed, destination, { total: 175, appointmentFee: 100, travelFee: 75 });
  assert.equal(new URL(locationMapsUrl(parsed)).searchParams.get("query"), destination);
  assert.match(notification.html, /sms:6105550100/);
  assert.match(notification.html, /Test &lt;request&gt;/);
  assert.match(notification.text, /Estimate shown: \$175/);
  assert.doesNotMatch(notification.html, /Unsure/);
});
