import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, PageHeader, H3, ChoiceCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book Online — GoChiroMobile",
  description: "Choose the option that applies to you.",
};

export default function BookOnlinePage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <PageHeader
            eyebrow="Book Online"
            title="Schedule a Chiropractic Visit"
            lede="Choose the option that applies to you."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <ChoiceCard
              title="New Patient"
              description="First visit — or it's been more than one year since your last visit."
              href="/book?start=new"
              cta="Schedule a New Patient Visit"
              emphasizeCta
            />
            <ChoiceCard
              title="Returning Patient"
              description="You've been seen by Dr. DeFries within the past year."
              href="/book?start=returning"
              cta="Schedule a Returning Patient Visit"
              emphasizeCta
            />
            <ChoiceCard
              title="Group Visit"
              description="Two or more people receiving wellness-focused chiropractic care at one location."
              href="/book?start=group"
              cta="Schedule a Group Visit"
              emphasizeCta
            />
          </div>

          <div className="mt-10">
            <H3>Need More Information First?</H3>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-navy">
              <Link href="/pricing" className="hover:underline">
                Pricing
              </Link>
              <Link href="/service-areas" className="hover:underline">
                Service Areas
              </Link>
              <Link href="/what-to-expect" className="hover:underline">
                What to Expect
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
