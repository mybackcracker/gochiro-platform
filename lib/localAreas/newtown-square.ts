import type { LocalAreaContent } from "./types";
import { insurancePaymentAnswer, centralAvailabilityAnswer, standardWeekdayPricingAnswer } from "@/lib/faqs";
import { HOME_VISIT_IMAGE } from "@/lib/images";
import { CLINICAL_CARE_CATEGORIES } from "./clinicalCare";

export const newtownSquare: LocalAreaContent = {
  slug: "newtown-square",
  town: "Newtown Square",

  metaTitle: "Mobile Chiropractor in Newtown Square & Broomall, PA — Go Chiro Mobile",
  metaDescription:
    "In-home chiropractic care in Newtown Square, Broomall, Edgmont and Gradyville, PA from Dr. David DeFries, DC, brought directly to your home or workplace.",

  heroEyebrow: "Service Area",
  heroHeading: "Mobile Chiropractor in Newtown Square & Broomall, PA",
  heroLede: "In-home chiropractic care, brought directly to your home or workplace across Newtown Square, Broomall, Edgmont and Gradyville.",
  heroParagraphs: [
    "Go Chiro Mobile provides mobile chiropractic care in Newtown Square and Broomall, Pennsylvania, along the Route 3/West Chester Pike corridor, with I-476 and the Blue Route providing convenient access into Broomall.",
    "Edgmont and Gradyville are also part of this coverage. This part of Delaware County is geographically more spread out in places, which is exactly where a mobile visit — brought to your home or workplace — tends to be most useful.",
  ],
  heroImage: HOME_VISIT_IMAGE,
  heroCta: "Book a Chiropractic Visit in Newtown Square",

  clinicalCareHeading: "Chiropractic Care Focused on Getting You Moving",
  clinicalCareIntro:
    "Patients across Newtown Square, Broomall and the surrounding area typically come in with a specific problem — low back pain, sciatica, neck pain, shoulder trouble, or stiffness that's limiting how they move. Care is built around what the evaluation finds, with the goal of restoring function and reducing the problem's effect on daily life.",
  clinicalCareCategories: CLINICAL_CARE_CATEGORIES,
  clinicalCareClosing:
    "Bringing that care to your home or workplace means it fits into a spread-out day rather than adding another drive to it.",

  connectionHeading: "Crossroads Communities, Spread Over Miles",
  connectionParagraphs: [
    "Newtown Square grew up at the intersection of Route 3 (West Chester Pike) and Route 252, and the same pattern repeats across nearby Edgmont and Gradyville: small crossroads that once anchored travelers on old country roads long before they carried car traffic. Gradyville's own general store sat at the corner of Gradyville and Middletown Roads, and a handful of former inns along those same roads — the Gradyville Inn and the Edgmont Inn among them — mark where travelers used to stop. Homes across this part of the service area are spread out along those roads rather than gathered into a single downtown.",
    "That same spread-out, crossroads geography is where a mobile visit is most useful. Instead of asking someone in Edgmont or Gradyville to find their way into a fixed office, care travels the same roads their community was built around — arriving at a home or workplace directly, wherever along Route 3, Route 252, or the roads between them that turns out to be.",
  ],

  howItWorksHeading: "How In-Home Chiropractic Care Works in Newtown Square",
  howItWorksIntro:
    "A visit anywhere across Newtown Square, Broomall, Edgmont or Gradyville follows the same three steps as every Go Chiro Mobile appointment:",
  howItWorksSteps: [
    {
      title: "Schedule online",
      body: "Pick an available appointment time and the type of visit you need — price and address are confirmed as you book.",
    },
    {
      title: "Care comes to you",
      body: "Dr. DeFries brings everything needed for a complete visit — table and equipment — to your home or workplace.",
    },
    {
      title: "Evaluation and treatment on site",
      body: "Your visit includes appropriate evaluation and treatment right where you are — no drive, no waiting room.",
    },
  ],

  careHeading: "Care for New and Returning Patients",
  careParagraphs: [
    "New patients begin with a full evaluation, so care follows what's actually found instead of a predetermined routine. Returning patients continue treatment built around their own history and progress.",
    "Travel is part of a mobile visit, which is why pricing depends on location — your exact price is shown during scheduling, before you confirm.",
  ],

  schedulingHeading: "Scheduling Across a Spread-Out Area",
  schedulingParagraphs: [
    "Because this part of the service area covers real distance — from Newtown Square and Broomall out toward Edgmont and Gradyville — bringing the visit to the patient is often the more practical option compared to a single fixed office location.",
    "Available appointment times are shown and confirmed at the point of scheduling, based on real-time availability for your visit type and location.",
  ],

  workplaceHeading: "Workplace and Group Chiropractic Visits Near Newtown Square",
  workplaceParagraphs: [
    "For groups of two or more at a single location, Group Visits bring wellness-focused chiropractic care directly to the workplace.",
    "Group Visits are built for wellness-focused care, not acute injuries or complex new complaints. Pricing is based on group size and location, with an additional charge for each new patient and for weekend scheduling. Your complete group total is shown before booking.",
  ],
  workplaceCta: "Ask About a Group or Workplace Visit",

  nearbyHeading: "Also Serving Nearby Communities",
  nearbyParagraph:
    "In addition to Newtown Square, Broomall, Edgmont and Gradyville, Go Chiro Mobile visits other communities nearby. If you're close by but not sure your address is covered, enter your ZIP code to check availability:",
  nearbyAreas: [
    { label: "West Chester", href: "/service-areas/west-chester" },
    { label: "Havertown", href: "/service-areas/havertown" },
    { label: "Media", href: "/service-areas/media" },
  ],

  closingHeading: "Looking for chiropractic care in Newtown Square or a surrounding area?",

  faqs: [
    {
      question: "Do you come to my location in Newtown Square?",
      answer: "Yes. Go Chiro Mobile provides mobile chiropractic care at homes and workplaces in Newtown Square, PA. Dr. David DeFries, DC brings the table and equipment to you.",
      links: [{"label": "About Dr. David DeFries", "href": "/about"}],
    },
    {
      question: "How much does a mobile chiropractor cost in Newtown Square?",
      answer: standardWeekdayPricingAnswer,
      links: [{"label": "Full visit pricing", "href": "/pricing"}],
    },
    {
      question: "How soon can I get an appointment in Newtown Square?",
      answer: centralAvailabilityAnswer,
      links: [{"label": "Check available appointments", "href": "/book-online"}],
    },
    {
      question: "What conditions do you evaluate during a mobile chiropractic visit in Newtown Square?",
      answer: "Dr. DeFries evaluates concerns such as low back pain, sciatica, neck pain, headaches, shoulder and upper-body discomfort, foot and heel pain, stiffness and mobility limitations. Visits are also available for wellness and maintenance care. The evaluation determines whether chiropractic care is appropriate.",
    },
    {
      question: "Do you take insurance, and how can I pay?",
      answer: insurancePaymentAnswer,
      links: [{"label": "Payment and insurance information", "href": "/pricing"}],
    },
    {
      question: "What treatments might my chiropractic visit in Newtown Square include?",
      answer: "Depending on the evaluation, care may include chiropractic manipulation, soft-tissue techniques, mobility work and guidance for between visits. Treatment is based on your findings; not every visit includes every therapy. High-intensity laser therapy may be available by advance request and requires at least one week of notice.",
      links: [{"label": "What to expect during your visit", "href": "/what-to-expect"}, {"label": "High-intensity laser therapy availability", "href": "/high-intensity-laser-therapy"}],
    },
  ],
};
