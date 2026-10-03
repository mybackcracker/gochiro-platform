import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, premiumAvailabilityAnswer, premiumWeekdayPricingAnswer } from "@/lib/faqs";
import { HOUSE_CALL_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const mainLine: LocalAreaContent = {
  slug: "main-line",
  town: "Main Line",

  metaTitle: "Mobile Chiropractor on the Main Line, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care across the Main Line, PA from Dr. David DeFries, DC, brought directly to your home, workplace or hotel along the Route 30/Lancaster Avenue corridor.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor on the Main Line, PA",
  heroLede: "In-home chiropractic care, brought directly to you across the Main Line.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care across the Main Line, the corridor of established communities along Route 30/Lancaster Avenue that includes Ardmore, Bryn Mawr, Rosemont, Haverford, Villanova, Wayne, Radnor, Wynnewood, Berwyn and Devon.",
    "The Main Line is home to established residential communities, businesses, and colleges and universities. Go Chiro Mobile has no relationship with any of those institutions — the mobile model simply brings evaluation and treatment directly to a patient's home, workplace, hotel or other appropriate location, wherever they happen to be in the area.",
  ],
  heroImage: HOUSE_CALL_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit on the Main Line",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients across the Main Line come in with a range of concerns — low back pain, sciatica, neck pain, shoulder and upper-body problems, or stiffness that's limiting movement. The goal of every visit is the same: better movement, restored function, and less day-to-day interference from the problem.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home, workplace or hotel means it fits into work, family and travel instead of requiring a separate trip.",

  connectionHeading: "A Corridor Named for a Railroad",
  connectionParagraphs: [
    "The Main Line takes its name literally from the Pennsylvania Railroad's original main line service, which began running along the Lancaster Avenue/Route 30 corridor in the 1830s and was developed by the railroad after 1850 into a string of suburban stops built explicitly as commuter communities for the era. That history is why the Main Line reads less like one town and more like a sequence of them — Ardmore, Bryn Mawr, Rosemont, Haverford, Villanova, Wayne, Radnor, Wynnewood, Berwyn and Devon — each built up around its own station along Route 30 rather than a single shared downtown.",
    "Go Chiro Mobile has been expanding scheduling further into these communities, and that same station-by-station geography is why a mobile visit fits the Main Line well: rather than asking a patient in one Main Line community to drive to an office located in another, care travels the corridor to wherever the appointment actually is — home, workplace or hotel.",
  ],

  howItWorksHeading: "How In-Home Chiropractic Care Works on the Main Line",
  howItWorksIntro: "A Main Line visit follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available time online — address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a complete visit to your home, workplace or hotel.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Wherever you are on the Main Line, your visit includes appropriate evaluation and treatment, without a drive or a waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a full evaluation, so care is based on what's actually found rather than a predetermined routine — the same clinical approach wherever on the Main Line a visit takes place. Returning patients continue care built around their history and how their condition has responded to treatment.",
    "Because travel is part of a mobile visit, pricing depends on location across the Main Line — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling Across the Main Line",
  schedulingParagraphs: [
    "Coverage across the Main Line has been expanding — Bryn Mawr and Rosemont were recently added to the scheduling area alongside communities like Ardmore, Haverford, Villanova, Wayne, Radnor, Wynnewood, Berwyn and Devon.",
    "Exact appointment times, and confirmation that your specific address is currently reachable, are shown when you schedule.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits on the Main Line",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care directly to a workplace or other single location for two or more people at once — a practical option for the Main Line's many businesses.",
    "Group Visits are designed for wellness-focused care rather than acute injuries or complex new complaints. Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to the Main Line, Go Chiro Mobile visits other nearby communities. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Havertown", href: "/service-areas/havertown" },
    "Ardmore",
    "Bryn Mawr",
    "Wayne",
  ],

  closingHeading: "Looking for chiropractic care on the Main Line or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location on the Main Line?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces on the Main Line, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost on the Main Line?",
      answer: premiumWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment on the Main Line?",
      answer: premiumAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit on the Main Line?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit on the Main Line include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
