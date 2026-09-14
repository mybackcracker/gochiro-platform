import type { Metadata } from "next";
import { Section, Container, PageHeader, CTAButton, H2, P, Callout } from "@/components/ui";
import { BUSINESS_PHONE } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "Touring Care Approach | GoChiroMobile",
  description:
    "Learn how GoChiroMobile approaches acute complaints, corrective musculoskeletal care and education for touring artists, crew and production personnel.",
};

export default function TouringCareApproachPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <PageHeader
            eyebrow="Touring Production Care"
            title="A Practical Approach to Care on the Road"
            lede="Touring care is not one-size-fits-all. The immediate problem, the demands of the person's role, the production schedule and what comes next all shape the approach."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/touring-production-care/request">Request Production Coverage</CTAButton>
            <CTAButton href="/touring-production-care" variant="secondary">Back to Touring Care</CTAButton>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <H2>Three Priorities of Touring Care</H2>
            <P>
              Some people need help with a problem that appeared today. Others are dealing with the cumulative effects of travel,
              repetitive work, performance or long production days. Others primarily need practical guidance to help manage their
              body between stops. Care can emphasize one or more of the following priorities based on the individual situation.
            </P>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Callout title="Acute Care" tone="white">
              <p className="text-base leading-relaxed text-muted">
                Focused evaluation and appropriate care for a new or recently aggravated musculoskeletal complaint, with attention
                to what the person needs to do that day and whether referral or additional medical evaluation is appropriate.
              </p>
            </Callout>
            <Callout title="Corrective Care" tone="white">
              <p className="text-base leading-relaxed text-muted">
                When a problem is not simply a one-day flare-up, care can address mobility restrictions, joint and soft-tissue
                dysfunction and other mechanical factors that may be contributing to recurring discomfort or limited movement.
              </p>
            </Callout>
            <Callout title="Education & Self-Care" tone="white">
              <p className="text-base leading-relaxed text-muted">
                Simple mobility strategies, stretches, movement recommendations and other practical guidance can help people manage
                recurring demands between visits and after the production moves on to the next city.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <H2>Focused on Function, Not a Formula</H2>
              <P>
                The objective is not to deliver the same treatment to everyone. A performer preparing for a show, a crew member
                working through load-out and a production professional spending long hours at a workstation may have very different
                physical demands. Assessment and care are adapted accordingly.
              </P>
              <P>
                Care may include chiropractic manipulation or joint mobilization, myofascial and soft-tissue techniques, mobility
                work and appropriate portable therapeutic modalities when indicated by the individual presentation.
              </P>
            </div>
            <Callout title="When the problem needs more than on-site care">
              <p className="text-base leading-relaxed text-muted">
                Not every complaint belongs on a treatment table. Findings suggesting emergency care, imaging, medical evaluation
                or services outside the scope of chiropractic practice are referred appropriately. The goal is to help the person
                make the right next decision, not simply provide treatment.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <H2>Priority & Short-Notice Requests</H2>
            <P>
              Touring schedules change quickly. When a musculoskeletal problem develops unexpectedly, every reasonable effort is
              made to accommodate same-day and short-notice requests when scheduling and location permit. Productions with existing
              on-site coverage can also use that coverage window to address new complaints as they arise.
            </P>
            <P>This service is not a substitute for emergency medical care.</P>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="max-w-3xl">
            <H2 onDark>Need Care for an Upcoming Production?</H2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Tell us the date, location, approximate number of people and what you know so far. Short-notice requests are welcome when availability permits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/touring-production-care/request" variant="inverse">Request Production Coverage</CTAButton>
              <CTAButton href={`tel:${BUSINESS_PHONE}`} variant="inverseOutline">Call / Text {BUSINESS_PHONE}</CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
