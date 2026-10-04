import type { Metadata } from "next";
import { Section, Container, H1, P, ChoiceCard, CTAButton } from "@/components/ui";
import { CONDITIONS } from "@/lib/conditions";
import WholePersonBanner from "@/components/care/WholePersonBanner";

export const metadata: Metadata = { title: "Conditions & Concerns | Go Chiro Mobile", description: "Explore care for back, neck, shoulder, and other muscle and joint concerns. Mobile chiropractic evaluation in Delaware County and surrounding service areas.", alternates: { canonical: "/conditions" } };
export default function Page() {
  return <Section className="pt-12 sm:pt-16"><Container><H1>Conditions &amp; Concerns</H1><P>Explore common muscle, joint, and movement concerns. Dr. David DeFries provides evaluation and individualized chiropractic care at your location. Your examination helps determine what care is appropriate.</P><div className="mt-9"><CTAButton href="/book-online">Book Online →</CTAButton></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{CONDITIONS.map((c) => <ChoiceCard key={c.slug} title={c.title} description={c.intro} href={`/conditions/${c.slug}`} cta="Explore this concern"/>)}</div><WholePersonBanner/></Container></Section>;
}
