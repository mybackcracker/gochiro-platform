import Image from "next/image";
import PageSearchSchema from "@/components/PageSearchSchema";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Section, Container, PageHeader } from "@/components/ui";

const url = "https://www.gochiromobile.com/philadelphia/hotel-visits";
export const metadata: Metadata = {
  title: "Mobile Chiropractor for Philadelphia Hotel Guests & Travelers",
  description: "Mobile musculoskeletal and chiropractic care brought to your Philadelphia hotel. Personalized care for pain and mobility, with visits by arrangement.",
  alternates: { canonical: url },
};

const treatments = [
  { title: "Chiropractic manipulation & mobilization", text: "Hands-on joint care, including gentle mobilization, selected according to your examination and comfort." },
  { title: "Soft tissue therapy", text: "Focused treatment for muscle tension and soft tissue discomfort that may affect how you move." },
  { title: "Electrotherapy", text: "An additional treatment option when appropriate for your symptoms and examination." },
  { title: "Mobility & self-care", text: "Guided stretching, mobility exercises and practical advice to support movement during your stay and after you leave." },
];

function VisitActions() {
  return <div className="flex flex-col gap-3 sm:flex-row">
    <a href="sms:+16104940412" className="rounded-xl bg-navy px-6 py-3 text-center font-semibold text-white">Text for Same-Day Availability</a>
    <Link href="/check-your-location" className="rounded-xl bg-navy px-6 py-3 text-center font-semibold text-white">Request a Visit</Link>
  </div>;
}

export default function Page() {
  return <><PageSearchSchema path={"/philadelphia/hotel-visits"} name={"Mobile Chiropractor for Philadelphia Hotel Guests & Travelers"} description={"Mobile musculoskeletal and chiropractic care brought to your Philadelphia hotel. Personalized care for pain and mobility, with visits by arrangement."} /><>
    <Section tone="white">
      <Container>
        <div className="space-y-8">
          <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Mobile chiropractic care for Philadelphia hotel guests", serviceType: "Mobile musculoskeletal and chiropractic care", areaServed: { "@type": "City", name: "Philadelphia" }, provider: { "@id": "https://www.gochiromobile.com/#organization" }, url }} />
          <PageHeader eyebrow="Philadelphia hotel guests & travelers" title="Musculoskeletal Care Brought to Your Hotel" lede="Focused care for pain relief and improved movement, without a trip to an unfamiliar office. Go Chiro Mobile brings personalized evaluation and treatment directly to your Philadelphia hotel, with visits available by arrangement." />
          <figure><Image src="/images/philadelphia-hotel-care.webp" alt="Illustrative portable chiropractic treatment table set up in a hotel room overlooking Philadelphia" width={1536} height={1024} sizes="(min-width: 1200px) 1200px, 100vw" className="w-full rounded-xl" /><figcaption className="mt-2 text-sm text-muted">Illustration of a mobile care setup in a Philadelphia hotel room.</figcaption></figure>
          <VisitActions />
          <p className="max-w-3xl leading-relaxed text-muted">Dr. David DeFries is one of the few exclusively mobile chiropractic providers in the Philadelphia region. His experience includes on-site care for performers and touring crews at Philadelphia venues, as well as care in homes and workplaces, with discretion and privacy respected.</p>
        </div>
      </Container>
    </Section>
    <Section tone="cream">
      <Container>
        <div className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-3xl font-bold">Personalized care while you’re away</h2>
            <p className="leading-relaxed">Back pain, neck pain, muscle tension or stiffness can interfere with a work trip or a visit to Philadelphia. Whether you have never seen a chiropractor or want to maintain care while traveling, your visit starts with a discussion of your symptoms, health history and goals, followed by an examination.</p>
            <p className="leading-relaxed">Treatment may combine chiropractic manipulation, soft tissue therapy, electrotherapy and mobility work. The combination depends on your needs and examination, with attention to comfort, function and ongoing wellness.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">{treatments.map(treatment => <article key={treatment.title} className="rounded-2xl border border-line bg-white p-6"><h3 className="font-heading text-xl font-bold">{treatment.title}</h3><p className="mt-3 leading-relaxed text-muted">{treatment.text}</p></article>)}</div>
        </div>
      </Container>
    </Section>
    <Section tone="white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="font-heading text-3xl font-bold">Arrange chiropractic care at your hotel</h2>
            <p className="leading-relaxed">For same-day chiropractic visits, text <a href="sms:+16104940412" className="font-semibold underline">610-494-0412</a> with your hotel name and address. Same-day availability is confirmed individually and may carry a higher fee. If your timing is flexible, use the visit-request form.</p>
            <p className="leading-relaxed">Visits outside our regular service area are quoted individually based on location, travel, and care needed, with the full price confirmed before booking.</p>
            <p className="leading-relaxed">Submitting a request does not book an appointment or require payment. Once your visit is accepted, a deposit of at least 50% of the quoted total is required to confirm and is credited toward your visit. Cancellation with less than 24 hours’ notice or a no-show forfeits the deposit. The request page explains the full terms before you proceed.</p>
            <VisitActions />
          </div>
          <div className="rounded-2xl bg-cream p-6 sm:p-8 space-y-5">
            <h2 className="font-heading text-3xl font-bold">For concierges & guest-services teams</h2>
            <p className="leading-relaxed">Give guests a local resource for mobile care for muscle and joint pain. You can share this page or our phone number so guests can discuss their needs, availability and fees directly with the practice.</p>
            <p className="leading-relaxed">There is no need for your team to collect medical details or arrange payment. To discuss including Go Chiro Mobile in your local guest resources, call or text <a href="tel:+16104940412" className="font-semibold underline">610-494-0412</a>.</p>
            <p className="leading-relaxed">Looking for employee care? Explore <Link href="/philadelphia/workplace" className="font-semibold underline">Philadelphia workplace visits</Link>. For artists and crew, see <Link href="/touring-production-care" className="font-semibold underline">touring and production care</Link>.</p>
          </div>
        </div>
        <Link href="/philadelphia" className="mt-10 inline-block font-semibold underline">Explore Philadelphia care</Link>
      </Container>
    </Section>
  </></>;
}
