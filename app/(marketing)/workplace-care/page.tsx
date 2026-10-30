import Link from "next/link";
import type { Metadata } from "next";
import PageSearchSchema from "@/components/PageSearchSchema";
import { Section, Container, PageHeader, H2, H3, P, Callout } from "@/components/ui";

const title = "Workplace Musculoskeletal & Chiropractic Care | Go Chiro Mobile";
const description = "Onsite individual chiropractic and musculoskeletal appointments for office, warehouse, trades and production teams in Delaware County. Local one-hour blocks start at $200.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/workplace-care" },
};

const inquiryEmail = "mailto:contact@gochiromobile.com?subject=Workplace%20treatment%20session%20inquiry";

export default function WorkplaceCarePage() {
  return (
    <>
      <PageSearchSchema
        path="/workplace-care"
        name={title}
        description={description}
        service={{
          name: "Onsite workplace musculoskeletal and chiropractic care",
          description: "Individual onsite care by arrangement for employees at one Pennsylvania workplace location.",
          areas: ["Delaware County, Pennsylvania", "Southeastern Pennsylvania"],
        }}
      />
      <Section tone="white" className="pt-14 pb-12 sm:pt-20">
        <Container>
          <PageHeader
            eyebrow="Onsite care for employees and crews"
            title="Musculoskeletal care, brought to your workplace."
            lede="Reserved treatment sessions for offices, warehouses, trades, staging and production crews—so employees can receive individualized care without driving to another appointment."
          />
          <P className="max-w-3xl">
            Dr. David DeFries brings portable treatment equipment to a suitable private space at your workplace. Appointments may include a focused musculoskeletal assessment, chiropractic adjustments, soft-tissue care and movement recommendations when clinically appropriate. Care is based on each patient&apos;s individual needs.
          </P>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={inquiryEmail} className="inline-flex items-center justify-center rounded-lg bg-apricot px-6 py-3.5 font-semibold text-navy hover:bg-apricot-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2">
              Request a workplace session
            </a>
            <a href="tel:+16104940412" className="inline-flex items-center justify-center rounded-lg border border-navy/30 px-6 py-3.5 font-semibold text-navy hover:bg-navy/5">
              Call or text 610-494-0412
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            Sessions are arranged individually; this is an inquiry, not an instant booking or payment portal.
          </p>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <H2>Simple, transparent local pricing</H2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-heading text-3xl font-bold text-navy">$200</p>
              <H3 className="mt-3">One-hour minimum</H3>
              <p className="mt-2 text-sm leading-relaxed text-muted">Reserved treatment block at a local Delaware County workplace.</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-heading text-3xl font-bold text-navy">$50</p>
              <H3 className="mt-3">Initial appointment</H3>
              <p className="mt-2 text-sm leading-relaxed text-muted">Approximately 15 minutes, when an appropriate abbreviated visit is clinically suitable.</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-heading text-3xl font-bold text-navy">$40</p>
              <H3 className="mt-3">Returning appointment</H3>
              <p className="mt-2 text-sm leading-relaxed text-muted">Approximately 10 minutes for an established patient needing routine care.</p>
            </div>
          </div>
          <P className="max-w-3xl">
            Individual appointment payments count toward the $200 reserved-block minimum; the minimum is <strong>not an additional charge</strong>. Employees may reserve and prepay, or the employer may sponsor the session or cover any shortfall. Additional treatment time is $100 per 30 minutes, when arranged in advance.
          </P>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            The local rate applies to suitable, easy-access locations within Delaware County. Other Pennsylvania locations, Philadelphia venues, travel, parking or special access requirements are quoted before anyone commits. The reserved time is fixed; late arrivals or missed appointments do not extend it.
          </p>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <H2>How a workplace session works</H2>
              <ol className="mt-6 space-y-5">
                <li><strong>1. Discuss your location.</strong> We confirm the address, access, a private treatment space and a practical time when staff are together.</li>
                <li><strong>2. Arrange employee appointments.</strong> We coordinate advance sign-ups, private patient intake and payment directly. This step is handled by arrangement rather than through the family group booking tool.</li>
                <li><strong>3. Confirm the treatment block.</strong> Once the $200 local minimum is funded or guaranteed by a sponsor, and the cancellation terms are agreed upon, the session is confirmed.</li>
                <li><strong>4. Provide individualized care.</strong> Employees are seen in their scheduled time slots. More complicated or acute problems may require a separate full evaluation or referral.</li>
              </ol>
            </div>
            <div className="space-y-5">
              <Callout title="No required employer sponsorship">
                <p className="text-base leading-relaxed text-muted">
                  A business can simply provide a suitable space and help interested staff learn about the opportunity. Employees may fund the session through their prepaid individual appointments.
                </p>
              </Callout>
              <Callout title="HSA and healthcare FSA">
                <p className="text-base leading-relaxed text-muted">
                  Chiropractic treatment for qualifying medical care is generally an eligible expense, subject to the employee&apos;s plan and substantiation requirements. Purely general wellness services may not qualify. Itemized treatment receipts can be supplied.
                </p>
              </Callout>
              <Callout title="Patient privacy">
                <p className="text-base leading-relaxed text-muted">
                  Go Chiro Mobile handles clinical intake and treatment information privately. An employer or building manager receives scheduling logistics, not individual medical details.
                </p>
              </Callout>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <H2>Start with one session</H2>
          <P className="max-w-3xl">
            There is no required recurring contract. To explore a trial session, share the workplace city or address, approximate number of interested employees and a preferred day or time. We will review suitability and give you the full quote and arrangements before you decide.
          </P>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href={inquiryEmail} className="inline-flex items-center justify-center rounded-lg bg-apricot px-6 py-3.5 font-semibold text-navy hover:bg-apricot-light">Email about a workplace session</a>
            <Link href="/group-visits" className="inline-flex items-center justify-center rounded-lg border border-navy/30 px-6 py-3.5 font-semibold text-navy hover:bg-navy/5">Compare group visit options</Link>
          </div>
          <p className="mt-5 text-sm text-muted">Go Chiro Mobile currently provides chiropractic treatment in Pennsylvania. Locations outside the normal local area are reviewed individually.</p>
        </Container>
      </Section>
    </>
  );
}
