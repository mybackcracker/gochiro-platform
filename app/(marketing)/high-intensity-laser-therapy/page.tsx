import type { Metadata } from "next";
import {
  Section,
  Container,
  PageHeader,
  CTAButton,
  H2,
  P,
  Callout,
  TagList,
} from "@/components/ui";
import { BUSINESS_PHONE } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "High-Intensity Laser Therapy | Mobile Care | GoChiroMobile",
  description:
    "High-intensity therapeutic laser may be available by advance request as part of mobile musculoskeletal care and touring-production coverage in Pennsylvania.",
};

const COMMON_GOALS = [
  "Temporary relief of minor muscle pain and stiffness",
  "Temporary relief of minor joint pain and stiffness",
  "Muscle relaxation",
  "Temporary increase in local circulation",
  "An additional option within a musculoskeletal care plan",
];

export default function HighIntensityLaserTherapyPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <PageHeader
            eyebrow="Advanced Therapeutic Modalities"
            title="High-Intensity Laser Therapy"
            lede="A high-power therapeutic laser may be available by advance request as an optional part of GoChiroMobile musculoskeletal care and touring-production coverage in Pennsylvania."
          />
          <p className="mt-4 text-sm font-semibold text-muted">
            Availability depends on the clinical situation, scheduling and the specific laser system available for the requested date.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href={`tel:${BUSINESS_PHONE}`}>Ask About Laser Availability</CTAButton>
            <CTAButton href="/touring-production-care/request" variant="secondary">Request Production Coverage</CTAButton>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <H2>What Is High-Intensity Laser Therapy?</H2>
              <P>
                Therapeutic laser systems use focused light energy as a physical-medicine modality. Higher-powered systems are often described as high-intensity or high-power therapeutic lasers. The exact wavelength, power, pulse characteristics and treatment parameters vary by device.
              </P>
              <P>
                GoChiroMobile is not tied to one manufacturer or one laser specification. When laser therapy is requested, the equipment used and the treatment approach must be appropriate for the individual, the setting and the specific device available.
              </P>
            </div>
            <Callout title="Available by advance request">
              <p className="text-base leading-relaxed text-muted">
                High-intensity laser equipment is not part of every routine mobile visit. Advance notice allows GoChiroMobile to confirm appropriate equipment availability and plan the additional transport, setup and safety requirements.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <H2>Why It May Be Added to a Visit</H2>
          <P className="max-w-3xl">
            Depending on the device and its cleared indications, therapeutic laser may be considered as an adjunct to hands-on musculoskeletal care rather than as a replacement for examination, diagnosis or appropriate treatment.
          </P>
          <TagList items={COMMON_GOALS} />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            The uses that can appropriately be offered depend on the labeling and cleared indications of the specific device being used. No particular result is guaranteed.
          </p>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <H2>Part of a Broader Musculoskeletal Approach</H2>
              <P>
                Laser therapy is one potential tool within GoChiroMobile&apos;s broader approach to musculoskeletal care. A visit may also involve focused assessment, chiropractic or joint treatment when appropriate, soft-tissue techniques, mobility work and practical recommendations based on the individual presentation.
              </P>
              <P>
                Whether laser therapy is appropriate is determined after appropriate screening. It is not automatically used simply because it was requested in advance.
              </P>
            </div>
            <Callout title="Equipment-specific treatment" tone="white">
              <p className="text-base leading-relaxed text-muted">
                Different therapeutic lasers have different operating characteristics and intended uses. Treatment parameters and safety procedures are based on the specific system being used rather than a generic wattage or wavelength claim.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="max-w-3xl">
            <H2>Laser Therapy for Touring Productions</H2>
            <P>
              For touring artists, performers, crew and production personnel, high-intensity laser therapy can be requested as an optional addition to an on-site production-care engagement. Because specialized equipment may need to be arranged specifically for the production date, advance notice is strongly preferred.
            </P>
            <P>
              A tour manager, production manager or other authorized production contact can request laser availability when arranging coverage. Final use is still based on individual screening and clinical appropriateness at the time of care.
            </P>
            <div className="mt-6">
              <CTAButton href="/touring-production-care" variant="secondary">Explore Touring Production Care</CTAButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <H2>Safety Comes First</H2>
              <P>
                High-powered medical lasers require appropriate training, controlled use and eye protection. Before treatment, relevant health history, medications, the treatment area and other factors are reviewed for potential precautions or contraindications.
              </P>
              <P>
                If the available laser, treatment setting or individual presentation is not appropriate, laser therapy will not be provided and other care options can be discussed.
              </P>
            </div>
            <Callout title="Not a stand-alone promise" tone="white">
              <p className="text-base leading-relaxed text-muted">
                GoChiroMobile does not advertise laser therapy as a cure or guarantee tissue healing. The specific device&apos;s cleared indications, clinical judgment and patient safety determine how the modality may be used.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="max-w-3xl">
            <H2>Request High-Intensity Laser Therapy</H2>
            <P>
              If you are interested in having high-intensity laser therapy available for a mobile visit or a touring-production engagement, contact GoChiroMobile before the requested date. We can confirm whether appropriate equipment can be arranged and discuss the logistics before you commit.
            </P>
            <P>
              High-intensity laser therapy is currently offered only when appropriate equipment and scheduling are available. Mobile and touring-production care is provided at Pennsylvania locations.
            </P>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={`tel:${BUSINESS_PHONE}`}>Call / Text {BUSINESS_PHONE}</CTAButton>
              <CTAButton href="/touring-production-care/request" variant="secondary">Production Request</CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
