import type { Metadata } from "next";
import {
  Section,
  Container,
  PageHeader,
  CTAButton,
  H2,
  H3,
  P,
  Step,
  TagList,
  Callout,
} from "@/components/ui";
import { BUSINESS_PHONE } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "Touring Production Musculoskeletal Care | Philadelphia | GoChiroMobile",
  description:
    "On-site musculoskeletal care for touring artists, performers, cast, crew and production personnel in Philadelphia and Pennsylvania's Greater Philadelphia region.",
};

const WHO_WE_HELP = [
  "Artists & musicians",
  "Dancers & performers",
  "Cast",
  "Touring crew & stage personnel",
  "Audio, lighting & video personnel",
  "Merchandise teams",
  "Tour & production personnel",
];

const COMMON_NEEDS = [
  "Neck and shoulder discomfort",
  "Upper- and low-back discomfort",
  "General aches and stiffness",
  "Muscle tightness",
  "Restricted mobility",
  "Minor strains and overuse complaints",
];

export default function TouringProductionCarePage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <PageHeader
            eyebrow="Touring Productions & Live Events"
            title="On-Site Musculoskeletal Care for Touring Productions"
            lede="Philadelphia & the Greater Philadelphia Region — professional care brought directly to the production, helping reduce off-site travel and time away from the workday or show schedule."
          />
          <p className="mt-4 text-sm font-semibold text-muted">Currently available at Pennsylvania locations only.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/touring-production-care/request">Request Production Coverage</CTAButton>
            <CTAButton href={`tel:${BUSINESS_PHONE}`} variant="secondary">Need care today? Call / Text</CTAButton>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <H2>Care That Fits the Production</H2>
              <P>
                Touring can mean long travel days, repetitive work, prolonged standing or sitting, load-ins,
                performances and irregular schedules. Care can be arranged backstage, at a venue, hotel,
                rehearsal space or another appropriate production location.
              </P>
              <P>
                Coverage can be coordinated around load-in, rehearsal, soundcheck, performance preparation,
                breaks and other production demands.
              </P>
            </div>
            <Callout title="One person or an entire production window">
              <p className="text-base leading-relaxed text-muted">
                Arrange a private artist or crew callout, or reserve on-site coverage for multiple people.
                Longer, multi-day and special-event arrangements are available by quote.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <H2>Who We Help</H2>
          <P className="max-w-2xl">Touring care is not only for the person on stage. Physical demands exist throughout a production.</P>
          <TagList items={WHO_WE_HELP} />
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <H2>Common Reasons People Seek Care</H2>
          <P className="max-w-3xl">
            Not every backstage complaint is a major injury. Often it is the accumulation of travel and work:
            a stiff neck, sore shoulder, tight back or general aches that make an already demanding day harder.
          </P>
          <TagList items={COMMON_NEEDS} />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="max-w-3xl">
            <H2>Musculoskeletal Care — Not Just Chiropractic</H2>
            <P>
              Care is individualized to the person and may include joint mobilization or chiropractic manipulation,
              myofascial and soft-tissue techniques, mobility work and appropriate portable therapeutic modalities.
              Educational and follow-up materials can also be provided for managing mobility and symptoms after the
              production leaves the area.
            </P>
            <P>
              Additional wellness services, including massage therapy, may be coordinated for larger productions or
              special events when available.
            </P>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <H2>How It Works</H2>
          <div className="mt-10 max-w-3xl">
            <Step number={1} title="Tell us about the production">
              Send the date, venue or location, approximate number of people and preferred coverage window. You do not need to know exactly what type of coverage you need.
            </Step>
            <Step number={2} title="Intake can be completed from a phone">
              Once an engagement is confirmed, a private link or QR code can allow participating individuals to complete required intake, consent and acknowledgments before care begins.
            </Step>
            <Step number={3} title="We bring the equipment">
              Portable treatment and assessment equipment comes with the provider. A suitable treatment area, basic seating and access to an electrical outlet when required are generally all that is needed on site.
            </Step>
            <Step number={4} title="Choose the flow that fits the day">
              Coverage can use reserved appointment times, drop-in availability or a hybrid approach depending on the production schedule.
            </Step>
            <Step number={5} title="Care takes place on site">
              Individual visits are commonly around 15–20 minutes, although time varies with individual needs. A typical two-hour block can often accommodate approximately 6–8 people.
            </Step>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <H2>Flexible Coverage</H2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Callout title="Production Coverage" tone="white">
              <p className="text-base leading-relaxed text-muted">Reserve a provider for a defined period backstage or at another production location. Two-hour coverage is a common starting point, with longer arrangements available.</p>
            </Callout>
            <Callout title="Private Artist / Crew Callout" tone="white">
              <p className="text-base leading-relaxed text-muted">On-location care for one person at a venue, hotel or another appropriate location. Same-day requests may be accommodated when availability permits.</p>
            </Callout>
            <Callout title="Custom & Multi-Day" tone="white">
              <p className="text-base leading-relaxed text-muted">Rehearsals, theatrical runs, festivals, extended coverage and other special circumstances can be arranged individually.</p>
            </Callout>
          </div>
          <p className="mt-6 text-sm text-muted">Production coverage is quoted according to the requirements of the engagement.</p>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <H2>Philadelphia Is Our Hub. Touring Coverage Goes Further.</H2>
            <P>
              Touring-production coverage is currently available at Pennsylvania locations throughout Philadelphia,
              Delaware County, the Main Line, King of Prussia, Chester County and surrounding Pennsylvania areas.
              Productions outside GoChiroMobile&apos;s regular mobile-patient service area are encouraged to inquire.
            </P>
            <P>
              At this time, touring-production care is not available in New Jersey, Delaware or New York.
            </P>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="max-w-3xl">
            <H2>Experience in Live Production Environments</H2>
            <P>
              GoChiroMobile founder David DeFries, DC, is a third-generation chiropractor who has practiced since 2003.
              He has experience providing on-location care to performers, cast, crew and production personnel in
              Philadelphia live-event environments. The service is built around a simple principle: care has to fit
              the production, not the other way around.
            </P>
            <P>
              On-site care has been provided in Philadelphia live-production environments including The Fillmore Philadelphia,
              The Met Philadelphia, Union Transfer and Xfinity Mobile Arena.
            </P>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="max-w-3xl">
            <H2 onDark>Planning a Philadelphia-Area Tour Stop?</H2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Whether one person needs care or you want musculoskeletal services available to cast and crew, send the date, location and what you know so far. Artist identity is optional at the inquiry stage.
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
