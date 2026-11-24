# Homepage search clarity — proposal for review

Status: proposed; not approved for production. Reviewed November 21, 2026.
Source baseline: main, 720f1e8a2dcad5e15ff473f078670658e2accc6b.

## Search Console baseline

User-supplied October 25–November 18, 2026: 1,175 impressions, 30 clicks,
2.55% CTR, average position 9.0. No query-level, page-level or device-level
export was supplied for this review. These aggregate figures do not identify
a particular page's ranking problem or predict the effect of the proposed changes.

## Proposed homepage — revised after discussion

- H1: “Mobile Chiropractor in Delaware County, PA & Surrounding Areas”.
- Supporting line: “Get chiropractic care at home or work.”
- Introduction: “Dr. David DeFries, DC brings one-on-one evaluation and hands-on
  treatment to you—for back pain, neck pain, stiffness, and difficulty moving comfortably.”
- Preserve the current service-area statement verbatim.
- Primary action: “Check Availability & Fees,” linking straight to the existing
  homepage ZIP checker. No dollar amounts or ZIP field in the hero.
- Secondary action: “Learn About Mobile Care,” linking to the next section.
  This replaces the separate hero pricing button.
- Next section H2: “Chiropractic care that looks beyond where it hurts”.
  Three brief cards explain evaluation/treatment, the equipment brought to
  the location, and findings/next-step guidance.
- The ZIP section heading is “Check availability & fees”. Prices remain in the
  existing location/visit/date flow. No separate pricing button beside the widget.
- Align homepage title/description with the revised introduction.
- Preserve photographs, canonical and structured-data coverage.

The initial “thoughtful care” supporting line and goals-oriented introduction
were rejected during review and are superseded by the copy above.
Only homepage content and its supporting-line CSS are edited. No rate, ZIP,
scheduling, checkout, deposit or service eligibility logic is changed. No new
town page is proposed. The draft remains unapproved for production.

## Live booking review

Browser observations on November 21, 2026:

1. Homepage ZIP 19014 exposes New Patient, Existing Patient and Group Visit choices.
2. New Patient opens the scheduling flow carrying the ZIP.
3. Before choosing a date, it displays weekday $100, Saturday $120, Sunday $140.
4. Choosing “This week” returns actual available dates. The selected Sunday
   initially shows $140; selecting Monday, November 23 changes it to $100.
5. Morning offers appointment times. Selecting 9:00 AM opens the contact/address
   form. No personal details were entered and no appointment was created.
6. Homepage ZIP 19148 routes to Check Your Visit Cost, retains that ZIP and asks
   for the street address, with no City field. No quote request was submitted.

This verifies entry, displayed pricing, date/time selection and routing, not
booking submission, email delivery, payments, calendar creation, or every visit
type and region. No booking-flow fix is proposed from this check. The draft uses
the existing pricing page and scheduler rather than copying rates into the hero.

## Redirect and canonical verification

Direct HTTP checks on November 21, 2026:

| Requested URL | Observed response |
| --- | --- |
| http://gochiromobile.com/ | 308 to HTTPS apex, then 308 to HTTPS www |
| http://www.gochiromobile.com/ | 308 to HTTPS www |
| https://gochiromobile.com/ | 308 to HTTPS www |
| https://www.gochiromobile.com/ | 200 |
| https://gochiromobile.com/book?start=new&zip=19014 | 308 to www, preserving path and query |
| https://gochiromobile.com/service-areas/aston | 308 to matching www town page |
| https://gochiromobile.com/chiropractor-in-boothwyn-pa | 308 to www legacy URL, then 308 to /service-areas/boothwyn |

The homepage canonical is https://www.gochiromobile.com. /book, /pricing and
all four reviewed town pages return 200 with matching www self-canonicals.
robots.txt points to https://www.gochiromobile.com/sitemap.xml.
All 69 sitemap URLs use HTTPS www, including all four reviewed towns.
Root metadataBase, schema base URL, sitemap and robots source agree.
No canonical or host redirect fix is proposed. The HTTP apex's extra redirect
is observed; there is no loop or lost query in the tested paths.

## Existing town-page review

Reviewed live responses and current source in lib/localAreas, the shared town
template, FAQ helpers and route metadata. Each page already has a unique H1,
meta description, canonical URL, local context, care information, visit
hours/pricing, booking link, and FAQs linking to conditions and treatments.

| Existing page | Useful content already present | Recommended next pass, if approved separately |
| --- | --- | --- |
| /service-areas/boothwyn | Boothwyn/Upper Chichester; approximately 15 years of local practice; nearby communities | Prioritize its local history and care information; reduce repeated convenience and group copy |
| /service-areas/springfield | Springfield/Morton and local travel context | Shorten the historical-road section around patient needs; independently verify historical claims before retaining prominent detail |
| /service-areas/aston | Family practice on Pennell Road; Neumann teaching; southern Delaware County connections | Retain the firsthand history; make availability and pricing easier to scan |
| /service-areas/media | Media Borough, Lima and Middletown Township; local connection | Retain the broader Media context; avoid implying the town name alone determines service eligibility or price |

The shared template repeats group-related information and uses broad regional
price ranges; those are review findings, not new pricing decisions. The homepage
draft does not alter them. Existing FAQs already link to low back pain, neck pain,
sciatica, treatments and visit expectations, so new duplicate pages are unnecessary.

## Validation and release gate

- TypeScript test compilation passed.
- Ten existing routing, weekend-selection, booking-contract and legacy-redirect
  checks passed, including covered ZIPs and out-of-state quote restrictions.
- The initial local production build failed inside Next's Google font loader
  in app/layout.tsx (Cannot read properties of null, reading '1').
  Do not describe that attempt as a successful production build.
- Production publication requires user approval after reviewing the draft.
- After approved deployment: check new H1, supporting line, next H2 and both
  hero links; then repeat the local and by-arrangement routing checks.
- Compare homepage Search Console results against the supplied baseline over a
  comparable later period, separating branded/local queries and devices if
  available. Avoid attributing every change in clicks to the headline alone.
