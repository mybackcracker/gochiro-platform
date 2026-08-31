import type { LocalAreaContent } from "./types";
import { HOME_VISIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const newtownSquare: LocalAreaContent = {
  slug: "newtown-square",
  town: "Newtown Square",

  metaTitle: "Mobile Chiropractor in Newtown Square & Broomall, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Newtown Square, Broomall, Edgmont and Gradyville, PA from Dr. David DeFries, brought directly to your home or workplace.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Newtown Square & Broomall, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace across Newtown Square, Broomall, Edgmont and Gradyville.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Newtown Square and Broomall, Pennsylvania, along the Route 3/West Chester Pike corridor, with I-476 and the Blue Route providing convenient access into Broomall.",
    "Edgmont and Gradyville are also part of this coverage. This part of Delaware County is geographically more spread out in places, which is exactly where a mobile visit — brought to your home or workplace — tends to be most useful.",
  ],
  heroImage: HOME_VISIT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Newtown Square",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients across Newtown Square, Broomall and the surrounding area typically come in with a specific problem — low back pain, sciatica, neck pain, shoulder trouble, or stiffness that's limiting how they move. Care is built around what the evaluation finds, with the goal of restoring function and reducing the problem's effect on daily life.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace means it fits into a spread-out day rather than adding another drive to it.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Newtown Square",
  howItWorksIntro:
    "A visit anywhere across Newtown Square, Broomall, Edgmont or Gradyville follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Pick an available appointment time and the type of visit you need — price and address are confirmed as you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings everything needed for a complete visit — table and equipment — to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit includes appropriate evaluation and treatment right where you are — no drive, no waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a full evaluation, so care follows what's actually found instead of a predetermined routine. Returning patients continue treatment built around their own history and progress.",
    "Travel is part of a mobile visit, which is why pricing depends on location — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling Across a Spread-Out Area",
  schedulingParagraphs: [
    "Because this part of the service area covers real distance — from Newtown Square and Broomall out toward Edgmont and Gradyville — bringing the visit to the patient is often the more practical option compared to a single fixed office location.",
    "Available appointment times are shown and confirmed at the point of scheduling, based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Newtown Square",
  workplaceParagraphs: [
    "For groups of two or more at a single location, Group Visits bring wellness-focused chiropractic care directly to the workplace.",
    "Group Visits are built for wellness-focused care, not acute injuries or complex new complaints. Pricing is calculated per participant, plus one travel fee for the group, with details confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Newtown Square, Broomall, Edgmont and Gradyville, GoChiroMobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "West Chester", href: "/service-areas/west-chester" },
    { label: "Havertown", href: "/service-areas/havertown" },
    { label: "Media", href: "/service-areas/media" },
  ],

  closingHeading: "Looking for chiropractic care in Newtown Square or a surrounding area?",
};
