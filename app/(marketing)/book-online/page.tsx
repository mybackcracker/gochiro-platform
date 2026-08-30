import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, PageHeader, H3, ChoiceCard, Callout } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book Online — GoChiroMobile",
  description: "Choose the option that applies to you.",
};

export default function BookOnlinePage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
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

      <Section tone="cream" className="pt-8 pb-12 sm:pt-10 sm:pb-14">
        <Container>
          <Callout title="Cancellation & Rescheduling" tone="white" className="mx-auto max-w-3xl">
            <p className="text-sm leading-relaxed text-muted">
              We require at least 24 hours&apos; notice to cancel or reschedule your appointment.
              Cancellations, no-shows, or same-day changes made with less than 24 hours&apos;
              notice will be charged a $50 fee. You&apos;ll see this policy again, and confirm it,
              as part of scheduling. The same 24-hour notice applies to Group Visits — if a Group
              Visit is cancelled or rescheduled late, the $50 fee applies once to the whole
              booking, and the host is responsible for it.
            </p>
          </Callout>
        </Container>
      </Section>
    </div>
  );
}
