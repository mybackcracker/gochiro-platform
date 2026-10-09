import test from "node:test";
import assert from "node:assert/strict";
import { zipRoute, locationRequestPath } from "../lib/zipRouting";
import { ZIPS } from "../lib/gochiro";
test("every currently covered ZIP retains the regular booking route",()=>{
  for(const zip of Object.values(ZIPS).flat()) assert.equal(zipRoute(zip),"booking",zip);
});
test("Philadelphia and other Pennsylvania locations route to a quote",()=>{
  for(const zip of ["19103","19148","19125","18101","15222","16501","19335"]) assert.equal(zipRoute(zip),"request",zip);
});
test("out-of-state, unknown and incomplete ZIPs cannot open the quote route",()=>{
  for(const zip of ["19703","19810","08002","10001","99999"]) assert.equal(zipRoute(zip),"not-pennsylvania",zip);
  for(const zip of ["","191","abcde"]) assert.equal(zipRoute(zip),"incomplete",zip);
});
test("request route carries the ZIP without changing booking coverage",()=>{
  assert.equal(locationRequestPath("19103"),"/check-your-location?zip=19103");
});
