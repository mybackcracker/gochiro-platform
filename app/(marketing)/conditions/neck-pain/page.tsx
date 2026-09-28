import type { Metadata } from "next";
import { Section, Container, PageHeader, H2, P, Callout, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Neck Pain | Mobile Chiropractic Care in Delaware County, PA",
  description: "An individual evaluation for neck pain or stiffness at your home or workplace in Delaware County, PA, with Dr. David DeFries.",
  alternates: { canonical: "/conditions/neck-pain" },
};

export default function NeckPainPage() {
  return (
    <>
      <Section tone="white">
        <Container narrow>
          <PageHeader eyebrow="Neck pain" title="Neck pain care that comes to you" lede="When turning your head, working at a desk, or getting through the day becomes uncomfortable, an individual visit can help clarify what is going on and what to do next." />
          <H2 className="mt-12">We start with an evaluation</H2>
          <P>Neck symptoms can have different causes. I ask about how they began, how they affect your movement and daily activities, and whether you have symptoms into an arm or hand. I examine the areas relevant to your complaint before recommending care.</P>
          <P>When appropriate, your visit may include hands-on treatment, movement work, and guidance for between visits. The plan depends on the findings; an adjustment is not automatic or the same for everyone.</P>
          <H2 className="mt-12">A visit at your location</H2>
          <P>I bring the treatment table and equipment to your home or workplace in the Delaware County service area. New patients receive an evaluation with treatment when appropriate. The scheduler confirms your address, price, and available times before you book.</P>
          <Callout title="When to seek medical attention" className="mt-10">
            <p className="leading-relaxed text-muted">Seek prompt medical care for rapidly worsening weakness, severe or increasing numbness, trouble walking, fever with significant neck pain, or symptoms after a serious injury. If you are unsure whether a house call is appropriate, call or text before booking.</p>
          </Callout>
        </Container>
      </Section>
      <Section tone="cream">
        <Container narrow>
          <H2>Ready to discuss your neck pain?</H2>
          <P>Choose a first visit if you are new to the practice or have not been seen in more than a year. Returning patients with a new or worsening concern should select an individual visit that allows for evaluation.</P>
          <div className="mt-7 flex flex-wrap gap-4">
            <CTAButton href="/book?start=new">Schedule a first visit</CTAButton>
            <CTAButton href="/book?start=returning" variant="secondary">I&apos;m a returning patient</CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
