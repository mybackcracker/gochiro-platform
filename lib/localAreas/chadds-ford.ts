import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, availabilityAnswer } from "@/lib/faqs";
import { LAPTOP_CONSULTATION_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const chaddsFord: LocalAreaContent = {
  slug: "chadds-ford",
  town: "Chadds Ford",

  metaTitle: "Mobile Chiropractor in Chadds Ford, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care in Chadds Ford and Birmingham, PA from Dr. David DeFries, DC, brought directly to your home or workplace along the Route 202 and Route 926 corridors.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Chadds Ford, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Chadds Ford and Birmingham.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Chadds Ford and Birmingham, Pennsylvania, along the Route 202 and Route 926 corridors — an area that geographically connects the West Chester and Concordville/Glen Mills portions of the service territory.",
    "Every visit is provided by Dr. David DeFries, DC, a licensed Doctor of Chiropractic. Evaluation and treatment come directly to your home or workplace, with no office visit required.",
  ],
  heroImage: LAPTOP_CONSULTATION_IMAGE,
  heroCta: "Book a Chiropractic Visit in Chadds Ford",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients in Chadds Ford and Birmingham typically come in with a specific issue — low back pain, sciatica, neck pain, shoulder problems, or stiffness limiting daily movement. Care is shaped around the evaluation's findings, with the goal of restoring function and reducing the problem's day-to-day impact.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace means it fits into your day instead of adding a separate trip to it.",

  connectionHeading: "A Spread-Out Corner of the Brandywine Valley",
  connectionParagraphs: [
    "Chadds Ford sits along the Route 202 and Route 926 corridors in southern Chester County, in the stretch of the Brandywine Valley that geographically links the West Chester area to Concordville and Glen Mills. The area is known well beyond its size for its history and art — the Brandywine Museum of Art, housed in a converted 19th-century gristmill, holds the region's best-known collection of Wyeth family paintings, and the Revolutionary War's Brandywine Battlefield sits nearby. Away from those landmarks, Chadds Ford itself is mostly larger residential lots along country roads rather than a dense town center.",
    "That spread-out layout is exactly where a mobile visit tends to be most useful. When homes sit farther apart along winding roads instead of clustered around a single downtown, a drive to a fixed chiropractic office can end up taking longer than the appointment itself. Bringing evaluation and treatment directly to a home or workplace in Chadds Ford or Birmingham removes that drive from the equation, regardless of which side of Route 202 or Route 926 a visit falls on.",
  ],

  howItWorksHeading: "How In-Home Chiropractic Care Works in Chadds Ford",
  howItWorksIntro: "A Chadds Ford or Birmingham visit follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Choose an available time and visit type online; address and exact price are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the equipment and table a full visit requires straight to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit — including appropriate evaluation and treatment — takes place at your location, without a drive or a waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients start with a full evaluation, so treatment is based on what's actually found rather than a predetermined routine. Returning patients continue care shaped by their history and how they've responded so far.",
    "Since travel is included in every mobile visit, pricing varies by location — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling in Chadds Ford and Birmingham",
  schedulingParagraphs: [
    "Homes in this area can be relatively spread out, which is exactly where a mobile visit tends to be most useful — there's no office location to factor into the trip.",
    "Scheduling confirms exact appointment times based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Chadds Ford",
  workplaceParagraphs: [
    "Group Visits deliver wellness-focused chiropractic care directly to a workplace or other single location for two or more people.",
    "Group Visits are designed for wellness-focused care rather than acute injuries or complex new complaints, Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Chadds Ford and Birmingham, Go Chiro Mobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Garnet Valley", href: "/service-areas/garnet-valley" },
    { label: "West Chester", href: "/service-areas/west-chester" },
  ],

  closingHeading: "Looking for chiropractic care in Chadds Ford or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Chadds Ford?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Chadds Ford, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How soon can I get an appointment in Chadds Ford?",
      answer: availabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Chadds Ford?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Chadds Ford include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
