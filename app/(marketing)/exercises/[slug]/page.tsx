import Link from "next/link";
import PageSearchSchema from "@/components/PageSearchSchema";
import { EXERCISES } from "@/lib/exercises";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui";



export function generateStaticParams() {
  return Object.keys(EXERCISES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exercise = EXERCISES[slug];
  if (!exercise) return {};
  return {
    alternates: { canonical: `/exercises/${slug}` },
    title: `${exercise.title} — Go Chiro Mobile`,
    description: `${exercise.title} exercise instructions from Go Chiro Mobile.`,
  };
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exercise = EXERCISES[slug];
  if (!exercise) notFound();

  const exerciseUrl = `https://www.gochiromobile.com/exercises/${slug}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(exerciseUrl)}`;

  return (
    <><PageSearchSchema path={`/exercises/${slug}`} name={exercise.title} description={`${exercise.title} exercise instructions from Go Chiro Mobile.`} /><Section tone="white" className="pt-8 pb-16 sm:pt-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link href="/exercises" className="mb-5 inline-block text-sm font-semibold text-sky-700 hover:underline">
            ← Exercise Library
          </Link>
          <h1 className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">{exercise.title}</h1>
          <img
            src={exercise.image}
            alt={`${exercise.title} exercise guide from Go Chiro Mobile`}
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
    </Section></>
  );
}
