import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui";

const EXERCISES: Record<string, { title: string; image: string }> = {
  "shoulder-circumduction": { title: "Shoulder Circumduction", image: "/shoulder-circumduction.png" },
  "wrist-forearm-isometrics": { title: "Wrist & Forearm Isometrics", image: "/wrist-forearm-isometrics.png" },
  "glute-bridge": { title: "Glute Bridge", image: "/glute-bridge.png" },
  "chin-tuck": { title: "Chin Tuck", image: "/chin-tuck.png" },
  "scapular-retraction": { title: "Scapular Retraction", image: "/scapular-retraction.png" },
  "hip-flexor-stretch": { title: "Hip Flexor Stretch", image: "/hip-flexor-stretch.png" },
  "hip-hinge": { title: "Hip Hinge", image: "/hip-hinge.png" },
  "calf-complex-stretch": { title: "Calf Complex Stretch", image: "/calf-complex-stretch.png" },
  "foot-ankle-strength": { title: "Foot & Ankle Strength", image: "/foot-ankle-strength.png" },
  "forearm-rotation-isometrics": { title: "Forearm Rotation Isometrics", image: "/forearm-rotation-isometrics.png" },
};

export function generateStaticParams() {
  return Object.keys(EXERCISES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exercise = EXERCISES[slug];
  if (!exercise) return {};
  return {
    title: `${exercise.title} — GoChiroMobile`,
    description: `${exercise.title} exercise instructions from GoChiroMobile.`,
  };
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exercise = EXERCISES[slug];
  if (!exercise) notFound();

  const exerciseUrl = `https://gochiromobile.com/exercises/${slug}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(exerciseUrl)}`;

  return (
    <Section tone="white" className="pt-8 pb-16 sm:pt-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <a href="/exercises" className="mb-5 inline-block text-sm font-semibold text-sky-700 hover:underline">
            ← Exercise Library
          </a>
          <h1 className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">{exercise.title}</h1>
          <img
            src={exercise.image}
            alt={`${exercise.title} exercise guide from GoChiroMobile`}
            className="h-auto w-full rounded-2xl border border-slate-200"
          />
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
            <div className="text-lg font-bold text-slate-900">Send this exercise to your phone</div>
            <p className="mt-1 text-sm text-slate-600">Scan this code with your phone camera to open this exercise.</p>
            <img
              src={qrUrl}
              alt={`QR code for ${exercise.title}`}
              width="240"
              height="240"
              className="mx-auto mt-4 h-52 w-52 sm:h-60 sm:w-60"
            />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Follow the exercise plan discussed during your visit. Move within a comfortable range and stop if symptoms worsen.
          </p>
        </div>
      </Container>
    </Section>
  );
}
