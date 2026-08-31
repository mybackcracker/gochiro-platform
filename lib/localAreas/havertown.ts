import type { LocalAreaContent } from "./types";
import { IN_HOME_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const havertown: LocalAreaContent = {
  slug: "havertown",
  town: "Havertown",

  metaTitle: "Mobile Chiropractor in Havertown, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Havertown and Haverford Township, PA from Dr. David DeFries, brought directly to your home or workplace.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Havertown, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Havertown and Haverford Township.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Havertown and throughout Haverford Township, Pennsylvania, along the West Chester Pike/Route 3 corridor.",
    "Every visit is provided by Dr. David DeFries, a licensed Doctor of Chiropractic, bringing evaluation and treatment straight to your home or workplace rather than an office.",
  ],
  heroImage: IN_HOME_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Havertown",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Whether it's low back pain, sciatica, neck pain, shoulder and upper-body problems, or stiffness that's limiting movement, care is built around what the evaluation finds — with the goal of helping you move and function better.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because that care comes to your home or workplace in Havertown, it fits into an established routine instead of interrupting it.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Havertown",
  howItWorksIntro: "A Havertown or Haverford Township visit follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Pick your visit type and an available appointment time, with address and price confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "The table and equipment for a complete visit travel with Dr. DeFries to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Evaluation and treatment are provided appropriately at your location, with no drive and no waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a complete evaluation, with care based on the findings rather than a predetermined routine. Returning patients continue treatment built around their history and response so far.",
    "Pricing depends on where you're located, since travel is part of a mobile visit; the exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in an Established Community",
  schedulingParagraphs: [
    "Havertown is an established residential community, and a mobile visit fits naturally into it — care arrives at your door rather than adding an office trip to the day.",
    "Exact appointment times are shown when you schedule and confirmed based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Havertown",
  workplaceParagraphs: [
    "A Group Visit brings wellness-focused chiropractic care directly to a workplace or other single location, for two or more people at once.",
    "Wellness-focused care — not acute injuries or complex new complaints — is what a Group Visit is designed for. Pricing is calculated per participant plus a single group travel fee, confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "Havertown and Haverford Township sit geographically between the Broomall/Newtown Square area and the Main Line, both also served by GoChiroMobile. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Newtown Square", href: "/service-areas/newtown-square" },
    { label: "Main Line", href: "/service-areas/main-line" },
    { label: "Springfield", href: "/service-areas/springfield" },
  ],

  closingHeading: "Looking for chiropractic care in Havertown or a surrounding area?",
};
