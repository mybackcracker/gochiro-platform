# GoChiroMobile Booking Flow Specification

**Status:** Implemented behavior, reconciled with the live repository on 2026-09-05.
**Scope:** `/book`, `/api/slots`, `/api/book`, calendar creation, and booking emails.
**Change control:** This document describes the code; it does not authorize business-rule changes. If documentation and implementation diverge, verify the deployed behavior and update both deliberately.

## 1. Canonical visit rules

Central, Main Line, and West Chester use premium pricing. East and West use standard pricing.

| Visit type | Calendar duration | Standard | Premium | Minimum advance booking | Same-region calendar buffer |
|---|---:|---:|---:|---:|---:|
| New Patient, First Visit | 45 min | $100 | $160 | 2 hours | 10 min |
| Maintenance / Wellness Visit | 20 min | $60 | $100 | **48 hours** | 0 min |
| Priority Visit | 20 min | $80 | $120 | 2 hours | 10 min |
| Priority Visit (Multiple Complaints / Severe) | 40 min | $100 | $140 | 2 hours | 10 min |
| Priority Visit (Accident / Work Injury) | 45 min | Insurance/claim; no fee | Insurance/claim; no fee | 2 hours | 10 min |
| Care Plan Visit | 20 min | $80 | $120 | 8 hours | 10 min |
| Group Visit | Computed | Computed | Computed | 24 hours | 10 min |

Maintenance's 48-hour minimum is a hard rule. The UI states it twice, the availability endpoint removes earlier slots, and the booking endpoint rejects an earlier submitted start.

For fixed-price visits other than New Patient, premium is standard plus $40. New Patient is explicitly configured at $100/$160 rather than calculated with the surcharge.

### Group Visit calculation

- At least two participants; no maximum is enforced.
- New patients cost $60 each and add 20 minutes each.
- Existing patients cost $40 each and add 10 minutes each.
- One travel fee is added to the booking: $20 standard or $40 premium.
- The host is responsible for the combined total.
- Group visits are wellness-focused, not for acute injury, a significant new complaint, or a condition requiring individualized evaluation.
- There is no fixed Square link. Payment is due at or before the visit.

### General policy

- Cancellation or rescheduling requires at least 24 hours' notice. Late changes and no-shows carry a flat $50 fee; for a group this applies once to the booking.
- The appointment time is an ETA. Policy and email copy allow about 15 minutes of travel flexibility on either side.
- Cash, check, credit card (HSA/FSA eligible), and Venmo are accepted.
- New-patient intake must be complete at least two hours before the appointment.

## 2. Entry points and navigation

`/book` starts on a three-option landing screen:

1. New Patient, First Visit
2. Returning Patient, Follow-Up
3. Group Visit, 2+ People

The website skips this screen with `/book?start=new`, `/book?start=returning`, or `/book?start=group`. On a deep-linked flow, Back from the first step returns to `/`. Otherwise, Back walks the scheduler's stored step history and retains entered state. Within triage and time selection, it moves back one sub-step.

The returning option is labeled for patients seen by Dr. DeFries within the last 12 months. The current implementation does **not** ask a separate yes/no 12-month question and does not automatically redirect older patients; the explanatory landing copy tells them to use New Patient.

## 3. New-patient flow

1. **ZIP and price.** Accept exactly five digits, look up a configured service region, and show the single applicable $100 or $160 fee. An unsupported ZIP cannot continue and displays the call/text fallback.
2. **Policy.** Show cancellation, travel-flexibility, intake, and payment terms in a scrollable panel. Agreement checkbox is required.
3. **Time funnel.** Offer timing bucket, available day, time-of-day period, and slots.
4. **Contact and appointment address.** Require first name, last name, ten-digit US phone, email, street, city, state, and five-digit address ZIP. Unit/suite is optional. Fields show inline validation errors. The address ZIP is contact/location data; the initially selected service ZIP continues to determine scheduling region and price.
5. **Review.** Display visit, date/time, complete address, service ZIP, displayed region, and fee. The patient can confirm and open intake immediately or confirm and rely on the emailed intake link. A fixed Square payment link is also available on this screen.
6. **Confirmation.** Display success, appointment time, Square link, and intake link.

## 4. Returning-patient flow

1. **Region.** Choose East, West, Central, Main Line, or West Chester. “Enter my ZIP code” is the fallback; a valid ZIP maps to a region.
2. **Visit type.** Choose Maintenance / Wellness, New Complaint / Priority, or Care Plan.
3. **Branch.**
   - Maintenance shows the 48-hour warning and offers either Priority triage or continuation. Continuing skips the timing-bucket question and probes the next seven business days, still filtering every result against the exact 48-hour boundary.
   - Priority runs the triage sequence below.
   - Care Plan enters the ordinary time funnel with its implemented eight-hour minimum.
4. **Time, contact, review, and confirmation.** These reuse the common funnel and required contact/address fields. Returning patients do not receive the new-patient intake choice in the UI. A configured Square link is shown for payable individual visits.

### Priority triage

Questions are evaluated in this order and branches short-circuit:

1. Accident or work-related injury? **Yes →** 45-minute accident/work visit, billed to insurance/claim.
2. One complaint or multiple complaints? **Multiple →** 40-minute upgraded priority visit.
3. Mild-to-moderate or severe/radiating? **Severe/radiating →** 40-minute upgraded visit; **mild-to-moderate →** 20-minute standard priority visit.

The 20-minute outcome requires no accident/injury, one complaint, and mild-to-moderate pain.

## 5. Group flow

1. Enter new- and existing-patient counts; total must be at least two.
2. Enter a covered ZIP. The screen shows per-person components, one travel fee, and the full group total.
3. Agree to group eligibility, host payment responsibility, cancellation, intake, and travel-flexibility policy.
4. Use the common time funnel under the 24-hour minimum. Slot duration is recomputed from the participant counts.
5. Enter the host's required contact information and appointment address. Individual attendees are not collected.
6. Review participant subtotals, travel fee, and total; then confirm without advance payment.
7. The host receives the confirmation and, when the group contains new patients, an intake link to share with each new-patient participant.

## 6. Time and availability rules

### Patient-facing funnel

- “As soon as possible” probes the next three business days.
- “This week” probes the next seven business days.
- “In the future” opens a date input.
- Maintenance skips the bucket and probes seven business days.
- Only days with returned availability become day tabs.
- After choosing a day, patients select Morning (before noon), Afternoon (noon–before 3:00 PM), or Evening (3:00 PM onward), then a list capped at seven slots.
- Visit duration is not displayed on time-selection screens.

### Server availability

- Business timezone: `America/New_York`.
- Closed Saturday and Sunday.
- Monday–Thursday candidate starts: 9:00 AM through 6:00 PM.
- Friday candidate starts: 9:00 AM through 4:00 PM, except Main Line and West Chester, which end at 2:00 PM.
- The stated close is an inclusive **start** time, not a required appointment end time.
- Candidate cadence is 30 minutes for every visit.
- Recognized existing events receive the configured same-region buffer or cross-region travel buffer (35–60 minutes).
- Events with no detectable region still block direct overlap.
- Lead time is evaluated against each slot timestamp, not merely its calendar date.

## 7. API contracts and booking side effects

### `GET /api/slots`

Required query parameters are `region`, `visit`, and `date` (`YYYY-MM-DD`). Group requests also require integer `newCount` and `existingCount` forming a valid composition. Success returns `{ "slots": [<ISO timestamp>, ...] }`; weekends return an empty list.

### `POST /api/book`

The body contains region, visit, the selected ISO start, name, phone, email, and full appointment address. Group requests also contain participant counts. The endpoint:

1. validates region, visit, start, required contact/address values, and group composition;
2. rejects weekends and re-evaluates the visit's exact minimum lead time;
3. derives the end time from fixed visit duration or group composition;
4. rechecks direct calendar overlap immediately before insertion;
5. creates the Google Calendar event; and
6. attempts patient/host and internal notification emails.

A stale occupied slot returns HTTP 409. Calendar/auth failures return HTTP 500. Email sends are best-effort after calendar creation: failures are logged and do not change a successful booking response.

Calendar event locations retain a recognizable region label so later availability checks can infer travel buffers. The street address and contact details are stored in the description. Group events identify the host and participant composition.

## 8. Confirmation and payment emails

Individual confirmation emails include appointment date/time, ETA range, full address, preparation notes, fee or claim-billing statement, accepted payment options, and the configured Square link when one applies. New-patient emails include the intake link and two-hour deadline. The practice receives a separate booking notification.

Group host emails include appointment/address details, participant breakdown, travel fee, total, accepted payment methods, and (when needed) the intake link the host must share. They intentionally contain no Square link. The practice receives a group notification.

## 9. Deferred decisions and known limitations

These are observations, not approved changes:

- Returning patients do not have an explicit 12-month history gate.
- No automated cancellation/reschedule workflow enforces the policy after booking.
- The final free-slot check and calendar insert are separate operations rather than a transactional lock.
- Email failure is not exposed as a warning after a successful calendar booking.
- Group attendees are not individually collected, so intake distribution depends on the host.
- The scheduler has no automated tests; changes currently rely on lint, production build, and manual integration checks.
