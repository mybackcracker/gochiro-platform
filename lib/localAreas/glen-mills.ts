import type { LocalAreaContent } from "./types";
import { HOME_VISIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const glenMills: LocalAreaContent = {
  slug: "glen-mills",
  town: "Glen Mills",

  metaTitle: "Mobile Chiropractor in Glen Mills, PA — GoChiroMobile",
  metaDescription:
    "In-home chiropractic care in Glen Mills, PA from Dr. David DeFries. Evaluation and treatment brought directly to your home or workplace.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Glen Mills, PA",
  heroLede: "Chiropractic care brought directly to your home or workplace in Glen Mills.",
  heroParagraphs: [
    "GoChiroMobile provides mobile chiropractic care in Glen Mills, Pennsylvania, bringing evaluation, treatment and hands-on care directly to your location instead of requiring another drive to an office.",
    "Glen Mills sits between several communities GoChiroMobile regularly serves in Delaware and Chester counties, making mobile care a practical option for patients whose work, family schedule or mobility makes an office visit less convenient.",
  ],
  heroImage: HOME_VISIT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Glen Mills",

  clinicalCareHeading: "Chiropractic Care Focused on Movement and Function",
  clinicalCareIntro:
    "People seek care for many reasons, from a stiff neck or sore low back to shoulder discomfort, sciatica, joint stiffness, sports-related complaints and the general aches that can build up through work and daily activity. Care is based on the individual evaluation rather than a predetermined routine.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because the visit takes place at your Glen Mills home or workplace, evaluation and treatment can fit into the day without adding an office commute and waiting room.",

  howItWorksHeading: "How In-Home Chiropractic Care Works in Glen Mills",
  howItWorksIntro: "A mobile chiropractic visit in Glen Mills follows three straightforward steps:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available appointment time. Your location and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the portable treatment table and equipment needed for your visit to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your evaluation and appropriate treatment happen at your location, without the trip to a chiropractic office.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with an evaluation so Dr. DeFries can understand the complaint, relevant history and examination findings before determining appropriate care. Returning patients can schedule care based on their established history and current needs.",
    "Pricing for mobile visits depends on location and visit type. Your exact Glen Mills price is shown during scheduling before you confirm the appointment.",
  ],

  schedulingHeading: "Scheduling Mobile Care in Glen Mills",
  schedulingParagraphs: [
    "Glen Mills is convenient to GoChiroMobile service areas in both southern Delaware County and Chester County, including nearby Chadds Ford, Garnet Valley, Aston and West Chester-area communities.",
    "Available appointment times are shown during online scheduling based on the visit type, location and the mobile route for that day.",
  ],

  workplaceHeading: "Workplace and Group Visits in Glen Mills",
  workplaceParagraphs: [
    "GoChiroMobile can also provide wellness-focused chiropractic care for two or more people at one Glen Mills location, including homes and workplaces when the setting is appropriate.",
    "Group visits combine multiple participants at one location so the travel portion of the visit can be shared rather than scheduling separate mobile trips.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Communities Near Glen Mills",
  nearbyParagraph:
    "GoChiroMobile serves communities surrounding Glen Mills throughout southern Delaware County and parts of Chester County. Nearby service-area pages include:",
  nearbyAreas: [
    { label: "Garnet Valley", href: "/service-areas/garnet-valley" },
    { label: "Chadds Ford", href: "/service-areas/chadds-ford" },
    { label: "Aston", href: "/service-areas/aston" },
    { label: "West Chester", href: "/service-areas/west-chester" },
  ],

  closingHeading: "Looking for mobile chiropractic care in Glen Mills or a nearby community?",
};
