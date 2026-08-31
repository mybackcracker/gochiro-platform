"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  INTAKE_URL,
  VISITS,
  findRegion,
  paymentLinkFor,
  priceFor,
  resolvePriorityVisit,
  isBusinessDay,
  groupVisitTotal,
  groupVisitTravelFee,
  isValidGroupVisitComposition,
  GROUP_VISIT_MIN_PARTICIPANTS,
  GROUP_VISIT_NEW_PATIENT_PRICE,
  GROUP_VISIT_EXISTING_PATIENT_PRICE,
  type VisitType,
  type Region,
} from "@/lib/gochiro";

type Step =
  | "landing"
  | "region"
  | "zip"
  | "policy"
  | "visit"
  | "maintenance-warning"
  | "triage"
  | "time"
  | "contact"
  | "review"
  | "confirmed"
  // Group Visit — a parallel path alongside New Patient / Returning Patient.
  // Shares "time", "review", and "confirmed" with the other flows (branched
  // by `visit === "group-visit"` inside those steps' JSX).
  | "group-count"
  | "group-zip"
  | "group-policy"
  | "group-contact";

type Bucket = "asap" | "week" | "future";
type FunnelStage = "bucket" | "day" | "period" | "slots";

function todayISO(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function addDaysISO(n: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// Walks forward from today, skipping weekends, until `count` real business
// days are collected — so ASAP/This week never offer a day with zero hours.
function nextBusinessDays(count: number): string[] {
  const result: string[] = [];
  let i = 0;
  while (result.length < count) {
    const iso = addDaysISO(i);
    if (isBusinessDay(iso)) result.push(iso);
    i++;
  }
  return result;
}

function dayTabLabel(iso: string): string {
  const diffDays = Math.round(
    (new Date(`${iso}T00:00:00`).getTime() - new Date(`${todayISO()}T00:00:00`).getTime()) / 86400000
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return new Date(`${iso}T00:00:00`).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatPrice(p: number | null): string {
  return p === null ? "Bills to insurance/claim" : `$${p}`;
}

// East/West/Central are internal scheduling regions with no separate
// patient-facing place name (see lib/gochiro.ts's ZIPS) — grouped here under
// the same "Delaware County" label used on the Service Areas page. Main
// Line and West Chester are real place names and pass through unchanged.
// Purely a display label — the underlying Region value is never altered.
function regionDisplayLabel(r: Region): string {
  if (r === "MainLine") return "Main Line";
  if (r === "WestChester") return "West Chester";
  return "Delaware County";
}

// Formats as the user types: digits only, capped at 10, "(XXX) XXX-XXXX".
function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Section 4 step 3: tappable, color-coded region buttons — all five
// scheduling areas, so a returning patient can self-select their area
// directly instead of being funneled through ZIP entry.
const REGION_OPTIONS: { id: Region; label: string; className: string }[] = [
  { id: "West", label: "West", className: "border-blue-300 bg-blue-50 hover:border-blue-500" },
  { id: "Central", label: "Central", className: "border-green-300 bg-green-50 hover:border-green-500" },
  { id: "East", label: "East", className: "border-purple-300 bg-purple-50 hover:border-purple-500" },
  { id: "MainLine", label: "Main Line", className: "border-red-300 bg-red-50 hover:border-red-500" },
  { id: "WestChester", label: "West Chester", className: "border-yellow-300 bg-yellow-50 hover:border-yellow-500" },
];

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("landing");
  const [history, setHistory] = useState<Step[]>([]);
  const [patientType, setPatientType] = useState<"new" | "returning" | "group" | null>(null);
  const [policyAgreed, setPolicyAgreed] = useState(false);

  const [zip, setZip] = useState("");
  const zipRegion = useMemo<Region | null>(() => findRegion(zip), [zip]);
  const [region, setRegion] = useState<Region | null>(null);

  const [visit, setVisit] = useState<VisitType | null>(null);

  // Group Visit composition. The host's own contact info reuses the same
  // firstName/lastName/phone/email/address state as the New Patient /
  // Returning Patient flows below — a user is only ever in one flow per
  // session, so sharing it is safe and avoids duplicating ~9 fields. Only
  // the host's contact info is collected — individual attendees are not
  // identified during booking (see lib/bookingEmail.ts for how new patients
  // are pointed to the intake form instead).
  const [groupNewCount, setGroupNewCount] = useState(1);
  const [groupExistingCount, setGroupExistingCount] = useState(1);
  const [groupPolicyAgreed, setGroupPolicyAgreed] = useState(false);
  const groupComposition = useMemo(
    () => ({ newCount: groupNewCount, existingCount: groupExistingCount }),
    [groupNewCount, groupExistingCount]
  );
  const groupCompositionValid = isValidGroupVisitComposition(groupComposition);

  // Group Visit duration depends on participant composition, so /api/slots
  // needs the counts to compute it server-side — every other visit type's
  // duration is already implied by `visit` alone. Memoized on groupComposition
  // so the funnel effects below only refetch when the composition actually
  // changes, not on every render.
  const slotsUrl = useCallback(
    (region: Region, visit: VisitType, date: string): string => {
      const base = `/api/slots?region=${region}&visit=${visit}&date=${date}`;
      if (visit !== "group-visit") return base;
      return `${base}&newCount=${groupComposition.newCount}&existingCount=${groupComposition.existingCount}`;
    },
    [groupComposition]
  );

  // Which of the 3 sequential triage questions (Section 2) is showing.
  const [triageStep, setTriageStep] = useState<1 | 2 | 3>(1);

  // Date/time funnel (Section 3 step 5 / Section 4 step 5).
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const [funnelStage, setFunnelStage] = useState<FunnelStage>("bucket");
  // Maintenance is always 48hr+ out, so the ASAP/this-week/future question is
  // moot for it — it skips straight to day-tabs, and back from there should
  // exit the funnel entirely rather than land on a bucket screen never shown.
  const [bucketSkipped, setBucketSkipped] = useState(false);
  const [dayCandidates, setDayCandidates] = useState<string[]>([]); // raw calendar days to probe
  const [availableDayTabs, setAvailableDayTabs] = useState<string[]>([]); // subset that actually have openings
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [date, setDate] = useState(""); // the specific YYYY-MM-DD chosen within the funnel
  const [period, setPeriod] = useState<"morning" | "afternoon" | "evening" | null>(null);

  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("PA");
  const [addressZip, setAddressZip] = useState("");
  const [contactErrors, setContactErrors] = useState<
    Partial<
      Record<"firstName" | "lastName" | "phone" | "email" | "address" | "addressCity" | "addressState" | "addressZip", string>
    >
  >({});

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const price = region && visit ? priceFor(region, visit) : 0;
  const paymentLink = region && visit ? paymentLinkFor(region, visit) : "";

  // Business hours run 9am–6pm (9hr) — an even 3-way split (9-12 / 12-3 / 3-6)
  // gives each window the same ~3hr span, instead of a 2-way morning/afternoon
  // split at noon that leaves afternoon with twice morning's hours. Morning
  // and afternoon are each bounded above by an earlier window (12 / 3), so
  // they can never exceed 6 slot starts at 30-min cadence. Evening is bounded
  // above by the actual close time, which is now inclusive of its own start
  // (see lib/scheduling.ts) — 3pm-6pm is 7 possible starts, not 6, so this
  // must cap at 7 or it silently drops the last, latest slot of the day.
  const periodSlots = useMemo(() => {
    if (!period) return [];
    return slots
      .filter((iso) => {
        const hour = new Date(iso).getHours();
        if (period === "morning") return hour < 12;
        if (period === "afternoon") return hour >= 12 && hour < 15;
        return hour >= 15;
      })
      .slice(0, 7);
  }, [slots, period]);

  // Deep-link entry points from marketing pages (Book Online, Homepage) —
  // ?start=new|returning|group. Mirrors the landing screen's own three
  // button handlers exactly, just skipping the landing screen itself, so
  // no booking/routing logic is duplicated. Reads the URL directly (rather
  // than next/navigation's useSearchParams) so this stays a plain effect
  // with no Suspense boundary required. History is left empty on this path
  // (unlike go()), so Back returns to "/" — the same behavior as arriving
  // fresh, since there's no landing-screen step to go back to.
  useEffect(() => {
    const start = new URLSearchParams(window.location.search).get("start");
    // Reading a one-time deep-link param from the URL at mount and syncing it
    // into state is exactly the "external system" case this rule's own docs
    // carve out — there's no render-phase alternative that avoids a
    // server/client hydration mismatch (see comment above).
    if (start === "new") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPatientType("new");
      setStep("zip");
    } else if (start === "returning") {
      setPatientType("returning");
      setStep("region");
    } else if (start === "group") {
      setPatientType("group");
      setVisit("group-visit");
      setStep("group-count");
    }
  }, []);

  // Steps back one screen without touching any already-entered field state.
  function goBack() {
    if (step === "triage" && triageStep > 1) {
      setTriageStep((s) => (s - 1) as 1 | 2 | 3);
      return;
    }
    if (step === "time") {
      if (funnelStage === "slots") {
        setFunnelStage("period");
        return;
      }
      if (funnelStage === "period") {
        setFunnelStage("day");
        return;
      }
      if (funnelStage === "day" && !bucketSkipped) {
        setFunnelStage("bucket");
        setBucket(null);
        return;
      }
      // funnelStage === "day" && bucketSkipped: no bucket screen to return to
      // (Maintenance) — fall through to the normal history pop below.
    }
    if (history.length === 0) {
      router.push("/");
      return;
    }
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setStep(prev);
  }

  function go(next: Step) {
    setHistory((h) => [...h, step]);
    setStep(next);
  }

  // Resets the funnel and enters the "time" step fresh.
  function goToSchedule() {
    setBucket(null);
    setBucketSkipped(false);
    setFunnelStage("bucket");
    setDayCandidates([]);
    setAvailableDayTabs([]);
    setPeriod(null);
    setDate("");
    go("time");
  }

  // Maintenance is always 48hr+, so ASAP/this-week/future is meaningless —
  // skip straight to day-tabs, reusing the same 7-day probe as "This week".
  function goToMaintenanceSchedule() {
    setBucket("week");
    setBucketSkipped(true);
    setFunnelStage("day");
    setAvailableDayTabs([]);
    setPeriod(null);
    setDate("");
    setDayCandidates(nextBusinessDays(7));
    go("time");
  }

  function continueFromZip() {
    if (!zipRegion) return;
    setRegion(zipRegion);
    if (patientType === "new") {
      setVisit("new-patient");
      go("policy");
    } else {
      go("visit");
    }
  }

  function chooseDirectVisit(v: VisitType) {
    setVisit(v);
    if (v === "maintenance") {
      goToMaintenanceSchedule();
    } else {
      goToSchedule();
    }
  }

  function choosePriority() {
    setTriageStep(1);
    go("triage");
  }

  // Section 2 triage tree — each answer either short-circuits straight to a
  // result or advances to the next question, per the spec's exact order.
  function answerAccident(yes: boolean) {
    if (yes) {
      setVisit(resolvePriorityVisit(true, false, false));
      goToSchedule();
      return;
    }
    setTriageStep(2);
  }

  function answerComplaints(multiple: boolean) {
    if (multiple) {
      setVisit(resolvePriorityVisit(false, true, false));
      goToSchedule();
      return;
    }
    setTriageStep(3);
  }

  function answerSeverity(severe: boolean) {
    setVisit(resolvePriorityVisit(false, false, severe));
    goToSchedule();
  }

  // Bucket choice (Section 3 step 5 / Section 4 step 5).
  function chooseBucket(b: Bucket) {
    setPeriod(null);
    setBucket(b);
    if (b === "future") {
      setDate("");
      setDayCandidates([]);
      setAvailableDayTabs([]);
      setFunnelStage("day");
      return;
    }
    const count = b === "asap" ? 3 : 7;
    setAvailableDayTabs([]);
    setDate("");
    setDayCandidates(nextBusinessDays(count));
    setFunnelStage("day");
  }

  function chooseDay(d: string) {
    setDate(d);
    setFunnelStage("period");
  }

  function choosePeriod(p: "morning" | "afternoon" | "evening") {
    setPeriod(p);
    setFunnelStage("slots");
  }

  // For ASAP/This week, check every candidate day's real availability and only
  // surface the ones with openings as tabs — a day with zero open slots isn't
  // shown at all, not offered as a dead end. The first day that survives
  // becomes the default selection ("if buffer pushes past remaining hours,
  // roll to next day automatically" — Section 3 step 5).
  useEffect(() => {
    if (step !== "time" || dayCandidates.length === 0 || !region || !visit) return;

    let cancelled = false;

    // setState calls are deferred into this microtask (rather than called
    // synchronously in the effect body) to satisfy react-hooks/set-state-in-effect.
    Promise.resolve().then(() => {
      if (cancelled) return;
      setCheckingAvailability(true);

      Promise.all(
        dayCandidates.map(async (d) => {
          try {
            const res = await fetch(slotsUrl(region, visit, d));
            const data = await res.json();
            return Array.isArray(data.slots) && data.slots.length > 0 ? d : null;
          } catch {
            return null;
          }
        })
      ).then((results) => {
        if (cancelled) return;
        const available = results.filter((d): d is string => d !== null);
        setAvailableDayTabs(available);
        setDate(available[0] ?? "");
        setCheckingAvailability(false);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [dayCandidates, region, visit, step, slotsUrl]);

  useEffect(() => {
    if (step !== "time" || !region || !visit || !date) return;

    let cancelled = false;

    // setState calls are deferred into this microtask (rather than called
    // synchronously in the effect body) to satisfy react-hooks/set-state-in-effect.
    Promise.resolve().then(() => {
      if (cancelled) return;
      setSlotsLoading(true);
      setSlotsError(null);
      setSlots([]);

      fetch(slotsUrl(region, visit, date))
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          if (data.error) {
            setSlotsError(data.error);
          } else {
            setSlots(data.slots || []);
          }
        })
        .catch(() => {
          if (!cancelled) setSlotsError("Couldn't load availability. Check your connection and try again.");
        })
        .finally(() => {
          if (!cancelled) setSlotsLoading(false);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [step, region, visit, date, slotsUrl]);

  function selectSlot(iso: string) {
    setBookingError(null);
    setSelectedSlot(iso);
    go(visit === "group-visit" ? "group-contact" : "contact");
  }

  function contactComplete() {
    const errors: typeof contactErrors = {};
    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";
    if (phone.replace(/\D/g, "").length !== 10) errors.phone = "Enter a valid 10-digit phone number.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!address.trim()) errors.address = "Street address is required.";
    if (!addressCity.trim()) errors.addressCity = "City is required.";
    if (!addressState.trim()) errors.addressState = "State is required.";
    if (addressZip.replace(/\D/g, "").length !== 5) errors.addressZip = "Enter a valid 5-digit ZIP code.";

    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;
    go("review");
  }

  // Books the appointment. `routeToIntakeNow` only controls what happens
  // immediately after: either way the appointment is booked and (for new
  // patients) the intake link is emailed — that email is the safety net if
  // the patient bails out of the "complete now" hand-off partway through.
  async function confirmBooking(routeToIntakeNow: boolean) {
    if (!region || !visit || !selectedSlot) return;
    setBookingLoading(true);
    setBookingError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          visit,
          start: selectedSlot,
          firstName,
          lastName,
          phone,
          email,
          address,
          addressLine2,
          addressCity,
          addressState,
          addressZip,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          // Slot was taken between selection and confirmation — send back to pick another.
          setBookingError(data.error || "That slot was just taken. Please choose another time.");
          go("time");
        } else {
          setBookingError(data.error || "Something went wrong booking this appointment.");
        }
        return;
      }

      // The patient confirmation + doctor notification emails are sent
      // server-side inside /api/book itself (see lib/bookingEmail.ts) — that
      // covers both buttons uniformly, since both hit the same endpoint.

      if (routeToIntakeNow) {
        // Navigate directly rather than window.open — an async window.open
        // (after the await above) gets blocked as a popup in most browsers.
        window.location.href = INTAKE_URL;
        return;
      }

      go("confirmed");
    } catch {
      setBookingError("Couldn't reach the booking system. Check your connection and try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  function groupContactComplete() {
    const errors: typeof contactErrors = {};
    if (!firstName.trim()) errors.firstName = "Host first name is required.";
    if (!lastName.trim()) errors.lastName = "Host last name is required.";
    if (phone.replace(/\D/g, "").length !== 10) errors.phone = "Enter a valid 10-digit phone number.";
    if (!email.trim()) {
      errors.email = "Host email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!address.trim()) errors.address = "Street address is required.";
    if (!addressCity.trim()) errors.addressCity = "City is required.";
    if (!addressState.trim()) errors.addressState = "State is required.";
    if (addressZip.replace(/\D/g, "").length !== 5) errors.addressZip = "Enter a valid 5-digit ZIP code.";
    setContactErrors(errors);

    if (Object.keys(errors).length > 0) return;
    go("review");
  }

  async function confirmGroupBooking() {
    if (!region || !selectedSlot) return;
    setBookingLoading(true);
    setBookingError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          visit: "group-visit",
          start: selectedSlot,
          firstName,
          lastName,
          phone,
          email,
          address,
          addressLine2,
          addressCity,
          addressState,
          addressZip,
          newCount: groupComposition.newCount,
          existingCount: groupComposition.existingCount,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setBookingError(data.error || "That slot was just taken. Please choose another time.");
          go("time");
        } else {
          setBookingError(data.error || "Something went wrong booking this appointment.");
        }
        return;
      }

      go("confirmed");
    } catch {
      setBookingError("Couldn't reach the booking system. Check your connection and try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <button onClick={goBack} className="text-sm font-semibold text-slate-500 hover:text-slate-900">
          ← Back
        </button>

        {patientType && (
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            {patientType === "new" ? "New Patient" : patientType === "returning" ? "Returning Patient" : "Group Visit"}
          </p>
        )}

        {step === "landing" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Schedule Your Appointment</h1>
            <p className="mt-2 text-slate-600">Answer a few questions to see your available appointment times and fee.</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setPatientType("new");
                  go("zip");
                }}
                className="w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white hover:bg-slate-800"
              >
                New Patient, First Visit
              </button>
              <div>
                <button
                  onClick={() => {
                    setPatientType("returning");
                    go("region");
                  }}
                  className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg font-semibold text-slate-900 hover:border-slate-900"
                >
                  Returning Patient, Follow-Up
                </button>
                <p className="mt-2 text-sm text-slate-500">
                  For patients who have been seen by Dr. DeFries within the past 12 months. If your last visit was
                  more than 12 months ago, please schedule as a New Patient.
                </p>
              </div>
              <button
                onClick={() => {
                  setPatientType("group");
                  setVisit("group-visit");
                  go("group-count");
                }}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg font-semibold text-slate-900 hover:border-slate-900"
              >
                Group Visit, 2+ People
              </button>
            </div>
          </>
        )}

        {step === "region" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Where are you located?</h1>
            <p className="mt-2 text-slate-600">Choose your scheduling area below.</p>

            <div className="mt-6 space-y-3">
              {REGION_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRegion(r.id);
                    go("visit");
                  }}
                  className={`w-full rounded-xl border p-4 text-left font-semibold text-slate-900 ${r.className}`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-700">Not sure which area you&apos;re in?</p>
            <button
              onClick={() => go("zip")}
              className="mt-2 w-full rounded-xl border border-slate-300 px-5 py-4 text-center font-semibold text-slate-600 hover:border-slate-900"
            >
              Enter my ZIP code
            </button>
          </>
        )}

        {step === "zip" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">What ZIP code will we be visiting?</h1>
            <p className="mt-2 text-slate-600">We use your ZIP code to determine the service region and visit fee.</p>

            <input
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              inputMode="numeric"
              placeholder="ZIP code"
              aria-label="ZIP code of the appointment"
              className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-4 text-lg outline-none focus:border-slate-900"
            />

            {zip.length === 5 && !zipRegion && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                This ZIP code is outside the current online service-area list. Call or text 610-494-0412 and we can
                review it.
              </div>
            )}

            {zipRegion && patientType === "new" && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-900">
                <span className="text-sm">New Patient, First Visit</span>
                <span className="block text-2xl font-bold">
                  {formatPrice(priceFor(zipRegion, "new-patient"))}
                </span>
              </div>
            )}

            {zipRegion && patientType !== "new" && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">Service area confirmed.</div>
            )}

            <button
              onClick={continueFromZip}
              disabled={!zipRegion}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "group-count" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Who&apos;s coming?</h1>
            <p className="mt-2 text-slate-600">
              Group Visits need at least {GROUP_VISIT_MIN_PARTICIPANTS} people, and new and existing patients can
              mix freely.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="group-new-count" className="text-sm font-semibold text-slate-700">
                  {`New patients ($${GROUP_VISIT_NEW_PATIENT_PRICE} each)`}
                </label>
                <input
                  id="group-new-count"
                  type="number"
                  min={0}
                  value={groupNewCount}
                  onChange={(e) => setGroupNewCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label htmlFor="group-existing-count" className="text-sm font-semibold text-slate-700">
                  {`Existing patients ($${GROUP_VISIT_EXISTING_PATIENT_PRICE} each)`}
                </label>
                <input
                  id="group-existing-count"
                  type="number"
                  min={0}
                  value={groupExistingCount}
                  onChange={(e) => setGroupExistingCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {!groupCompositionValid && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                A Group Visit needs at least {GROUP_VISIT_MIN_PARTICIPANTS} people total.
              </div>
            )}

            <button
              onClick={() => go("group-zip")}
              disabled={!groupCompositionValid}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "group-zip" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">What ZIP code will we be visiting?</h1>
            <p className="mt-2 text-slate-600">We use your ZIP code to determine the service region and travel fee.</p>

            <input
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              inputMode="numeric"
              placeholder="ZIP code"
              aria-label="ZIP code of the appointment"
              className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-4 text-lg outline-none focus:border-slate-900"
            />

            {zip.length === 5 && !zipRegion && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                This ZIP code is outside the current online service-area list. Call or text 610-494-0412 and we can
                review it.
              </div>
            )}

            {zipRegion && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-900">
                <span className="text-sm">Group Visit total</span>
                <span className="block text-2xl font-bold">{formatPrice(groupVisitTotal(zipRegion, groupComposition))}</span>
                <span className="mt-1 block text-xs text-emerald-800">
                  {groupNewCount > 0 && `${groupNewCount} new @ $${GROUP_VISIT_NEW_PATIENT_PRICE}`}
                  {groupNewCount > 0 && groupExistingCount > 0 && " + "}
                  {groupExistingCount > 0 && `${groupExistingCount} existing @ $${GROUP_VISIT_EXISTING_PATIENT_PRICE}`}
                  {" + "}
                  {`$${groupVisitTravelFee(zipRegion)} travel`}
                </span>
              </div>
            )}

            <button
              onClick={() => {
                if (!zipRegion) return;
                setRegion(zipRegion);
                go("group-policy");
              }}
              disabled={!zipRegion}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "group-policy" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Before You Book</h1>
            <p className="mt-2 text-slate-600">Please review the following before scheduling your Group Visit:</p>

            <div className="mt-6 max-h-72 space-y-5 overflow-y-auto rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
              <div>
                <h2 className="font-semibold text-slate-900">Who Group Visits Are For</h2>
                <p className="mt-1">
                  Group Visits are wellness-focused. They&apos;re not intended for an acute injury, a significant
                  new complaint, or a chronic condition needing individualized evaluation or treatment — book an
                  individual visit instead if that&apos;s what&apos;s going on.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Host Responsibility</h2>
                <p className="mt-1">
                  As the host, you&apos;re responsible for the full quoted group total. Payment isn&apos;t required
                  to book — pay at or before the visit.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Cancellation Policy</h2>
                <p className="mt-1">
                  We require at least 24 hours&apos; notice to cancel or reschedule. Cancelling or rescheduling with
                  less notice carries a $50 fee, charged once to the whole booking — not per participant. As the
                  host, you&apos;re responsible for that fee.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Intake Forms</h2>
                <p className="mt-1">
                  Only new patients in the group need to complete an intake form, at least 2 hours before the visit.
                  Existing patients don&apos;t need to.
                </p>
              </div>
            </div>

            <label className="mt-4 flex items-start gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={groupPolicyAgreed}
                onChange={(e) => setGroupPolicyAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300"
              />
              I have read and agree to the policies above
            </label>

            <button
              onClick={goToSchedule}
              disabled={!groupPolicyAgreed}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "policy" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Before You Book</h1>
            <p className="mt-2 text-slate-600">Please review the following before scheduling your visit:</p>

            <div className="mt-6 max-h-72 space-y-5 overflow-y-auto rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
              <div>
                <h2 className="font-semibold text-slate-900">Cancellation Policy</h2>
                <p className="mt-1">
                  We require at least 24 hours&apos; notice to cancel or reschedule your appointment. Cancellations,
                  no-shows, or same-day changes made with less than 24 hours&apos; notice will be charged a $50 fee.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Arrival Window</h2>
                <p className="mt-1">
                  Dr. DeFries travels between appointments, so please allow about 15 minutes of flexibility before
                  and after your scheduled time.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Intake Forms</h2>
                <p className="mt-1">
                  New patient intake forms must be completed at least 2 hours before your appointment. If they
                  aren&apos;t completed in time, your appointment will be canceled and a missed-appointment fee will
                  apply.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Payment</h2>
                <p className="mt-1">
                  Payment is due at or before your visit. We accept cash, check, credit card (HSA/FSA eligible), and
                  Venmo.
                </p>
              </div>
            </div>

            <label className="mt-4 flex items-start gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={policyAgreed}
                onChange={(e) => setPolicyAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300"
              />
              I have read and agree to the policies above
            </label>

            <button
              onClick={goToSchedule}
              disabled={!policyAgreed}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "visit" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">What type of visit do you need?</h1>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => go("maintenance-warning")}
                className="w-full rounded-xl border border-slate-300 p-4 text-left hover:border-slate-900"
              >
                <span className="block font-semibold text-slate-900">Maintenance / Wellness Visit</span>
                <span className="mt-1 block text-sm text-slate-500">Requires 48-hour advance notice.</span>
                {region && (
                  <span className="mt-1 block text-lg font-bold text-slate-900">
                    {formatPrice(priceFor(region, "maintenance"))}
                  </span>
                )}
              </button>
              <button
                onClick={choosePriority}
                className="w-full rounded-xl border border-slate-300 p-4 text-left hover:border-slate-900"
              >
                <span className="block font-semibold text-slate-900">New Complaint / Priority Visit</span>
                <span className="mt-1 block text-sm text-slate-500">Same-day or next-day care for an existing patient.</span>
                <span className="mt-1 block text-sm text-slate-500">Price depends on a couple quick questions.</span>
              </button>
              <button
                onClick={() => chooseDirectVisit("care-plan")}
                className="w-full rounded-xl border border-slate-300 p-4 text-left hover:border-slate-900"
              >
                <span className="block font-semibold text-slate-900">Care Plan Visit</span>
                {region && (
                  <span className="mt-1 block text-lg font-bold text-slate-900">
                    {formatPrice(priceFor(region, "care-plan"))}
                  </span>
                )}
                <span className="mt-1 block text-sm text-slate-600">
                  For patients currently enrolled in an active treatment plan.
                </span>
              </button>
            </div>
          </>
        )}

        {step === "maintenance-warning" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Maintenance / Wellness Visit</h1>
            <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
              Maintenance visits must be scheduled 48 hours in advance and are not intended to treat painful
              conditions. If you need care sooner, please select Priority Visit.
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={choosePriority}
                className="w-full rounded-xl border border-slate-300 p-4 text-left font-semibold text-slate-900 hover:border-slate-900"
              >
                I need to be seen sooner
              </button>
              <button
                onClick={() => chooseDirectVisit("maintenance")}
                className="w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white hover:bg-slate-800"
              >
                Continue with Maintenance Visit
              </button>
            </div>
          </>
        )}

        {step === "triage" && (
          <>
            {triageStep === 1 && (
              <>
                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                  Was this related to an accident or work-related injury?
                </h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => answerAccident(true)}
                    className="rounded-xl border border-slate-300 p-4 font-semibold text-slate-900 hover:border-slate-900"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => answerAccident(false)}
                    className="rounded-xl border border-slate-300 p-4 font-semibold text-slate-900 hover:border-slate-900"
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {triageStep === 2 && (
              <>
                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                  Is this one complaint, or multiple complaints?
                </h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => answerComplaints(false)}
                    className="rounded-xl border border-slate-300 p-4 font-semibold text-slate-900 hover:border-slate-900"
                  >
                    One complaint
                  </button>
                  <button
                    onClick={() => answerComplaints(true)}
                    className="rounded-xl border border-slate-300 p-4 font-semibold text-slate-900 hover:border-slate-900"
                  >
                    Multiple
                  </button>
                </div>
              </>
            )}

            {triageStep === 3 && (
              <>
                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                  Is your pain mild-to-moderate, or severe/radiating?
                </h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => answerSeverity(false)}
                    className="rounded-xl border border-slate-300 p-4 font-semibold text-slate-900 hover:border-slate-900"
                  >
                    Mild-to-moderate
                  </button>
                  <button
                    onClick={() => answerSeverity(true)}
                    className="rounded-xl border border-slate-300 p-4 font-semibold text-slate-900 hover:border-slate-900"
                  >
                    Severe / radiating
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {step === "time" && visit && visit !== "group-visit" && region && (
          <p className="mt-2 text-sm text-slate-600">
            {VISITS[visit].label}
            {visit !== "priority-accident" && (
              <>
                {" — "}
                <span className="text-lg font-bold text-slate-900">{formatPrice(priceFor(region, visit))}</span>
              </>
            )}
          </p>
        )}

        {step === "time" && visit === "group-visit" && region && (
          <p className="mt-2 text-sm text-slate-600">
            Group Visit —{" "}
            <span className="text-lg font-bold text-slate-900">{formatPrice(groupVisitTotal(region, groupComposition))}</span>
          </p>
        )}

        {/* Surfaces the error from a failed confirmBooking() (e.g. a 409
            conflict) after it sends the patient back here — without this,
            the message was set but never rendered, since it used to only
            live on the review screen this navigation just left. */}
        {step === "time" && bookingError && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-900">{bookingError}</div>
        )}

        {step === "time" && funnelStage === "bucket" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">When would you like to be seen?</h1>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => chooseBucket("asap")}
                className="w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white hover:bg-slate-800"
              >
                As soon as possible
              </button>
              <button
                onClick={() => chooseBucket("week")}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg font-semibold text-slate-900 hover:border-slate-900"
              >
                This week
              </button>
              <button
                onClick={() => chooseBucket("future")}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-lg font-semibold text-slate-900 hover:border-slate-900"
              >
                In the future
              </button>
            </div>
          </>
        )}

        {step === "time" && funnelStage === "day" && bucket !== "future" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Which day?</h1>
            {checkingAvailability && <p className="mt-2 text-slate-500">Checking availability…</p>}

            {!checkingAvailability && availableDayTabs.length === 0 && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                No openings in this window. Try &quot;In the future&quot; for a later date, or call/text
                610-494-0412.
              </div>
            )}

            {availableDayTabs.length > 0 && (
              <div className={`mt-6 grid gap-2 ${bucket === "asap" ? "grid-cols-3" : "grid-cols-4"}`}>
                {availableDayTabs.map((d) => (
                  <button
                    key={d}
                    onClick={() => chooseDay(d)}
                    className={`rounded-xl border p-3 text-center text-sm font-semibold ${
                      date === d ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-900"
                    }`}
                  >
                    {dayTabLabel(d)}
                  </button>
                ))}
              </div>
            )}

            {bucketSkipped && (
              <button
                onClick={() => {
                  setBucket("future");
                  setDate("");
                }}
                className="mt-4 w-full rounded-xl border border-slate-300 px-5 py-4 text-center font-semibold text-slate-600 hover:border-slate-900"
              >
                Choose a later date
              </button>
            )}
          </>
        )}

        {step === "time" && funnelStage === "day" && bucket === "future" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Pick a date</h1>

            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Appointment date"
              className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-4 text-lg outline-none focus:border-slate-900"
            />

            <button
              onClick={() => setFunnelStage("period")}
              disabled={!date}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "time" && funnelStage === "period" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">What time of day?</h1>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <button
                onClick={() => choosePeriod("morning")}
                className="rounded-xl border border-slate-300 p-3 text-center font-semibold text-slate-900 hover:border-slate-900"
              >
                Morning
              </button>
              <button
                onClick={() => choosePeriod("afternoon")}
                className="rounded-xl border border-slate-300 p-3 text-center font-semibold text-slate-900 hover:border-slate-900"
              >
                Afternoon
              </button>
              <button
                onClick={() => choosePeriod("evening")}
                className="rounded-xl border border-slate-300 p-3 text-center font-semibold text-slate-900 hover:border-slate-900"
              >
                Early Evening
              </button>
            </div>
          </>
        )}

        {step === "time" && funnelStage === "slots" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Choose a time</h1>

            {slotsLoading && <p className="mt-6 text-slate-500">Loading availability…</p>}

            {slotsError && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{slotsError}</div>
            )}

            {!slotsLoading && !slotsError && slots.length === 0 && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                No openings that day. Try another date, or call/text 610-494-0412.
              </div>
            )}

            {!slotsLoading && !slotsError && slots.length > 0 && periodSlots.length === 0 && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                No {period} openings that day. Try another time of day, or another date.
              </div>
            )}

            {!slotsLoading && periodSlots.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {periodSlots.map((iso) => (
                  <button
                    key={iso}
                    onClick={() => selectSlot(iso)}
                    className="rounded-xl border border-slate-300 p-3 text-center font-semibold text-slate-900 hover:border-slate-900"
                  >
                    {formatTime(iso)}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {step === "contact" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Address of the Appointment</h1>
            <div className="mt-6 grid gap-4">
              <div>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setContactErrors((err) => ({ ...err, firstName: undefined }));
                  }}
                  placeholder="First name"
                  aria-label="First name"
                  autoComplete="given-name"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.firstName ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setContactErrors((err) => ({ ...err, lastName: undefined }));
                  }}
                  placeholder="Last name"
                  aria-label="Last name"
                  autoComplete="family-name"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.lastName ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.lastName && <p className="mt-1 text-sm text-red-600">{contactErrors.lastName}</p>}
              </div>

              <div>
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhoneInput(e.target.value));
                    setContactErrors((err) => ({ ...err, phone: undefined }));
                  }}
                  placeholder="(555) 555-5555"
                  aria-label="Phone number"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={14}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.phone ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.phone && <p className="mt-1 text-sm text-red-600">{contactErrors.phone}</p>}
              </div>

              <div>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setContactErrors((err) => ({ ...err, email: undefined }));
                  }}
                  placeholder="Email"
                  aria-label="Email"
                  inputMode="email"
                  autoComplete="email"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.email ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.email && <p className="mt-1 text-sm text-red-600">{contactErrors.email}</p>}
              </div>

              <div>
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setContactErrors((err) => ({ ...err, address: undefined }));
                  }}
                  placeholder="Address of the appointment"
                  aria-label="Street address of the appointment"
                  autoComplete="street-address"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.address ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.address && <p className="mt-1 text-sm text-red-600">{contactErrors.address}</p>}
              </div>

              <input
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Apt / unit (optional)"
                aria-label="Apartment or unit number (optional)"
                autoComplete="address-line2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />

              <div>
                <input
                  value={addressCity}
                  onChange={(e) => {
                    setAddressCity(e.target.value);
                    setContactErrors((err) => ({ ...err, addressCity: undefined }));
                  }}
                  placeholder="City"
                  aria-label="City"
                  autoComplete="address-level2"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.addressCity ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.addressCity && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.addressCity}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    value={addressState}
                    onChange={(e) => {
                      setAddressState(e.target.value);
                      setContactErrors((err) => ({ ...err, addressState: undefined }));
                    }}
                    placeholder="State"
                    aria-label="State"
                    autoComplete="address-level1"
                    className={`w-full rounded-xl border px-4 py-3 ${
                      contactErrors.addressState ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {contactErrors.addressState && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.addressState}</p>
                  )}
                </div>

                <div>
                  <input
                    value={addressZip}
                    onChange={(e) => {
                      setAddressZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                      setContactErrors((err) => ({ ...err, addressZip: undefined }));
                    }}
                    placeholder="ZIP code"
                    aria-label="ZIP code"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={`w-full rounded-xl border px-4 py-3 ${
                      contactErrors.addressZip ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {contactErrors.addressZip && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.addressZip}</p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={contactComplete}
              className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white"
            >
              Continue
            </button>
          </>
        )}

        {step === "group-contact" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Host Contact &amp; Address</h1>
            <p className="mt-2 text-slate-600">
              You&apos;re booking as the host — this is where we&apos;ll send the group confirmation.
            </p>
            <div className="mt-6 grid gap-4">
              <div>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setContactErrors((err) => ({ ...err, firstName: undefined }));
                  }}
                  placeholder="Host first name"
                  aria-label="Host first name"
                  autoComplete="given-name"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.firstName ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.firstName && <p className="mt-1 text-sm text-red-600">{contactErrors.firstName}</p>}
              </div>
              <div>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setContactErrors((err) => ({ ...err, lastName: undefined }));
                  }}
                  placeholder="Host last name"
                  aria-label="Host last name"
                  autoComplete="family-name"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.lastName ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.lastName && <p className="mt-1 text-sm text-red-600">{contactErrors.lastName}</p>}
              </div>
              <div>
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhoneInput(e.target.value));
                    setContactErrors((err) => ({ ...err, phone: undefined }));
                  }}
                  placeholder="(555) 555-5555"
                  aria-label="Phone number"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={14}
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.phone ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.phone && <p className="mt-1 text-sm text-red-600">{contactErrors.phone}</p>}
              </div>
              <div>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setContactErrors((err) => ({ ...err, email: undefined }));
                  }}
                  placeholder="Host email"
                  aria-label="Host email"
                  inputMode="email"
                  autoComplete="email"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.email ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.email && <p className="mt-1 text-sm text-red-600">{contactErrors.email}</p>}
              </div>
              <div>
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setContactErrors((err) => ({ ...err, address: undefined }));
                  }}
                  placeholder="Address of the appointment"
                  aria-label="Street address of the appointment"
                  autoComplete="street-address"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.address ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.address && <p className="mt-1 text-sm text-red-600">{contactErrors.address}</p>}
              </div>
              <input
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Apt / unit (optional)"
                aria-label="Apartment or unit number (optional)"
                autoComplete="address-line2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
              <div>
                <input
                  value={addressCity}
                  onChange={(e) => {
                    setAddressCity(e.target.value);
                    setContactErrors((err) => ({ ...err, addressCity: undefined }));
                  }}
                  placeholder="City"
                  aria-label="City"
                  autoComplete="address-level2"
                  className={`w-full rounded-xl border px-4 py-3 ${
                    contactErrors.addressCity ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {contactErrors.addressCity && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.addressCity}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    value={addressState}
                    onChange={(e) => {
                      setAddressState(e.target.value);
                      setContactErrors((err) => ({ ...err, addressState: undefined }));
                    }}
                    placeholder="State"
                    aria-label="State"
                    autoComplete="address-level1"
                    className={`w-full rounded-xl border px-4 py-3 ${
                      contactErrors.addressState ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {contactErrors.addressState && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.addressState}</p>
                  )}
                </div>
                <div>
                  <input
                    value={addressZip}
                    onChange={(e) => {
                      setAddressZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                      setContactErrors((err) => ({ ...err, addressZip: undefined }));
                    }}
                    placeholder="ZIP code"
                    aria-label="ZIP code"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={`w-full rounded-xl border px-4 py-3 ${
                      contactErrors.addressZip ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {contactErrors.addressZip && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.addressZip}</p>
                  )}
                </div>
              </div>
            </div>

            <button onClick={groupContactComplete} className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white">
              Continue
            </button>
          </>
        )}

        {step === "review" && region && visit && visit !== "group-visit" && selectedSlot && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Review</h1>

            <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200">
              <ReviewRow label="Visit" value={VISITS[visit].label} />
              <ReviewRow
                label="When"
                value={new Date(selectedSlot).toLocaleString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              />
              <ReviewRow
                label="Address"
                value={`${addressLine2 ? `${address}, ${addressLine2}` : address}, ${addressCity}, ${addressState} ${addressZip}`}
              />
              <ReviewRow label="ZIP" value={zip} />
              <ReviewRow label="Region" value={regionDisplayLabel(region)} />
              <ReviewRow label="Visit fee" value={formatPrice(price)} emphasize />
            </div>

            {bookingError && (
              <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-900">{bookingError}</div>
            )}

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
              Payment isn&apos;t required to book — you can pay now or when we arrive.
            </div>

            {patientType === "new" ? (
              <>
                <button
                  onClick={() => confirmBooking(true)}
                  disabled={bookingLoading}
                  className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white disabled:bg-slate-300"
                >
                  {bookingLoading ? "Booking…" : "Confirm Appointment & Complete Intake Now"}
                </button>
                <button
                  onClick={() => confirmBooking(false)}
                  disabled={bookingLoading}
                  className="mt-3 w-full rounded-xl border border-slate-300 px-5 py-4 text-center text-lg font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bookingLoading ? "Booking…" : "Confirm Appointment & Email Intake Form"}
                </button>
              </>
            ) : (
              <button
                onClick={() => confirmBooking(false)}
                disabled={bookingLoading}
                className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white disabled:bg-slate-300"
              >
                {bookingLoading ? "Booking…" : "Confirm Appointment"}
              </button>
            )}

            <a
              href={paymentLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block w-full rounded-xl border border-slate-300 px-5 py-4 text-center font-semibold text-slate-900"
            >
              Pay with Square
            </a>
          </>
        )}

        {step === "review" && region && visit === "group-visit" && selectedSlot && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Review</h1>

            <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200">
              <ReviewRow label="Visit" value="Group Visit" />
              <ReviewRow
                label="When"
                value={new Date(selectedSlot).toLocaleString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              />
              <ReviewRow
                label="Address"
                value={`${addressLine2 ? `${address}, ${addressLine2}` : address}, ${addressCity}, ${addressState} ${addressZip}`}
              />
              <ReviewRow label="Region" value={regionDisplayLabel(region)} />
              {groupComposition.newCount > 0 && (
                <ReviewRow
                  label={`${groupComposition.newCount} new patient${groupComposition.newCount === 1 ? "" : "s"}`}
                  value={formatPrice(groupComposition.newCount * GROUP_VISIT_NEW_PATIENT_PRICE)}
                />
              )}
              {groupComposition.existingCount > 0 && (
                <ReviewRow
                  label={`${groupComposition.existingCount} existing patient${groupComposition.existingCount === 1 ? "" : "s"}`}
                  value={formatPrice(groupComposition.existingCount * GROUP_VISIT_EXISTING_PATIENT_PRICE)}
                />
              )}
              <ReviewRow label="Travel fee" value={formatPrice(groupVisitTravelFee(region))} />
              <ReviewRow label="Group total" value={formatPrice(groupVisitTotal(region, groupComposition))} emphasize />
            </div>

            {bookingError && (
              <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-900">{bookingError}</div>
            )}

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
              As the host, you&apos;re responsible for the full amount above. Payment isn&apos;t required to book —
              pay at or before the visit.
            </div>

            <button
              onClick={confirmGroupBooking}
              disabled={bookingLoading}
              className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white disabled:bg-slate-300"
            >
              {bookingLoading ? "Booking…" : "Confirm Group Visit"}
            </button>
          </>
        )}

        {step === "confirmed" && visit !== "group-visit" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">You&apos;re booked!</h1>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
              {selectedSlot &&
                `See you ${new Date(selectedSlot).toLocaleString([], {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}.`}
            </div>

            <a
              href={paymentLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 block w-full rounded-xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white"
            >
              Pay with Square
            </a>

            {patientType === "new" && (
              <a
                href={INTAKE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full rounded-xl border border-slate-300 px-5 py-4 text-center font-semibold text-slate-900"
              >
                Complete Intake
              </a>
            )}
          </>
        )}

        {step === "confirmed" && visit === "group-visit" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">You&apos;re booked!</h1>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
              {selectedSlot &&
                `See you ${new Date(selectedSlot).toLocaleString([], {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}.`}
            </div>

            {groupComposition.newCount > 0 && (
              <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
                We&apos;ve emailed an intake link to each new patient in your group — it must be completed at least 2
                hours before the visit.
              </div>
            )}

            <div className="mt-3 rounded-xl border border-slate-300 p-4 text-center text-sm text-slate-600">
              As the host, you&apos;re responsible for the full quoted amount. Payment isn&apos;t required now — pay
              at or before the visit (cash, check, credit card, or Venmo).
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function ReviewRow({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={emphasize ? "text-right text-xl font-bold text-slate-900" : "text-right font-medium text-slate-900"}>
        {value}
      </span>
    </div>
  );
}
