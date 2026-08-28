# Go Chiro Mobile — Booking Flow Specification (v2)

**Status:** Supersedes the workflow/logic assumptions in the original `gochiro-platform` build (the version that reached a working end-to-end test on 2026-08-08 with placeholder Square links). Pricing, visit types, and screen order below are the current source of truth. Cross-check against `~/gochiro-intake/SCHEDULER_SPECIFICATION.md` and `~/gochiro-intake/NEXT_STEPS.md` if those exist — they were never reviewed during this spec's creation and may contain additional authoritative detail.

**Brand positioning note:** Copy tone throughout should be confident and clean — concierge/premium, not folksy or overly friendly. This is a deliberate shift to attract more affluent patients. Avoid cute/playful language on functional screens.

---

## 1. Visit Types, Pricing, Duration, Buffers

Premium pricing = standard pricing **+ $40 flat**, applied uniformly across every visit type. (This replaces any per-type premium numbers from the prior build — regenerate all premium prices from this rule rather than hardcoding old values.)

| Visit Type | Duration | Standard | Premium | Lead time / buffer | Notes |
|---|---|---|---|---|---|
| New Patient, First Visit | 45 min | $180 | $220 | 2 hr buffer | Slot cadence: every 30 min |
| Maintenance / Wellness Visit | 20 min | $60 | $100 | **48 hr** lead time required | Not for painful/acute conditions |
| Priority Visit — standard | 20 min | $80 | $120 | 2 hr buffer | See triage tree below |
| Priority Visit — upgraded | 40 min | $100 | $140 | 2 hr buffer | See triage tree below |
| Priority Visit — accident/work injury | 45 min | **No fee shown** (bills to insurance/claim) | — | 2 hr buffer | Still 45 min on the calendar |
| Care Plan Visit (renamed from "Comprehensive") | 20 min | $80 | $120 | 2 hr buffer (NOT 48 hr) | For patients on an active care plan |

**Global buffer rule:** every visit type gets a 2-hour lead-time/buffer, **except** Maintenance, which requires 48 hours. (This replaces the old idea of a separate buffer matrix per visit type — care plan and priority both explicitly use the 2 hr rule, deliberately, so patients can't use "care plan" as a loophole to book same-day for something urgent.)

**Cancellation / no-show policy:** flat $50 fee regardless of visit type (rejected the idea of a higher new-patient fee — kept simple). Requires 24 hr notice for cancellation/reschedule.

**Payment methods accepted:** cash, check, credit card (HSA/FSA accepted), Venmo. Payment due at or before the visit. **No Square payment links appear anywhere in the booking flow itself** — they are placeholder-free by design on-form. Square links only appear in the post-booking confirmation email.

---

## 2. Priority Visit Triage Tree (returning patients)

Question order matters — this is the final, confirmed sequence:

1. **"Was this related to an accident or work-related injury?"**
   - **Yes** → 45 min visit, no fee shown (insurance/claim billing). Done — skip remaining questions.
   - **No** → continue to Q2.

2. **"Is this one complaint, or multiple complaints / whole-body?"**
   - **Multiple** → 40 min visit (priority-upgraded), $100 / $140. Done.
   - **One** → continue to Q3.

3. **"Is your pain mild-to-moderate, or severe/radiating?"**
   - **Severe/radiating** → 40 min visit (priority-upgraded), $100 / $140.
   - **Mild-to-moderate** → 20 min visit (priority-standard), $80 / $120. This is the *only* path that stays at 20 minutes.

**Summary:** the 20-minute/$80 outcome requires ALL THREE of: no accident/injury, one complaint only, mild-to-moderate pain. Any other combination = 40 min upgraded visit (except the accident/injury branch, which short-circuits to 45 min/no-fee immediately).

---

## 3. New Patient Flow (screen by screen)

1. **Landing screen** — Two buttons: **"New Patient, First Visit"** and **"Returning Patient, Follow-Up."** Headline: "Schedule Your Appointment" (plain, confident — not cute). Small supporting copy near the returning-patient button: implied via the flow in step 2 below (moved from static text to an active question).

2. Patient clicks **New Patient, First Visit** → straight to ZIP code screen (no 12-month-lookback question needed; new patient already tells us everything).

3. **ZIP code screen.** Copy should ask for ZIP to determine region/fees (reworded to lead with purpose, not mechanics). 5-digit validation, blocks Continue until valid. **Immediately on confirmation, show the applicable price on this same screen (or the very next one): "New Patient, First Visit — $180"** (or $220 if premium region) — show ONLY the single applicable price, never both tiers side by side. Region name itself does not need to be shown to the patient (it's used internally only).

4. **Booking policy screen** (moved here, before date/time investment — filters out non-agreers before they sink time into scheduling). Scrollable terms box. Must cover, in short mobile-friendly lines:
   - Cancellation/reschedule requires 24 hr notice; late cancellation or no-show may incur a $50 fee.
   - Arrival window note: "Please allow ~15 minutes flexibility on either side of your scheduled time for travel." (Framed as reassurance, not an uncertain time range — do NOT show an explicit arrival window like "10:00–10:20" on the booking screens themselves.)
   - Checkbox/active confirmation required to proceed.

5. **Date/time selection — "funnel" pattern** (replaces raw calendar-first UX, which is bad on mobile):
   - First, present timing buckets as large tappable options: **"As soon as possible," "This week," "In the future."**
   - **As soon as possible / This week** → narrow-first funnel: show day tabs (e.g., today/tomorrow/day-after for ASAP), check real availability against the 2-hr buffer server-side (if it's 11am and buffer pushes past remaining hours, roll to next day automatically) → then ask **"Morning or afternoon?"** → then show only 2-3 slots within that window (not a full list of 8 slots on one screen).
   - **In the future** → opens an actual calendar picker (this is the one path where a calendar makes sense, since range is wide) → after date picked, same "morning or afternoon" funnel → slots.
   - Slot cadence for new patient: **every 30 minutes** (not on-the-hour only — final decision after going back and forth). This cadence absorbs the 45-min visit length's overrun risk without needing to show duration to the patient.
   - **Never show visit duration or visit-length info to the patient on the time-selection screen.** Strip "45 minutes" type labels entirely from patient-facing UI.

6. **Contact information screen** (renamed from "New Patient" header — drop the "New Patient" label here, it's just noise). Fields: first name, last name, email, phone, **and full street address (required) where the appointment will take place** — this was previously missing from the build and is now required. Address line 2 (unit/apt) may be present but should not be marked required. Phone field needs:
   - `autocomplete="tel"` attribute so browser autofill works correctly (currently broken — first/last/email autofill but phone doesn't).
   - Proper formatting/max-length validation (currently accepts up to 100 characters unformatted — needs standard US 10-digit format).
   - **All fields are implicitly required** (no asterisks needed) but attempting to Continue with missing/invalid fields must show a clear inline error identifying what's missing — currently fails silently with no feedback at all, which is a bug.

7. **Intake form choice screen.** Explains the intake form must be completed within 2 hours of the appointment or the appointment may be cancelled and a missed-appointment fee applied. Two paths: complete it now (inline), or skip — a link will be emailed to them.

8. **Review/confirmation screen.** Do NOT restate the patient's name (redundant, they just typed it). Show: date, time, visit type + price. Small print at the bottom (short lines, mobile-friendly) covering:
   - Cancellation policy + $50 no-show fee + 24hr notice requirement.
   - Accepted payment methods: "Cash, check, credit card (HSA/FSA accepted), and Venmo. Payment is due at or before your visit."
   - Intake form reminder: "Your intake form must be completed within 2 hours of your appointment. Complete it now below, or a link will be emailed to you." (button to complete now / continue).
   - Do NOT put the arrival-window/15-minute note here — that lives only on the policy screen (step 4), not duplicated here.

9. **Final confirmation screen.** Confirms booking succeeded. **Confirmation email** (not yet built — flagged as a new build item) should include: appointment date/time, address, a Square payment link (this is the ONLY place Square links appear in the whole system), and the intake form link if not already completed.

---

## 4. Returning Patient Flow (screen by screen)

1. Landing screen → click **Returning Patient, Follow-Up**.

2. **"Have you been seen in the last 12 months?"** — Yes/No, presented as an active question (not passive text), so it can't be skipped past.
   - **No** → routes into the New Patient flow starting at the ZIP/price screen (step 3 of Section 3 above) — they do NOT see the initial New-Patient-vs-Returning button screen again, since we already know their answer.
   - **Yes** → continue to step 3 below.

3. **Region selection screen.** Show the five regions (East, West, Central, Main Line, West Chester) as tappable, color-coded shapes/buttons — most returning patients will already know their region after a few visits. Include an **"I don't know my region"** fallback option that opens a ZIP code lookup, which then tells them their region and carries them forward. (Region is still tracked internally for pricing/buffers exactly as before — this only changes how it's surfaced to repeat patients.)

4. **Visit type screen.** Three options, terse/direct labels (not first-person phrasing):
   - **Maintenance / Wellness Visit**
   - **New Complaint / Priority Visit**
   - **Care Plan Visit**

   - If **Maintenance** selected → show inline warning: *"Maintenance visits must be scheduled 48 hours in advance and are not intended to treat painful conditions. If you need care sooner, please select Priority Visit."* Two buttons: **"I need to be seen sooner"** (routes to Priority triage) or **"Continue with Maintenance Visit"** (proceeds to date/time funnel under the 48hr rule).
   - If **New Complaint / Priority Visit** selected → enters the triage tree (Section 2 above).
   - If **Care Plan Visit** selected → short reassuring copy: "For patients currently enrolled in an active treatment plan." No triage questions. Straight to date/time funnel under the 2hr buffer.

5. **Date/time funnel** — identical pattern to Section 3 step 5 (today/tomorrow/this-week/future buckets → morning/afternoon → slots), with buffer/lead-time enforced per visit type per the table in Section 1 (48hr for Maintenance, 2hr for everything else).

6. **Contact info** — same screen/validation rules as new patient (Section 3 step 6), though returning patients may have info on file already (pre-fill if available; still show full flow if not).

7. **Intake form choice** — only relevant if not already on file / condition has changed; use judgment call here, not fully specified in this session — flag for follow-up if it needs to differ from the new-patient version.

8. **Review/confirmation + final confirmation** — same as Section 3 steps 8–9.

---

## 5. Deferred / Not Yet Decided

- **Motor vehicle accident / work injury branch for the *initial* screening question** (i.e., asking this before someone even gets into the new-patient flow, not just inside the priority triage) — explicitly tabled by David: *"we're gonna have to revisit that."* Do not build this into the new-patient path yet.
- Whether returning patients ever need a **fresh intake form** if their condition has materially changed — not resolved.
- **Confirmation email / SMS system** — does not exist yet. Needs to be built: triggered on successful booking, includes appointment details + Square payment link + intake form link (if applicable).
- Real Square payment links for priority-standard, priority-upgraded, and care-plan visit types — still pending from David (carried over from prior build; irrelevant to the on-form UI now since Square never appears on the form, but still needed for the confirmation email).

---

## 6. Known Bugs to Fix (found during this walkthrough on the *old* build)

- "Existing Patient" button was non-functional at time of this session — needs debugging before returning-patient path can even be tested.
- Back navigation resets the entire form instead of stepping back one screen.
- Available hours cut off around 4:30pm even though actual business hours extend later — availability generation bug, not a real hours restriction.
- Phone field: missing `autocomplete="tel"`, no max-length/format validation (currently accepts 100 chars).
- Missing required-field validation feedback (silently fails to advance instead of showing an error).
- Visit duration currently shown to patients — must be removed everywhere on patient-facing screens.

---

## 7. Explicitly Rejected Ideas (do not reintroduce without David raising them)

- Showing an explicit arrival time *range* (e.g., "between 10:00–10:20") on booking screens — rejected in favor of a generic "allow ~15 min flexibility" note on the policy screen only.
- Differentiated no-show fees by patient type ($80 new / $50 returning) — rejected in favor of flat $50 for everyone.
- On-the-hour-only slot starts for new patients — superseded by the 30-minute cadence decision.
- A dedicated arrival-window/cancellation-policy screen — folded into the existing Review screen (new patient) / Policy screen (as noted above) instead of a standalone screen, since most people skim past this content anyway.
- Chatbot-style interface instead of a structured booking page — considered and rejected; structured multi-step form is better for validation and background rule enforcement (lead times, buffers).

---

## 8. Group Visit (added 2026-08-28, implemented)

**Canonical source:** `GoChiroMobile-OS`'s `GROUP_VISIT_SPECIFICATION.md` — resolved 2026-08-28. This section summarizes what was actually implemented in `app/book/page.tsx`, `lib/gochiro.ts`, `app/api/slots/route.ts`, `app/api/book/route.ts`, `lib/googleCalendar.ts`, and `lib/bookingEmail.ts`; treat the source document as authoritative if the two ever disagree.

**Who qualifies:** Wellness-focused only — not for an acute injury, a significant new complaint, or a chronic condition needing individualized evaluation/treatment (book an individual visit type instead). Minimum 2 participants, no maximum enforced. New and existing patients may mix in the same booking.

**Pricing (per person, plus one travel fee per booking, not per person):**
- New patient: $60 each.
- Existing patient: $40 each.
- Travel fee: $20 Standard region / $40 Premium region (same regional split as every other visit type).
- The host is responsible for the full quoted total as a single amount.

**Duration:** 20 min per new-patient participant + 10 min per existing-patient participant, computed dynamically — unlike every other visit type, Group Visit has no single fixed duration. See `groupVisitDurationMin()` in `lib/gochiro.ts`.

**Lead time:** 24 hours for online booking (`VISITS["group-visit"].minLeadDays`). Earlier availability is a manual, contact-based exception, not a second online rule — not built into the booking widget.

**Intake:** Only new-patient participants intake, each via their own emailed link (existing `INTAKE_URL`), at least `INTAKE_DEADLINE_HOURS` (2) before the visit. Existing patients don't re-intake.

**Cancellation:** Same 24-hour notice as every other visit type. If violated, the flat $50 fee applies **once to the whole booking**, not per participant, and the host is responsible for it. (No automated cancellation flow exists for any visit type today — this is informational/policy copy, enforced manually, same as the rest of the booking flow.)

**Payment (V1 — confirmed 2026-08-28):** No fixed or dynamic Square link. The booking widget calculates and displays the full quoted total, states the host is responsible for it, and books without requiring advance payment — same "pay at or before the visit" pattern as every other visit type. Dynamic Square invoicing for Group Visits is a tracked future capability, not built.

**Implementation shape:** `"group-visit"` is its own `VisitType` for slot/lead-time/calendar purposes (participates in `VISITS`, `SAME_REGION_BUFFER_MIN`, `PAYMENT_LINKS` like the other six types), but — unlike them — its price and duration are **not** fixed values in those tables; they're computed from live participant composition via `groupVisitTotal()` / `groupVisitDurationMin()` in `lib/gochiro.ts`, and recomputed server-side in `/api/slots` and `/api/book` rather than trusted from the client.
