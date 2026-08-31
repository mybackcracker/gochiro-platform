import type { LocalAreaContent } from "./types";
import { HOUSE_CALL_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const essington: LocalAreaContent = {
  slug: "essington",
  town: "Essington",

  metaTitle: "Mobile Chiropractor in Essington & Tinicum, PA — GoChiroMobile",
  metaDescription:
    "In-home and hotel-based chiropractic care in Essington and Tinicum, PA near Philadelphia International Airport, from Dr. David DeFries.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Essington & Tinicum, PA",
  heroLede: "In-home chiropractic care in Essington and Tinicum — including care that can meet travelers where they're staying.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Essington and Tinicum, Pennsylvania, an area with substantial industrial activity that sits immediately next to Philadelphia International Airport.",
    "That location makes a mobile visit especially practical for travelers, hotel guests and other traveling professionals — pilots, flight attendants and airline staff among them — who are staying in the area and would rather not search for a local office on a short trip.",
  ],
  heroImage: HOUSE_CALL_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Essington",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Whether it's a local resident or someone staying nearby for work or travel, care usually starts with a specific problem — low back pain, sciatica, neck pain, shoulder issues, or stiffness that's limiting movement. The goal is the same for everyone: help you move and function better.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because the visit comes to wherever you're staying, it fits around a short trip or a workday instead of requiring a search for a local office.",

  howItWorksHeading: "How Mobile Chiropractic Care Works in Essington",
  howItWorksIntro:
    "Whether you live in the area or are staying nearby for work or travel, a visit follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available appointment time. Your address — home, hotel, or workplace — and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a complete visit to your location.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit includes appropriate evaluation and treatment wherever you are, without a drive or a waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients — whether local residents or travelers staying nearby — begin with a full evaluation, so care is based on what's actually found rather than a fixed routine. Returning patients continue treatment shaped by their history and progress.",
    "Pricing depends on your location, since travel is part of a mobile visit — your exact price is shown during scheduling, before you confirm. GoChiroMobile is not affiliated with any airport, airline, hotel or employer in the area; a mobile visit is simply available to anyone within the current service area, including those staying there temporarily.",
  ],

  schedulingHeading: "Scheduling for Travelers and Local Employers",
  schedulingParagraphs: [
    "For a traveler with a layover or a short local stay, scheduling works the same way it does for any patient — choose an available time and location, and confirm before you book.",
    "Local employers in the area's industrial and commercial sector can also use the same scheduling process to arrange a workplace visit.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Essington",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care directly to a workplace or other single location for two or more people at once — a practical option given the area's industrial and commercial activity.",
    "Group Visits are built around wellness-focused care rather than acute injuries or complex new complaints, with per-participant pricing and a single group travel fee, all confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Confirm Your Address",
  nearbyParagraph:
    "Coverage in the Essington and Tinicum area is determined by the current scheduling area, not by this page — use the ZIP checker below to confirm whether your specific address, or the hotel you're staying at, is currently reachable. GoChiroMobile also visits other nearby communities:",
  nearbyAreas: [
    { label: "Glenolden", href: "/service-areas/glenolden" },
    { label: "Ridley Park", href: "/service-areas/ridley-park" },
  ],

  closingHeading: "Looking for chiropractic care in Essington or a surrounding area?",
};
