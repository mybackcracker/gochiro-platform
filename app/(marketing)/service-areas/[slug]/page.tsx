import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocalArea, getLocalAreaSlugs } from "@/lib/localAreas";
import LocalAreaPage from "@/components/LocalAreaPage";
import JsonLd from "@/components/JsonLd";
import { townServiceSchema } from "@/lib/businessSchema";

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
    // Put the location first so Google's compact mobile sitelinks remain
    // distinguishable instead of all truncating to "Mobile Chiropractor…".
    title: `${content.town}, PA Mobile Chiropractor | Go Chiro Mobile`,
    description: content.metaDescription,
    alternates: { canonical: `/service-areas/${content.slug}` },
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
  return (
    <>
      <JsonLd data={townServiceSchema(content)} />
      <LocalAreaPage content={content} />
    </>
  );
}
