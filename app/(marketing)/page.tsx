import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Section,
  Container,
  Eyebrow,
  H1,
  H2,
  Lede,
  P,
  CTAButton,
  ChoiceCard,
  Step,
  TagList,
  TwoColumn,
  ImageFrame,
} from "@/components/ui";
import ZipChecker from "@/components/ZipChecker";
import { BUSINESS_PHONE } from "@/lib/gochiro";
import { HOME_VISIT_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: "GoChiroMobile — Chiropractic Care That Comes to You",
  description:
    "Dr. David DeFries provides one-on-one chiropractic care in your home, workplace, or other convenient location.",
};

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero — the photo renders first in source order (no order-* classes) so
          mobile/tablet (single-column, below lg) shows it immediately below the header,
          with the headline/lede/CTA beneath; the same DOM order naturally gives the
          image-left/text-right two-column layout at desktop via lg:grid-cols-2. Hand-rolled
          rather than TwoColumn so the 16:9 hero aspect ratio stays scoped to the hero and
          doesn't affect other TwoColumn/ImageFrame usage. */}
      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <ImageFrame className="aspect-video">
                <Image
                  src={HOME_VISIT_IMAGE.src}
                  alt={HOME_VISIT_IMAGE.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageFrame>
            </div>
            <div>
              <H1>Chiropractic Care That Comes to You</H1>
              <Lede className="mt-5">
                Dr. David DeFries provides one-on-one chiropractic care in your home, workplace, or
                other convenient location.
              </Lede>
              <P>
                Serving Delaware County, parts of Chester County and the Main Line, with special
                visits and events available in Philadelphia and surrounding areas.
              </P>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTAButton href="#service-area">Check My Area</CTAButton>
                <CTAButton href="/book-online" variant="secondary">
                  Schedule a Visit
                </CTAButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Ready to Schedule? */}
      <Section tone="cream">
        <Container>
          <div className="text-center">
            <H2>Ready to Schedule?</H2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <ChoiceCard
              title="New Patient"
              description="First visit — or haven't been seen in more than a year."
              href="/book?start=new"
              cta="Schedule a First Visit"
            />
            <ChoiceCard
              title="Returning Patient"
              description="Already a patient and have been seen within the past year."
              href="/book?start=returning"
              cta="Schedule a Visit"
            />
            <ChoiceCard
              title="Group Visit"
              description="Wellness-focused chiropractic care for two or more people at one location."
              href="/book?start=group"
              cta="Schedule a Group Visit"
            />
          </div>
        </Container>
      </Section>

      {/* 3. Chiropractic Care Without the Trip */}
      <Section tone="white" id="how-it-works" className="scroll-mt-20">
        <Container>
          <H2>Chiropractic Care Without the Trip</H2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            <Step number={1} title="Schedule online" orientation="horizontal">
              Choose your visit and an available appointment time.
            </Step>
            <Step number={2} title="I come to you" orientation="horizontal">
              I bring the table and equipment needed for your visit.
            </Step>
            <Step number={3} title="Get evaluated and treated at your location" orientation="horizontal">
              Your visit includes appropriate evaluation and treatment without the drive or waiting
              room.
            </Step>
          </div>
          <Link
            href="/what-to-expect"
            className="mt-10 inline-flex items-center gap-1.5 font-semibold text-navy hover:underline"
          >
            What to Expect <span aria-hidden>→</span>
          </Link>
        </Container>
      </Section>

      {/* 4. Conditions Snapshot */}
      <Section tone="cream" id="conditions" className="scroll-mt-20">
        <Container>
          <H2>Common problems we help with</H2>
          <TagList items={["Back pain", "Neck pain", "Headaches", "Sciatica", "Joint pain", "Sports injuries"]} />
        </Container>
      </Section>

      {/* 5. Confirm Your Service Area */}
      <Section tone="navy" id="service-area" className="scroll-mt-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Eyebrow onDark>Service Area</Eyebrow>
            <H2 onDark className="mt-3">
              Do we come to you?
            </H2>
            <div className="mt-8 text-left">
              <ZipChecker />
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Meet Dr. David DeFries */}
      <Section tone="white" className="pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <TwoColumn
            reverse
            media={
              <ImageFrame className="aspect-[4/3] mx-auto max-w-md lg:mx-0 lg:max-w-none">
                <Image
                  src={DOCTOR_PORTRAIT_IMAGE.src}
                  alt={DOCTOR_PORTRAIT_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageFrame>
            }
          >
            <Eyebrow>Meet the Doctor</Eyebrow>
            <H2 className="mt-3">Meet Dr. David DeFries</H2>
            <P>
              Dr. David DeFries is a third-generation chiropractor who has been practicing since
              2003. He graduated from Parker College of Chiropractic and is a licensed Doctor of
              Chiropractic in Pennsylvania.
            </P>
            <Link href="/about" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy hover:underline">
              Meet Dr. DeFries <span aria-hidden>→</span>
            </Link>
          </TwoColumn>
        </Container>
      </Section>

      {/* 7. Closing CTA */}
      <Section tone="navy">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <H2 onDark>Chiropractic Care, Without the Trip to Get It.</H2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <CTAButton href="/book-online" variant="inverse">
                Schedule a Visit
              </CTAButton>
              <a href={`tel:${BUSINESS_PHONE}`} className="text-base font-semibold text-white hover:underline">
                Call or text {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
