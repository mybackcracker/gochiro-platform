import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Exercise Library — GoChiroMobile",
  description: "Simple mobile-friendly exercise instructions from GoChiroMobile.",
};

const GROUPS = [
  { title: "Neck & Upper Back", items: [
    { title: "Chin Tuck", slug: "chin-tuck", image: "/chin-tuck.png" },
    { title: "Scapular Retraction", slug: "scapular-retraction", image: "/scapular-retraction.png" },
  ]},
  { title: "Shoulder", items: [
    { title: "Shoulder Circumduction", slug: "shoulder-circumduction", image: "/shoulder-circumduction.png" },
  ]},
  { title: "Low Back & Hip", items: [
    { title: "Hip Hinge", slug: "hip-hinge", image: "/hip-hinge.png" },
    { title: "Hip Flexor Stretch", slug: "hip-flexor-stretch", image: "/hip-flexor-stretch.png" },
    { title: "Glute Bridge", slug: "glute-bridge", image: "/glute-bridge.png" },
  ]},
  { title: "Elbow, Wrist & Forearm", items: [
    { title: "Wrist & Forearm Isometrics", slug: "wrist-forearm-isometrics", image: "/wrist-forearm-isometrics.png" },
    { title: "Forearm Rotation Isometrics", slug: "forearm-rotation-isometrics", image: "/forearm-rotation-isometrics.png" },
  ]},
  { title: "Foot & Ankle", items: [
    { title: "Calf Complex Stretch", slug: "calf-complex-stretch", image: "/calf-complex-stretch.png" },
    { title: "Foot & Ankle Strength", slug: "foot-ankle-strength", image: "/foot-ankle-strength.png" },
  ]},
];

export default function ExerciseLibraryPage() {
  return (
    <Section tone="white" className="pt-14 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <PageHeader
          eyebrow="Patient Resources"
          title="Exercise Library"
          lede="Choose the exercise Dr. DeFries recommended for you. Tap any guide to open the full-size image. Move slowly, stay within a comfortable range, and do not push into pain."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-10">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="mb-4 text-xl font-bold text-slate-900">{group.title}</h2>
              <div className="space-y-5">
                {group.items.map((item) => (
                  <a
                    key={item.title}
                    href={`/exercises/${item.slug}`}
                    className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="px-5 py-4 text-lg font-semibold text-slate-900">{item.title}</div>
                    <img
                      src={item.image}
                      alt={`${item.title} exercise guide from GoChiroMobile`}
                      className="h-auto w-full"
                      loading="lazy"
                    />
                  </a>
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
