import type { Metadata } from "next";
import { Section, Container, PageHeader, TagList } from "@/components/ui";
import { BUSINESS_PHONE, PUBLIC_CONTACT_EMAIL } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "Contact — GoChiroMobile",
  description: "Have a question or need something outside regular online scheduling?",
};

// No contact-form submission mechanism exists in this codebase yet (no
// /api/contact route, no lead-storage backend) — per the same rule that
// took the old Notify Me stub off the homepage, this page offers only real,
// working contact paths (call/text/email) rather than a form that would
// silently go nowhere. See IMPLEMENTATION_NOTES.md for tracking a real
// contact-form backend as future work.
const CONTACT_REASONS = [
  "Locations outside the regular service area",
  "Philadelphia visits",
  "Group Visits",
  "Workplace wellness",
  "Performers, touring productions and crews",
  "Special events",
  "Other scheduling questions",
];

export default function ContactPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container>
          <PageHeader
            eyebrow="Contact"
            title="Contact GoChiroMobile"
            lede="Have a question or need something outside regular online scheduling?"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <a
              href={`tel:${BUSINESS_PHONE}`}
              className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-[0_12px_32px_-16px_rgba(24,50,74,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">Call / Text</p>
              <p className="mt-2 font-heading text-3xl font-bold text-navy">{BUSINESS_PHONE}</p>
            </a>
            <a
              href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
              className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-[0_12px_32px_-16px_rgba(24,50,74,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">Email</p>
              <p className="mt-2 break-words font-heading text-2xl font-bold text-navy sm:text-3xl">
                {PUBLIC_CONTACT_EMAIL}
              </p>
            </a>
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Reach out about
          </p>
          <TagList items={CONTACT_REASONS} />
        </Container>
      </Section>
    </div>
  );
}
