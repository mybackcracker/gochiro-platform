import type { Metadata } from "next";
import PageSearchSchema from "@/components/PageSearchSchema";
import { Section, Container, PageHeader, CTAButton, H2, P, Step, TagList, Callout } from "@/components/ui";
import { BUSINESS_PHONE, PUBLIC_CONTACT_EMAIL } from "@/lib/gochiro";

const TITLE = "On-Set Chiropractor in Philadelphia | Go Chiro Mobile";
const DESCRIPTION = "On-set chiropractic care for film and TV cast and crew in Delaware County and nearby communities; Philadelphia and other locations by arrangement.";
const REQUEST_URL = "/touring-production-care/request";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/film-tv-production-care" },
};

export default function FilmTVProductionCarePage() {
  return (
    <>
      <PageSearchSchema
        path="/film-tv-production-care"
        name={TITLE}
        description={DESCRIPTION}
        service={{
          name: "On-set chiropractic care for film and television productions",
          description: DESCRIPTION,
          areas: ["Philadelphia, Pennsylvania", "Delaware County and surrounding communities"],
        }}
      />
      <div>
        <Section tone="white" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
          <Container>
            <PageHeader
              eyebrow="Film & TV Productions"
              title="On-Set Chiropractic Care for Film & TV Productions"
              lede="Go Chiro Mobile brings personalized musculoskeletal and chiropractic care to cast and crew at studios and filming locations. Coverage is arranged around your production’s location, schedule and individual care needs."
            />
            <p className="mt-4 text-sm font-semibold text-muted">Serving Delaware County and surrounding communities, with additional locations available by arrangement. Philadelphia visits are available by arrangement.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={REQUEST_URL}>Request Production Coverage</CTAButton>
              <CTAButton href="sms:+16104940412" variant="secondary">Text About Production Care</CTAButton>
            </div>
          </Container>
        </Section>

        <Section tone="cream">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <H2>Care That Fits the Production</H2>
                <P>Long periods standing, carrying equipment, repetitive work and demanding schedules can leave people dealing with pain, stiffness or difficulty moving.</P>
                <P>Dr. David DeFries, DC provides one-on-one evaluation and appropriate care on location. The focus is on symptoms, movement, function and practical recommendations for ongoing care.</P>
              </div>
              <Callout title="One person or a production coverage window">
                <p className="text-base leading-relaxed text-muted">Arrange a visit for one person or reserve a coverage window for multiple people. Early-morning and late-night production visits can be arranged, subject to availability. Same-day and short-notice requests may be accommodated when scheduling and location permit.</p>
              </Callout>
            </div>
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <H2>For Cast and Crew</H2>
            <TagList items={["Cast & performers", "Camera personnel", "Lighting & electrical crews", "Sound teams", "Production staff", "Other crew members"]} />
          </Container>
        </Section>

        <Section tone="cream">
          <Container>
            <div className="max-w-3xl">
              <H2>Individualized Musculoskeletal Care</H2>
              <P>Care may include chiropractic manipulation or mobilization, soft tissue techniques, guided movement and portable therapeutic modalities, depending on the examination findings.</P>
              <div className="mt-6"><CTAButton href="/touring-production-care/care-approach" variant="secondary">Explore Our Care Approach</CTAButton></div>
            </div>
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <div className="max-w-3xl">
              <H2>Experience With Performers and Crew</H2>
              <P>Dr. David DeFries, DC is a third-generation chiropractor who has practiced since 2003. He has experience providing on-location care to performers and crew in Philadelphia live-production settings.</P>
              <P>Go Chiro Mobile extends that approach to film and television productions: individualized care brought to the people who need it, at an appropriate production location.</P>
              <div className="mt-6"><CTAButton href="/touring-production-care" variant="secondary">Explore Touring & Live Production Care</CTAButton></div>
            </div>
          </Container>
        </Section>

        <Section tone="cream">
          <Container>
            <div className="max-w-3xl">
              <H2>A Practical On-Site Setup</H2>
              <P>Care can take place in a suitable common area, with a private treatment area provided when requested.</P>
              <P>Allow room for a portable treatment table, a chair, and access to an electrical outlet when needed. Dr. DeFries brings the treatment table and equipment needed for the arranged care.</P>
              <P>Location access and treatment-space arrangements can be discussed before the visit.</P>
            </div>
          </Container>
        </Section>

        <Section tone="white">
          <Container>
            <div className="max-w-3xl">
              <H2>Privacy and Discretion</H2>
              <P>Patient information, treatment details and production information are handled discreetly. Care can be coordinated within established production protocols, including confidentiality requirements and NDAs when applicable.</P>
              <P>Patients, performers and productions are not used for promotional purposes without appropriate permission.</P>
            </div>
          </Container>
        </Section>

        <Section tone="cream">
          <Container>
            <H2>How It Works</H2>
            <div className="mt-10 max-w-3xl">
              <Step number={1} title="Tell us about the production">Send your production date, location, preferred coverage hours and approximate number of people seeking care. Artist or production identity is optional at the inquiry stage.</Step>
              <Step number={2} title="Arrange the coverage">We’ll discuss availability, location access and treatment-space needs. Coverage and pricing are quoted according to the requirements of the engagement.</Step>
              <Step number={3} title="Complete intake privately">Individual intake and care information are collected separately from the production inquiry.</Step>
              <Step number={4} title="Care takes place on location">Dr. DeFries brings the equipment for the arranged care. Each person’s evaluation helps determine the appropriate care.</Step>
            </div>
          </Container>
        </Section>

        <Section tone="navy">
          <Container>
            <div className="max-w-3xl">
              <H2 onDark>Arrange Film & TV Production Coverage</H2>
              <P onDark>Send the date, location and coverage window you have in mind. We’ll follow up about availability and the arrangements that fit your production.</P>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href={REQUEST_URL} variant="inverse">Request Production Coverage</CTAButton>
                <CTAButton href="sms:+16104940412" variant="inverseOutline">Text About Production Care</CTAButton>
              </div>
              <p className="mt-6 text-base text-white"><a href={`tel:${BUSINESS_PHONE}`} className="underline">Call {BUSINESS_PHONE}</a> · <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="underline">{PUBLIC_CONTACT_EMAIL}</a></p>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
