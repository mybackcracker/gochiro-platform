import { VISITS } from "./gochiro";

export interface FAQItem {
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
}

export const standardWeekdayPricingAnswer =
  `A weekday first visit costs $${VISITS["new-patient"].standard}. ` +
  `Weekday maintenance visits cost $${VISITS.maintenance.standard}, ` +
  `priority visits $${VISITS["priority-standard"].standard}, ` +
  `upgraded priority visits $${VISITS["priority-upgraded"].standard}, ` +
  `and care plan visits $${VISITS["care-plan"].standard}. ` +
  "Weekend pricing differs; your exact price is shown before booking.";

export const insurancePaymentAnswer =
  "Routine visits are self-pay and are not billed to insurance. Cash, check, credit card, HSA/FSA and Venmo are accepted.";

export const westAvailabilityAnswer =
  "Check online booking for the next available appointment. Appointment hours are Monday–Thursday, 9 a.m.–6 p.m.; Friday, 9 a.m.–4 p.m.; and Saturday–Sunday, 9 a.m.–1 p.m. Availability depends on the schedule and visit type.";

export const premiumWeekdayPricingAnswer =
  `A weekday first visit costs $${VISITS["new-patient"].premium}. ` +
  `Weekday maintenance visits cost $${VISITS.maintenance.premium}, ` +
  `priority visits $${VISITS["priority-standard"].premium}, ` +
  `upgraded priority visits $${VISITS["priority-upgraded"].premium}, ` +
  `and care plan visits $${VISITS["care-plan"].premium}. ` +
  "Weekend pricing differs; your exact price is shown before booking.";

export const centralAvailabilityAnswer =
  "Check online booking for the next available appointment. Appointment hours are Monday–Thursday, 9 a.m.–6 p.m.; Friday, 9 a.m.–4 p.m.; Saturday, 9 a.m.–noon; and Sunday, 9 a.m.–1 p.m. Availability depends on the schedule and visit type.";

export const premiumAvailabilityAnswer =
  "Check online booking for the next available appointment. Appointment hours are Monday–Thursday, 9 a.m.–6 p.m.; Friday, 9 a.m.–2 p.m.; Saturday, 9 a.m.–noon; and Sunday, 9 a.m.–1 p.m. Availability depends on the schedule and visit type.";

export const availabilityAnswer =
  "Check online booking for the next available appointment. Published hours and regional exceptions are listed in the Visit Hours & Pricing section above. Availability depends on the schedule and visit type.";
