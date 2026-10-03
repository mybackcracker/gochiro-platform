import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, westAvailabilityAnswer, standardWeekdayPricingAnswer } from "@/lib/faqs";
import { HOUSE_CALL_TREATMENT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const ridleyPark: LocalAreaContent = {
  slug: "ridley-park",
  town: "Ridley Park",

  metaTitle: "Mobile Chiropractor in Ridley Park, PA — Go Chiro Mobile",
  metaDescription:
    "Mobile chiropractic care at your home or workplace in Ridley Park, PA with Dr. David DeFries, DC. See visit prices, hours and book online.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Ridley Park, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace in Ridley Park and the surrounding Ridley area.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Ridley Park, Ridley Township, Folsom, Prospect Park, Norwood and Woodlyn, Pennsylvania — an area with convenient access from I-95, MacDade Boulevard and Chester Pike.",
    "Dr. David DeFries, DC travels to this part of Delaware County frequently and currently works with numerous patients throughout the area, bringing evaluation and treatment directly to their homes and workplaces.",
  ],
  heroImage: HOUSE_CALL_TREATMENT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Ridley Park",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients throughout the Ridley area come to Dr. DeFries with a range of problems — low back pain, sciatica, neck pain, shoulder and upper-body issues, or stiffness that's making everyday movement harder. Every visit works toward the same goal: better movement, restored function, and less interference from the problem.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing care directly to your home or workplace means it fits into a busy schedule instead of adding another stop to it.",

  connectionHeading: "A Railroad Suburb, Planned From the Start",
  connectionParagraphs: [
    "Ridley Park was founded in 1871 by Isaac Hinckley, then president of the Philadelphia, Wilmington & Baltimore Railroad, who had a landscape architect lay out the town as a planned railroad suburb before the first passenger trains even stopped there in 1872. The station Hinckley built still stands and still carries SEPTA's Wilmington/Newark Line today. That planned, walkable street grid still defines the borough, and the surrounding Ridley area — Folsom, Prospect Park, Norwood and Woodlyn — shares a similar close-knit layout, all reachable quickly from I-95, MacDade Boulevard and Chester Pike.",
    "Dr. DeFries travels to this part of Delaware County often and already works with a number of patients scattered across these communities. A mobile visit that moves easily between them — the same way the original rail line once did — fits naturally into an area that was designed from its earliest days around getting people where they needed to go.",
  ],

  howItWorksHeading: "How In-Home Chiropractic Care Works in Ridley Park",
  howItWorksIntro: "A visit anywhere in the Ridley area follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Pick your visit and an available time online. Your exact price and address are confirmed before you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings the table and equipment needed for a complete visit — no drive on your part required.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Appropriate evaluation and treatment happen at your location — no waiting room required.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients start with a complete evaluation, with care based on what's found rather than a set routine. Returning patients continue treatment built around their history and how they've responded so far.",
    "Pricing varies by location, since a mobile visit includes travel — you'll see your exact price during scheduling, before confirming.",
  ],

  schedulingHeading: "Practical, Efficient Scheduling in the Ridley Area",
  schedulingParagraphs: [
    "Travel efficiency is a genuine advantage in this part of Delaware County — with easy access from I-95, MacDade Boulevard and Chester Pike, visits across Ridley Park, Folsom, Prospect Park, Norwood and Woodlyn can often be scheduled close together.",
    "Appointment times are shown and confirmed at scheduling, based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Ridley Park",
  workplaceParagraphs: [
    "A workplace or other single location can host a Group Visit — wellness-focused chiropractic care for two or more people at once.",
    "Group Visits stay wellness-focused rather than addressing acute injuries or complex new complaints. Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Ridley Park, Folsom, Prospect Park, Norwood and Woodlyn, Go Chiro Mobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "Glenolden", href: "/service-areas/glenolden" },
    { label: "Essington", href: "/service-areas/essington" },
    { label: "Aston", href: "/service-areas/aston" },
    "Ridley Township",
  ],

  closingHeading: "Looking for chiropractic care in Ridley Park or a nearby community?",

  faqs: [
    {
      question: "Do you come to my location in Ridley Park?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Ridley Park, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Ridley Park?",
      answer: standardWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment in Ridley Park?",
      answer: westAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Ridley Park?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Ridley Park include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
