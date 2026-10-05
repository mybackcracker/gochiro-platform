import Image from "next/image";
import Link from "next/link";
import { Container, CTAButton } from "@/components/ui";
import { getCondition, type ConditionContent } from "@/lib/conditions";
import CareGoals from "./GoalIcons";
import WholePersonBanner from "./WholePersonBanner";

export default function ConditionPage({ content }: { content: ConditionContent }) {
  const photos: Record<string, { src: string; alt: string; width: number; height: number }> = {
    "low-back-pain": { src: "/images/care/home-low-back-adjustment.jpg", alt: "Dr. David DeFries performing a chiropractic adjustment on a portable table in a home", width: 360, height: 480 },
    "neck-pain": { src: "/images/care/neck-care.jpg", alt: "Dr. David DeFries providing hands-on neck care during a house call", width: 1400, height: 1050 },
    "shoulder-pain": { src: "/images/care/shoulder-soft-tissue.jpg", alt: "Targeted hands-on soft tissue care around the shoulder", width: 1050, height: 1400 },
    "upper-back-pain": { src: "/images/care/upper-back-soft-tissue.jpg", alt: "Dr. David DeFries providing instrument-assisted soft tissue care around the upper back", width: 1050, height: 1400 },
  };
  const photo = photos[content.slug];
  const hasPhoto = Boolean(photo);
  return <article className="py-10 sm:py-16"><Container>
    <Link href="/conditions" className="inline-flex min-h-11 items-center text-sm font-semibold text-navy hover:underline">← All conditions & concerns</Link>
    <header className={`mt-5 grid items-center gap-8 ${hasPhoto ? "lg:grid-cols-[1.15fr_.85fr] lg:gap-14" : "max-w-3xl"}`}>
      <div>
        <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">{content.heroTitle}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink">{content.intro}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">Chiropractic evaluation and care at your home or workplace in Delaware County and surrounding service areas.</p>
        <div className="mt-7"><CTAButton href="/book-online">Book Online →</CTAButton></div>
      </div>
      {photo && <figure className="mx-auto w-full max-w-sm lg:max-w-none">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} preload sizes="(min-width: 1024px) 440px, (min-width: 640px) 384px, 100vw" className="h-auto w-full rounded-2xl"/>
        <figcaption className="mt-3 text-sm text-muted">Chiropractic care brought to your location.</figcaption>
      </figure>}
    </header>
    <CareGoals mobilityLabel={content.mobilityLabel} mobilityIcon={content.mobilityIcon} activity={content.activity}/>
    <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <section><h2 className="font-heading text-2xl font-bold text-navy">What may contribute to {content.title.toLowerCase()}?</h2><p className="mt-4 text-base leading-relaxed text-ink">{content.contributing}</p></section>
      <section aria-labelledby="related-conditions"><h2 id="related-conditions" className="font-heading text-2xl font-bold text-navy">Conditions often seen with {content.title.toLowerCase()}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">{content.related.map((slug) => { const related = getCondition(slug); return related && <li key={slug}><Link href={`/conditions/${slug}`} className="flex min-h-12 items-center justify-between gap-3 rounded-xl bg-cream px-4 py-3 font-semibold text-navy hover:bg-navy/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">{related.title}<span aria-hidden="true">→</span></Link></li>; })}</ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">These concerns may occur together, but do not always share the same cause.</p>
      </section>
    </div>
    <section className="mt-10 border-t border-line pt-9"><h2 className="font-heading text-2xl font-bold text-navy">Care often used for {content.title.toLowerCase()}</h2>
      <div className="mt-5 flex flex-wrap gap-3">{[["Adjustments", "adjustment"], ["Soft tissue care", "soft-tissue"], ["Movement guidance", "exercise"]].map(([label, anchor]) => <Link key={anchor} href={`/treatments#${anchor}`} className="inline-flex min-h-11 items-center rounded-lg bg-cream px-4 py-3 font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">{label}</Link>)}</div>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink">{content.care}</p>
      <p className="mt-3 text-sm text-muted">This information describes care options. An examination is needed to determine what is appropriate for you.</p>
    </section>
    <WholePersonBanner/>
    <section><h2 className="font-heading text-2xl font-bold text-navy">Practical guidance at your location</h2><p className="mt-4 max-w-3xl text-base leading-relaxed text-ink">{content.home}</p></section>
    <section className="mt-10 border-t border-line pt-8" aria-labelledby="safety"><h2 id="safety" className="font-heading text-xl font-bold text-navy">Symptoms that need urgent medical attention</h2>
      {content.slug === "low-back-pain" ? <><ul className="mt-4 list-disc space-y-2 pl-5 text-base text-ink"><li>New trouble urinating or loss of bladder or bowel control</li><li>New numbness around the groin or saddle area</li><li>Severe or rapidly worsening leg weakness</li></ul><p className="mt-4 font-semibold text-ink">Seek emergency medical evaluation if these symptoms occur. Do not wait for a chiropractic appointment.</p></> : <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink">{content.safety}</p>}
    </section>
    <section className="mt-10 rounded-2xl bg-cream p-7 sm:p-9"><h2 className="font-heading text-2xl font-bold text-navy">Care that comes to you.</h2><p className="mt-3 mb-6 text-ink">Check your location and choose a visit online.</p><CTAButton href="/book-online">Book Online →</CTAButton></section>
  </Container></article>;
}
