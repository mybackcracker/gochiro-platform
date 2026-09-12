import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("location titles begin with the unique place name", () => {
  const route = fs.readFileSync("app/(marketing)/service-areas/[slug]/page.tsx", "utf8");
  assert.match(route, /title: `\$\{content\.town\}, PA Mobile Chiropractor \| GoChiroMobile`/);
  assert.match(route, /alternates: \{ canonical: `\/service-areas\/\$\{content\.slug\}` \}/);
});

test("primary sitelink candidates have direct navigation and structured signals", () => {
  const header = fs.readFileSync("components/SiteHeader.tsx", "utf8");
  const layout = fs.readFileSync("app/(marketing)/layout.tsx", "utf8");
  [
    ["Forms", "Patient Forms", "/forms"],
    ["Pricing", "Pricing", "/pricing"],
    ["Service Areas", "Service Areas", "/service-areas"],
    ["Touring & Events", "Touring & Events", "/touring-production-care"],
    ["Contact", "Contact", "/contact"],
  ].forEach(([label, structuredLabel, href]) => {
    assert(header.includes(`{ href: "${href}", label: "${label}" }`));
    assert(layout.includes(`["${structuredLabel}", "${href}"]`));
  });
  assert.match(layout, /"@type": "WebSite"/);
  assert.match(layout, /"@type": "Organization"/);
  assert.match(layout, /"@type": "ItemList"/);
  assert.match(layout, /JSON\.stringify\(searchSignals\)\.replace\(\/<\/g, "\\\\u003c"\)/);
});

test("the canonical host is consistent across metadata and sitemap", () => {
  const rootLayout = fs.readFileSync("app/layout.tsx", "utf8");
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  assert(rootLayout.includes('metadataBase: new URL("https://gochiromobile.com")'));
  assert(sitemap.includes('const BASE_URL = "https://gochiromobile.com"'));
});
