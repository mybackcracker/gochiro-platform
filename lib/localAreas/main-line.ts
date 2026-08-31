import type { LocalAreaContent } from "./types";
import { HOUSE_CALL_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const mainLine: LocalAreaContent = {
  slug: "main-line",
  town: "Main Line",

  metaTitle: "Mobile Chiropractor on the Main Line, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care across the Main Line, PA from Dr. David DeFries, brought directly to your home, workplace or hotel along the Route 30/Lancaster Avenue corridor.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor on the Main Line, PA",
  heroLede: "In-home chiropractic care, brought directly to you across the Main Line.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care across the Main Line, the corridor of established communities along Route 30/Lancaster Avenue that includes Ardmore, Bryn Mawr, Rosemont, Haverford, Villanova, Wayne, Radnor, Wynnewood, Berwyn and Devon.",
    "The Main Line is home to established residential communities, businesses, and colleges and universities. GoChiroMobile has no relationship with any of those institutions — the mobile model simply brings evaluation and treatment directly to a patient's home, workplace, hotel or other appropriate location, wherever they happen to be in the area.",
  ],
  heroImage: HOUSE_CALL_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit on the Main Line",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients across the Main Line come in with a range of concerns — low back pain, sciatica, neck pain, shoulder and upper-body problems, or stiffness that's limiting movement. The goal of every visit is the same: better movement, restored function, and less day-to-day interference from the problem.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home, workplace or hotel means it fits into work, family and travel instead of requiring a separate trip.",

  howItWorksHeading: "How In-Home Chiropractic Care Works on the Main Line",
  howItWorksIntro: "A Main Line visit follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available time online — address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a complete visit to your home, workplace or hotel.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Wherever you are on the Main Line, your visit includes appropriate evaluation and treatment, without a drive or a waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a full evaluation, so care is based on what's actually found rather than a predetermined routine — the same clinical approach wherever on the Main Line a visit takes place. Returning patients continue care built around their history and how their condition has responded to treatment.",
    "Because travel is part of a mobile visit, pricing depends on location across the Main Line — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling Across the Main Line",
  schedulingParagraphs: [
    "Coverage across the Main Line has been expanding — Bryn Mawr and Rosemont were recently added to the scheduling area alongside communities like Ardmore, Haverford, Villanova, Wayne, Radnor, Wynnewood, Berwyn and Devon.",
    "Exact appointment times, and confirmation that your specific address is currently reachable, are shown when you schedule.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits on the Main Line",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care directly to a workplace or other single location for two or more people at once — a practical option for the Main Line's many businesses.",
    "Group Visits are designed for wellness-focused care rather than acute injuries or complex new complaints. Each participant is priced individually, plus a single travel fee for the group, with full details confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to the Main Line, GoChiroMobile visits other nearby communities. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Havertown", href: "/service-areas/havertown" },
    "Ardmore",
    "Bryn Mawr",
    "Wayne",
  ],

  closingHeading: "Looking for chiropractic care on the Main Line or a surrounding area?",
};
