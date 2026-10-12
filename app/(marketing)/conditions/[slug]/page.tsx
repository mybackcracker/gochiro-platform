import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONDITIONS, getCondition, type ConditionContent } from "@/lib/conditions";
import PageSearchSchema from "@/components/PageSearchSchema";
import ConditionPage from "@/components/care/ConditionPage";

function searchText(content: ConditionContent) {
  const shortNames: Record<string, string> = { sciatica: "Sciatica", headaches: "Headaches", whiplash: "Whiplash", "repetitive-strain": "Repetitive Strain" };
  const topic = shortNames[content.slug] || content.title;
  return {
    title: `${topic} Care in Delaware County | Go Chiro Mobile`,
    description: `Mobile chiropractic evaluation and care for ${topic.toLowerCase()} at your home or workplace in Delaware County, PA.`,
  };
}

export function generateStaticParams() {
  return CONDITIONS.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getCondition(slug);
  if (!content) return {};
  const { title, description } = searchText(content);
  const url = `/conditions/${slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", ...(slug === "low-back-pain" ? { images: [{ url: "/images/care/home-low-back-adjustment.jpg", width: 360, height: 480, alt: "Dr. David DeFries providing chiropractic care in a home" }] } : {}) } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getCondition(slug);
  if (!content) notFound();
  const { title, description } = searchText(content);
  return <><PageSearchSchema path={`/conditions/${slug}`} name={title} description={description} /><ConditionPage content={content}/></>;
}
