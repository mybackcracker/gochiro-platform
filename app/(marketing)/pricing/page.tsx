import type { Metadata } from "next";
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
  GROUP_VISIT_NEW_PATIENT_PRICE,
  GROUP_VISIT_EXISTING_PATIENT_PRICE,
  GROUP_VISIT_TRAVEL_FEE,
  type VisitType,
} from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "Pricing — GoChiroMobile",
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

export default function PricingPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container>
          <PageHeader
            eyebrow="Pricing"
            title="Chiropractic Visit Pricing"
            lede="Know what your visit costs before you book."
          />
          <P className="max-w-2xl">
            GoChiroMobile is primarily a self-pay practice. Your exact price is shown during
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
                Minimum {GROUP_VISIT_MIN_PARTICIPANTS} people. Group Visits are designed for
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
                <p className="font-heading text-3xl font-bold text-navy">${GROUP_VISIT_NEW_PATIENT_PRICE}</p>
                <p className="mt-1 text-sm font-medium text-muted">per new patient</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="font-heading text-3xl font-bold text-navy">${GROUP_VISIT_EXISTING_PATIENT_PRICE}</p>
                <p className="mt-1 text-sm font-medium text-muted">per existing patient</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="font-heading text-3xl font-bold text-navy">
                  ${GROUP_VISIT_TRAVEL_FEE.standard}–${GROUP_VISIT_TRAVEL_FEE.premium}
                </p>
                <p className="mt-1 text-sm font-medium text-muted">travel fee per group</p>
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

          <div className="mt-8">
            <CTAButton href="/book-online">Schedule a visit →</CTAButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
