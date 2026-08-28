import type { Metadata } from "next";
import { ArticleShell, H2, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "What to Expect — GoChiroMobile",
  description: "What happens before, during and after a mobile chiropractic visit.",
};

const STEPS: { title: string; body: string }[] = [
  {
    title: "1. Schedule Your Visit",
    body: "Choose your visit and an available appointment time online. Your location and exact price are confirmed before you book.",
  },
  {
    title: "2. Complete Your Intake",
    body: "New patients complete an intake before the appointment so I can review your history, symptoms and goals before I arrive.",
  },
  {
    title: "3. Evaluation & Examination",
    body: "We'll talk about what's bothering you and what you're trying to accomplish. I'll evaluate the problem, look at how you're moving and perform appropriate examination or testing based on your situation.",
  },
  {
    title: "4. Treatment",
    body: "When appropriate, treatment begins during the same visit. Care is based on what I find during your evaluation rather than a predetermined routine.",
  },
  {
    title: "5. Know What Comes Next",
    body: "Before I leave, we'll discuss what I found, things you can do between visits and whether additional care makes sense.",
  },
];

// Reused verbatim from the confirmed booking-confirmation email copy
// (lib/bookingEmail.ts's getPreparationLines) — the universal lines sent to
// every visit type. The portable-treatment-table line is new-patient-only
// in that source, so it's left out here rather than generalized.
const PREPARATION = [
  "Wear loose, comfortable clothing.",
  "Please do not apply topical pain gels, creams, or patches before your appointment.",
  "If you can safely do so, avoid anti-inflammatory or over-the-counter pain medication for 24 hours before your visit.",
  "Continue prescribed medication as directed unless your prescribing clinician has told you otherwise.",
  "Arrival times are approximate — please keep your full ETA range available.",
];

export default function WhatToExpectPage() {
  return (
    <ArticleShell
      eyebrow="What to Expect"
      title="What to Expect From a Mobile Chiropractic Visit"
      lede="I bring the chiropractic visit to you. Here's what happens before, during and after your appointment."
    >
      <div className="space-y-8">
        {STEPS.map((step) => (
          <div key={step.title}>
            <h2 className="text-xl font-bold text-slate-900">{step.title}</h2>
            <p className="mt-2 text-lg leading-relaxed text-slate-700">{step.body}</p>
          </div>
        ))}
      </div>

      <H2>Preparing for Your Visit</H2>
      <ul className="mt-4 space-y-2 text-lg leading-relaxed text-slate-700">
        {PREPARATION.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="mt-10">
        <CTAButton href="/book-online">Schedule a visit →</CTAButton>
      </div>
    </ArticleShell>
  );
}
