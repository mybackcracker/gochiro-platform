import Link from "next/link";
export default function LocationRequestCTA() {
  return <div className="space-y-4 text-base leading-relaxed">
    <p>Visits outside our regular service area are quoted individually based on location, travel, and care needed, with the full price confirmed before booking.</p>
    <p><strong>Hoping to be seen today?</strong> <a className="font-semibold underline" href="sms:+16104940412">Text 610-494-0412</a> with your visit address and parking or building-access details. Availability is confirmed individually.</p>
    <p><strong>Flexible on timing?</strong> Submit your location for review.</p>
    <Link href="/check-your-location" className="inline-block rounded-lg bg-apricot px-6 py-3 font-bold text-navy hover:bg-apricot-light">Request a Visit</Link>
    <p className="text-sm">A request does not book an appointment. Accepted visits require a deposit to confirm.</p>
  </div>;
}
