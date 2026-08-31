import type { LocalAreaContent } from "./types";
import { LAPTOP_CONSULTATION_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const chaddsFord: LocalAreaContent = {
  slug: "chadds-ford",
  town: "Chadds Ford",

  metaTitle: "Mobile Chiropractor in Chadds Ford, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Chadds Ford and Birmingham, PA from Dr. David DeFries, brought directly to your home or workplace along the Route 202 and Route 926 corridors.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Chadds Ford, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Chadds Ford and Birmingham.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Chadds Ford and Birmingham, Pennsylvania, along the Route 202 and Route 926 corridors — an area that geographically connects the West Chester and Concordville/Glen Mills portions of the service territory.",
    "Every visit is provided by Dr. David DeFries, a licensed Doctor of Chiropractic. Evaluation and treatment come directly to your home or workplace, with no office visit required.",
  ],
  heroImage: LAPTOP_CONSULTATION_IMAGE,
  heroCta: "Book a Chiropractic Visit in Chadds Ford",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients in Chadds Ford and Birmingham typically come in with a specific issue — low back pain, sciatica, neck pain, shoulder problems, or stiffness limiting daily movement. Care is shaped around the evaluation's findings, with the goal of restoring function and reducing the problem's day-to-day impact.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace means it fits into your day instead of adding a separate trip to it.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Chadds Ford",
  howItWorksIntro: "A Chadds Ford or Birmingham visit follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose an available time and visit type online; address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the equipment and table a full visit requires straight to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit — including appropriate evaluation and treatment — takes place at your location, without a drive or a waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients start with a full evaluation, so treatment is based on what's actually found rather than a predetermined routine. Returning patients continue care shaped by their history and how they've responded so far.",
    "Since travel is included in every mobile visit, pricing varies by location — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Chadds Ford and Birmingham",
  schedulingParagraphs: [
    "Homes in this area can be relatively spread out, which is exactly where a mobile visit tends to be most useful — there's no office location to factor into the trip.",
    "Scheduling confirms exact appointment times based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Chadds Ford",
  workplaceParagraphs: [
    "Group Visits deliver wellness-focused chiropractic care directly to a workplace or other single location for two or more people.",
    "Group Visits are designed for wellness-focused care rather than acute injuries or complex new complaints, with pricing calculated per participant plus one travel fee for the whole group, confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Chadds Ford and Birmingham, GoChiroMobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Garnet Valley", href: "/service-areas/garnet-valley" },
    { label: "West Chester", href: "/service-areas/west-chester" },
  ],

  closingHeading: "Looking for chiropractic care in Chadds Ford or a surrounding area?",
};
