import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell, H2, P, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book Online — GoChiroMobile",
  description: "Choose the option that applies to you.",
};

export default function BookOnlinePage() {
  return (
    <ArticleShell
      eyebrow="Book Online"
      title="Schedule a Chiropractic Visit"
      lede="Choose the option that applies to you."
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900">New Patient</h2>
          <p className="mt-2 text-lg text-slate-700">
            First visit — or it&apos;s been more than one year since your last visit.
          </p>
          <div className="mt-4">
            <CTAButton href="/book?start=new">Schedule a New Patient Visit</CTAButton>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900">Returning Patient</h2>
          <p className="mt-2 text-lg text-slate-700">
            You&apos;ve been seen by Dr. DeFries within the past year.
          </p>
          <div className="mt-4">
            <CTAButton href="/book?start=returning">Schedule a Returning Patient Visit</CTAButton>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900">Group Visit</h2>
          <p className="mt-2 text-lg text-slate-700">
            Two or more people receiving wellness-focused chiropractic care at one location.
          </p>
          <div className="mt-4">
            <CTAButton href="/book?start=group">Schedule a Group Visit</CTAButton>
          </div>
        </div>
      </div>

      <H2>Need More Information First?</H2>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold text-slate-900">
        <Link href="/pricing" className="underline hover:no-underline">
          Pricing
        </Link>
        <Link href="/service-areas" className="underline hover:no-underline">
          Service Areas
        </Link>
        <Link href="/what-to-expect" className="underline hover:no-underline">
          What to Expect
        </Link>
      </div>

      <H2>Cancellation &amp; Rescheduling</H2>
      <P>
        We require at least 24 hours&apos; notice to cancel or reschedule your appointment.
        Cancellations, no-shows, or same-day changes made with less than 24 hours&apos; notice will
        be charged a $50 fee. You&apos;ll see this policy again, and confirm it, as part of
        scheduling. The same 24-hour notice applies to Group Visits — if a Group Visit is
        cancelled or rescheduled late, the $50 fee applies once to the whole booking, and the host
        is responsible for it.
      </P>
    </ArticleShell>
  );
}
