export type Region = "East" | "West" | "Central" | "MainLine" | "WestChester";
export type Tier = "standard" | "premium";
export type VisitType =
  | "new-patient"
  | "maintenance"
  | "priority-standard"
  | "priority-upgraded"
  | "priority-accident"
  | "care-plan"
  | "group-visit";

export const INTAKE_URL = "https://script.google.com/macros/s/AKfycbyJJ1cbPMkBL0McMnk0Kc5jHr4q7jKoej3dk1ma5fe13DraUBP_sKEkwgWY1YH1nBAgWw/exec";

export const CALENDAR_ID =
  "c_5974b14c4f761114a9cf014cab326c136edad54ee2fc8f179de0dd222331b413@group.calendar.google.com";

// Booking-confirmation-email constants (ported from the old Koalendar Apps
// Script). Intake deadline is 2 hours here, matching the policy screen
// (app/book/page.tsx) — the old script said 3 hours; see conversation notes.
//
// PUBLIC_CONTACT_EMAIL and BOOKING_NOTIFICATION_EMAIL are deliberately
// separate constants (2026-08-28 decision), even though they happen to share
// a value history: PUBLIC_CONTACT_EMAIL is shown anywhere a patient/visitor
// sees "the GoChiroMobile email address" (site footer, etc.).
// BOOKING_NOTIFICATION_EMAIL is the internal/doctor recipient for booking
// notifications — an operational/backend address, intentionally not tied to
// the public-facing value.
export const PUBLIC_CONTACT_EMAIL = "contact@gochiromobile.com";
export const BOOKING_NOTIFICATION_EMAIL = "contact@mybackcracker.com";
export const BUSINESS_NAME = "GoChiroMobile";
export const DOCTOR_NAME = "Dr. David DeFries";
export const BUSINESS_PHONE = "(610) 494-0412";
export const VENMO_LINK = "https://venmo.com/u/mybackcracker";
export const VENMO_LAST4 = "7752";
export const INTAKE_DEADLINE_HOURS = 2;

export const ZIPS: Record<Region, string[]> = {
  East: ["19022", "19043", "19070", "19074", "19076", "19078", "19081", "19086", "19094"],
  West: ["19014", "19015", "19060", "19061", "19339", "19340", "19342"],
  Central: ["19008", "19063", "19064", "19073", "19083"],
  MainLine: ["19003", "19041", "19085", "19087", "19096", "19312", "19333"],
  WestChester: ["19319", "19373", "19380", "19382", "19383", "19395"],
};

export const PREMIUM_REGIONS: Region[] = ["Central", "MainLine", "WestChester"];

// New Patient, First Visit is priced per-tier directly (not standard + flat
// surcharge like every other visit type) — $100 standard / $160 premium.
const NEW_PATIENT_STANDARD_PRICE = 100;
const NEW_PATIENT_PREMIUM_PRICE = 160;

export const BUFFER_MINUTES: Record<Region, Partial<Record<Region, number>>> = {
  East: { West: 35, Central: 40, MainLine: 50, WestChester: 60 },
  West: { East: 35, Central: 40, MainLine: 60, WestChester: 50 },
  Central: { East: 40, West: 40, MainLine: 40, WestChester: 40 },
  MainLine: { East: 50, West: 60, Central: 40, WestChester: 50 },
  WestChester: { East: 60, West: 50, Central: 40, MainLine: 50 },
};

export const SAME_REGION_BUFFER_MIN: Record<VisitType, number> = {
  maintenance: 0,
  "new-patient": 10,
  "priority-standard": 10,
  "priority-upgraded": 10,
  "priority-accident": 10,
  "care-plan": 10,
  "group-visit": 10,
};

// Flat premium-region surcharge, applied uniformly to every visit type's standard price.
export const PREMIUM_SURCHARGE = 40;

// Global lead-time / buffer rule: every visit type requires 2 hours' notice,
// except Maintenance (48 hours) and Care Plan (8 hours). Priority deliberately
// still uses the plain 2-hour rule so it can't be used as a same-day loophole
// for something that should go through Care Plan or Maintenance instead.
const STANDARD_BUFFER_DAYS = 2 / 24; // 2-hour buffer
const MAINTENANCE_BUFFER_DAYS = 2; // 48-hour buffer
const CARE_PLAN_BUFFER_DAYS = 8 / 24; // 8-hour buffer
const GROUP_VISIT_BUFFER_DAYS = 1; // 24-hour online lead time (GROUP_VISIT_SPECIFICATION.md §7)

function withPremium(standard: number): number {
  return standard + PREMIUM_SURCHARGE;
}

export interface VisitInfo {
  label: string;
  durationMin: number;
  standard: number | null;
  premium: number | null;
  minLeadDays: number;
}

export const VISITS: Record<VisitType, VisitInfo> = {
  "new-patient": {
    label: "New Patient, First Visit",
    durationMin: 45,
    standard: NEW_PATIENT_STANDARD_PRICE,
    premium: NEW_PATIENT_PREMIUM_PRICE,
    minLeadDays: STANDARD_BUFFER_DAYS,
  },
  maintenance: {
    label: "Maintenance / Wellness Visit",
    durationMin: 20,
    standard: 60,
    premium: withPremium(60),
    minLeadDays: MAINTENANCE_BUFFER_DAYS,
  },
  "priority-standard": {
    label: "Priority Visit",
    durationMin: 20,
    standard: 80,
    premium: withPremium(80),
    minLeadDays: STANDARD_BUFFER_DAYS,
  },
  "priority-upgraded": {
    label: "Priority Visit (Multiple Complaints / Severe)",
    durationMin: 40,
    standard: 100,
    premium: withPremium(100),
    minLeadDays: STANDARD_BUFFER_DAYS,
  },
  "priority-accident": {
    // No fee shown on-form — bills to insurance/claim. Still 45 min on the calendar.
    label: "Priority Visit (Accident / Work Injury)",
    durationMin: 45,
    standard: null,
    premium: null,
    minLeadDays: STANDARD_BUFFER_DAYS,
  },
  "care-plan": {
    label: "Care Plan Visit",
    durationMin: 20,
    standard: 80,
    premium: withPremium(80),
    minLeadDays: CARE_PLAN_BUFFER_DAYS, // 8hr buffer — distinct from the 2hr standard and 48hr maintenance rules
  },
  "group-visit": {
    // durationMin/standard/premium don't apply here the way they do for every
    // other visit type — a Group Visit's duration and price both depend on
    // participant composition (new vs. existing headcount), not just region
    // tier. Use groupVisitDurationMin()/groupVisitTotal() below instead of
    // reading these fields directly. minLeadDays is the one fixed value
    // (GROUP_VISIT_SPECIFICATION.md §7's 24-hour online lead time).
    label: "Group Visit",
    durationMin: 0,
    standard: null,
    premium: null,
    minLeadDays: GROUP_VISIT_BUFFER_DAYS,
  },
};

// Real Square checkout links, generated at the CURRENT prices above.
export const PAYMENT_LINKS: Record<Tier, Record<VisitType, string>> = {
  standard: {
    "new-patient": "https://square.link/u/AhTZStE8", // $100
    maintenance: "https://square.link/u/LpNyIUnR", // $60
    "priority-standard": "https://square.link/u/7QUlCvkK", // $80
    "priority-upgraded": "https://square.link/u/mVT09Yda", // $100
    "priority-accident": "", // bills to insurance/claim — no payment link applicable
    "care-plan": "https://square.link/u/t2dLMHMJ", // $80
    // No fixed-amount Square link for Group Visits — the total varies per
    // booking (participant composition), so a fixed link can't represent it.
    // Do not add one; see GROUP_VISIT_SPECIFICATION.md §9 (2026-08-28 decision).
    // Dynamic Square invoicing is deferred to a future capability.
    "group-visit": "",
  },
  premium: {
    "new-patient": "https://square.link/u/GaKl4fqx", // $160
    maintenance: "https://square.link/u/FojVMl66", // $100
    "priority-standard": "https://square.link/u/Vy2kUknx", // $120
    "priority-upgraded": "https://square.link/u/03i9idLZ", // $140
    "priority-accident": "", // bills to insurance/claim — no payment link applicable
    "care-plan": "https://square.link/u/Fmm8ubaO", // $120
    "group-visit": "", // see note above
  },
};

export function findRegion(zip: string): Region | null {
  const normalized = zip.trim();
  for (const [region, zips] of Object.entries(ZIPS) as [Region, string[]][]) {
    if (zips.includes(normalized)) return region;
  }
  return null;
}

export function tierForRegion(region: Region): Tier {
  return PREMIUM_REGIONS.includes(region) ? "premium" : "standard";
}

export function priceFor(region: Region, visit: VisitType): number | null {
  const tier = tierForRegion(region);
  return VISITS[visit][tier];
}

export function paymentLinkFor(region: Region, visit: VisitType): string {
  return PAYMENT_LINKS[tierForRegion(region)][visit];
}

export function leadDays(appointmentDate: Date, now: Date = new Date()): number {
  return (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
}

export function visitTypesForLeadTime(days: number): VisitType[] {
  return (Object.keys(VISITS) as VisitType[]).filter((v) => days >= VISITS[v].minLeadDays);
}

// The business doesn't operate weekends — this has to be an explicit rule
// rather than inferred from the calendar, since an empty Saturday on the
// calendar is indistinguishable from a genuinely open one otherwise.
export function isBusinessDay(dateISO: string): boolean {
  const day = new Date(`${dateISO}T00:00:00`).getDay(); // 0 = Sunday, 6 = Saturday
  return day !== 0 && day !== 6;
}

// Priority Visit triage tree (Section 2 of BOOKING_FLOW_SPEC.md). Questions are
// asked and evaluated in this exact order — each one short-circuits the rest:
//   Q1 accidentOrInjury   -> Yes: priority-accident, done.
//   Q2 multipleComplaints -> Yes: priority-upgraded, done.
//   Q3 severeOrRadiating  -> Yes: priority-upgraded. No: priority-standard.
// The 20-min/$80 outcome requires "no" on all three questions.
export function resolvePriorityVisit(
  accidentOrInjury: boolean,
  multipleComplaints: boolean,
  severeOrRadiating: boolean
): VisitType {
  if (accidentOrInjury) return "priority-accident";
  if (multipleComplaints) return "priority-upgraded";
  return severeOrRadiating ? "priority-upgraded" : "priority-standard";
}

// Group Visits (GROUP_VISIT_SPECIFICATION.md, resolved 2026-08-28). Price and
// duration both depend on participant composition, not just region tier, so
// they're computed here rather than stored in VISITS above.
export const GROUP_VISIT_MIN_PARTICIPANTS = 2;
export const GROUP_VISIT_NEW_PATIENT_PRICE = 60;
export const GROUP_VISIT_EXISTING_PATIENT_PRICE = 40;
export const GROUP_VISIT_TRAVEL_FEE: Record<Tier, number> = { standard: 20, premium: 40 };
export const GROUP_VISIT_NEW_PATIENT_MIN = 20; // minutes per new-patient participant
export const GROUP_VISIT_EXISTING_PATIENT_MIN = 10; // minutes per existing-patient participant

export interface GroupVisitComposition {
  newCount: number;
  existingCount: number;
}

export function groupVisitParticipantCount(c: GroupVisitComposition): number {
  return c.newCount + c.existingCount;
}

export function isValidGroupVisitComposition(c: GroupVisitComposition): boolean {
  return (
    Number.isInteger(c.newCount) &&
    Number.isInteger(c.existingCount) &&
    c.newCount >= 0 &&
    c.existingCount >= 0 &&
    groupVisitParticipantCount(c) >= GROUP_VISIT_MIN_PARTICIPANTS
  );
}

export function groupVisitDurationMin(c: GroupVisitComposition): number {
  return c.newCount * GROUP_VISIT_NEW_PATIENT_MIN + c.existingCount * GROUP_VISIT_EXISTING_PATIENT_MIN;
}

export function groupVisitTravelFee(region: Region): number {
  return GROUP_VISIT_TRAVEL_FEE[tierForRegion(region)];
}

// Per-person fees plus one travel fee for the whole booking — the host pays
// this single total, not each participant separately (Section 5/9).
export function groupVisitTotal(region: Region, c: GroupVisitComposition): number {
  return (
    c.newCount * GROUP_VISIT_NEW_PATIENT_PRICE +
    c.existingCount * GROUP_VISIT_EXISTING_PATIENT_PRICE +
    groupVisitTravelFee(region)
  );
}
