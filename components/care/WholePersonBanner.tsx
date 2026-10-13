import Link from "next/link";

export default function WholePersonBanner() {
  return <aside className="my-10 rounded-2xl bg-cream p-7 sm:p-9" aria-label="Our whole-person approach">
    <h2 className="font-heading text-2xl font-bold text-navy">Where it hurts isn’t the whole story.</h2>
    <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink">Past injuries, movement habits, and other complaints may matter. Learn how Dr. DeFries looks beyond the painful area to guide your care.</p>
    <Link href="/whole-person-approach" className="mt-5 inline-flex min-h-11 items-center font-semibold text-navy underline decoration-navy/40 underline-offset-4 hover:decoration-navy">Explore our whole-person approach <span aria-hidden="true" className="ml-2">→</span></Link>
  </aside>;
}
