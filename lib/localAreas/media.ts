import type { LocalAreaContent } from "./types";
import { SHOULDER_EXERCISE_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const media: LocalAreaContent = {
  slug: "media",
  town: "Media",

  metaTitle: "Mobile Chiropractor in Media, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Media, Lima and Middletown Township, PA from Dr. David DeFries, brought directly to your home or workplace along the Baltimore Pike corridor.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Media, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in and around Media.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Media Borough and the broader surrounding service area, including Lima and Middletown Township, along the Baltimore Pike/Route 1 corridor.",
    "Dr. David DeFries — a licensed Doctor of Chiropractic — provides every visit, bringing evaluation and treatment directly to your home or workplace instead of requiring an office trip.",
  ],
  heroImage: SHOULDER_EXERCISE_IMAGE,
  heroCta: "Book a Chiropractic Visit in Media",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Whether the issue is low back pain, sciatica, neck pain, shoulder discomfort, or general stiffness, care is shaped around what's actually found during evaluation — with the goal of restoring movement and reducing how much the problem affects daily life.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because that care is brought to your home or workplace in Media, it fits around a full schedule instead of adding to it.",

  connectionHeading: "A Familiar Area",
  connectionParagraphs: [
    "Dr. DeFries attended Penn State in this area for a period of time, and the Media area's mix of civic, educational and retail activity has remained familiar to him since.",
  ],
  connectionImage: DOCTOR_PORTRAIT_IMAGE,

  howItWorksHeading: "How In-Home Chiropractic Care Works in Media",
  howItWorksIntro: "A visit in Media, Lima or Middletown Township follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Book online by choosing your visit type and an open time — price and address are confirmed before you commit.",
    },
    {
      title: "Care comes to you",
      body: "Everything needed for a complete visit — table and equipment included — comes to your home or workplace with Dr. DeFries.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit — evaluation and treatment included — happens at your location, skipping the drive and the waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a complete evaluation, with treatment based on the findings rather than a predetermined routine. Returning patients continue care built around their own history and how it has progressed.",
    "Your location affects pricing, since travel is part of a mobile visit — the exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Media, Lima and Middletown Township",
  schedulingParagraphs: [
    "Media's civic and retail activity means schedules here can be busy — a mobile visit fits into a day without the added time of a drive to an office and back.",
    "Real-time availability for your visit type and location determines the exact appointment times shown and confirmed at scheduling.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Media",
  workplaceParagraphs: [
    "Group Visits deliver wellness-focused chiropractic care directly to a workplace or other single location, for two or more people at a time.",
    "Wellness-focused care is the focus of a Group Visit, not acute injuries or complex new complaints. Each participant is priced individually, with one travel fee for the group, confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Media, Lima and Middletown Township, GoChiroMobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Wallingford", href: "/service-areas/wallingford" },
    { label: "Newtown Square", href: "/service-areas/newtown-square" },
    { label: "Springfield", href: "/service-areas/springfield" },
  ],

  closingHeading: "Looking for chiropractic care in Media or a surrounding area?",
};
