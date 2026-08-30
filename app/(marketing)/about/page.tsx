import Image from "next/image";
import type { Metadata } from "next";
import { Section, Container, Eyebrow, H1, H2, Lede, P, Prose, CTAButton, CredentialsPanel, ImageFrame, TwoColumn } from "@/components/ui";
import { LAPTOP_CONSULTATION_IMAGE, IN_HOME_TREATMENT_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Dr. David DeFries — GoChiroMobile",
  description: "Third-generation chiropractor. Practicing since 2003.",
};

export default function AboutPage() {
  return (
    <div>
      <Section tone="white" className="pb-14 pt-14 sm:pt-20">
        <Container>
          <TwoColumn
            media={
              <ImageFrame className="aspect-[4/5]">
                <Image
                  src={LAPTOP_CONSULTATION_IMAGE.src}
                  alt={LAPTOP_CONSULTATION_IMAGE.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageFrame>
            }
          >
            <Eyebrow>About</Eyebrow>
            <H1 className="mt-3">Meet Dr. David DeFries</H1>
            <Lede className="mt-4">Third-generation chiropractor. Practicing since 2003.</Lede>
            <P>
              I grew up around chiropractic care. My father was a chiropractor, and long before I
              became one myself, I watched the relationships he built with his patients.
            </P>
            <P>
              What stayed with me wasn&apos;t a particular technique. It was the attention he gave
              people — knowing their history, listening to what had changed and treating the
              person rather than simply moving to the next appointment.
            </P>
            <P>
              I graduated from Parker College of Chiropractic in 2003 and began practicing that
              same year.
            </P>
          </TwoColumn>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <TwoColumn
            reverse
            media={
              <ImageFrame className="aspect-[4/5]">
                <Image
                  src={IN_HOME_TREATMENT_IMAGE.src}
                  alt={IN_HOME_TREATMENT_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageFrame>
            }
          >
            <H2>Why I Started GoChiroMobile</H2>
            <P>
              The idea for GoChiroMobile developed during COVID, when the traditional office model
              suddenly changed.
            </P>
            <P>
              It made me reconsider what actually required a chiropractic office. The evaluation,
              treatment, equipment and one-on-one interaction could come with me. The
              patient&apos;s drive, waiting room and time away from home or work didn&apos;t have
              to.
            </P>
            <P>
              That became GoChiroMobile: chiropractic care built around bringing the visit to the
              patient.
            </P>
          </TwoColumn>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Prose>
            <H2>How I Practice</H2>
            <P>
              I want to understand why something is bothering you, not simply identify where it
              hurts.
            </P>
            <P>
              That means looking at how you move, what&apos;s changed and what you&apos;re trying
              to get back to. I&apos;ll explain what I&apos;m finding, provide treatment when
              appropriate and give you practical recommendations for what you can do between
              visits.
            </P>
            <P>
              My goal isn&apos;t to make you dependent on care. It&apos;s to help you understand
              your problem and make informed decisions about what comes next.
            </P>
          </Prose>

          <div className="mt-12 max-w-xl">
            <CredentialsPanel
              rows={[
                { label: "Name", value: "David DeFries, DC" },
                { label: "Education", value: "Parker College of Chiropractic, 2003" },
                { label: "Practicing", value: "Since 2003" },
                { label: "License", value: "Licensed Doctor of Chiropractic — Pennsylvania, DC008983" },
              ]}
            />
          </div>

          <div className="mt-8">
            <CTAButton href="/book-online">Schedule a visit →</CTAButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
