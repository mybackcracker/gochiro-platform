import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { Container, Section, PageHeader } from "@/components/ui";
import PageSearchSchema from "@/components/PageSearchSchema";

export const metadata: Metadata = {
  title: "Articles & Patient Education — Go Chiro Mobile",
  description: "Practical guidance on chiropractic home visits, finding care, and moving comfortably from Dr. David DeFries.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return <>
    <PageSearchSchema path="/articles" name="Articles & Patient Education" description="Practical guidance from Dr. David DeFries." type="CollectionPage" />
    <Section><Container>
      <PageHeader eyebrow="From Dr. David DeFries" title="Articles & Patient Education" lede="Practical answers to questions about getting care and making chiropractic visits work for your life." />
      <div className="mt-10 max-w-4xl space-y-10">
        {getArticles().map(article => <article key={article.slug} className="grid gap-6 border-b border-line pb-10 sm:grid-cols-[minmax(0,240px)_1fr]">
          <Link href={`/articles/${article.slug}`} tabIndex={-1} aria-hidden="true">
            <Image src={article.image} alt="" width={1024} height={572} sizes="(min-width: 640px) 240px, 100vw" className="aspect-video w-full rounded-xl object-cover" />
          </Link>
          <div>
            <time dateTime={article.published} className="text-sm text-muted">{new Date(`${article.published}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-ink"><Link href={`/articles/${article.slug}`} className="hover:underline">{article.title}</Link></h2>
            <p className="mt-3 leading-relaxed text-muted">{article.description}</p>
            <Link className="mt-4 inline-block font-semibold text-navy underline underline-offset-4" href={`/articles/${article.slug}`}>Read article</Link>
          </div>
        </article>)}
      </div>
    </Container></Section>
  </>;
}
