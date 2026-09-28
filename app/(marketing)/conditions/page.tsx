import Link from "next/link";
import type { Metadata } from "next";
import { conditions } from "@/lib/conditions";
import { Section, Container, PageHeader, ChoiceCard, H2, P, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conditions We Evaluate | GoChiroMobile",
  description: "Explore common concerns evaluated during mobile chiropractic visits in Delaware County, PA.",
  alternates: { canonical: "/conditions" },
};

export default function ConditionsPage() {
  return (
    <>
      <Section tone="white">
        <Container>
          <PageHeader eyebrow="Common concerns" title="What brings people to a mobile chiropractic visit?" lede="A specific problem may be what starts the conversation. Your history and examination determine whether chiropractic care is appropriate and what kind of visit makes sense." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {conditions.map((condition) => (
              <ChoiceCard key={condition.slug} title={condition.name} description={condition.summary} href={`/conditions/${condition.slug}`} cta="Learn about this concern" />
            ))}
          </div>
          <P>Don&apos;t see your concern here? You can still ask about an individual visit. A new or worsening problem deserves its own evaluation.</P>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <H2>Care brought to you in Delaware County</H2>
          <P>Dr. David DeFries brings the table and equipment to your home or workplace. Your address, visit price, and available times are shown during scheduling.</P>
          <div className="mt-7 flex flex-wrap gap-4">
            <CTAButton href="/book?start=new">Schedule a first visit</CTAButton>
            <Link href="/service-areas" className="self-center font-semibold text-navy underline underline-offset-4">Check your area</Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
