import type { LocalAreaContent } from "./types";
import { HOME_VISIT_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const aston: LocalAreaContent = {
  slug: "aston",
  town: "Aston",

  metaTitle: "Mobile Chiropractor in Aston, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Aston, PA from Dr. David DeFries, whose family has provided chiropractic care in southern Delaware County for three generations.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Aston, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Aston.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Aston, Pennsylvania, bringing evaluation, treatment and hands-on care directly to your home or workplace instead of requiring a trip to an office.",
    "Every visit is provided by Dr. David DeFries, a licensed Doctor of Chiropractic serving Aston and the surrounding communities of southern Delaware County.",
  ],
  heroImage: HOME_VISIT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Aston",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients call Dr. DeFries about the things that get in the way of daily life — a stubborn low back, sciatica down a leg, a stiff neck, sore shoulders, or general stiffness that's harder to ignore than it used to be. The goal of care is straightforward: help you move better, restore function, and reduce how much the problem affects your day.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because that care comes to you in Aston, it fits around a workday or family schedule rather than adding another trip across town.",

  connectionHeading: "A Family History of Chiropractic Care in Aston",
  connectionParagraphs: [
    "Dr. DeFries' connection to Aston goes back to the beginning of his career. After graduating from Parker College of Chiropractic in 2003, he began practicing that same year at his family's chiropractic practice on Pennell Road in Aston — part of a family history of chiropractic care in southern Delaware County that spans three generations.",
    "He also taught anatomy at Neumann College in Aston, now Neumann University, and went on to practice through several additional offices in the surrounding area before transitioning to the mobile model that became GoChiroMobile. That local history is part of what shaped the practice: bringing the same hands-on chiropractic care directly to patients throughout the area, including Aston itself.",
  ],
  connectionImage: DOCTOR_PORTRAIT_IMAGE,

  howItWorksHeading: "How In-Home Chiropractic Care Works in Aston",
  howItWorksIntro:
    "Working with an in-home chiropractor in Aston follows the same three steps as every GoChiroMobile visit:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available appointment time. Your Aston address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a complete visit to your home or workplace in Aston.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Evaluation and treatment happen right at your location — no drive, and no waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients in Aston begin with a full evaluation, so care is based on what is actually found rather than a predetermined routine. Returning patients continue care built around their history and how their condition has responded to treatment.",
    "Pricing depends on your location, since travel is part of a mobile visit — your exact price for an Aston appointment is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling Convenience in Aston",
  schedulingParagraphs: [
    "Aston is one of the areas GoChiroMobile visits most often. Because it is regularly part of the schedule, appointment availability in Aston can sometimes extend beyond traditional office hours when scheduling permits.",
    "Exact appointment times are shown and confirmed when you schedule, based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits for Aston Businesses",
  workplaceParagraphs: [
    "GoChiroMobile currently provides on-site chiropractic visits at several businesses in the Aston area, bringing wellness-focused care directly to a workplace for two or more people at one location.",
    "A Group Visit keeps the focus on wellness-focused care rather than acute injuries or complex new complaints — pricing works out to a per-participant rate plus a single travel fee for the group, confirmed in full when you schedule.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Aston, GoChiroMobile regularly visits other communities in southern Delaware County. If you're nearby but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Brookhaven", href: "/service-areas/brookhaven" },
    "Parkside",
    "Upland",
    { label: "Boothwyn", href: "/service-areas/boothwyn" },
    "Trainer",
    "Marcus Hook",
  ],

  closingHeading: "Looking for chiropractic care in Aston or a surrounding area?",
};
