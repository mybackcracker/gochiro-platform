import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/articles";
import { SCHEMA_SITE_URL, BUSINESS_SCHEMA_ID } from "@/lib/businessSchema";
import JsonLd from "@/components/JsonLd";
import styles from "../article.module.css";

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find(item => item.slug === slug);
  if (!article) notFound();
  const url = `/articles/${article.slug}`;
  return {
    title: "Emergency Chiropractor in Delaware County: Where to Get Care",
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.description, url, type: "article", publishedTime: article.published, images: [{ url: article.image, alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find(item => item.slug === slug);
  if (!article) notFound();
  const url = `${SCHEMA_SITE_URL}/articles/${article.slug}`;
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, datePublished: `${article.published}T17:30:00-04:00`, image: `${SCHEMA_SITE_URL}${article.image}`, mainEntityOfPage: url, author: { "@type": "Person", name: "Dr. David DeFries", url: `${SCHEMA_SITE_URL}/about` }, publisher: { "@id": BUSINESS_SCHEMA_ID } }} />
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/articles" className="text-sm font-semibold text-navy underline underline-offset-4">Articles & Patient Education</Link>
      <header className="mt-6">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">{article.title}</h1>
        <p className="mt-5 text-sm text-muted">By <Link href="/about" className="underline">Dr. David DeFries</Link> · <time dateTime={article.published}>October 15, 2026</time></p>
      </header>
      <Image src={article.image} alt={article.imageAlt} width={1024} height={572} priority sizes="(min-width: 896px) 848px, 100vw" className="my-8 h-auto w-full rounded-xl" />
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
    </article>
  </>;
}
