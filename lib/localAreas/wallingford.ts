import type { LocalAreaContent } from "./types";
import { LAPTOP_CONSULTATION_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const wallingford: LocalAreaContent = {
  slug: "wallingford",
  town: "Wallingford",

  metaTitle: "Mobile Chiropractor in Wallingford & Swarthmore, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Wallingford, Nether Providence, Swarthmore and Rose Valley, PA from Dr. David DeFries, brought directly to your home or workplace.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Wallingford & Swarthmore, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Wallingford, Nether Providence and Swarthmore.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Wallingford, Nether Providence, Swarthmore and Rose Valley, Pennsylvania, an area along Route 320 with considerable local history and established residential communities.",
    "Dr. David DeFries, a licensed Doctor of Chiropractic, provides every visit and brings evaluation and treatment directly to your home or workplace in place of an office visit.",
  ],
  heroImage: LAPTOP_CONSULTATION_IMAGE,
  heroCta: "Book a Chiropractic Visit in Wallingford",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients across Wallingford, Swarthmore and the surrounding area come in with a range of concerns — low back pain, sciatica, neck pain, shoulder problems, or stiffness that's limiting daily movement. Care is built around the goal of moving and functioning better, not just easing a single symptom.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Delivering that care to your home or workplace means it fits into family and work commitments instead of competing with them.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Wallingford",
  howItWorksIntro:
    "A visit anywhere in Wallingford, Nether Providence, Swarthmore or Rose Valley follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Select an available time and the type of visit you need; your price and address are confirmed before booking.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings all the table and equipment a full visit requires directly to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Appropriate evaluation and treatment are provided at your location, without the drive or waiting room a visit usually involves.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "A full evaluation is the starting point for new patients, so care is guided by what's actually found. Returning patients continue treatment shaped by their history and their response to care so far.",
    "Pricing depends on location because travel is built into every mobile visit; your exact price is confirmed during scheduling, before you book.",
  ],

  schedulingHeading: "Scheduling in Wallingford and Swarthmore",
  schedulingParagraphs: [
    "This area's established residential communities, including those near Swarthmore College, are well suited to a visit that comes to you rather than requiring travel to an office.",
    "Scheduling shows exact appointment times, confirmed based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Wallingford",
  workplaceParagraphs: [
    "Two or more people at one location can receive wellness-focused chiropractic care together through a Group Visit, brought directly to a workplace or similar setting.",
    "Group Visits are designed around wellness-focused care rather than acute injuries or complex new complaints, with per-participant pricing plus a single group travel fee confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Wallingford, Nether Providence, Swarthmore and Rose Valley, GoChiroMobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Media", href: "/service-areas/media" },
    { label: "Springfield", href: "/service-areas/springfield" },
    { label: "Glenolden", href: "/service-areas/glenolden" },
  ],

  closingHeading: "Looking for chiropractic care in Wallingford or a surrounding area?",
};
