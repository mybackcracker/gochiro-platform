import type { Metadata } from "next";
import { Section, Container, PageHeader, Callout } from "@/components/ui";
import { BUSINESS_PHONE, PUBLIC_CONTACT_EMAIL } from "@/lib/gochiro";
import ProductionRequestForm from "./ProductionRequestForm";

export const metadata: Metadata = {
  title: "Request Touring Production Coverage | GoChiroMobile",
  description: "Request on-site musculoskeletal care for a touring production in Philadelphia or the surrounding region.",
};

export default function ProductionRequestPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container>
          <PageHeader
            eyebrow="Touring Productions"
            title="Request Production Coverage"
            lede="Tell us what you know so far. You do not need to know exactly what type of coverage you need, and artist identity is optional at this stage."
          />
        </Container>
      </Section>

      <Section tone="cream" className="pt-8">
        <Container>
          <Callout title="Production logistics only" tone="white" className="max-w-3xl">
            <p className="text-base leading-relaxed text-muted">
              This request is for production dates, location, access needs and coverage planning. Please do not include medical or clinical information here. Individual health information is collected separately and privately only from people who receive care.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-base font-semibold text-navy">
              <a href={`tel:${BUSINESS_PHONE}`} className="underline underline-offset-4">Call / Text {BUSINESS_PHONE}</a>
              <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="underline underline-offset-4">Email {PUBLIC_CONTACT_EMAIL}</a>
            </div>
          </Callout>

          <div className="mt-10">
            <ProductionRequestForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
