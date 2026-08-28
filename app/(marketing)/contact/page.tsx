import type { Metadata } from "next";
import { ArticleShell } from "@/components/ui";
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
    <ArticleShell
      eyebrow="Contact"
      title="Contact GoChiroMobile"
      lede="Have a question or need something outside regular online scheduling?"
    >
      <ul className="mt-6 space-y-2 text-lg text-slate-700">
        {CONTACT_REASONS.map((reason) => (
          <li key={reason} className="flex gap-2">
            <span aria-hidden className="text-slate-400">
              •
            </span>
            {reason}
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-lg font-semibold text-slate-900">Phone / text</p>
        <a
          href={`tel:${BUSINESS_PHONE}`}
          className="mt-1 block text-2xl font-bold text-slate-900 hover:underline"
        >
          {BUSINESS_PHONE}
        </a>
        <p className="mt-6 text-lg font-semibold text-slate-900">Email</p>
        <a
          href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
          className="mt-1 block text-lg text-slate-900 hover:underline"
        >
          {PUBLIC_CONTACT_EMAIL}
        </a>
      </div>
    </ArticleShell>
  );
}
