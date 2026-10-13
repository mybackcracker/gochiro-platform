import { SERVICE_AREA_POSITIONING } from "./serviceArea";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  DOCTOR_NAME,
  PUBLIC_CONTACT_EMAIL,
  VISITS,
  type VisitType,
} from "./gochiro";
import type { LocalAreaContent } from "./localAreas/types";

export const SCHEMA_SITE_URL = "https://www.gochiromobile.com";
export const BUSINESS_SCHEMA_ID = `${SCHEMA_SITE_URL}/#organization`;

const SERVICE_DESCRIPTION = "mobile chiropractic care at the patient's home or workplace";
const HOURS_EXCEPTIONS = "Friday: Main Line and West Chester close at 2 p.m. Saturday: Central, Main Line and West Chester close at noon; East and West close at 1 p.m.";

// These are the weekday ranges published on /pricing, not a cap on weekend fees.
const PRICED_VISITS: VisitType[] = [
  "new-patient", "maintenance", "priority-standard", "priority-upgraded", "care-plan",
];
const weekdayPrices = PRICED_VISITS.flatMap((visit) => {
  const { standard, premium } = VISITS[visit];
  return [standard, premium].filter((price): price is number => price !== null);
});

function servedPlace(name: string) {
  return {
    "@type": "Place",
    name: `${name}, PA`,
    description: "An example of a commonly served community, not the complete service territory.",
    containedInPlace: { "@type": "State", name: "Pennsylvania" },
  };
}

export function localBusinessSchema(areas: LocalAreaContent[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_SCHEMA_ID,
    name: BUSINESS_NAME,
    telephone: BUSINESS_PHONE,
    email: PUBLIC_CONTACT_EMAIL,
    url: SCHEMA_SITE_URL,
    description: `${SERVICE_AREA_POSITIONING} Commonly served communities include the places listed below. ${HOURS_EXCEPTIONS}`,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Delaware County, Pennsylvania", description: "Primary service area, together with surrounding communities. Additional locations available by arrangement." },
      { "@type": "Place", name: "Delaware County and surrounding communities" },
      "Parts of Chester County, Pennsylvania",
      ...areas.map((area) => servedPlace(area.town)),
    ],
    openingHours: ["Mo-Th 09:00-18:00", "Fr 09:00-16:00", "Sa-Su 09:00-13:00"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00", closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday", opens: "09:00", closes: "16:00",
        description: "Main Line and West Chester close at 2 p.m.",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday", opens: "09:00", closes: "13:00",
        description: "Central, Main Line and West Chester close at noon; East and West close at 1 p.m.",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday", opens: "09:00", closes: "13:00",
      },
    ],
    priceRange: `Weekday individual visits: $${Math.min(...weekdayPrices)}–$${Math.max(...weekdayPrices)}. Group Visits: $40–$60 base rate per person, plus applicable surcharges. Weekend individual prices are shown during scheduling.`,
    paymentAccepted: "Cash, check, credit card, HSA/FSA, Venmo",
    currenciesAccepted: "USD",
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SCHEMA_SITE_URL}/book-online`,
    },
  };
}

export function townServiceSchema(area: LocalAreaContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SCHEMA_SITE_URL}/service-areas/${area.slug}#service`,
    name: `Mobile chiropractic care in ${area.town}, PA`,
    description: `${area.town} is a commonly served community. ${SERVICE_AREA_POSITIONING}`,
    serviceType: SERVICE_DESCRIPTION,
    url: `${SCHEMA_SITE_URL}/service-areas/${area.slug}`,
    provider: { "@id": BUSINESS_SCHEMA_ID },
    areaServed: servedPlace(area.town),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SCHEMA_SITE_URL}/book-online`,
    },
  };
}

export function doctorPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SCHEMA_SITE_URL}/about#doctor`,
    name: DOCTOR_NAME,
    jobTitle: "Doctor of Chiropractic",
    url: `${SCHEMA_SITE_URL}/about`,
    description: "Third-generation chiropractor. Practicing since 2003.",
    worksFor: { "@id": BUSINESS_SCHEMA_ID },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Parker College of Chiropractic" },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Pennsylvania chiropractic license DC008983",
      credentialCategory: "Professional license",
      identifier: "DC008983",
    },
  };
}
