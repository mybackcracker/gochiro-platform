import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, premiumAvailabilityAnswer, premiumWeekdayPricingAnswer } from "@/lib/faqs";
import { IN_HOME_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const havertown: LocalAreaContent = {
  slug: "havertown",
  town: "Havertown",

  metaTitle: "Mobile Chiropractor in Havertown, PA — Go Chiro Mobile",
  metaDescription:
    "Mobile chiropractic care at your home or workplace in Havertown, PA with Dr. David DeFries, DC. See visit prices, hours and book online.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Havertown, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Havertown and Haverford Township.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Havertown and throughout Haverford Township, Pennsylvania, along the West Chester Pike/Route 3 corridor.",
    "Every visit is provided by Dr. David DeFries, DC, a licensed Doctor of Chiropractic, bringing evaluation and treatment straight to your home or workplace rather than an office.",
  ],
  heroImage: IN_HOME_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Havertown",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Whether it's low back pain, sciatica, neck pain, shoulder and upper-body problems, or stiffness that's limiting movement, care is built around what the evaluation finds — with the goal of helping you move and function better.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because that care comes to your home or workplace in Havertown, it fits into an established routine instead of interrupting it.",

  connectionHeading: "A Township Assembled From Older Neighborhoods",
  connectionParagraphs: [
    "Havertown itself is a relatively recent name — the U.S. Post Office coined it in 1946 for postal convenience, decades after Haverford Township's older neighborhoods had already been established under their own names: Oakmont, Llanerch, Manoa, Brookline and Penfield among them. The township itself dates back much further, laid out in 1682 as one of the original townships under William Penn and incorporated in its current municipal form in 1911. Longtime residents still use those older neighborhood names for their own section of the township, built up along the West Chester Pike/Route 3 corridor between the Broomall/Newtown Square area and the Main Line.",
    "Because Havertown is really a patchwork of older, fully built-out neighborhoods rather than one town with a single center, no single office location would be equally convenient to all of them. A mobile visit sidesteps that entirely — care travels to whichever corner of Haverford Township a patient calls home, whether that's Oakmont, Manoa, or anywhere else across the township.",
  ],

  howItWorksHeading: "How In-Home Chiropractic Care Works in Havertown",
  howItWorksIntro: "A Havertown or Haverford Township visit follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Pick your visit type and an available appointment time, with address and price confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "The table and equipment for a complete visit travel with Dr. DeFries to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Evaluation and treatment are provided appropriately at your location, with no drive and no waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a complete evaluation, with care based on the findings rather than a predetermined routine. Returning patients continue treatment built around their history and response so far.",
    "Pricing depends on where you're located, since travel is part of a mobile visit; the exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in an Established Community",
  schedulingParagraphs: [
    "Havertown is an established residential community, and a mobile visit fits naturally into it — care arrives at your door rather than adding an office trip to the day.",
    "Exact appointment times are shown when you schedule and confirmed based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Havertown",
  workplaceParagraphs: [
    "A Group Visit brings wellness-focused chiropractic care directly to a workplace or other single location, for two or more people at once.",
    "Wellness-focused care — not acute injuries or complex new complaints — is what a Group Visit is designed for. Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "Havertown and Haverford Township sit geographically between the Broomall/Newtown Square area and the Main Line, both also served by Go Chiro Mobile. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Newtown Square", href: "/service-areas/newtown-square" },
    { label: "Main Line", href: "/service-areas/main-line" },
    { label: "Springfield", href: "/service-areas/springfield" },
  ],

  closingHeading: "Looking for chiropractic care in Havertown or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Havertown?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Havertown, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Havertown?",
      answer: premiumWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment in Havertown?",
      answer: premiumAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Havertown?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Havertown include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
