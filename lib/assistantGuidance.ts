import {
  findRegion,
  groupVisitTotal,
  isValidGroupVisitComposition,
  priceFor,
  priceForDate,
  type VisitType,
} from "./gochiro";
import { locationRequestPath, zipRoute } from "./zipRouting";

export type AssistantTopicId = "area" | "pricing" | "pain" | "schedule" | "group";
export type AssistantLink = { label: string; href: string };
export type AssistantTopic = { id: AssistantTopicId; question: string };

export const ASSISTANT_TOPICS: AssistantTopic[] = [
  { id: "area", question: "Do you come to my location?" },
  { id: "pricing", question: "How much does a visit cost?" },
  { id: "pain", question: "Can you help with my pain?" },
  { id: "schedule", question: "I'd like to schedule a visit" },
  { id: "group", question: "Tell me about Group Visits" },
];

export function assistantTopic(id: AssistantTopicId): AssistantTopic {
  const item = ASSISTANT_TOPICS.find((topic) => topic.id === id);
  if (!item) throw new Error("Unknown assistant topic");
  return item;
}

export type AssistantPainRegionId =
  | "neck" | "low-back" | "upper-back" | "headaches"
  | "shoulder-arm-hand" | "hip-knee-foot" | "sciatica" | "other";

export const ASSISTANT_PAIN_REGIONS: Array<{
  id: AssistantPainRegionId;
  label: string;
  summary: string;
  href: string;
}> = [
  { id: "neck", label: "Neck", summary: "Neck pain is one of the most common concerns we see.", href: "/conditions/neck-pain" },
  { id: "low-back", label: "Low back", summary: "Low back pain is one of the most common concerns we see.", href: "/conditions/low-back-pain" },
  { id: "upper-back", label: "Upper back", summary: "Upper back discomfort is a common concern we evaluate.", href: "/conditions/upper-back-pain" },
  { id: "headaches", label: "Headaches", summary: "Headaches are another concern we commonly discuss and evaluate.", href: "/conditions/headaches" },
  { id: "shoulder-arm-hand", label: "Shoulder, arm or hand", summary: "Shoulder, arm, and hand concerns are among the problems we evaluate.", href: "/conditions" },
  { id: "hip-knee-foot", label: "Hip, knee or foot", summary: "Hip, knee, and foot concerns are among the problems we evaluate.", href: "/conditions" },
  { id: "sciatica", label: "Sciatica or pain down the leg", summary: "Pain traveling into the leg is another concern we evaluate.", href: "/conditions/sciatica" },
  { id: "other", label: "Other / Not sure", summary: "We evaluate many muscle and joint concerns; an examination helps determine appropriate next steps.", href: "/conditions" },
];

export type AssistantZipResult = {
  message: string;
  links: AssistantLink[];
  kind: "booking" | "request" | "outside" | "incomplete";
};

/** Consults the same canonical ZIP coverage rules as the booking system. */
export function assistantZipResult(zip: string): AssistantZipResult {
  const route = zipRoute(zip);
  if (route === "booking") {
    return {
      kind: "booking",
      message: "Yes, we offer mobile chiropractic visits in your area. Actual appointment availability is confirmed during scheduling.",
      links: [
        { label: "New Patient", href: "/book?start=new&zip=" + zip },
        { label: "Returning Patient", href: "/book?start=returning&zip=" + zip },
        { label: "Group Visit", href: "/book?start=group&zip=" + zip },
      ],
    };
  }
  if (route === "request") return {
    kind: "request",
    message: "This location is outside our regular online booking area. A visit may be available by arrangement.",
    links: [{ label: "Request a visit", href: locationRequestPath(zip) }],
  };
  if (route === "not-pennsylvania") return {
    kind: "outside",
    message: "Regular online booking is not offered for this ZIP. Please call or text us with a location question.",
    links: [{ label: "Contact us", href: "/contact" }],
  };
  return { kind: "incomplete", message: "Please enter a valid five-digit ZIP code.", links: [] };
}

export type AssistantPatientCategory = "new" | "returning" | "group";
export function assistantBookingHref(zip: string, category: AssistantPatientCategory): string | null {
  if (zipRoute(zip) !== "booking") return null;
  return `/book?start=${category}&zip=${zip}`;
}

/** For returning patients, the price is indicative; the scheduler identifies the actual Priority tier. */
export type AssistantPriceChoice = "new" | "maintenance" | "priority";
export type AssistantPriceSummary = { weekday: string; saturday: string; sunday: string };
const SATURDAY = "2026-10-03";
const SUNDAY = "2026-10-04";

function money(value: number | null): string {
  return value === null ? "Ask about insurance/claim billing" : `$${value}`;
}
function range(a: number | null, b: number | null): string {
  if (a === null || b === null) return "Ask about insurance/claim billing";
  return a === b ? money(a) : `$${Math.min(a, b)}–$${Math.max(a, b)}`;
}

export function assistantIndividualPrices(zip: string, choice: AssistantPriceChoice): AssistantPriceSummary | null {
  const region = findRegion(zip);
  if (!region) return null;
  if (choice === "priority") {
    const standard: VisitType = "priority-standard";
    const upgraded: VisitType = "priority-upgraded";
    return {
      weekday: range(priceFor(region, standard), priceFor(region, upgraded)),
      saturday: range(priceForDate(region, standard, SATURDAY), priceForDate(region, upgraded, SATURDAY)),
      sunday: range(priceForDate(region, standard, SUNDAY), priceForDate(region, upgraded, SUNDAY)),
    };
  }
  const visit: VisitType = choice === "new" ? "new-patient" : "maintenance";
  return {
    weekday: money(priceFor(region, visit)),
    saturday: money(priceForDate(region, visit, SATURDAY)),
    sunday: choice === "maintenance" ? "Not offered" : money(priceForDate(region, visit, SUNDAY)),
  };
}

export function assistantGroupPrices(zip: string, newCount: number, existingCount: number): AssistantPriceSummary | null {
  const region = findRegion(zip);
  const composition = { newCount, existingCount };
  if (!region || !isValidGroupVisitComposition(composition)) return null;
  return {
    weekday: money(groupVisitTotal(region, composition)),
    saturday: money(groupVisitTotal(region, composition, SATURDAY)),
    sunday: money(groupVisitTotal(region, composition, SUNDAY)),
  };
}
