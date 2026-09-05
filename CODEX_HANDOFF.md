# Codex Development Handoff

**Updated:** 2026-09-05  
**Repository:** `gochiro-platform`  
**Current scope:** GoChiroMobile website migration plus production scheduler

## Start here

1. Read `AGENTS.md`.
2. Before editing Next.js files, read the relevant installed guide in `node_modules/next/dist/docs/`; this project uses Next.js 16 and repository-local guidance takes precedence over remembered conventions.
3. Read `README.md` for setup and operations and `BOOKING_FLOW_SPEC.md` before changing the scheduler.
4. Check `git status` and recent commits before starting. Do not assume an old GoChiroMobile specification reflects the deployed code.
5. Preserve business behavior unless the task explicitly authorizes a change. In particular, Maintenance / Wellness Visits require **48 hours' advance booking**.

## Current architecture

- `app/(marketing)/` contains the public App Router site. `book-online` sends visitors into the scheduler through query-string entry points.
- `app/book/page.tsx` is one client component containing the scheduler state machine. It supports new patients, returning patients, and group visits; maintains an internal back stack; fetches availability; validates contact/address fields; and posts bookings.
- `lib/gochiro.ts` is the scheduler's canonical business configuration. It contains ZIP-to-region mapping, standard/premium tiers, visit metadata, lead times, Square links, contact constants, priority triage, and group calculations.
- `app/api/slots/route.ts` is the server authority for offered times. It enforces weekdays, Eastern business hours, calendar conflicts, travel buffers, and visit lead time.
- `app/api/book/route.ts` is the server authority for booking. It validates required input and lead time again, checks the slot again, inserts a calendar event, and triggers best-effort email delivery.
- `lib/googleAuth.ts`, `lib/googleCalendar.ts`, `lib/gmail.ts`, and `lib/intakeAuthorization.ts` implement delegated Google Workspace access. Intake authorization uses a dedicated protected Sheet and never stores raw tokens or PHI.
- `lib/bookingEmail.ts` builds patient/host and internal notifications. Individual visits can include their fixed Square link; group visits intentionally have no Square link.
- `lib/timezone.ts` centralizes Eastern-time conversion. Avoid replacing it with server-local `Date` calculations.
- `lib/localAreas/` is the typed content registry behind dynamic service-area pages and the service-area hub.

## Rules that are easy to regress

- **Maintenance lead time is 48 hours.** `VISITS.maintenance.minLeadDays` is two days; the UI warning and both APIs agree.
- Care Plan Visits currently require 8 hours. New-patient and all priority variants require 2 hours. Group Visits require 24 hours.
- New-patient pricing is $100 standard / $160 premium. Other fixed-price premium visits use a $40 surcharge.
- The scheduler uses five internal regions: East, West, Central, MainLine, and WestChester. Central, MainLine, and WestChester are premium.
- Candidate starts use a 30-minute cadence. Business closes are inclusive start times, so a visit may end after the displayed closing hour.
- Same-region buffer is zero only for maintenance and ten minutes for other visits. Cross-region buffers range from 35 to 60 minutes.
- Unrecognized calendar events still block direct overlap even though no region travel buffer can be inferred.
- `/api/book` deliberately rechecks only direct overlap immediately before insert. Do not claim this is a transactional lock; two concurrent requests can still race.
- The calendar event's `location` stores the region label because availability reads it back to infer travel buffers. The patient's street address belongs in the description.
- A successful calendar insert is not rolled back if Gmail delivery fails.
- Group duration and price must always be recomputed server-side from participant counts. The minimum is two people, with no implemented maximum.
- The returning-patient path currently relies on explanatory copy (“seen within the past 12 months”) rather than a separate yes/no history screen.
- Fixed Square links are visible on the individual booking review and confirmation screens as well as in emails. Do not document email-only payment links unless behavior changes.

## Production integration checklist

The application accepts the complete Google service-account JSON in `GOOGLE_SERVICE_ACCOUNT_KEY_JSON` (preferred for Vercel) or a local key path in `GOOGLE_SERVICE_ACCOUNT_KEY_PATH`. Optional overrides are `GOCHIRO_CALENDAR_OWNER`, `GOCHIRO_CALENDAR_ID`, and `GOCHIRO_EMAIL_SENDER`. Secure intake issuance additionally requires `GOCHIRO_INTAKE_AUTH_SPREADSHEET_ID`, `GOCHIRO_INTAKE_BASE_URL`, and `GOCHIRO_INTAKE_LINKS_ENABLED=true`; keep the flag false until the intake application's validation and atomic single-use consumption are implemented.

Before an end-to-end production check, confirm:

- the service account has domain-wide delegation for Calendar and Gmail send scopes;
- the calendar owner and calendar ID point at the intended, safe calendar;
- the delegated mailbox can use `contact@gochiromobile.com` as a verified send-as alias;
- the calendar contains region-identifiable titles/locations where travel buffers matter;
- the Square and intake links in `lib/gochiro.ts` are still current.

Never commit key material or `.env.local`.

## Validation and review

For every change, run:

```bash
npm run lint
npm run build
npm test
```

The automated suite uses synthetic mocks and does not call Google services. For scheduler behavior changes, also manually cover new, returning, and group routes; back navigation; rejected ZIPs; lead-time boundaries; empty availability; contact errors; booking conflicts; calendar event content; and email failure behavior. Use a non-production calendar for destructive tests.

If a UI change is perceptible, capture a screenshot as required by the repository workflow. Documentation-only changes do not require one.

## Known follow-up opportunities (not authorization to change behavior)

- Add unit tests for `lib/scheduling.ts`, `lib/timezone.ts`, priority triage, price/group calculations, and exact lead-time boundaries.
- Add request-level tests for both scheduler API routes, including malformed dates, weekends, unknown-region events, group counts, and stale-slot conflicts.
- Split the large booking page into testable state/step components without changing the flow.
- Decide whether returning patients need an explicit 12-month yes/no gate rather than the current informational copy.
- Reconcile the group confirmation-screen wording with the implemented email behavior: the host receives the intake link and must share it with each new participant.
- Consider stronger concurrency control around the final availability check and calendar insertion.
- Confirm whether the configured `CALENDAR_ID` export in `lib/gochiro.ts` is intentionally retained; the active Calendar integration reads environment configuration in `lib/googleCalendar.ts`.

Treat these as review items. Obtain business approval before changing pricing, eligibility, hours, lead times, cancellation policy, email content, payment handling, ZIP coverage, or scheduler navigation.
