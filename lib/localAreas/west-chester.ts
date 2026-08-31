import type { LocalAreaContent } from "./types";
import { SHOULDER_EXERCISE_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const westChester: LocalAreaContent = {
  slug: "west-chester",
  town: "West Chester",

  metaTitle: "Mobile Chiropractor in West Chester, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in West Chester, PA from Dr. David DeFries, brought directly to your home or workplace instead of requiring a trip to an office.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in West Chester, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in West Chester.",
  heroParagraphs: [
    "GoChiroMobile brings mobile chiropractic care to West Chester, Pennsylvania, a major center for Chester County along the Route 202 and Route 3/West Chester Pike corridors, home to West Chester University and a substantial mix of businesses and residential communities.",
    "Rather than requiring a trip to a chiropractic office, care is brought directly to your home or workplace, provided by Dr. David DeFries, a licensed Doctor of Chiropractic.",
  ],
  heroImage: SHOULDER_EXERCISE_IMAGE,
  heroCta: "Book a Chiropractic Visit in West Chester",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Common reasons patients seek care include low back pain, sciatica, neck pain, shoulder and upper-body issues, or general stiffness that's limiting movement. Every visit works toward the same goal — helping you move better, function more fully, and feel less limited by the problem.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because that care is brought to you in West Chester, it fits around a demanding schedule instead of adding another stop to it.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in West Chester",
  howItWorksIntro: "A West Chester visit follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Select your visit and an open time online. Your address and price are confirmed before the booking is final.",
    },
    {
      title: "Care comes to you",
      body: "A complete visit's table and equipment come with Dr. DeFries, directly to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Appropriate evaluation and treatment happen at your location, eliminating both the drive and the waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "A full evaluation comes first for new patients, with care based on those findings rather than a predetermined routine. Returning patients continue on a plan shaped by their history and how it has responded to treatment.",
    "Pricing depends on your location, since a mobile visit includes travel time. Your exact price is confirmed during scheduling, before you book.",
  ],

  schedulingHeading: "Convenience for a Busy Center Like West Chester",
  schedulingParagraphs: [
    "As a gateway community for Chester County, West Chester has no shortage of things competing for a resident's or employee's time. A mobile visit removes the office trip from that equation entirely.",
    "You'll see exact appointment times confirmed during scheduling, based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits in West Chester",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care directly to a workplace or other single location for two or more people at once — a practical fit for West Chester's mix of businesses.",
    "Rather than acute injuries or complex new complaints, a Group Visit is designed around wellness-focused care — priced per participant plus a single group travel fee, confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to West Chester, GoChiroMobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Chadds Ford", href: "/service-areas/chadds-ford" },
    { label: "Newtown Square", href: "/service-areas/newtown-square" },
    { label: "Garnet Valley", href: "/service-areas/garnet-valley" },
  ],

  closingHeading: "Looking for chiropractic care in West Chester or a surrounding area?",
};
