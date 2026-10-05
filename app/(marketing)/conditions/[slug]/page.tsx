import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONDITIONS, getCondition } from "@/lib/conditions";
import ConditionPage from "@/components/care/ConditionPage";

export function generateStaticParams() {
  return CONDITIONS.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getCondition(slug);
  if (!content) return {};
  const title = `${content.title} Care in Delaware County | Go Chiro Mobile`;
  const url = `/conditions/${slug}`;
  return { title, description: content.description, alternates: { canonical: url }, openGraph: { title, description: content.description, url, type: "website", ...(slug === "low-back-pain" ? { images: [{ url: "/images/care/home-low-back-adjustment.jpg", width: 360, height: 480, alt: "Dr. David DeFries providing chiropractic care in a home" }] } : {}) } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getCondition(slug);
  if (!content) notFound();
  return <ConditionPage content={content}/>;
}
