import type { FAQItem } from "./faqs";

export const BUSINESS_SERVICE_AREA = "Delaware County and surrounding communities, with additional locations available by arrangement";
export const SERVICE_AREA_STATEMENT = "Serving Delaware County and surrounding communities, with additional locations available by arrangement.";
export const SERVICE_AREA_POSITIONING = "Go Chiro Mobile provides mobile, house-call chiropractic care throughout its primary service area in Delaware County and surrounding communities, with additional locations available by arrangement.";
export const SERVICE_AREA_META_DESCRIPTION = "Mobile, house-call chiropractic care in Delaware County and surrounding communities. Additional locations available by arrangement.";
export const COMMUNITY_EXAMPLES_NOTE = "The towns listed are examples of commonly served communities, not a complete list of where care may be available.";
export const ONLINE_LOCATION_MESSAGE = "This ZIP is outside the regular online booking area. Call or text (610) 494-0412 to discuss whether a visit can be arranged at your location.";
export const SERVICE_AREA_FAQ: FAQItem = {
  question: "Do you visit locations beyond the towns listed?",
  answer: `${SERVICE_AREA_POSITIONING} ${COMMUNITY_EXAMPLES_NOTE} Contact the practice to confirm availability for your address. Philadelphia visits are available by arrangement.`,
  links: [{ label: "Discuss your location", href: "/contact" }],
};
