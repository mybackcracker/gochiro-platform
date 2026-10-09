import PageSearchSchema from "@/components/PageSearchSchema";
import type { Metadata } from "next";
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
  {
    question: "How much is my first chiropractic visit?",
    answer: `Weekday new patient visits range from ${priceRange("new-patient")}, depending on the visit location. Weekend pricing differs. Your exact price is shown during booking for your location and selected date, before you confirm.`,
    links: [{ label: "Explore service areas", href: "/service-areas" }, { label: "Check your visit price", href: "/book-online" }],
  },
  {
    question: "How much are visits for existing patients?",
    answer: `Weekday maintenance visits range from ${priceRange("maintenance")}, priority visits from ${priceRange("priority-standard")}, upgraded priority visits from ${priceRange("priority-upgraded")}, and care plan visits from ${priceRange("care-plan")}. The price depends on your service area and visit type.`,
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
    answer: `For groups of ${GROUP_VISIT_MIN_PARTICIPANTS}–${GROUP_VISIT_MAX_PARTICIPANTS} people, the base rate is $40–$60 per person, depending on group size and location. Each new patient adds $${GROUP_VISIT_NEW_PATIENT_SURCHARGE}. Saturday or Sunday adds $${GROUP_VISIT_WEEKEND_SURCHARGE} to the total group fee. The complete total is shown before booking.`,
    links: [{ label: "Group visit details and booking", href: "/book?start=group" }],
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
            Go Chiro Mobile is primarily a self-pay practice. Your exact price is shown during
            scheduling before you confirm your appointment.
          </P>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
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
              <H2>Group Visits</H2>
              <P className="max-w-md">
                Groups of {GROUP_VISIT_MIN_PARTICIPANTS}–{GROUP_VISIT_MAX_PARTICIPANTS} people. Group Visits are designed for
                wellness-focused chiropractic care and are not intended for acute injuries,
                significant new complaints, or chronic problems requiring individualized
                evaluation and treatment.
              </P>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                The host is responsible for the total group fee. Your complete total is shown
                before booking.
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
            <Callout title="Cancellation & Rescheduling">
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
      <FAQs items={PRICING_FAQS} path="/pricing" title="Frequently Asked Questions About Visit Pricing" />
    </div></>
  );
}
