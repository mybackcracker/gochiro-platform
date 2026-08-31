import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalArea, getLocalAreaSlugs } from "@/lib/localAreas";
import LocalAreaPage from "@/components/LocalAreaPage";

export function generateStaticParams() {
  return getLocalAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getLocalArea(slug);
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function LocalAreaRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getLocalArea(slug);
  if (!content) notFound();
  return <LocalAreaPage content={content} />;
}
