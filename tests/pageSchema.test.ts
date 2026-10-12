import test from "node:test";
import assert from "node:assert/strict";
import { pageSchema } from "../lib/pageSchema";
import { BUSINESS_SCHEMA_ID } from "../lib/businessSchema";

test("page identity uses a stable www URL and shared organization without inventing a service", () => {
  const graph = pageSchema({ path: "/contact", name: "Contact", description: "Contact the practice", type: "ContactPage" });
  assert.equal(graph["@graph"].length, 1);
  const page = graph["@graph"][0];
  assert.equal(page["@type"], "ContactPage");
  assert.equal(page.url, "https://www.gochiromobile.com/contact");
  assert.ok("publisher" in page);
  assert.deepEqual(page.publisher, { "@id": BUSINESS_SCHEMA_ID });
  assert.equal("mainEntity" in page, false);
});

test("service is linked to its own page and the same practice, with supplied coverage only", () => {
  const graph = pageSchema({ path: "/philadelphia/workplace", name: "Workplace care", description: "By arrangement", service: { name: "Workplace chiropractic care", description: "By arrangement", areas: ["Philadelphia, Pennsylvania"] } });
  const [page, service] = graph["@graph"];
  assert.ok("mainEntity" in page);
  assert.ok("provider" in service && "areaServed" in service);
  assert.deepEqual(page.mainEntity, { "@id": service["@id"] });
  assert.deepEqual(service.provider, { "@id": BUSINESS_SCHEMA_ID });
  assert.deepEqual(service.areaServed, [{ "@type": "Place", name: "Philadelphia, Pennsylvania" }]);
  assert.equal("address" in service, false);
  assert.equal("aggregateRating" in service, false);
  assert.equal("offers" in service, false);
});

test("homepage identity does not depend on a query string or alternate host", () => {
  const graph = pageSchema({ path: "/", name: "Home", description: "Mobile care" });
  assert.equal(graph["@graph"][0]["@id"], "https://www.gochiromobile.com#webpage");
});
