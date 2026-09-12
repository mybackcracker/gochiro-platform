import type { Metadata } from "next";
import { ChoiceCard, Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Patient Forms — GoChiroMobile",
  description: "Access GoChiroMobile patient forms securely from your phone or computer.",
};

const FORMS = [
  {
    title: "Patient Intake Form",
    description:
      "Complete your health history, current concerns, consent and required acknowledgments before your visit.",
    href: "/intake",
    cta: "Open Patient Intake",
  },
];

export default function FormsPage() {
  return (
    <Section tone="white" className="pt-14 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <PageHeader
          eyebrow="Forms"
          title="GoChiroMobile Patient Forms"
          lede="Select the form you need. Forms can be completed securely from a phone, tablet or computer."
        />

        <div className="mt-10 grid max-w-xl gap-6">
          {FORMS.map((form) => (
            <ChoiceCard
              key={form.href}
              title={form.title}
              description={form.description}
              href={form.href}
              cta={form.cta}
              emphasizeCta
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
