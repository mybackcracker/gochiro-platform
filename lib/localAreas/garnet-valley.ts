import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, westAvailabilityAnswer, standardWeekdayPricingAnswer } from "@/lib/faqs";
import { IN_HOME_TREATMENT_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const garnetValley: LocalAreaContent = {
  slug: "garnet-valley",
  town: "Garnet Valley",

  metaTitle: "Mobile Chiropractor in Garnet Valley & Glen Mills, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care in Garnet Valley, Glen Mills and Concordville, PA from Dr. David DeFries, DC, whose family has a long history of chiropractic care in southern Delaware County.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Garnet Valley & Glen Mills, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Garnet Valley and Glen Mills.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Garnet Valley, Glen Mills and Concordville, Pennsylvania, along the Route 1 and Route 202 corridors, also reaching nearby Chester Heights.",
    "Dr. David DeFries, DC, a licensed Doctor of Chiropractic, provides every visit — bringing evaluation and treatment directly to your home or workplace instead of a trip to an office.",
  ],
  heroImage: IN_HOME_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Garnet Valley",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Whether it's a sore low back, sciatica, neck pain, shoulder trouble, or stiffness that's harder to shake than it used to be, care is built around what the evaluation finds — with the goal of helping you move and function better.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "That care comes directly to your home or workplace in Garnet Valley or Glen Mills, fitting into your day rather than adding to it.",

  connectionHeading: "A Local Connection to Garnet Valley",
  connectionParagraphs: [
    "Dr. DeFries attended school in Garnet Valley and lived for much of his life in the nearby Fox Valley neighborhood off Route 1 — part of a broader DeFries family history of chiropractic care in southern Delaware County.",
    "Garnet Valley and the surrounding Glen Mills area remain a frequently visited portion of the mobile service area today.",
  ],
  connectionImage: DOCTOR_PORTRAIT_IMAGE,

  howItWorksHeading: "How In-Home Chiropractic Care Works in Garnet Valley",
  howItWorksIntro: "A Garnet Valley visit follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Select your visit type and an open appointment time; your address and price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "The table and equipment needed for a complete visit come with Dr. DeFries, directly to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Appropriate evaluation and treatment take place at your location — there's no drive and no waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "A full evaluation comes first for new patients, so treatment is based on real findings rather than a predetermined routine. Returning patients pick up where their care left off, guided by their history and progress.",
    "Travel is part of a mobile visit, so pricing varies by location; your exact price appears during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Garnet Valley and Glen Mills",
  schedulingParagraphs: [
    "Because this area is visited regularly, appointments are arranged around real-time availability rather than a fixed office calendar.",
    "Exact appointment times are shown and confirmed when you schedule, based on what's available for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Garnet Valley",
  workplaceParagraphs: [
    "For two or more people at one location, Group Visits bring wellness-focused chiropractic care directly to a workplace or other setting.",
    "Rather than acute injuries or complex new complaints, Group Visits are built around wellness-focused care. Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Garnet Valley, Glen Mills, Concordville and Chester Heights, Go Chiro Mobile visits other communities throughout the surrounding area. If you're nearby but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Chadds Ford", href: "/service-areas/chadds-ford" },
    { label: "West Chester", href: "/service-areas/west-chester" },
    { label: "Aston", href: "/service-areas/aston" },
    "Chester Heights",
  ],

  closingHeading: "Looking for chiropractic care in Garnet Valley or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Garnet Valley?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Garnet Valley, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Garnet Valley?",
      answer: standardWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment in Garnet Valley?",
      answer: westAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Garnet Valley?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Garnet Valley include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
