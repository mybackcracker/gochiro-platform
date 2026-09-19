import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Exercise Library — GoChiroMobile",
  description: "Simple mobile-friendly exercise instructions from GoChiroMobile.",
};

const GROUPS = [
  { title: "Neck & Upper Back", items: ["Chin Tuck", "Scapular Retraction"] },
  { title: "Shoulder", items: ["Shoulder Circumduction"] },
  { title: "Low Back & Hip", items: ["Hip Hinge", "Hip Flexor Stretch", "Glute Bridge"] },
  { title: "Elbow, Wrist & Forearm", items: ["Wrist & Forearm Isometrics", "Forearm Rotation Isometrics"] },
  { title: "Foot & Ankle", items: ["Calf Complex Stretch", "Foot & Ankle Strength"] },
];

export default function ExerciseLibraryPage() {
  return (
    <Section tone="white" className="pt-14 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <PageHeader
          eyebrow="Patient Resources"
          title="Exercise Library"
          lede="Choose the exercise Dr. DeFries recommended for you. Move slowly, stay within a comfortable range, and do not push into pain."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-8">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="mb-3 text-xl font-bold text-slate-900">{group.title}</h2>
              <div className="grid gap-3">
                {group.items.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
                    <div className="text-lg font-semibold text-slate-900">{item}</div>
                    <div className="mt-1 text-sm text-slate-600">Exercise guide coming here.</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-sm text-slate-600">
          These instructions are educational and are intended to support the exercise plan discussed during your visit. Stop if an exercise causes pain or worsening symptoms.
        </p>
      </Container>
    </Section>
  );
}
