import { locationRequestPath, zipRoute } from "./zipRouting";

export type AssistantTopicId =
  | "new"
  | "returning"
  | "group"
  | "pricing"
  | "area"
  | "hours"
  | "insurance"
  | "first-visit"
  | "other";

export type AssistantLink = { label: string; href: string };
export type AssistantTopic = {
  id: AssistantTopicId;
  question: string;
  answer: string;
  links: AssistantLink[];
  needsZip?: boolean;
};

/**
 * General administrative guidance only. Deliberately does not collect or
 * interpret symptoms, patient records, dates of birth, or treatment needs.
 * Booking prices, eligibility and real availability stay with /book.
 */
export const ASSISTANT_TOPICS: AssistantTopic[] = [
  {
    id: "new",
    question: "I'm a new patient",
    answer:
      "Your first visit starts with a conversation about your goals and an examination. Treatment may begin at that visit when appropriate. If you have not been seen by Dr. DeFries in over a year, please use the new-patient booking option.",
    links: [
      { label: "Schedule a first visit", href: "/book?start=new" },
      { label: "What to expect", href: "/what-to-expect" },
    ],
  },
  {
    id: "returning",
    question: "I've been treated before",
    answer:
      "If you have been seen within the past year, choose a returning-patient appointment. Maintenance visits are for routine care and wellness; a new or worsening concern may need a different visit type. Maintenance requires at least 48 hours' advance booking.",
    links: [
      { label: "Schedule a returning visit", href: "/book?start=returning" },
      { label: "View visit types", href: "/book-online" },
    ],
  },
  {
    id: "group",
    question: "Tell me about Group Visits",
    answer:
      "Two to six people can schedule care at one location and share travel costs. The total varies by location, number of people, and visit date, and is shown during booking. New patients must each complete their own intake. Anyone with a new injury or significantly worsening complaint should book an individual visit instead. For more than six people, contact the practice.",
    links: [
      { label: "Plan a Group Visit", href: "/book?start=group" },
      { label: "Group Visit details", href: "/group-visits/standard" },
    ],
  },
  {
    id: "pricing",
    question: "How much does a visit cost?",
    answer:
      "The fee depends on your ZIP code, visit type, and appointment date. Weekend prices can differ from weekday prices. Enter your ZIP below to find the correct booking path. The scheduler shows the applicable fee before you confirm; this assistant does not provide a final quote.",
    links: [{ label: "See pricing details", href: "/pricing" }],
    needsZip: true,
  },
  {
    id: "area",
    question: "Do you come to my area?",
    answer:
      "Go Chiro Mobile serves Delaware County, parts of Chester County, and some Philadelphia locations by arrangement. Enter a five-digit ZIP to see whether regular online booking is offered or whether you can request a visit. This is a service-area check, not a live appointment search.",
    links: [{ label: "View service areas", href: "/service-areas" }],
    needsZip: true,
  },
  {
    id: "hours",
    question: "Do you offer weekend visits?",
    answer:
      "Yes. Appointment hours include Saturday and Sunday, generally 9 a.m. to 1 p.m. Some areas have shorter Saturday hours, and visit types differ on Sundays. Exact openings are only shown in the online scheduler.",
    links: [{ label: "Explore appointment options", href: "/book-online" }],
  },
  {
    id: "insurance",
    question: "Do you accept insurance?",
    answer:
      "Routine visits are self-pay. Cash, check, cards, HSA/FSA and Venmo are accepted. Motor-vehicle and work-injury visits may be billed through applicable insurance or claims; contact the practice to discuss your situation. Reimbursement is not guaranteed.",
    links: [
      { label: "Payment and pricing", href: "/pricing" },
      { label: "Contact the practice", href: "/contact" },
    ],
  },
  {
    id: "first-visit",
    question: "What happens at my first visit?",
    answer:
      "Dr. DeFries discusses your concerns and goals, examines movement and function, and explains the findings and potential next steps. If appropriate, treatment may take place during the first visit. Your booking confirmation provides any applicable intake instructions.",
    links: [
      { label: "What to expect", href: "/what-to-expect" },
      { label: "Book a first visit", href: "/book?start=new" },
    ],
  },
  {
    id: "other",
    question: "I have another question",
    answer:
      "For questions about an individual situation, a visit by special arrangement, or whether you should schedule a particular appointment, please call or text the practice directly. This website assistant handles general visit information, not medical advice.",
    links: [{ label: "Contact Go Chiro Mobile", href: "/contact" }],
  },
];

export function assistantTopic(id: AssistantTopicId): AssistantTopic {
  const topic = ASSISTANT_TOPICS.find((item) => item.id === id);
  if (!topic) throw new Error("Unknown visit assistant topic");
  return topic;
}

export type AssistantZipResult = {
  message: string;
  links: AssistantLink[];
  kind: "booking" | "request" | "outside" | "incomplete";
};

export function assistantZipResult(zip: string): AssistantZipResult {
  const route = zipRoute(zip);
  if (route === "booking") {
    return {
      kind: "booking",
      message:
        "This ZIP is within the regular online booking area. Choose your visit below. The scheduler will confirm appointment availability and show the price for your date.",
      links: [
        { label: "New patient", href: "/book?start=new&zip=" + zip },
        { label: "Returning patient", href: "/book?start=returning&zip=" + zip },
        { label: "Group Visit", href: "/book?start=group&zip=" + zip },
      ],
    };
  }
  if (route === "request") {
    return {
      kind: "request",
      message:
        "This Pennsylvania ZIP is outside the regular online booking area. A visit may be available by arrangement; submit a location request for review. Availability and any quote must be confirmed by the practice.",
      links: [
        { label: "Request a visit", href: locationRequestPath(zip) },
      ],
    };
  }
  if (route === "not-pennsylvania") {
    return {
      kind: "outside",
      message:
        "This ZIP is not within the Pennsylvania service-area request system. Please contact the practice directly with questions about your location.",
      links: [{ label: "Contact the practice", href: "/contact" }],
    };
  }
  return {
    kind: "incomplete",
    message: "Please enter a valid five-digit ZIP code.",
    links: [],
  };
}
