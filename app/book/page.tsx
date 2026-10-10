"use client";
import { matchesWeekendDay, weekendDates, type WeekendDay } from "@/lib/weekendBooking";
import { zipRoute, locationRequestPath } from "@/lib/zipRouting";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  INTAKE_URL,
  VISITS,
  findRegion,
  paymentLinkFor,
  priceFor,
  priceForDate,
  resolvePriorityVisit,
  isBusinessDay,
  isVisitAllowedOnDay,
  groupVisitTotal,
  groupVisitExistingPatientRate,
  groupVisitWeekendSurcharge,
  isValidGroupVisitComposition,
  GROUP_VISIT_MIN_PARTICIPANTS,
  GROUP_VISIT_MAX_PARTICIPANTS,
  GROUP_VISIT_NEW_PATIENT_SURCHARGE,
  type VisitType,
  type Region,
} from "@/lib/gochiro";

type Step =
  | "landing"
  | "region"
  | "zip"
  | "policy"
  | "weekend"
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

function VisitPriceSummary({ region, visit, day = null }: { region: Region; visit: VisitType; day?: WeekendDay | null }) {
  if (day !== null) return <>{day === 6 ? "Saturday" : "Sunday"} {formatPrice(priceForDate(region, visit, day === 6 ? "2026-10-03" : "2026-10-04"))}</>;
  return <>Weekday {formatPrice(priceFor(region, visit))} · Saturday {formatPrice(priceForDate(region, visit, "2026-10-03"))}{isVisitAllowedOnDay(visit, 0) ? <> · Sunday {formatPrice(priceForDate(region, visit, "2026-10-04"))}</> : <> · Not available Sundays</>}</>;
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
  const zipDestination = zipRoute(zip);
  const zipRegion = useMemo<Region | null>(() => findRegion(zip), [zip]);
  const [region, setRegion] = useState<Region | null>(null);

  const [weekendDay, setWeekendDay] = useState<WeekendDay | null>(null);
  const [visit, setVisit] = useState<VisitType | null>(null);

  // Group Visit composition. The host's own contact info reuses the same
  // firstName/lastName/phone/email/address state as the New Patient /
  // Returning Patient flows below — a user is only ever in one flow per
  // session, so sharing it is safe and avoids duplicating ~9 fields. Only
  // the host's contact info is collected — individual attendees are not
  // identified during booking. When new patients are included, the host's
  // confirmation email receives one single-use secure intake link per new
  // patient to forward separately.
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

  const [groupPaymentLink, setGroupPaymentLink] = useState("");

  const appointmentDate = date || (selectedSlot ? new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date(selectedSlot)) : "");
  const price = region && visit
    ? (appointmentDate ? priceForDate(region, visit, appointmentDate) : priceFor(region, visit))
    : 0;
  const appointmentDay = appointmentDate ? new Date(`${appointmentDate}T12:00:00Z`).getUTCDay() : -1;
  // Existing Square links are weekday fixed-price links. Weekend appointments
  // show the correct weekend fee but are paid at the visit until dedicated
  // weekend Square links are created.
  const paymentLink = region && visit && appointmentDay !== 0 && appointmentDay !== 6
    ? paymentLinkFor(region, visit)
    : "";

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
    const params = new URLSearchParams(window.location.search);
    const start = params.get("start");
    const initialZip = params.get("zip") || "";
    const initialRegion = /^\d{5}$/.test(initialZip) ? findRegion(initialZip) : null;
    // Reading a one-time deep-link param from the URL at mount and syncing it
    // into state is exactly the "external system" case this rule's own docs
    // carve out — there's no render-phase alternative that avoids a
    // server/client hydration mismatch (see comment above).
    if (initialRegion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setZip(initialZip);
      setRegion(initialRegion);
    }
    if (start === "new") {
      setPatientType("new");
      if (initialRegion) setVisit("new-patient");
      setStep(initialRegion ? "policy" : "zip");
    } else if (start === "returning") {
      setPatientType("returning");
      setStep(initialRegion ? "visit" : "region");
    } else if (start === "group") {
      setPatientType("group");
      setVisit("group-visit");
      setStep("group-count");
    }
  }, []);

  // Steps back one screen without touching any already-entered field state.
  function goBack() {
    if (step === "weekend") setWeekendDay(null);
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
      if (funnelStage === "bucket" && visit === "group-visit") {
        if (history[history.length - 1] === "group-policy") {
          setHistory((h) => h.slice(0, -1));
        }
        setStep("group-policy");
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
    if (weekendDay !== null) {
      goToMaintenanceSchedule();
      return;
    }
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
    setDayCandidates(weekendDay === null ? nextBusinessDays(7) : weekendDates(todayISO(), weekendDay));
    go("time");
  }

  function continueFromZip() {
    if (zipDestination === "request") { router.push(locationRequestPath(zip)); return; }
    if (!zipRegion) return;
    setRegion(zipRegion);
    setWeekendDay(null);
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
      const data = (await res.json()) as { error?: string; paymentLink?: string };

      if (!res.ok) {
        if (res.status === 409) {
          setBookingError(data.error || "That slot was just taken. Please choose another time.");
          go("time");
        } else {
          setBookingError(data.error || "Something went wrong booking this appointment.");
        }
        return;
      }

      setGroupPaymentLink(data.paymentLink || "");
      go("confirmed");
    } catch {
      setBookingError("Couldn't reach the booking system. Check your connection and try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-4 sm:py-8">
      <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <button onClick={goBack} className="text-sm font-semibold text-slate-500 hover:text-ink">
          ← Back
        </button>

        {patientType && (
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            {patientType === "new" ? "New Patient" : patientType === "returning" ? "Returning Patient" : "Group Visit"}
          </p>
        )}

        {step === "landing" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Schedule Your Appointment</h1>
            <p className="mt-2 text-muted">Answer a few questions to see your available appointment times and fee.</p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  setPatientType("new");
                  go("zip");
                }}
                className="w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white hover:bg-navy-dark"
              >
                New Patient, First Visit
              </button>
              <div>
                <button
                  onClick={() => {
                    setPatientType("returning");
                    go("region");
                  }}
                  className="w-full rounded-xl border border-line px-5 py-4 text-lg font-semibold text-ink hover:border-accent"
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
                className="w-full rounded-xl border border-line px-5 py-4 text-lg font-semibold text-ink hover:border-accent"
              >
                Group Visit, 2+ People
              </button>
            </div>
          </>
        )}

        {step === "region" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Where are you located?</h1>
            <p className="mt-2 text-muted">Choose your scheduling area below.</p>

            <div className="mt-6 space-y-3">
              {REGION_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRegion(r.id);
                    setWeekendDay(null);
                    go("visit");
                  }}
                  className={`w-full rounded-xl border p-4 text-left font-semibold text-ink ${r.className}`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-700">Not sure which area you&apos;re in?</p>
            <button
              onClick={() => go("zip")}
              className="mt-2 w-full rounded-xl border border-line px-5 py-4 text-center font-semibold text-muted hover:border-accent"
            >
              Enter my ZIP code
            </button>
          </>
        )}

        {step === "zip" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">What ZIP code will we be visiting?</h1>
            <p className="mt-2 text-muted">We use your ZIP code to determine the service region and visit fee.</p>

            <input
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              inputMode="numeric"
              placeholder="ZIP code"
              aria-label="ZIP code of the appointment"
              className="mt-6 w-full rounded-xl border border-line px-4 py-4 text-lg outline-none focus:border-slate-900"
            />

            {zip.length === 5 && !zipRegion && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                {zipDestination === "request" ? (
                  <p>This Pennsylvania location is available by arrangement. Check your location to request a quote before booking.</p>
                ) : (
                  <p>Care is available in Pennsylvania only. This ZIP is not listed as a Pennsylvania location. Please check your ZIP code.</p>
                )}
              </div>
            )}

            {zipRegion && patientType === "new" && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-900">
                <span className="text-sm font-semibold">New Patient, First Visit</span>
                <span className="mt-1 block text-sm">
                  Weekday {formatPrice(priceFor(zipRegion, "new-patient"))} · Saturday {formatPrice(priceForDate(zipRegion, "new-patient", "2026-10-03"))} · Sunday {formatPrice(priceForDate(zipRegion, "new-patient", "2026-10-04"))}
                </span>
                <span className="mt-1 block text-xs">Your exact fee is shown after you select a date.</span>
              </div>
            )}

            {zipRegion && patientType !== "new" && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">Service area confirmed.</div>
            )}

            <button
              onClick={continueFromZip}
              disabled={zipDestination !== "booking" && zipDestination !== "request"}
              className="mt-4 w-full rounded-xl bg-navy px-5 py-3.5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {zipDestination === "request" ? "Check Your Location" : "Continue"}
            </button>
          </>
        )}

        {step === "group-count" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Who&apos;s coming?</h1>
            <p className="mt-2 text-muted">
              Group Visits need at least {GROUP_VISIT_MIN_PARTICIPANTS} people, and new and existing patients can
              mix freely.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="group-new-count" className="text-sm font-semibold text-slate-700">
                  New patients
                </label>
                <input
                  id="group-new-count"
                  type="number"
                  min={0}
                  max={GROUP_VISIT_MAX_PARTICIPANTS}
                  value={groupNewCount}
                  onChange={(e) => setGroupNewCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-lg outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label htmlFor="group-existing-count" className="text-sm font-semibold text-slate-700">
                  Existing patients
                </label>
                <input
                  id="group-existing-count"
                  type="number"
                  min={0}
                  max={GROUP_VISIT_MAX_PARTICIPANTS}
                  value={groupExistingCount}
                  onChange={(e) => setGroupExistingCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-lg outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {region && zipRegion === region && groupCompositionValid && (
              <p className="mt-4 rounded-xl bg-cream p-4 text-sm text-ink">Visit ZIP: {zip}. Weekday group total: <strong>{formatPrice(groupVisitTotal(region, groupComposition))}</strong>. Saturday or Sunday adds $20 to the group total. Your final total is shown for your selected date.</p>
            )}

            {!groupCompositionValid && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                A Group Visit needs {GROUP_VISIT_MIN_PARTICIPANTS}–{GROUP_VISIT_MAX_PARTICIPANTS} people total.
              </div>
            )}

            <button
              onClick={() => go(region && zipRegion === region ? "group-policy" : "group-zip")}
              disabled={!groupCompositionValid}
              className="mt-6 w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "group-zip" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">What ZIP code will we be visiting?</h1>
            <p className="mt-2 text-muted">We use your ZIP code to determine the service region and group pricing.</p>

            <input
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              inputMode="numeric"
              placeholder="ZIP code"
              aria-label="ZIP code of the appointment"
              className="mt-6 w-full rounded-xl border border-line px-4 py-4 text-lg outline-none focus:border-slate-900"
            />

            {zip.length === 5 && !zipRegion && (
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                {zipDestination === "request" ? (
                  <p>This Pennsylvania location is available by arrangement. Check your location to request a quote before booking.</p>
                ) : (
                  <p>Care is available in Pennsylvania only. This ZIP is not listed as a Pennsylvania location. Please check your ZIP code.</p>
                )}
              </div>
            )}

            {zipRegion && (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-900">
                <span className="text-sm">Group Visit total</span>
                <span className="block text-2xl font-bold">{formatPrice(groupVisitTotal(zipRegion, groupComposition))}</span>
                <span className="mt-1 block text-xs text-emerald-800">
                  {`${groupVisitExistingPatientRate(zipRegion, groupComposition.newCount + groupComposition.existingCount)} base per person`}
                  {groupNewCount > 0 && ` + ${GROUP_VISIT_NEW_PATIENT_SURCHARGE} for each new patient`}
                </span>
              </div>
            )}

            <button
              onClick={() => {
                if (zipDestination === "request") { router.push(locationRequestPath(zip)); return; }
                if (!zipRegion) return;
                setRegion(zipRegion);
                go("group-policy");
              }}
              disabled={zipDestination !== "booking" && zipDestination !== "request"}
              className="mt-6 w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {zipDestination === "request" ? "Check Your Location" : "Continue"}
            </button>
          </>
        )}

        {step === "group-policy" && (
          <>
            <h1 className="mt-1 text-2xl font-bold text-ink">Before You Book</h1>

            <div className="mt-4 space-y-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
              <div>
                <h2 className="font-semibold text-ink">Routine care only</h2>
                <p className="mt-0.5">
                  Acute or significantly worsening complaints — including a new complaint in an existing patient — need an individual visit.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-ink">Host responsibility</h2>
                <p className="mt-0.5">
                  The host is responsible for the full quoted group total. Payment is not required to book. You are welcome to pay now or at the time of the visit.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-ink">Changes within 24 hours</h2>
                <p className="mt-0.5">
                  Reduce headcount more than 24 hours ahead and we&apos;ll recalculate. Within 24 hours, the reserved
                  group total remains due.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-ink">New-patient intake</h2>
                <p className="mt-0.5">
                  Each new patient must complete the intake form within 3 hours of booking to be treated as part of the Group Visit.
                </p>
              </div>
            </div>

            <label className="mt-3 flex items-start gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={groupPolicyAgreed}
                onChange={(e) => setGroupPolicyAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-line"
              />
              I have read and agree to the policies above
            </label>

            <button
              onClick={goToSchedule}
              disabled={!groupPolicyAgreed}
              className="mt-4 w-full rounded-xl bg-navy px-5 py-3.5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "policy" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Before You Book</h1>
            <p className="mt-2 text-muted">Please review the following before scheduling your visit:</p>

            <div className="mt-6 max-h-72 space-y-5 overflow-y-auto rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
              <div>
                <h2 className="font-semibold text-ink">Cancellation Policy</h2>
                <p className="mt-1">
                  We require at least 24 hours&apos; notice to cancel or reschedule your appointment. Cancellations,
                  no-shows, or same-day changes made with less than 24 hours&apos; notice will be charged a $50 fee.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-ink">Arrival Window</h2>
                <p className="mt-1">
                  Dr. DeFries travels between appointments, so please allow about 15 minutes of flexibility before
                  and after your scheduled time.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-ink">Intake Forms</h2>
                <p className="mt-1">
                  New patient intake forms must be completed at least 2 hours before your appointment. If they
                  aren&apos;t completed in time, your appointment will be canceled and a missed-appointment fee will
                  apply.
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-ink">Payment</h2>
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
                className="mt-0.5 h-4 w-4 rounded border-line"
              />
              I have read and agree to the policies above
            </label>

            <button
              onClick={goToSchedule}
              disabled={!policyAgreed}
              className="mt-6 w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "weekend" && region && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Saturday / Sunday Appointments</h1>
            <p className="mt-3 text-muted">Choose a day to see the appropriate visits and prices for {REGION_OPTIONS.find(r => r.id === region)?.label}. Openings and advance-notice requirements still apply.</p>
            <div className="mt-6 space-y-3">
              <button onClick={() => { setWeekendDay(6); go("visit"); }} className="w-full rounded-xl border border-line p-4 text-left hover:border-accent"><strong className="block">Saturday · 9 a.m.–{["Central", "MainLine", "WestChester"].includes(region) ? "noon" : "1 p.m."}</strong><span className="mt-2 block text-sm text-muted">Priority, Care Plan, and Maintenance / Wellness. Maintenance requires 48 hours’ notice.</span></button>
              <button onClick={() => { setWeekendDay(0); go("visit"); }} className="w-full rounded-xl border border-line p-4 text-left hover:border-accent"><strong className="block">Sunday · 9 a.m.–1 p.m.</strong><span className="mt-2 block text-sm text-muted">Priority visits for returning patients, with at least two hours’ notice. Maintenance and Care Plan visits are not offered Sundays.</span></button>
            </div>
          </>
        )}

        {step === "visit" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">{weekendDay === null ? "What type of visit do you need?" : `${weekendDay === 6 ? "Saturday" : "Sunday"}: What type of visit do you need?`}</h1>
            <p className="mt-3 text-sm text-muted">Saturday appointments are available{region ? ` from 9 a.m. to ${["Central", "MainLine", "WestChester"].includes(region) ? "noon" : "1 p.m."}` : ""}, subject to openings and advance-notice requirements. Sunday appointments are available for Priority Visits; Maintenance and Care Plan visits are not offered Sundays.</p>
            <div className="mt-6 space-y-3">
              {weekendDay === null && <button onClick={() => go("weekend")} className="w-full rounded-xl border-2 border-navy bg-cream p-4 text-left font-semibold text-navy">Saturday / Sunday Appointments<span className="mt-1 block text-sm font-normal">See weekend visit options, prices, and available dates.</span></button>}
              {weekendDay !== 0 && <button
                onClick={() => go("maintenance-warning")}
                className="w-full rounded-xl border border-line p-4 text-left hover:border-accent"
              >
                <span className="block font-semibold text-ink">Maintenance / Wellness Visit</span>
                <span className="mt-1 block text-sm text-slate-500">Requires 48-hour advance notice.</span>
                {region && (
                  <span className="mt-1 block text-lg font-bold text-ink">
                    <VisitPriceSummary region={region} visit="maintenance" day={weekendDay} />
                  </span>
                )}
              </button>}
              <button
                onClick={choosePriority}
                className="w-full rounded-xl border border-line p-4 text-left hover:border-accent"
              >
                <span className="block font-semibold text-ink">New Complaint / Priority Visit</span>
                <span className="mt-1 block text-sm text-slate-500">For a new or worsening complaint, including Saturday or Sunday care. At least two hours’ notice is required.</span>
                {region && weekendDay !== null && <span className="mt-1 block text-lg font-bold text-ink"><VisitPriceSummary region={region} visit="priority-standard" day={weekendDay} /></span>}
                <span className="mt-1 block text-sm text-slate-500">A couple quick questions will confirm the appropriate visit. Accident or work-injury visits may bill to insurance or a claim.</span>
              </button>
              {weekendDay !== 0 && <button
                onClick={() => chooseDirectVisit("care-plan")}
                className="w-full rounded-xl border border-line p-4 text-left hover:border-accent"
              >
                <span className="block font-semibold text-ink">Care Plan Visit</span>
                {region && (
                  <span className="mt-1 block text-lg font-bold text-ink">
                    <VisitPriceSummary region={region} visit="care-plan" day={weekendDay} />
                  </span>
                )}
                <span className="mt-1 block text-sm text-muted">
                  For patients currently enrolled in an active treatment plan.
                </span>
              </button>}
            </div>
          </>
        )}

        {step === "maintenance-warning" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Maintenance / Wellness Visit</h1>
            <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
              Maintenance visits require 48 hours’ advance notice and are not offered Sundays. For a new or worsening complaint needing earlier care—including Saturday or Sunday—choose New Complaint / Priority Visit.
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={choosePriority}
                className="w-full rounded-xl border border-line p-4 text-left font-semibold text-ink hover:border-accent"
              >
                Choose New Complaint / Priority Visit
              </button>
              <button
                onClick={() => chooseDirectVisit("maintenance")}
                className="w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white hover:bg-navy-dark"
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
                <h1 className="mt-2 text-2xl font-bold text-ink">
                  Was this related to an accident or work-related injury?
                </h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => answerAccident(true)}
                    className="rounded-xl border border-line p-4 font-semibold text-ink hover:border-accent"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => answerAccident(false)}
                    className="rounded-xl border border-line p-4 font-semibold text-ink hover:border-accent"
                  >
                    No
                  </button>
                </div>
              </>
            )}

            {triageStep === 2 && (
              <>
                <h1 className="mt-2 text-2xl font-bold text-ink">
                  Is this one complaint, or multiple complaints?
                </h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => answerComplaints(false)}
                    className="rounded-xl border border-line p-4 font-semibold text-ink hover:border-accent"
                  >
                    One complaint
                  </button>
                  <button
                    onClick={() => answerComplaints(true)}
                    className="rounded-xl border border-line p-4 font-semibold text-ink hover:border-accent"
                  >
                    Multiple
                  </button>
                </div>
              </>
            )}

            {triageStep === 3 && (
              <>
                <h1 className="mt-2 text-2xl font-bold text-ink">
                  Is your pain mild-to-moderate, or severe/radiating?
                </h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => answerSeverity(false)}
                    className="rounded-xl border border-line p-4 font-semibold text-ink hover:border-accent"
                  >
                    Mild-to-moderate
                  </button>
                  <button
                    onClick={() => answerSeverity(true)}
                    className="rounded-xl border border-line p-4 font-semibold text-ink hover:border-accent"
                  >
                    Severe / radiating
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {step === "time" && visit && visit !== "group-visit" && region && (
          <p className="mt-2 text-sm text-muted">
            {VISITS[visit].label}
            {visit !== "priority-accident" && (
              <>
                {" — "}
                {date ? (
                  <span className="text-lg font-bold text-ink">{formatPrice(priceForDate(region, visit, date))}</span>
                ) : (
                  <span className="font-semibold text-ink"><VisitPriceSummary region={region} visit={visit} day={weekendDay} /></span>
                )}
              </>
            )}
          </p>
        )}

        {step === "time" && visit === "group-visit" && region && (
          <p className="mt-2 text-sm text-muted">
            Group Visit —{" "}
            <span className="text-lg font-bold text-ink">{formatPrice(groupVisitTotal(region, groupComposition, appointmentDate))}</span>
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
            <h1 className="mt-2 text-2xl font-bold text-ink">When would you like to be seen?</h1>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => chooseBucket("asap")}
                className="w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white hover:bg-navy-dark"
              >
                As soon as possible
              </button>
              <button
                onClick={() => chooseBucket("week")}
                className="w-full rounded-xl border border-line px-5 py-4 text-lg font-semibold text-ink hover:border-accent"
              >
                This week
              </button>
              <button
                onClick={() => chooseBucket("future")}
                className="w-full rounded-xl border border-line px-5 py-4 text-lg font-semibold text-ink hover:border-accent"
              >
                In the future
              </button>
            </div>
          </>
        )}

        {step === "time" && funnelStage === "day" && bucket !== "future" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">{weekendDay === null ? "Which day?" : `Choose a ${weekendDay === 6 ? "Saturday" : "Sunday"}`}</h1>
            {checkingAvailability && <p className="mt-2 text-slate-500">Checking availability…</p>}

            {!checkingAvailability && availableDayTabs.length === 0 && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                No openings in this window. Try &quot;In the future&quot; for a later date, or call/text
                (610) 494-0412.
              </div>
            )}

            {availableDayTabs.length > 0 && (
              <div className={`mt-6 grid grid-cols-2 gap-2 ${bucket === "asap" ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
                {availableDayTabs.map((d) => (
                  <button
                    key={d}
                    onClick={() => chooseDay(d)}
                    className={`rounded-xl border p-3 text-center text-sm font-semibold ${
                      date === d ? "border-slate-900 bg-navy text-white" : "border-line text-ink"
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
                className="mt-4 w-full rounded-xl border border-line px-5 py-4 text-center font-semibold text-muted hover:border-accent"
              >
                Choose a later date
              </button>
            )}
          </>
        )}

        {step === "time" && funnelStage === "day" && bucket === "future" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Pick a date</h1>

            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Appointment date"
              className="mt-6 w-full rounded-xl border border-line px-4 py-4 text-lg outline-none focus:border-slate-900"
            />

            {weekendDay !== null && <p className="mt-3 text-sm text-muted">Select a {weekendDay === 6 ? "Saturday" : "Sunday"}. {date && !matchesWeekendDay(date, weekendDay) ? "This date is a different day of the week." : ""}</p>}
            <button
              onClick={() => setFunnelStage("period")}
              disabled={!date || (weekendDay !== null && !matchesWeekendDay(date, weekendDay))}
              className="mt-6 w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continue
            </button>
          </>
        )}

        {step === "time" && funnelStage === "period" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">What time of day?</h1>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => choosePeriod("morning")}
                className="rounded-xl border border-line px-4 py-4 text-center font-semibold text-ink hover:border-accent"
              >
                Morning
              </button>
              <button
                onClick={() => choosePeriod("afternoon")}
                className="rounded-xl border border-line px-4 py-4 text-center font-semibold text-ink hover:border-accent"
              >
                Afternoon
              </button>
              <button
                onClick={() => choosePeriod("evening")}
                className="rounded-xl border border-line px-4 py-4 text-center font-semibold text-ink hover:border-accent"
              >
                Early Evening
              </button>
            </div>
          </>
        )}

        {step === "time" && funnelStage === "slots" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Choose a time</h1>

            {slotsLoading && <p className="mt-6 text-slate-500">Loading availability…</p>}

            {slotsError && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{slotsError}</div>
            )}

            {!slotsLoading && !slotsError && slots.length === 0 && (
              <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                No openings that day. Try another date, or call/text (610) 494-0412.
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
                    className="rounded-xl border border-line px-4 py-4 text-center font-semibold text-ink hover:border-accent"
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
            <h1 className="mt-2 text-2xl font-bold text-ink">Address of the Appointment</h1>
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
                    contactErrors.firstName ? "border-red-400" : "border-line"
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
                    contactErrors.lastName ? "border-red-400" : "border-line"
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
                    contactErrors.phone ? "border-red-400" : "border-line"
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
                    contactErrors.email ? "border-red-400" : "border-line"
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
                    contactErrors.address ? "border-red-400" : "border-line"
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
                className="w-full rounded-xl border border-line px-4 py-3"
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
                    contactErrors.addressCity ? "border-red-400" : "border-line"
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
                      contactErrors.addressState ? "border-red-400" : "border-line"
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
                      contactErrors.addressZip ? "border-red-400" : "border-line"
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
              className="mt-6 w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white"
            >
              Continue
            </button>
          </>
        )}

        {step === "group-contact" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Host Contact &amp; Address</h1>
            <p className="mt-2 text-muted">
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
                    contactErrors.firstName ? "border-red-400" : "border-line"
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
                    contactErrors.lastName ? "border-red-400" : "border-line"
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
                    contactErrors.phone ? "border-red-400" : "border-line"
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
                    contactErrors.email ? "border-red-400" : "border-line"
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
                    contactErrors.address ? "border-red-400" : "border-line"
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
                className="w-full rounded-xl border border-line px-4 py-3"
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
                    contactErrors.addressCity ? "border-red-400" : "border-line"
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
                      contactErrors.addressState ? "border-red-400" : "border-line"
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
                      contactErrors.addressZip ? "border-red-400" : "border-line"
                    }`}
                  />
                  {contactErrors.addressZip && (
                    <p className="mt-1 text-sm text-red-600">{contactErrors.addressZip}</p>
                  )}
                </div>
              </div>
            </div>

            <button onClick={groupContactComplete} className="mt-6 w-full rounded-xl bg-navy px-5 py-4 text-lg font-semibold text-white">
              Continue
            </button>
          </>
        )}

        {step === "review" && region && visit && visit !== "group-visit" && selectedSlot && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Review</h1>

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
                  className="mt-5 w-full rounded-xl bg-navy px-5 py-4 text-center text-lg font-semibold text-white disabled:bg-slate-300"
                >
                  {bookingLoading ? "Booking…" : "Confirm Appointment & Complete Intake Now"}
                </button>
                <button
                  onClick={() => confirmBooking(false)}
                  disabled={bookingLoading}
                  className="mt-3 w-full rounded-xl border border-line px-5 py-4 text-center text-lg font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bookingLoading ? "Booking…" : "Confirm Appointment & Email Intake Form"}
                </button>
              </>
            ) : (
              <button
                onClick={() => confirmBooking(false)}
                disabled={bookingLoading}
                className="mt-5 w-full rounded-xl bg-navy px-5 py-4 text-center text-lg font-semibold text-white disabled:bg-slate-300"
              >
                {bookingLoading ? "Booking…" : "Confirm Appointment"}
              </button>
            )}

            {paymentLink && (
              <a
                href={paymentLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full rounded-xl border border-line px-5 py-4 text-center font-semibold text-ink"
              >
                Pay with Square
              </a>
            )}
          </>
        )}

        {step === "review" && region && visit === "group-visit" && selectedSlot && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">Review</h1>

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
              <ReviewRow
                label="Base group rate"
                value={`$${groupVisitExistingPatientRate(region, groupComposition.newCount + groupComposition.existingCount)} per person`}
              />
              {groupComposition.newCount > 0 && (
                <ReviewRow
                  label={`New-patient add-on × ${groupComposition.newCount}`}
                  value={formatPrice(groupComposition.newCount * GROUP_VISIT_NEW_PATIENT_SURCHARGE)}
                />
              )}
              {groupVisitWeekendSurcharge(appointmentDate) > 0 && (
                <ReviewRow label="Weekend group surcharge" value={formatPrice(groupVisitWeekendSurcharge(appointmentDate))} />
              )}
              <ReviewRow label="Group total" value={formatPrice(groupVisitTotal(region, groupComposition, appointmentDate))} emphasize />
            </div>

            {bookingError && (
              <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-900">{bookingError}</div>
            )}

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
              As the host, you&apos;re responsible for the full amount above. Changes within 24 hours do not reduce
              the reserved group total. Payment is not required to book. You are welcome to pay now or at the time of the visit.
            </div>

            <button
              onClick={confirmGroupBooking}
              disabled={bookingLoading}
              className="mt-5 w-full rounded-xl bg-navy px-5 py-4 text-center text-lg font-semibold text-white disabled:bg-slate-300"
            >
              {bookingLoading ? "Booking…" : "Confirm Group Visit"}
            </button>
          </>
        )}

        {step === "confirmed" && visit !== "group-visit" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">You&apos;re booked!</h1>
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

            {paymentLink && (
              <a
                href={paymentLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block w-full rounded-xl bg-navy px-5 py-4 text-center text-lg font-semibold text-white"
              >
                Pay with Square
              </a>
            )}

            {patientType === "new" && (
              <a
                href={INTAKE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full rounded-xl border border-line px-5 py-4 text-center font-semibold text-ink"
              >
                Complete Intake
              </a>
            )}
          </>
        )}

        {step === "confirmed" && visit === "group-visit" && (
          <>
            <h1 className="mt-2 text-2xl font-bold text-ink">You&apos;re booked!</h1>
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

            <div className="mt-3 rounded-xl border border-line p-4 text-center text-sm text-muted">
              As the host, you&apos;re responsible for the full quoted amount. Changes within 24 hours do not reduce
              the reserved group total. Payment is not required to book. You are welcome to pay now or at the time of the visit.
            </div>

            {groupPaymentLink && (
              <a
                href={groupPaymentLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full rounded-xl bg-navy px-5 py-4 text-center text-lg font-semibold text-white"
              >
                Pay Group Total with Square
              </a>
            )}
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
      <span className={emphasize ? "text-right text-xl font-bold text-ink" : "text-right font-medium text-ink"}>
        {value}
      </span>
    </div>
  );
}
