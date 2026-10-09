# Public-page search audit — October 9, 2026

## Scope and outcome

Audited all 49 current public content/booking routes: 48 sitemap entries plus the interactive /book route. Redirect-only /intake, /tour-intake, /tour-schedule and historical redirects are outside page-schema coverage. API routes are not search landing pages. Draft condition/treatment pages in PR #37 are not on main and were not published by this audit.

Implemented page-specific WebPage/AboutPage/ContactPage/CollectionPage schema across all content pages; Service schema for workplace, touring-production, laser-by-advance-request and both group pages. Existing homepage LocalBusiness, doctor Person, town Service, FAQ and Philadelphia/hotel Service data remain. Services reference the same organization identity. Do not add fabricated reviews, street addresses, fees or affiliations.

Aligned metadataBase, all page canonical URLs, sitemap and robots sitemap discovery to https://www.gochiromobile.com. Added missing exercise library and all ten exercise detail pages, group-intake guidance, laser page and touring subpages to the sitemap. /book-online remains the public booking landing page; /book has its own metadata/canonical but is not promoted in the sitemap. Philadelphia and hotel pages now have footer links across the marketing site.

## Validation

Production build/TypeScript and 44 tests passed. Focused lint has no errors; four pre-existing exercise-image optimization warnings remain. Generated HTML: 48 checked with the dynamic request route deferred. Full local HTTP crawl: all 49 returned 200, exactly one nonempty title/description/canonical each, valid JSON-LD and an appropriate page type, consistent www schema URLs, no unexpected noindex and no unresolved internal-link destinations. This validates output and linking, not eligibility for Google rich results or indexing.

A reusable read-only checker is scripts/audit-search.py. After production deployment, run it with --base-url https://www.gochiromobile.com and retain the per-page output. No forms, emails or SMS are submitted by the checker.

## Next exposure work

1. Search Console: inspect indexing/canonical selection for Philadelphia, hotel, workplace and touring pages; review Pages and Web Performance reports. Request indexing where appropriate and verify the refreshed www sitemap. No Search Console operation or ranking gain is claimed by this source audit.
2. Publish reviewed condition/treatment content from PR #37 after clinical/editorial and visual review. It is a separate pending release; do not merge it as part of a technical schema pass.
3. Review remaining main-page title/description drafts. Book Online, Service Areas, Pricing and Philosophy descriptions are brief/general and can be more useful. Keep previously approved homepage/town wording unless separately revised.
4. Verify public Google Business Profile/social URLs and add only genuine identity links; collect real review permissions before testimonials or review markup. No made-up reviews.
5. Hotel concierge/contact outreach remains queued; track inquiries, accepted quotes and completed visits alongside organic visits. Link relevant Essington/airport traveler content to hotel care in a future content pass.
6. Exercise instructions are predominantly images. Consider accessible text versions based on the actual instructions; do not infer clinical directions from filenames. Four existing image warnings remain; no measured Core Web Vitals audit was performed.

## Search and AI limits

Google states AI Overviews/AI Mode use normal Search eligibility and need no special AI schema or AI text file. Clear indexable text, useful internal links, accurate business information and helpful content remain relevant. An llms.txt file is not required for Google AI features, so it is not prioritized ahead of indexing/content/outreach. Schema must match visible content; Service markup itself is not a promised Google rich-result feature.

Primary references:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies

## Route inventory

| Route | Schema types in rendered HTML | Canonical/link check |
| --- | --- | --- |
| / | WebSite, Organization, ItemList, WebPage, LocalBusiness | Passed |
| /about | WebSite, Organization, ItemList, AboutPage, Person | Passed |
| /book-online | WebSite, Organization, ItemList, CollectionPage | Passed |
| /contact | WebSite, Organization, ItemList, ContactPage | Passed |
| /philadelphia | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /philadelphia/workplace | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /philadelphia/hotel-visits | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /check-your-location | WebSite, Organization, ItemList, WebPage | Passed |
| /forms | WebSite, Organization, ItemList, CollectionPage | Passed |
| /group-intake | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises | WebSite, Organization, ItemList, CollectionPage | Passed |
| /high-intensity-laser-therapy | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /group-visits/standard | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /group-visits/premium | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /philosophy | WebSite, Organization, ItemList, WebPage | Passed |
| /pricing | WebSite, Organization, ItemList, WebPage, FAQPage | Passed |
| /service-areas | WebSite, Organization, ItemList, CollectionPage | Passed |
| /touring-production-care | WebSite, Organization, ItemList, WebPage, Service | Passed |
| /touring-production-care/care-approach | WebSite, Organization, ItemList, WebPage | Passed |
| /touring-production-care/how-it-works | WebSite, Organization, ItemList, WebPage | Passed |
| /touring-production-care/request | WebSite, Organization, ItemList, WebPage | Passed |
| /what-to-expect | WebSite, Organization, ItemList, WebPage | Passed |
| /service-areas/aston | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/brookhaven | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/boothwyn | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/garnet-valley | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/ridley-park | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/springfield | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/media | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/wallingford | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/glenolden | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/essington | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/newtown-square | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/west-chester | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/chadds-ford | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/havertown | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/main-line | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /service-areas/glen-mills | WebSite, Organization, ItemList, WebPage, Service, FAQPage | Passed |
| /exercises/shoulder-circumduction | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/wrist-forearm-isometrics | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/glute-bridge | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/chin-tuck | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/scapular-retraction | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/hip-flexor-stretch | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/hip-hinge | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/calf-complex-stretch | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/foot-ankle-strength | WebSite, Organization, ItemList, WebPage | Passed |
| /exercises/forearm-rotation-isometrics | WebSite, Organization, ItemList, WebPage | Passed |
| /book | WebPage | Passed |
