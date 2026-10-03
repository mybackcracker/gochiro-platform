import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, centralAvailabilityAnswer, standardWeekdayPricingAnswer } from "@/lib/faqs";
import { SHOULDER_EXERCISE_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const media: LocalAreaContent = {
  slug: "media",
  town: "Media",

  metaTitle: "Mobile Chiropractor in Media, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care in Media, Lima and Middletown Township, PA from Dr. David DeFries, DC, brought directly to your home or workplace along the Baltimore Pike corridor.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Media, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in and around Media.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Media Borough and the broader surrounding service area, including Lima and Middletown Township, along the Baltimore Pike/Route 1 corridor.",
    "Dr. David DeFries, DC — a licensed Doctor of Chiropractic — provides every visit, bringing evaluation and treatment directly to your home or workplace instead of requiring an office trip.",
  ],
  heroImage: SHOULDER_EXERCISE_IMAGE,
  heroCta: "Book a Chiropractic Visit in Media",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Whether the issue is low back pain, sciatica, neck pain, shoulder discomfort, or general stiffness, care is shaped around what's actually found during evaluation — with the goal of restoring movement and reducing how much the problem affects daily life.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Because that care is brought to your home or workplace in Media, it fits around a full schedule instead of adding to it.",

  connectionHeading: "A Familiar Area",
  connectionParagraphs: [
    "Dr. DeFries attended Penn State in this area for a period of time, and the Media area's mix of civic, educational and retail activity has remained familiar to him since.",
  ],
  connectionImage: DOCTOR_PORTRAIT_IMAGE,

  howItWorksHeading: "How In-Home Chiropractic Care Works in Media",
  howItWorksIntro: "A visit in Media, Lima or Middletown Township follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Book online by choosing your visit type and an open time — price and address are confirmed before you commit.",
    },
    {
      title: "Care comes to you",
      body: "Everything needed for a complete visit — table and equipment included — comes to your home or workplace with Dr. DeFries.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit — evaluation and treatment included — happens at your location, skipping the drive and the waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a complete evaluation, with treatment based on the findings rather than a predetermined routine. Returning patients continue care built around their own history and how it has progressed.",
    "Your location affects pricing, since travel is part of a mobile visit — the exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Media, Lima and Middletown Township",
  schedulingParagraphs: [
    "Media's civic and retail activity means schedules here can be busy — a mobile visit fits into a day without the added time of a drive to an office and back.",
    "Real-time availability for your visit type and location determines the exact appointment times shown and confirmed at scheduling.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Media",
  workplaceParagraphs: [
    "Group Visits deliver wellness-focused chiropractic care directly to a workplace or other single location, for two or more people at a time.",
    "Wellness-focused care is the focus of a Group Visit, not acute injuries or complex new complaints. Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Media, Lima and Middletown Township, Go Chiro Mobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Wallingford", href: "/service-areas/wallingford" },
    { label: "Newtown Square", href: "/service-areas/newtown-square" },
    { label: "Springfield", href: "/service-areas/springfield" },
  ],

  closingHeading: "Looking for chiropractic care in Media or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Media?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Media, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Media?",
      answer: standardWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment in Media?",
      answer: centralAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Media?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Media include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
