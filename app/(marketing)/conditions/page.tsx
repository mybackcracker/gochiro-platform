import PageSearchSchema from "@/components/PageSearchSchema";
import type { Metadata } from "next";
import { Container, CTAButton } from "@/components/ui";
import { CONDITIONS } from "@/lib/conditions";
import Link from "next/link";
import { GoalIcon } from "@/components/care/GoalIcons";
import styles from "@/components/care/careEditorial.module.css";
import WholePersonBanner from "@/components/care/WholePersonBanner";

export const metadata: Metadata = { title: "Conditions & Concerns | Go Chiro Mobile", description: "Explore care for back, neck, shoulder, and other muscle and joint concerns. Mobile chiropractic evaluation in Delaware County and surrounding service areas.", alternates: { canonical: "/conditions" } };
export default function Page() {
  return <><PageSearchSchema path="/conditions" name="Conditions & Concerns | Go Chiro Mobile" description="Explore care for back, neck, shoulder, and other muscle and joint concerns. Mobile chiropractic evaluation in Delaware County and surrounding service areas." type="CollectionPage" /><article className={styles.conditionHub}><Container>
      <header className={styles.hubHero}>
        <p className={styles.eyebrow}>Care guided by your concerns</p>
        <h1>Conditions &amp; Concerns</h1>
        <p>Explore common muscle, joint, and movement concerns. Dr. David DeFries provides evaluation and individualized chiropractic care at your location. Your examination helps determine what care is appropriate.</p>
      </header>
      <div className={styles.hubGrid}>{CONDITIONS.map((c) => <Link key={c.slug} href={`/conditions/${c.slug}`} className={styles.hubCard}>
        <GoalIcon kind={c.mobilityIcon}/><h2>{c.title}</h2><p>{c.intro}</p><span>Explore this concern <span aria-hidden="true">→</span></span>
      </Link>)}</div>
      <WholePersonBanner/>
      <div className={styles.bottomCTA}><CTAButton href="/book-online">Book Online →</CTAButton></div>
    </Container></article></>;
}
