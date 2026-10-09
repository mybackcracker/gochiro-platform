import test from "node:test";
import assert from "node:assert/strict";
import { parseLocationRequest } from "../lib/locationRequest";
const valid = {name:"Test",contactMethod:"Text",contact:"6105550100",address:"100 Test Street",city:"Philadelphia",state:"PA",zip:"19103",access:"Unsure",timing:"My timing is flexible",acknowledged:true};
test("location checks accept flexible timing without a visit date/type",()=>{assert.ok(parseLocationRequest(valid));});
test("reject missing consent, invalid contacts and unsupported state",()=>{for(const patch of [{acknowledged:false},{contact:"123"},{contactMethod:"Email",contact:"invalid"},{state:"DE"},{zip:"abcde"},{access:""}])assert.equal(parseLocationRequest({...valid,...patch}),null);});
test("reject malformed or oversized input without throwing",()=>{for(const raw of [null,[],"test",{...valid,name:"x".repeat(101)}])assert.equal(parseLocationRequest(raw),null);});
