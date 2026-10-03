import type { LocalAreaContent } from "./types";
import { standardWeekdayPricingAnswer, insurancePaymentAnswer, westAvailabilityAnswer } from "@/lib/faqs";
import { SHOULDER_EXERCISE_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const brookhaven: LocalAreaContent = {
  slug: "brookhaven",
  town: "Brookhaven",

  metaTitle: "Mobile Chiropractor in Brookhaven, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care in Brookhaven, Parkside and Upland, PA from Dr. David DeFries, DC, whose family has a long chiropractic history in the area.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Brookhaven, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Brookhaven.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Brookhaven, Pennsylvania, along Edgmont Avenue and throughout the surrounding Parkside and Upland communities, bringing evaluation and treatment directly to your home or workplace.",
    "Every visit is provided by Dr. David DeFries, DC, a licensed Doctor of Chiropractic serving Brookhaven and the surrounding communities of southern Delaware County.",
  ],
  heroImage: SHOULDER_EXERCISE_IMAGE,
  heroCta: "Book a Chiropractic Visit in Brookhaven",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Care usually starts with a specific problem — low back pain, sciatica, a stiff neck, sore shoulders, or general stiffness that's slowing someone down. Dr. DeFries builds treatment around what the evaluation actually finds, with the goal of helping you move and function better day to day.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace in Brookhaven means it fits into your schedule instead of requiring a separate trip to an office.",

  connectionHeading: "A Family Connection to Brookhaven",
  connectionParagraphs: [
    "Dr. DeFries has personal roots in this part of Delaware County. He lived in nearby Parkside as a young child, and his father maintained a chiropractic office in Brookhaven for many years — part of a broader DeFries family history of chiropractic care in the area.",
    "Dr. DeFries continues to visit the Brookhaven area frequently as part of the Go Chiro Mobile practice, bringing that same family history of care directly to patients' homes and workplaces rather than requiring a trip to an office.",
  ],
  connectionImage: DOCTOR_PORTRAIT_IMAGE,

  howItWorksHeading: "How In-Home Chiropractic Care Works in Brookhaven",
  howItWorksIntro: "An in-home visit in Brookhaven follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose your visit and an available appointment time. Your Brookhaven address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a full visit to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit includes appropriate evaluation and treatment at your location, with no drive and no waiting room involved.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients in Brookhaven begin with a full evaluation, so care is based on what is actually found rather than a predetermined routine. Returning patients continue care built around their history and how their condition has responded to treatment.",
    "Pricing depends on your location, since travel is part of a mobile visit — your exact price for a Brookhaven appointment is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Brookhaven",
  schedulingParagraphs: [
    "Because Brookhaven is a regular part of the mobile schedule, appointments here are arranged around real-time availability rather than a fixed office calendar.",
    "Exact appointment times are shown and confirmed when you schedule, based on availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Brookhaven",
  workplaceParagraphs: [
    "Group Visits bring wellness-focused chiropractic care to a workplace or other single location for two or more people at once.",
    "Wellness-focused care is what a Group Visit is for, not acute injuries or complex new complaints; Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Brookhaven, Parkside and Upland, Go Chiro Mobile visits other communities in southern Delaware County. If you're nearby but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Aston", href: "/service-areas/aston" },
    { label: "Boothwyn", href: "/service-areas/boothwyn" },
    "Trainer",
    "Marcus Hook",
  ],

  closingHeading: "Looking for chiropractic care in Brookhaven or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Brookhaven?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Brookhaven, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Brookhaven?",
      answer: standardWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment in Brookhaven?",
      answer: westAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Brookhaven?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Brookhaven include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
