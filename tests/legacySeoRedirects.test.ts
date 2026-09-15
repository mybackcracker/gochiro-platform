import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config";

test("legacy SEO pages permanently redirect to their closest current equivalents", async () => {
  assert.equal(typeof nextConfig.redirects, "function");

  const redirects = await nextConfig.redirects!();
  const expectedRedirects = new Map([
    ["/expanded-chiropractic-visit-pricing", "/pricing"],
    ["/booking---appointment-policy", "/what-to-expect"],
    ["/faq", "/what-to-expect"],
    ["/chiropractor-in-brookhaven-pa", "/service-areas/brookhaven"],
    ["/chiropractor-in-media-pa", "/service-areas/media"],
    ["/chiropractor-in-west-chester-pa", "/service-areas/west-chester"],
    ["/chiropractor-aston-pa", "/service-areas/aston"],
    ["/chiropractor-in-chichester-pa", "/service-areas/boothwyn"],
    ["/towns/local-chiropractor-concordville-pa-2", "/service-areas/glen-mills"],
    ["/towns/mobile-chiropractor-in-media--pa", "/service-areas/media"],
    ["/towns/springfield", "/service-areas/springfield"],
    ["/blog/chiropractor-aston-pa", "/service-areas/aston"],
    ["/the-approach", "/philosophy"],
    ["/forms/new-patient-intake", "/forms"],
    ["/policies/financial-policy-agreement", "/pricing"],
    ["/chester-car-accident-treatment-2", "/contact"],
  ]);

  for (const [source, destination] of expectedRedirects) {
    const redirect = redirects.find((candidate) => candidate.source === source);
    assert(redirect, `missing redirect for ${source}`);
    assert.equal(redirect.destination, destination);
    assert.equal(redirect.permanent, true);
  }
});
