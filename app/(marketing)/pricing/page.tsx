import type { Metadata } from "next";
import { ArticleShell, H2, P, CTAButton } from "@/components/ui";
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
    <ArticleShell
      eyebrow="Pricing"
      title="Chiropractic Visit Pricing"
      lede="Know what your visit costs before you book."
    >
      <P>
        GoChiroMobile is primarily a self-pay practice. Your exact price is shown during
        scheduling before you confirm your appointment.
      </P>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-sm font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Visit</th>
              <th className="px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-lg">
            {PRICED_VISITS.map((v) => (
              <tr key={v}>
                <td className="px-4 py-3 font-medium text-slate-900">{VISITS[v].label}</td>
                <td className="px-4 py-3 text-slate-700">{priceRange(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>Price depends on your location — travel is part of a mobile visit.</P>

      <H2>Group Visits</H2>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-slate-700">
        <li>${GROUP_VISIT_NEW_PATIENT_PRICE} per new patient</li>
        <li>${GROUP_VISIT_EXISTING_PATIENT_PRICE} per existing patient</li>
        <li>
          ${GROUP_VISIT_TRAVEL_FEE.standard}–${GROUP_VISIT_TRAVEL_FEE.premium} travel fee per
          group, depending on location
        </li>
      </ul>
      <P>
        Minimum {GROUP_VISIT_MIN_PARTICIPANTS} people. Group Visits are designed for
        wellness-focused chiropractic care and are not intended for acute injuries, significant
        new complaints, or chronic problems requiring individualized evaluation and treatment.
      </P>
      <P>
        The host is responsible for the total group fee. Your complete total is shown before
        booking.
      </P>
      <div className="mt-4">
        <CTAButton href="/book?start=group">Book a Group Visit</CTAButton>
      </div>

      <H2>Payment</H2>
      <P>Cash, check, credit card, HSA/FSA and Venmo are accepted.</P>

      <H2>Insurance</H2>
      <P>Routine visits are self-pay and are not billed to insurance.</P>
      <P>
        Motor-vehicle accident and work-injury visits may be billed through the applicable
        insurance or claim.
      </P>

      <div className="mt-10">
        <CTAButton href="/book-online">Schedule a visit →</CTAButton>
      </div>
    </ArticleShell>
  );
}
