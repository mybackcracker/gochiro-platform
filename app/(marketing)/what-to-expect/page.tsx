import Image from "next/image";
import type { Metadata } from "next";
import { Section, Container, PageHeader, Step, CTAButton, Callout, ImageFrame, TwoColumn } from "@/components/ui";
import { HOUSE_CALL_TREATMENT_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: "What to Expect — GoChiroMobile",
  description: "What happens before, during and after a mobile chiropractic visit.",
};

const STEPS: { title: string; body: string }[] = [
  {
    title: "Schedule Your Visit",
    body: "Choose your visit and an available appointment time online. Your location and exact price are confirmed before you book.",
  },
  {
    title: "Complete Your Intake",
    body: "New patients complete an intake before the appointment so I can review your history, symptoms and goals before I arrive.",
  },
  {
    title: "Evaluation & Examination",
    body: "We'll talk about what's bothering you and what you're trying to accomplish. I'll evaluate the problem, look at how you're moving and perform appropriate examination or testing based on your situation.",
  },
  {
    title: "Treatment",
    body: "When appropriate, treatment begins during the same visit. Care is based on what I find during your evaluation rather than a predetermined routine.",
  },
  {
    title: "Know What Comes Next",
    body: "Before I leave, we'll discuss what I found, things you can do between visits and whether additional care makes sense.",
  },
];

// Reused verbatim from the confirmed booking-confirmation email copy
// (lib/bookingEmail.ts's getPreparationLines) — the universal lines sent to
// every visit type. The portable-treatment-table line is new-patient-only
// in that source, so it's left out here rather than generalized.
const PREPARATION = [
  "Wear loose, comfortable clothing.",
  "Please do not apply topical pain gels, creams, or patches before your appointment.",
  "If you can safely do so, avoid anti-inflammatory or over-the-counter pain medication for 24 hours before your visit.",
  "Continue prescribed medication as directed unless your prescribing clinician has told you otherwise.",
  "Arrival times are approximate — please keep your full ETA range available.",
];

export default function WhatToExpectPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container>
          <PageHeader
            eyebrow="What to Expect"
            title="What to Expect From a Mobile Chiropractic Visit"
            lede="I bring the chiropractic visit to you. Here's what happens before, during and after your appointment."
          />

          <div className="mt-14">
            <TwoColumn
              reverse
              media={
                <ImageFrame className="aspect-video lg:sticky lg:top-24">
                  <Image
                    src={HOUSE_CALL_TREATMENT_IMAGE.src}
                    alt={HOUSE_CALL_TREATMENT_IMAGE.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[center_35%]"
                  />
                </ImageFrame>
              }
            >
              <div>
                {STEPS.map((step, i) => (
                  <Step key={step.title} number={i + 1} title={step.title}>
                    {step.body}
                  </Step>
                ))}
              </div>
            </TwoColumn>
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <Container>
          <Callout title="Preparing for Your Visit" tone="white" className="mx-auto max-w-3xl">
            <ul className="mt-3 space-y-2.5">
              {PREPARATION.map((line) => (
                <li key={line} className="flex gap-3 text-base leading-relaxed text-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </Callout>

          <div className="mt-10 text-center">
            <CTAButton href="/book-online">Schedule a visit →</CTAButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
