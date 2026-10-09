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
import { BUSINESS_PHONE, BUSINESS_SERVICE_AREA } from "@/lib/gochiro";
import { HOME_VISIT_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/businessSchema";
import { LOCAL_AREAS } from "@/lib/localAreas";
import VisitHoursPricing from "@/components/VisitHoursPricing";

export const metadata: Metadata = {
  title: "Mobile Chiropractor in the Greater Philadelphia Region",
  description:
    "Go Chiro Mobile brings chiropractic care to your home or workplace in Delaware County, parts of Chester County and the Main Line, PA.",
};

export default function HomePage() {
  return (
    <div>
      <JsonLd data={localBusinessSchema(Object.values(LOCAL_AREAS))} />
      <div className="bg-navy text-white">
        <Container>
          <div className="flex flex-col items-center justify-center gap-2 py-3 text-center sm:flex-row sm:gap-3">
            <p className="text-sm font-semibold sm:text-base">
              Now available 7 days a week — including Saturday & Sunday appointments.
            </p>
            <Link
              href="/book-online"
              className="shrink-0 text-sm font-bold text-white underline underline-offset-4 hover:no-underline sm:text-base"
            >
              Schedule a Visit →
            </Link>
          </div>
        </Container>
      </div>

      <Section tone="white" className="pb-14 pt-12 sm:pb-20 sm:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="order-2 lg:order-1">
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
            <div className="order-1 lg:order-2">
              <H1>Personalized Chiropractic Care, Brought to You</H1>
              <Lede className="mt-5">
                Whether you’re considering chiropractic for the first time or looking for a more
                individualized approach, Dr. David DeFries, DC provides one-on-one care focused on
                your symptoms, movement and personal goals.
              </Lede>
              <P>
                Visits take place at your home or workplace. Service area: {BUSINESS_SERVICE_AREA}.
                Appointments are available 7 days a week.
              </P>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTAButton href="/what-to-expect">What to Expect</CTAButton>
                <CTAButton href="/book?start=new" variant="secondary">Schedule a First Visit</CTAButton>
              </div>
              <Link href="#service-area" className="mt-5 inline-flex font-semibold text-navy hover:underline">Check your service area</Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="mx-auto max-w-3xl">
            <H2>Who Is This Approach For?</H2>
            <ul className="mt-8 divide-y divide-line">
              {[
                { title: "Pain or difficulty moving", body: "People who want an evaluation and an explanation of their care options." },
                { title: "Busy schedules", body: "People who find it difficult to fit an office visit into their day." },
                { title: "Difficulty traveling", body: "People who are homebound or have difficulty traveling and need care brought to them." },
                { title: "Personalized care", body: "People seeking a more individualized experience, whether they’re new to chiropractic or have received care before." },
                { title: "Function and ongoing wellness", body: "People working toward better function and ongoing wellness, with care guided by their individual goals." },
              ].map(({ title, body }) => (
                <li key={title} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="text-base leading-relaxed text-muted">{body}</p>
                </li>
              ))}
            </ul>
            <P>
              Results-focused care starts with understanding what you want to improve, choosing
              appropriate care and reviewing your progress.
            </P>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <TwoColumn
            reverse
            media={
              <ImageFrame className="aspect-[4/3] mx-auto max-w-md lg:mx-0 lg:max-w-none">
                <Image src={DOCTOR_PORTRAIT_IMAGE.src} alt={DOCTOR_PORTRAIT_IMAGE.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </ImageFrame>
            }
          >
            <Eyebrow>Meet the Doctor</Eyebrow>
            <H2 className="mt-3">Meet Dr. David DeFries, DC</H2>
            <P>
              Dr. David DeFries, DC is a third-generation chiropractor who has been practicing since
              2003. He graduated from Parker College of Chiropractic and is a licensed Doctor of
              Chiropractic in Pennsylvania.
            </P>
            <Link href="/about" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy hover:underline">Meet Dr. DeFries <span aria-hidden>→</span></Link>
          </TwoColumn>
        </Container>
      </Section>

      <Section tone="white" id="how-it-works" className="scroll-mt-20">
        <Container>
          <H2>What Happens at Your First Visit?</H2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            <Step number={1} title="Discuss your concerns and goals" orientation="horizontal">We’ll talk about your symptoms and what you want to improve, then evaluate the problem and how you’re moving.</Step>
            <Step number={2} title="Care based on your evaluation" orientation="horizontal">Treatment begins during the same visit when appropriate. Your care is based on the examination findings and your situation.</Step>
            <Step number={3} title="Understand what comes next" orientation="horizontal">We’ll discuss the findings, what you can do between visits and whether additional care makes sense.</Step>
          </div>
          <P>I bring the treatment table and equipment needed for your visit to your home or workplace.</P>
          <Link href="/what-to-expect" className="mt-10 inline-flex items-center gap-1.5 font-semibold text-navy hover:underline">What to Expect <span aria-hidden>→</span></Link>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="text-center"><H2>Plan Your Visit</H2></div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <ChoiceCard title="New Patient" description="First visit — or haven't been seen in more than a year." href="/book?start=new" cta="Schedule a First Visit" />
            <ChoiceCard title="Returning Patient" description="Already a patient and have been seen within the past year." href="/book?start=returning" cta="Schedule a Visit" />
            <ChoiceCard title="Group Visit" description="Wellness-focused chiropractic care for two or more people at one location." href="/book?start=group" cta="Schedule a Group Visit" />
          </div>
          <VisitHoursPricing />
        </Container>
      </Section>

      <Section tone="cream" id="conditions" className="scroll-mt-20">
        <Container>
          <H2>Common problems we help with</H2>
          <TagList items={["Back pain", "Neck pain", "Headaches", "Sciatica", "Joint pain", "Sports injuries"]} />
        </Container>
      </Section>

      <Section tone="navy" id="service-area" className="scroll-mt-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Eyebrow onDark>Service Area</Eyebrow>
            <H2 onDark className="mt-3">Do we come to you?</H2>
            <div className="mt-8 text-left"><ZipChecker /></div>
          </div>
        </Container>
      </Section>


      <Section tone="cream">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Touring Productions & Live Events</Eyebrow>
            <H2 className="mt-3">On-Site Care for Touring Productions</H2>
            <P>
              Go Chiro Mobile provides on-site musculoskeletal care for touring artists, performers,
              cast, crew and production personnel at Pennsylvania venues and production locations.
              Coverage can be arranged for one person or for multiple people during a defined production window.
            </P>
            <p className="mt-3 text-sm font-semibold text-muted">Currently available at Pennsylvania locations only.</p>
            <div className="mt-7">
              <CTAButton href="/touring-production-care" variant="secondary">Explore Touring Production Care</CTAButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <H2 onDark>Personalized Chiropractic Care, at Your Location.</H2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <CTAButton href="/book-online" variant="inverse">Schedule a Visit</CTAButton>
              <a href={`tel:${BUSINESS_PHONE}`} className="text-base font-semibold text-white hover:underline">Call or text {BUSINESS_PHONE}</a>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="cream"><Container><H2>Care in Philadelphia</H2><p className="mt-4 text-lg text-muted">On-site care for workplaces, touring teams and individuals is available by arrangement.</p><Link href="/philadelphia" className="mt-4 inline-block font-semibold text-navy underline">Explore Philadelphia care</Link></Container></Section>
    </div>
  );
}
