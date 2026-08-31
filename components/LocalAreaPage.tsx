import Image from "next/image";
import {
  Section,
  Container,
  Eyebrow,
  H1,
  H2,
  Lede,
  P,
  Prose,
  CTAButton,
  Step,
  Callout,
  TwoColumn,
  ImageFrame,
  TagList,
} from "@/components/ui";
import LocalAreaLinkList from "@/components/LocalAreaLinkList";
import { BUSINESS_PHONE } from "@/lib/gochiro";
import type { LocalAreaContent } from "@/lib/localAreas/types";

// Shared structural template for every local service-area page. Section
// order, layout and the visual system (Section/Container/TwoColumn/Step/
// Callout, from components/ui) are fixed here so pages read as one
// consistent site — but every sentence rendered comes from `content`
// (lib/localAreas/<slug>.ts), so adding a page never means copying this
// file, and never means the page is just this file's copy with a town name
// swapped in.
export default function LocalAreaPage({ content }: { content: LocalAreaContent }) {
  return (
    <div>
      {/* Hero — text/CTA render before the photo in source order so mobile/tablet
          (single-column, below lg) shows the headline and CTA first; lg:order-*
          restores the image-left/text-right two-column layout at desktop. Hand-rolled
          rather than TwoColumn so this reordering + the 16:9 hero aspect ratio
          stay scoped to the hero and don't affect other TwoColumn/ImageFrame usage. */}
      <Section tone="white" className="pb-14 pt-14 sm:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="order-2 lg:order-1">
              <ImageFrame className="aspect-video">
                <Image
                  src={content.heroImage.src}
                  alt={content.heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageFrame>
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>{content.heroEyebrow}</Eyebrow>
              <H1 className="mt-3">{content.heroHeading}</H1>
              <Lede className="mt-5">{content.heroLede}</Lede>
              {content.heroParagraphs.map((paragraph) => (
                <P key={paragraph}>{paragraph}</P>
              ))}
              <div className="mt-8">
                <CTAButton href="/book-online">{content.heroCta}</CTAButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Clinical care — what GoChiroMobile treats and why, ahead of the local history material so a visitor understands the actual care before the local color */}
      <Section tone="white">
        <Container>
          <H2>{content.clinicalCareHeading}</H2>
          <P className="max-w-2xl">{content.clinicalCareIntro}</P>
          <TagList items={content.clinicalCareCategories} />
          <P className="max-w-2xl">
            A visit is more than a single adjustment. Depending on what the exam finds, care may
            include chiropractic manipulation, soft-tissue or mobility work, other therapeutic
            techniques, and guidance for what to do between visits — with additional evaluation
            and treatment time built in for new patients or more involved problems. Not every
            headache or radiating pain has a cause chiropractic care can help with; the initial
            evaluation is what determines whether it&rsquo;s a good fit.
          </P>
          <P className="max-w-2xl">{content.clinicalCareClosing}</P>
        </Container>
      </Section>

      {/* Dr. DeFries' connection to the area — optional per page */}
      {content.connectionHeading && content.connectionParagraphs && (
        <Section tone="cream">
          <Container>
            <TwoColumn
              reverse
              media={
                content.connectionImage ? (
                  <ImageFrame className="aspect-[4/3] mx-auto max-w-md lg:mx-0 lg:max-w-none">
                    <Image
                      src={content.connectionImage.src}
                      alt={content.connectionImage.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </ImageFrame>
                ) : (
                  <span aria-hidden />
                )
              }
            >
              <H2>{content.connectionHeading}</H2>
              {content.connectionParagraphs.map((paragraph) => (
                <P key={paragraph}>{paragraph}</P>
              ))}
            </TwoColumn>
          </Container>
        </Section>
      )}

      {/* How it works */}
      <Section tone="white">
        <Container>
          <H2>{content.howItWorksHeading}</H2>
          {content.howItWorksIntro && <P className="max-w-2xl">{content.howItWorksIntro}</P>}
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {content.howItWorksSteps.map((step, i) => (
              <Step key={step.title} number={i + 1} title={step.title} orientation="horizontal">
                {step.body}
              </Step>
            ))}
          </div>
        </Container>
      </Section>

      {/* New / returning patient care */}
      <Section tone="cream">
        <Container>
          <Prose>
            <H2>{content.careHeading}</H2>
            {content.careParagraphs.map((paragraph) => (
              <P key={paragraph}>{paragraph}</P>
            ))}
          </Prose>
        </Container>
      </Section>

      {/* Scheduling convenience */}
      <Section tone="white">
        <Container>
          <Prose>
            <H2>{content.schedulingHeading}</H2>
            {content.schedulingParagraphs.map((paragraph) => (
              <P key={paragraph}>{paragraph}</P>
            ))}
          </Prose>
        </Container>
      </Section>

      {/* Workplace / group visits */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <H2>{content.workplaceHeading}</H2>
              {content.workplaceParagraphs.map((paragraph) => (
                <P key={paragraph}>{paragraph}</P>
              ))}
              <div className="mt-6">
                <CTAButton href="/book?start=group">{content.workplaceCta}</CTAButton>
              </div>
            </div>
            <Callout title="Group & Workplace Visits" tone="white">
              <p className="text-base leading-relaxed text-muted">
                Minimum two participants. Not intended for acute injuries, significant new
                complaints, or chronic problems requiring individualized evaluation and treatment.
                See{" "}
                <a href="/pricing" className="font-semibold text-navy underline">
                  Pricing
                </a>{" "}
                for current per-participant rates.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Nearby communities */}
      <Section tone="white">
        <Container>
          <H2>{content.nearbyHeading}</H2>
          <P className="max-w-2xl">{content.nearbyParagraph}</P>
          <LocalAreaLinkList items={content.nearbyAreas} />
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section tone="navy">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <H2 onDark>{content.closingHeading}</H2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <CTAButton href="/book-online" variant="inverse">
                Book Online
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
