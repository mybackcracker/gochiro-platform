# Extended-area travel quote: address-first flow

## Patient experience
The page /check-your-location shows a concise heading, one explanatory sentence, and three fields: street address, city and ZIP. The entered ZIP may be prefilled from the scheduler.

1. The user enters the full visit address and taps "See Estimated Price."
2. If the address is beyond the regular service area in Pennsylvania, the server calls Google Routes for each direction and displays an estimated **weekday first-visit total**. Only the care fee and aggregate travel fee appear; the internal hourly rate is not advertised.
3. The user taps "I'd Like to Request a Visit" to reveal only name, reply preference, contact details, timing and the price/deposit acknowledgment. The parking, stair and elevator questions are deferred. No payment or booking is created.
4. The practice email includes the complete destination address, price breakdown, the user's acknowledgment and contact/timing.

An automatic routing failure shows a short explanation and the optional personal quote request path. The user must actively choose that path before the contact fields appear. Ordinary covered ZIPs direct the user to regular booking.

## Pricing and trust
The internal travel fee is $100 per expected round-trip driving hour, with travel rounded to the nearest $25 (half-up). For the initial quote, the appointment component is the existing $100 standard weekday new-patient fee. The result is an **estimate**, not a fixed quote; exact location, timing and care type are confirmed before accepting.

The signed quote includes the destination **street address, city, PA and ZIP** in canonical form. The visit request server refuses a token issued for a different address, preventing a quote for one ZIP or street being carried to another address. Signed snapshots last up to seven days. Addresses and tokens are sent by POST, not placed in quote URLs.

An approved appointment requires a deposit of at least 50%, arranged separately before confirmation. Cancellation terms are visible under a collapsed disclosure in the contact step. No dynamic payment link, charge or appointment is created by this feature.

## Deployment prerequisites
This PR is intentionally not deployed to the production website until a working Vercel Preview is confirmed. Configure:
- Server-only GOOGLE_ROUTES_API_KEY, restricted to Routes API.
- Server-only GOOGLE_ROUTES_ORIGIN, the practice's approved starting street address. Never expose this origin or the API key to browsers or repo.
- Enabled Google Routes API and billing, with strict Google quotas and Vercel rate limits.

Then validate npm run lint, npm run build and npm test in an environment with project dependencies. In Preview, test a covered ZIP (19061), Gap PA (17527) with a complete address, changing the street after quoting, accepting the price, the error/manual path, and exactly one authorized synthetic request/email. Do not make a live patient request as a test.
