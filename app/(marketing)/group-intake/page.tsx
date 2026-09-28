import type { Metadata } from "next";
import { CTAButton, Container, PageHeader, Section } from "@/components/ui";
import { BUSINESS_PHONE } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "Group Visit New Patient Intake — GoChiroMobile",
  description: "Group Visit guidance and the regular new-patient intake for each participant.",
};

export default function GroupIntakePage() {
  return (
    <Section tone="white" className="pt-14 pb-20 sm:pt-20">
      <Container narrow>
        <PageHeader
          eyebrow="Group Visits"
          title="Before You Complete Your Intake"
          lede="Each new patient in the group completes their own regular patient intake. Everyone can use this same link."
        />

        <div className="mt-9 rounded-2xl border border-line bg-cream p-6 sm:p-8">
          <h2 className="text-xl font-bold text-navy sm:text-2xl">Is a Group Visit right for you?</h2>
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
            Group Visits are intended for wellness care or mild, limited complaints. If you have several concerns,
            a moderate to severe or chronic complaint, a new injury, significantly worsening symptoms, or pain
            that travels into an arm or leg, please contact us about an individual visit. Dr. DeFries may also
            recommend an individual evaluation after reviewing your intake.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Unsure which visit fits? Call or text <a className="font-semibold text-navy underline underline-offset-2" href="tel:6104940412">{BUSINESS_PHONE}</a> before completing the form.
          </p>
        </div>

        <p className="mt-8 text-base leading-relaxed text-muted">
          The button below opens the same patient intake used for individual new-patient visits. Complete and
          submit one form for yourself within three hours of the group booking.
        </p>
        <div className="mt-6 flex">
          <CTAButton href="/intake">Continue to Patient Intake</CTAButton>
        </div>
      </Container>
    </Section>
  );
}
