import Link from "next/link";
import type { Metadata } from "next";
import PageSearchSchema from "@/components/PageSearchSchema";
import { Section, Container, PageHeader, H2, P, ChoiceCard, CTAButton } from "@/components/ui";

const title = "Group Chiropractic Visits | Go Chiro Mobile";
const description = "Compare small family group visits with reserved workplace chiropractic treatment blocks in Delaware County, Pennsylvania.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/group-visits" },
};

export default function GroupVisitsPage() {
  return (
    <>
      <PageSearchSchema path="/group-visits" name={title} description={description} type="CollectionPage" />
      <Section tone="white" className="pt-14 pb-12 sm:pt-20">
        <Container>
          <PageHeader
            eyebrow="Group visits"
            title="One location. Care arranged for your group."
            lede="There are two different ways to arrange several chiropractic appointments at one location. Choose the option that fits your group."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ChoiceCard
              title="Family & small-group visits"
              description="Two to six people together at one home or other suitable location for routine, wellness-focused care. One host books and is responsible for the group fee. Pricing depends on group size, new patients and location."
              href="/group-visits/standard"
              cta="See small-group options"
              emphasizeCta
            />
            <ChoiceCard
              title="Workplace & crew treatment blocks"
              description="Scheduled individual appointments for employees at offices, shops, warehouses and production facilities. Local Delaware County blocks start at a $200 one-hour minimum; eligible employee appointment payments count toward it."
              href="/workplace-care"
              cta="Explore workplace sessions"
              emphasizeCta
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Workplace sessions are arranged directly with Go Chiro Mobile and are not booked through the regular family group scheduler.
          </p>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <H2>For families and small groups</H2>
          <P className="max-w-2xl">
            Our regular group scheduler prices two to six people at the same address and shows the total before booking. A group host coordinates and pays the total. These visits are intended for routine, wellness-focused care; injuries or significant new concerns may need a separate evaluation.
          </P>
          <div className="mt-6 flex flex-wrap gap-4">
            <CTAButton href="/group-visits/standard">Delaware County group pricing</CTAButton>
            <CTAButton href="/group-visits/premium" variant="secondary">Main Line / West Chester pricing</CTAButton>
          </div>
          <p className="mt-6 text-sm text-muted">For an individual booking, use <Link className="font-semibold underline" href="/book-online">regular online scheduling</Link>.</p>
        </Container>
      </Section>
      <Section tone="white">
        <Container>
          <H2>For employers and organized crews</H2>
          <P className="max-w-2xl">
            A shop, office, production warehouse or other employer can request a reserved treatment window. We arrange a private space, appointment times and individual intake ahead of the visit. The employer can sponsor the minimum or participating employees can fund it through their prepaid appointments.
          </P>
          <div className="mt-6"><CTAButton href="/workplace-care">How workplace sessions work</CTAButton></div>
        </Container>
      </Section>
    </>
  );
}
