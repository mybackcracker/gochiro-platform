import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, westAvailabilityAnswer, standardWeekdayPricingAnswer } from "@/lib/faqs";
import { IN_HOME_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const glenolden: LocalAreaContent = {
  slug: "glenolden",
  town: "Glenolden",

  metaTitle: "Mobile Chiropractor in Glenolden & Holmes, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care in Glenolden and Holmes, PA from Dr. David DeFries, DC, brought directly to your home or workplace in eastern Delaware County.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Glenolden & Holmes, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Glenolden and Holmes.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Glenolden and Holmes, Pennsylvania — part of the eastern portion of the practice's Delaware County service territory.",
    "Dr. David DeFries, DC provides every visit personally. As a licensed Doctor of Chiropractic, he brings evaluation and treatment directly to your home or workplace instead of an office trip.",
  ],
  heroImage: IN_HOME_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Glenolden",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Common reasons patients reach out include low back pain, sciatica, neck pain, shoulder and upper-body problems, or stiffness that's harder to ignore than it used to be. Care is built around restoring movement and function, with the goal of reducing how much the problem affects daily life.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace in Glenolden or Holmes means it fits around your day instead of adding to it.",

  connectionHeading: "Built Along a Turnpike That Became a Trolley Line",
  connectionParagraphs: [
    "Glenolden sits in eastern Delaware County between Folcroft, Norwood, Ridley Township and Collingdale, and its main roads have a longer history than they look. Chester Pike began as a privately chartered turnpike in 1851, connecting Chester and Darby; rail lines followed in the 1870s and 1880s, and by the mid-1890s a trolley ran the length of it. MacDade Boulevard, which splits off from Chester Pike nearby, carries much of that same through-traffic today, and the borough's commercial and light-industrial stretches are still built up along both roads.",
    "That corridor-driven layout — commerce and industry along Chester Pike and MacDade Boulevard, residential streets behind them — is part of why a mobile visit makes sense here. Rather than adding another stop along an already busy commercial corridor, care comes directly to a home or workplace in Glenolden, fitting into a day that's already built around getting past that traffic, not through a waiting room.",
  ],

  howItWorksHeading: "How In-Home Chiropractic Care Works in Glenolden",
  howItWorksIntro: "A visit in Glenolden or Holmes follows the same three steps as every Go Chiro Mobile appointment:",
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
    "The scope of a Group Visit is wellness-focused care, not acute injuries or complex new complaints — Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Confirm Your Address",
  nearbyParagraph:
    "Not every address in the Glenolden and Holmes area is necessarily within the current scheduling area, and coverage can change as the practice grows. The ZIP checker below is the fastest way to confirm your specific address, and Go Chiro Mobile also visits other nearby communities:",
  nearbyAreas: [
    { label: "Ridley Park", href: "/service-areas/ridley-park" },
    { label: "Essington", href: "/service-areas/essington" },
    { label: "Wallingford", href: "/service-areas/wallingford" },
  ],

  closingHeading: "Looking for chiropractic care in Glenolden or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Glenolden?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Glenolden, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Glenolden?",
      answer: standardWeekdayPricingAnswer,
      links: [{ label: "Full visit pricing", href: "/pricing" }],
    },
    {
      question: "How soon can I get an appointment in Glenolden?",
      answer: westAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Glenolden?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Glenolden include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
