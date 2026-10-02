import type { Metadata } from "next";
import { ChoiceCard, Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Patient Forms — Go Chiro Mobile",
  description: "Access Go Chiro Mobile patient forms securely from your phone or computer.",
};

const FORMS = [
  {
    title: "Tour & Event Patient Intake",
    description:
      "A shorter intake for patients receiving care during a tour, production or sponsored event.",
    href: "/tour-intake",
    cta: "Open Tour & Event Intake",
  },
  {
    title: "Patient Intake Form",
    description:
      "Complete your health history, current concerns, consent and required acknowledgments before your visit.",
    href: "/intake",
    cta: "Open Patient Intake",
  },
  {
    title: "Group Visit New Patient Intake",
    description:
      "Read Group Visit guidance, then complete the regular patient intake. Each new patient uses the same link and submits their own form.",
    href: "/group-intake",
    cta: "Read Guidance & Open Intake",
  },
];

export default function FormsPage() {
  return (
    <Section tone="white" className="pt-14 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <PageHeader
          eyebrow="Forms"
          title="Go Chiro Mobile Patient Forms"
          lede="Select the form you need. Forms can be completed securely from a phone, tablet or computer."
        />

        <div className="mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
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
