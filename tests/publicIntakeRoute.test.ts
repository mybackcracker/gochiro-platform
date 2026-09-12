import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { INTAKE_URL } from "../lib/gochiro";

test("the permanent public /intake address redirects to the active intake form", () => {
  const config = fs.readFileSync("next.config.ts", "utf8");
  const publicIntakeRedirect = config.match(
    /source:\s*["']\/intake["'][\s\S]*?destination:\s*["']([^"']+)["'][\s\S]*?permanent:\s*(true|false)/,
  );

  assert(publicIntakeRedirect, "next.config.ts must define the /intake redirect");
  assert.equal(publicIntakeRedirect[1], INTAKE_URL);
  assert.equal(
    publicIntakeRedirect[2],
    "false",
    "the redirect must remain changeable if the intake provider URL changes",
  );
});

test("the public intake address does not require patient data in its URL", () => {
  assert.equal("https://www.gochiromobile.com/intake".includes("?"), false);
});
