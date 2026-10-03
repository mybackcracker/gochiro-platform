import Link from "next/link";
import JsonLd from "./JsonLd";
import { Container, H2, Section } from "./ui";
import type { FAQItem } from "@/lib/faqs";
import { SCHEMA_SITE_URL } from "@/lib/businessSchema";

export default function FAQs({ items, path, title }: {
  items: FAQItem[];
  path: string;
  title: string;
}) {
  if (items.length === 0) return null;
  return (
    <Section tone="cream">
      <Container>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SCHEMA_SITE_URL}${path}#faq`,
          mainEntity: items.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }} />
        <div className="max-w-3xl">
          <H2>{title}</H2>
          <div className="mt-6 divide-y divide-line">
            {items.map(({ question, answer, links }) => (
              <div key={question} className="py-6">
                <h3 className="font-heading text-xl font-bold text-ink">{question}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{answer}</p>
                {links && (
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-label="Related pages">
                    {links.map(({ label, href }) => (
                      <li key={href}>
                        <Link href={href} className="font-semibold text-navy underline underline-offset-4">{label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
