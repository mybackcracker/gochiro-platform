import { SERVICE_AREA_FAQ } from "@/lib/serviceArea";
import PageSearchSchema from "@/components/PageSearchSchema";
import type { Metadata } from "next";
import ExtendedAreaTerms from "@/components/ExtendedAreaTerms";
import FAQs from "@/components/FAQs";
import type { FAQItem } from "@/lib/faqs";
import {
  Section,
  Container,
  PageHeader,
  H2,
  P,
  CTAButton,
  Callout,
} from "@/components/ui";
import {
  VISITS,
  GROUP_VISIT_MIN_PARTICIPANTS,
  GROUP_VISIT_MAX_PARTICIPANTS,
  GROUP_VISIT_NEW_PATIENT_SURCHARGE,
  GROUP_VISIT_WEEKEND_SURCHARGE,
  type VisitType,
} from "@/lib/gochiro";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing — Go Chiro Mobile",
  description: "Know what your visit costs before you book.",
};

// Priority Visit (Accident / Work Injury) bills to insurance/claim, so it has
// no fee to show here (covered under Insurance below instead). Group Visit
// is priced per participant, not a fixed range, so it's covered in its own
// section. Every other visit type currently offered by /book is listed,
// pulling live from lib/gochiro.ts (VISITS) so this table can never go
// stale relative to what /book actually charges.
const PRICED_VISITS: VisitType[] = [
  "new-patient",
  "maintenance",
  "priority-standard",
  "priority-upgraded",
  "care-plan",
];

function priceRange(v: VisitType): string {
  const { standard, premium } = VISITS[v];
  if (standard === null || premium === null) return "—";
  return standard === premium ? `$${standard}` : `$${standard}–$${premium}`;
}

const PRICING_FAQS: FAQItem[] = [
  SERVICE_AREA_FAQ,
  {
    question: "How much is my first chiropractic visit?",
    answer: `Within the regular online booking area, weekday new patient visits range from ${priceRange("new-patient")}, depending on the visit location. Weekend pricing differs. Your exact price is shown during booking for your location and selected date, before you confirm.`,
    links: [{ label: "Explore service areas", href: "/service-areas" }, { label: "Check your visit price", href: "/book-online" }],
  },
  {
    question: "How much are visits for existing patients?",
    answer: `Within the regular online booking area, weekday maintenance visits range from ${priceRange("maintenance")}, priority visits from ${priceRange("priority-standard")}, upgraded priority visits from ${priceRange("priority-upgraded")}, and care plan visits from ${priceRange("care-plan")}. The price depends on your service area and visit type.`,
    links: [{ label: "Explore service areas", href: "/service-areas" }],
  },
  {
    question: "Do weekend appointments cost more?",
    answer: "Weekend prices differ by visit type and service area. Choose your visit and date during booking to see the exact price before confirming.",
    links: [{ label: "See available appointments", href: "/book-online" }],
  },
  {
    question: "Do you take insurance, and how can I pay?",
    answer: "Routine visits are self-pay and are not billed to insurance. Cash, check, credit card, HSA/FSA and Venmo are accepted. Motor vehicle accident and work-injury visits may be billed through applicable insurance or claims.",
  },
  {
    question: "How much does a group chiropractic visit cost?",
    answer: `For groups in the regular online booking area of ${GROUP_VISIT_MIN_PARTICIPANTS}–${GROUP_VISIT_MAX_PARTICIPANTS} people, the base rate is $40–$60 per person, depending on group size and location. Each new patient adds $${GROUP_VISIT_NEW_PATIENT_SURCHARGE}. Saturday or Sunday adds $${GROUP_VISIT_WEEKEND_SURCHARGE} to the total group fee. The complete total is shown before booking.`,
    links: [{ label: "Group visit details and booking", href: "/book?start=group" }],
  },
  {
    question: "Are employee workplace sessions priced like a family group visit?",
    answer: "No. Workplace treatment blocks are arranged separately. For suitable local Delaware County locations, a one-hour block starts at a $200 minimum, which may be covered by employee appointments or employer sponsorship. Other locations are quoted individually.",
    links: [{ label: "Explore workplace and crew care", href: "/workplace-care" }],
  },
  {
    question: "Can I get paperwork to submit to my health insurance?",
    answer: "Yes. Go Chiro Mobile can provide billing paperwork for you to submit to your health insurance for possible reimbursement. We do not submit routine health insurance claims on your behalf. Reimbursement depends on your plan and is not guaranteed.",
  },
];

export default function PricingPage() {
  return (
    <><PageSearchSchema path={"/pricing"} name={"Pricing — Go Chiro Mobile"} description={"Know what your visit costs before you book."} /><div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container>
          <PageHeader
            eyebrow="Pricing"
            title="Chiropractic Visit Pricing"
            lede="Know what your visit costs before you book."
          />
          <P className="max-w-2xl">
            Go Chiro Mobile is primarily a self-pay practice. The prices below apply to the regular online booking area. Your exact price is shown during scheduling before you confirm. Visits by arrangement are quoted individually for care and travel.
          </P>

          <H2 className="mt-8">Regular Online Booking Prices</H2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-cream">
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-muted">
                    Visit
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-muted">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {PRICED_VISITS.map((v) => (
                  <tr key={v}>
                    <td className="px-6 py-5 text-lg font-medium text-ink">{VISITS[v].label}</td>
                    <td className="px-6 py-5 font-heading text-2xl font-bold text-navy">
                      {priceRange(v)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">Price depends on your location — travel is part of a mobile visit.</p>
        </Container>
      </Section>

      <Section tone="cream" className="pt-8 pb-8 sm:pt-10 sm:pb-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <H2>Family & Small-Group Visits</H2>
              <P className="max-w-md">
                Groups of {GROUP_VISIT_MIN_PARTICIPANTS}–{GROUP_VISIT_MAX_PARTICIPANTS} people. Group Visits are designed for
                wellness-focused chiropractic care and are not intended for acute injuries,
                significant new complaints, or chronic problems requiring individualized
                evaluation and treatment.
              </P>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                These small-group visits use one host booking. The host is responsible for the total group fee. Your complete total is shown
                before booking. Workplace treatment blocks are a separate service described below.
              </p>
              <div className="mt-6">
                <CTAButton href="/book?start=group">Book a Group Visit</CTAButton>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="font-heading text-3xl font-bold text-navy">$40–$60</p>
                <p className="mt-1 text-sm font-medium text-muted">base rate per person, based on group size and location</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="font-heading text-3xl font-bold text-navy">+${GROUP_VISIT_NEW_PATIENT_SURCHARGE}</p>
                <p className="mt-1 text-sm font-medium text-muted">for each new patient</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="font-heading text-3xl font-bold text-navy">+$20</p>
                <p className="mt-1 text-sm font-medium text-muted">per group on Saturday or Sunday</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-8 pb-10 sm:pt-10 sm:pb-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div>
              <H2>Workplace & Crew Treatment Blocks</H2>
              <P className="max-w-2xl">
                For employers and organized crews at one workplace, we arrange individual onsite appointments in a reserved treatment window rather than using the regular family group booking tool.
              </P>
              <P className="max-w-2xl">
                The local Delaware County minimum is $200 for a one-hour treatment block. Initial appointments are $50 (approximately 15 minutes) and returning appointments are $40 (approximately 10 minutes). Individual employee payments count toward the $200 minimum; it is not an additional fee. The employer may instead sponsor the block or any shortfall.
              </P>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Additional time is $100 per 30 minutes by arrangement. Philadelphia and other locations needing extra travel, parking or access are quoted before booking. These sessions require advance coordination and are not yet individually payable through the online group scheduler.
              </p>
              <div className="mt-6"><CTAButton href="/workplace-care">View Workplace Program</CTAButton></div>
            </div>
            <Callout title="HSA / FSA and workplace care" tone="white">
              <p className="text-base leading-relaxed text-muted">
                Chiropractic treatment for qualifying medical care is generally eligible for HSA and healthcare FSA payment, depending on the plan. General wellness services without a medical purpose may not qualify. Itemized receipts are available.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            <Callout title="Payment">
              <p className="text-base leading-relaxed text-muted">
                Cash, check, credit card, HSA/FSA and Venmo are accepted.
              </p>
            </Callout>
            <Callout title="Insurance">
              <p className="text-base leading-relaxed text-muted">
                Routine visits are self-pay and are not billed to insurance. Motor-vehicle accident
                and work-injury visits may be billed through the applicable insurance or claim.
              </p>
            </Callout>
          </div>

          <div id="cancellation-policy" className="mt-8 scroll-mt-24">
            <Callout title="Regular Booking: Cancellation & Rescheduling">
              <p className="text-base leading-relaxed text-muted">
                At least 24 hours&apos; notice is required to cancel or reschedule an individual appointment.
                Cancellations, no-shows, or same-day changes made with less than 24 hours&apos; notice
                will be charged a $50 fee. For a Group Visit, the host may reduce the reserved headcount
                more than 24 hours before the visit and the group total will be recalculated. Within 24
                hours, the original reserved group total remains due if fewer people participate or the
                group cancels or reschedules. If an emergency or unavoidable circumstance occurs, please
                contact us as soon as possible; fees may be waived at the practice&apos;s discretion.
              </p>
            </Callout>
          </div>

          <div className="mt-8">
            <CTAButton href="/book-online">Schedule a visit →</CTAButton>
          </div>
        </Container>
      </Section>
      <Section tone="cream"><Container><div className="max-w-3xl"><H2>Visits by Arrangement</H2><div className="mt-6"><ExtendedAreaTerms /></div><div className="mt-6"><CTAButton href="/check-your-location">Request a Visit</CTAButton></div></div></Container></Section>
      <FAQs items={PRICING_FAQS} path="/pricing" title="Frequently Asked Questions About Visit Pricing" />
    </div></>
  );
}
