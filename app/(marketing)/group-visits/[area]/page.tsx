import Image from "next/image";
import PageSearchSchema from "@/components/PageSearchSchema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Container, PageHeader, H2, P, CTAButton, Callout } from "@/components/ui";
import { GROUP_VISIT_MIN_PARTICIPANTS, GROUP_VISIT_MAX_PARTICIPANTS, GROUP_VISIT_NEW_PATIENT_SURCHARGE } from "@/lib/gochiro";

const AREAS = {
  standard: {
    title: "Group Chiropractic Visits in Delaware County",
    description: "Save on mobile chiropractic care by scheduling 2–6 people together at one Delaware County location.",
    label: "Delaware County",
    rates: [["2 people", "$50 each"], ["3–6 people", "$40 each"]],
  },
  premium: {
    title: "Group Chiropractic Visits in the Main Line & West Chester Area",
    description: "Save on mobile chiropractic care by scheduling 2–6 people together at one Main Line or West Chester-area location.",
    label: "Main Line & West Chester",
    rates: [["2 people", "$60 each"], ["3 people", "$55 each"], ["4–6 people", "$50 each"]],
  },
} as const;

export function generateStaticParams() { return Object.keys(AREAS).map((area) => ({ area })); }

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const data = AREAS[area as keyof typeof AREAS];
  if (!data) return {};
  return { alternates: { canonical: `/group-visits/${area}` }, title: `${data.title} — Go Chiro Mobile`, description: data.description };
}

export default async function GroupVisitsAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const data = AREAS[area as keyof typeof AREAS];
  if (!data) notFound();
  return <div><PageSearchSchema path={`/group-visits/${area}`} name={data.title} description={data.description} service={{ name: data.title, description: data.description, areas: [area === "standard" ? "Delaware County, Pennsylvania" : "Main Line and West Chester, Pennsylvania"] }} />
    <Section tone="white" className="pt-14 pb-10 sm:pt-20">
      <Container>
        <PageHeader eyebrow="Group Visits" title={data.title} lede="Share the visit. Save on the cost." />
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
          <Image src="/images/family-group-visit.webp" alt="A family sitting together at home" width={1080} height={1080} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full rounded-xl object-cover object-[center_75%]" />
          <div>
        <P className="max-w-2xl">
          Schedule {GROUP_VISIT_MIN_PARTICIPANTS}–{GROUP_VISIT_MAX_PARTICIPANTS} people together at one home or workplace. Group Visits are designed for routine, wellness-focused care and make mobile chiropractic care more economical when several people are seen at the same location.
        </P>
        <div className="mt-8"><CTAButton href="/book?start=group">Book a Group Visit</CTAButton></div>
          </div>
        </div>
      </Container>
    </Section>
    <Section tone="cream">
      <Container>
        <H2>{data.label} Group Pricing</H2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {data.rates.map(([group, price]) => <div key={group} className="rounded-2xl border border-line bg-white p-6"><p className="font-heading text-3xl font-bold text-navy">{price}</p><p className="mt-1 text-sm font-medium text-muted">{group}</p></div>)}
        </div>
        <P className="max-w-2xl">
          Each new patient adds ${GROUP_VISIT_NEW_PATIENT_SURCHARGE} to the group total because additional evaluation time is required. Saturday and Sunday Group Visits add $20 to the entire group total, not per person. Your exact total is shown before you book.
        </P>
      </Container>
    </Section>
    <Section tone="white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div><H2>How a Group Visit Works</H2><P>Choose the number of new and existing patients, select one location and an available time, and the scheduler calculates the visit length and complete group price.</P><P>Existing patients are generally scheduled for about 10 minutes each. New patients require about 20 minutes each for the additional evaluation.</P></div>
          <Callout title="Who Should Not Use a Group Visit?"><p className="text-base leading-relaxed text-muted">An existing patient with a new complaint or a significant worsening of an existing complaint should schedule the appropriate individual visit instead. Group Visits are not intended for acute injuries or problems requiring a more extensive individualized evaluation.</p></Callout>
        </div>
      </Container>
    </Section>
    <Section tone="cream">
      <Container>
        <H2>One Location. One Group Booking.</H2>
        <P className="max-w-2xl">Group Visits can take place at a home, workplace or other appropriate single location. The person making the reservation is the group host and is responsible for the full group total. Headcount may be reduced more than 24 hours before the visit and the total will be recalculated; within 24 hours, the original reserved group total remains due.</P>
        <div className="mt-6"><CTAButton href="/book?start=group">Check Availability & Group Total</CTAButton></div>
      </Container>
    </Section>
  </div>;
}
