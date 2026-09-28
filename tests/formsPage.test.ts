import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("Forms appears in the shared desktop and mobile navigation", () => {
  const header = fs.readFileSync("components/SiteHeader.tsx", "utf8");
  assert.match(header, /\{ href: ["']\/forms["'], label: ["']Forms["'] \}/);
  assert.equal(
    (header.match(/NAV_LINKS\.map/g) ?? []).length,
    2,
    "the shared Forms navigation entry must render in desktop and mobile menus",
  );
});

test("the Forms page links Patient Intake through the stable public address", () => {
  const page = fs.readFileSync("app/(marketing)/forms/page.tsx", "utf8");
  assert.match(page, /title: ["']Patient Intake Form["']/);
  assert.match(page, /href: ["']\/intake["']/);
  assert(!page.includes("script.google.com"));
});

test("the Forms page links the tour intake through its stable public address", () => {
  const page = fs.readFileSync("app/(marketing)/forms/page.tsx", "utf8");
  assert.match(page, /title: ["']Tour & Event Patient Intake["']/);
  assert.match(page, /href: ["']\/tour-intake["']/);
  assert(!page.includes("script.google.com"));

  const config = fs.readFileSync("next.config.ts", "utf8");
  assert.match(config, /source: ["']\/tour-intake["']/);
  assert.match(config, /exec\?form=tour/);
});

test("Group Visit guidance leads to the existing patient intake", () => {
  const page = fs.readFileSync("app/(marketing)/forms/page.tsx", "utf8");
  const guidance = fs.readFileSync("app/(marketing)/group-intake/page.tsx", "utf8");
  assert.match(page, /href: ["']\/group-intake["']/);
  assert.match(guidance, /Group Visits are intended for wellness care or mild, limited complaints/);
  assert.match(guidance, /CTAButton href="\/intake"/);
  assert.doesNotMatch(guidance, /saveGroupPatient|<form/);
});

test("the Forms page is included in the sitemap", () => {
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  assert.match(sitemap, /["']\/forms["']/);
});
