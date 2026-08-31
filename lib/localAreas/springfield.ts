import type { LocalAreaContent } from "./types";
import { HOME_VISIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const springfield: LocalAreaContent = {
  slug: "springfield",
  town: "Springfield",

  metaTitle: "Mobile Chiropractor in Springfield, PA — GoChiroMobile",
  metaDescription:
    "In-home and workplace chiropractic care in Springfield and Morton, PA from Dr. David DeFries — mobile chiropractic care along the Route 420 and Route 1 corridor.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Springfield, PA",
  heroLede: "In-home and workplace chiropractic care, brought directly to you in Springfield and Morton.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Springfield and Morton, Pennsylvania. Route 420 connects the two communities and meets the Route 1/Baltimore Pike corridor, putting both within easy reach of a mobile visit.",
    "Every visit is provided by Dr. David DeFries, a licensed Doctor of Chiropractic who brings evaluation and treatment to your home or workplace so an office trip isn't necessary.",
  ],
  heroImage: HOME_VISIT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Springfield",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Care addresses the problems that actually slow people down — low back pain, sciatica, neck pain, shoulder issues, or stiffness that limits movement. The focus stays on function: helping you move better and feel less restricted day to day.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because the visit is brought to you in Springfield or Morton, it fits around a workday rather than requiring a separate trip.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Springfield",
  howItWorksIntro: "A Springfield or Morton visit follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose an available appointment time and visit type. Address and price are confirmed as part of booking.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries arrives with the table and equipment a complete visit requires, at your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "At your location, your visit includes appropriate evaluation and treatment, without a drive or a waiting room to sit in.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "For new patients, a full evaluation comes first, so care follows what's actually found rather than a standard routine. Returning patients continue on a plan shaped by their history and response to treatment.",
    "Since travel is part of every mobile visit, pricing depends on location. Your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Springfield and Morton",
  schedulingParagraphs: [
    "Springfield has substantial retail and business activity along its main corridors, and a mobile visit fits around a workday without the added time of a drive to an office.",
    "Exact times are shown and confirmed during scheduling, based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits in Springfield",
  workplaceParagraphs: [
    "Springfield's mix of retail and business activity makes it a practical area for workplace-based care. Group Visits bring wellness-focused chiropractic care directly to a workplace or other single location for two or more people at once.",
    "Group Visits are intended for wellness-focused care rather than acute injuries or complex new complaints, with pricing calculated per participant plus a single group travel fee — full details are confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Springfield and Morton, GoChiroMobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Media", href: "/service-areas/media" },
    { label: "Wallingford", href: "/service-areas/wallingford" },
    { label: "Havertown", href: "/service-areas/havertown" },
  ],

  closingHeading: "Looking for chiropractic care in Springfield or a surrounding area?",
};
