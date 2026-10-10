import Link from "next/link";
import { H2 } from "@/components/ui";
import { BUSINESS_HOURS, VISITS, type VisitType } from "@/lib/gochiro";

const INDIVIDUAL_VISITS: VisitType[] = [
  "new-patient", "maintenance", "priority-standard", "priority-upgraded", "care-plan",
];
const weekdayPrices = INDIVIDUAL_VISITS.flatMap((visit) => {
  const { standard, premium } = VISITS[visit];
  return [standard, premium].filter((price): price is number => price !== null);
});
const hoursRows = [
  { day: "Monday–Thursday", hours: BUSINESS_HOURS[0].hours },
  ...BUSINESS_HOURS.slice(4),
];

export default function VisitHoursPricing() {
  return (
    <div className="mt-10 border-t border-line pt-8">
      <H2>Visit Hours &amp; Pricing</H2>
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="font-heading text-lg font-bold text-ink">Appointment Hours</h3>
          <table className="mt-3 w-full text-left text-base text-muted" aria-label="Appointment hours">
            <tbody className="divide-y divide-line">
              {hoursRows.map(({ day, hours }) => (
                <tr key={day}>
                  <th scope="row" className="w-36 py-3 pr-4 align-top font-semibold text-ink">{day}</th>
                  <td className="py-3 align-top">{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-ink">Visit Pricing</h3>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Within our regular online booking area, weekday individual visits range from ${Math.min(...weekdayPrices)}–${Math.max(...weekdayPrices)}.
            {" "}New patient visits range from ${VISITS["new-patient"].standard}–${VISITS["new-patient"].premium}.
            {" "}Weekend pricing differs; your exact price is shown before booking.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">Visits outside the regular online booking area are quoted individually for care and travel. A deposit is required to confirm an accepted appointment.</p>
          <Link href="/pricing" className="mt-4 inline-block font-semibold text-navy underline underline-offset-4">
            See pricing by visit type
          </Link>
        </div>
      </div>
    </div>
  );
}
