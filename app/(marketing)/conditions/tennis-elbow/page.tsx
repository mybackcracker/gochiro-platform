import type { Metadata } from "next";
import { Section, Container, PageHeader, H2, P, Callout, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tennis Elbow | Mobile Chiropractic Care in Delaware County, PA",
  description: "Evaluation for outer elbow pain and gripping discomfort at your home or workplace in Delaware County, PA.",
  alternates: { canonical: "/conditions/tennis-elbow" },
};

export default function TennisElbowPage() {
  return (
    <>
      <Section tone="white">
        <Container narrow>
          <PageHeader eyebrow="Elbow and forearm" title="Tennis elbow: care at your location" lede="You do not need to play tennis to develop pain around the outside of an elbow. Gripping, lifting, tools, and repeated wrist or forearm movement can make everyday tasks uncomfortable." />
          <H2 className="mt-12">First, identify what is causing the pain</H2>
          <P>Outer elbow pain is often called tennis elbow, but that label alone is not a diagnosis. I ask about your work and activities, examine the elbow and nearby areas, and check whether the symptoms suggest a different problem that needs another type of care.</P>
          <P>If the findings fit care I can provide, the visit may include appropriate hands-on work, movement guidance, and a practical plan for activity between visits. I will explain when referral or another evaluation makes more sense.</P>
          <H2 className="mt-12">Individual care without another trip</H2>
          <P>I come to your home or workplace in the Delaware County service area. A new patient visit includes an evaluation and treatment when appropriate; the exact price and available times appear during scheduling.</P>
          <Callout title="A reason to call before booking" className="mt-10">
            <p className="leading-relaxed text-muted">If the pain began with a fall or other injury, or you have marked swelling, loss of movement, or persistent numbness or weakness, tell me before booking so we can discuss the appropriate next step.</p>
          </Callout>
        </Container>
      </Section>
      <Section tone="cream">
        <Container narrow>
          <H2>Get your elbow evaluated</H2>
          <P>Choose a first visit if you are new to the practice or have not been seen in more than a year. If you are already a patient, a new complaint still needs an individual evaluation.</P>
          <div className="mt-7 flex flex-wrap gap-4">
            <CTAButton href="/book?start=new">Schedule a first visit</CTAButton>
            <CTAButton href="/book?start=returning" variant="secondary">I&apos;m a returning patient</CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
