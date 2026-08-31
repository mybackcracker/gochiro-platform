import type { LocalAreaContent } from "./types";
import { IN_HOME_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const glenolden: LocalAreaContent = {
  slug: "glenolden",
  town: "Glenolden",

  metaTitle: "Mobile Chiropractor in Glenolden & Holmes, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Glenolden and Holmes, PA from Dr. David DeFries, brought directly to your home or workplace in eastern Delaware County.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Glenolden & Holmes, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Glenolden and Holmes.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Glenolden and Holmes, Pennsylvania — part of the eastern portion of the practice's Delaware County service territory.",
    "Dr. David DeFries provides every visit personally. As a licensed Doctor of Chiropractic, he brings evaluation and treatment directly to your home or workplace instead of an office trip.",
  ],
  heroImage: IN_HOME_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Glenolden",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Common reasons patients reach out include low back pain, sciatica, neck pain, shoulder and upper-body problems, or stiffness that's harder to ignore than it used to be. Care is built around restoring movement and function, with the goal of reducing how much the problem affects daily life.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace in Glenolden or Holmes means it fits around your day instead of adding to it.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Glenolden",
  howItWorksIntro: "A visit in Glenolden or Holmes follows the same three steps as every GoChiroMobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit type and an available time online, with your address and exact price confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "The visit's table and equipment travel with Dr. DeFries, straight to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Evaluation and treatment are provided at your location, with no drive to make and no waiting room to sit in.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a full evaluation, so treatment is based on actual findings rather than a set routine. Returning patients pick up care built around their history and how they've responded.",
    "Because a mobile visit includes travel, pricing depends on your location. The exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Practical, Mobile Convenience in Glenolden",
  schedulingParagraphs: [
    "The broader Glenolden and Holmes area includes some commercial and industrial activity alongside residential streets. A mobile visit removes the drive and waiting room from the equation, wherever your day takes you.",
    "Exact appointment times, along with confirmation that a given address is currently reachable, are shown when you schedule.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Glenolden",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care to a workplace or similar single location, for two or more people at once.",
    "The scope of a Group Visit is wellness-focused care, not acute injuries or complex new complaints — priced per participant with one travel fee covering the whole group, confirmed during scheduling.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Confirm Your Address",
  nearbyParagraph:
    "Not every address in the Glenolden and Holmes area is necessarily within the current scheduling area, and coverage can change as the practice grows. The ZIP checker below is the fastest way to confirm your specific address, and GoChiroMobile also visits other nearby communities:",
  nearbyAreas: [
    { label: "Ridley Park", href: "/service-areas/ridley-park" },
    { label: "Essington", href: "/service-areas/essington" },
    { label: "Wallingford", href: "/service-areas/wallingford" },
  ],

  closingHeading: "Looking for chiropractic care in Glenolden or a surrounding area?",
};
