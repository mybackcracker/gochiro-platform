# Extended-area travel estimates

## Deployment settings

Configure the following server-only Vercel environment variables for Production and Preview:

- `GOOGLE_ROUTES_API_KEY`: dedicated key restricted to Routes API. Never use a `NEXT_PUBLIC_` name or commit the value.
- `GOOGLE_ROUTES_ORIGIN`: the doctor's approved starting street address, entered privately in Vercel. No default street address is included in source or browser responses.

Redeploy after setting the variables. The Google Cloud project must have Routes API enabled and active billing. Before rollout, set a small daily provider quota suitable for expected traffic (each estimate uses two Compute Routes calls) and a Vercel firewall rate limit. The endpoint's in-memory burst guard is per instance, not a global spending cap.

## Rules and visitor flow

Regular covered ZIPs retain existing booking fees and flow. Eligible out-of-area Pennsylvania ZIPs display an estimate within the ZIP checker or scheduler. Request a Visit carries the existing ZIP and signed estimate into the form. Direct form visitors can enter their ZIP there.

The initial total is explicitly an estimate for **one new-patient visit**: the existing standard weekday new-patient appointment fee plus $100 for each hour of round-trip driving, including gas. Round the **travel portion** to the nearest $25, with halfway values rounded up. Two directions are requested independently. Driving estimates are ZIP-based, without live traffic, pending confirmation of exact address and timing. Returning-patient, weekend and short-notice prices require confirmation; the estimate is not a booking or guaranteed price.

Additional people at the same location during the same visit pay their applicable appointment fees, with no additional travel charge. Existing deposit/cancellation terms continue to apply.

The estimate is signed using a domain-separated HMAC with the server key. It expires after seven days. The form carries the original snapshot; submission verifies the signature and ZIP without another routing lookup. The practice request email is the durable request record, including displayed total, appointment/travel breakdown, both driving times, policy and timestamp. The requester sees the submitted total on the success screen. No patient confirmation email is added by this change.

Routing failures never produce a fabricated or zero estimate: the visitor can request a manually confirmed quote. Missing configuration leaves the existing request function available.

## Validation and rollout

- Synthetic unit tests cover 30/45/60-minute trips, asymmetric routes, half-up rounding, token changes/expiry/ZIP mismatch, secret/origin omission, ordinary covered ZIP exclusion and provider failure.
- Build/TypeScript passed.
- Full existing test suite has two pre-existing navigation expectations for header links removed on main; focused travel/location/ZIP tests pass.
- The supervised local browser preview cannot start because the environment appends `--host` / `--strictPort` flags unsupported by Next.js. Do not alter the working production dev command just to satisfy that environment.
- Live Google lookup and delivered-email validation require the configured Vercel preview. Check a covered ZIP, then out-of-area ZIPs such as 19446 and 18938; compare displayed and submitted totals. Change ZIP before submitting to verify the stale total is removed. Test one synthetic request only after explicitly authorizing its notification email.

Rollback: revert this feature commit. Clearing `GOOGLE_ROUTES_API_KEY` disables automatic estimates while preserving manually quoted visit requests.

## November 2026 qualification update

The published display acknowledges that out-of-area travel can be important for someone who needs care at home. A ZIP estimate shows an all-in weekday first-visit figure, care/travel breakout, and an explicit checkbox: the requester indicates willingness to arrange the visit at approximately the displayed total, subject to confirmation. The hourly calculation is internal and is no longer advertised in the patient UI.

The request submit button is disabled until the visitor checks the appropriate box. A valid signed estimate and explicit estimate acknowledgment are both verified by the server. If an automatic estimate fails, the user must instead explicitly request a manually confirmed quote. This fallback creates no booking or charge. Normal service-area ZIPs are directed to the regular scheduler rather than using this request form.

The request email records whether the visitor accepted the displayed estimate or requested a personal quote. A location request remains nonbinding: final address, care needs, price and appointment time are confirmed separately; a minimum 50% deposit must then be arranged before confirmation. No dynamic payment link is added by this implementation. Out-of-area trips cannot book automatically.

The main appointment scheduler and ZIP-checker routing are intentionally unchanged. Requests arriving from either route arrive at the same extended-area quote form.
