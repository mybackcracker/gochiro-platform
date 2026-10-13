import PageSearchSchema from "@/components/PageSearchSchema";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { H2, CTAButton } from "@/components/ui";
import { TREATMENTS } from "@/lib/treatments";
import { GoalIcon } from "@/components/care/GoalIcons";
import styles from "@/components/care/careEditorial.module.css";
import WholePersonBanner from "@/components/care/WholePersonBanner";

export const metadata: Metadata = { title: "Chiropractic Treatments & Care | Go Chiro Mobile", description: "Learn about chiropractic adjustment and mobilization, soft tissue therapy, and exercise with posture guidance at your location.", alternates: { canonical: "/treatments" } };
export default function Page() {
  return <>
    <PageSearchSchema path="/treatments" name="Chiropractic Treatments & Care | Go Chiro Mobile" description="Learn about chiropractic adjustment and mobilization, soft tissue therapy, and exercise with posture guidance at your location." />
    <article className={styles.treatmentsPage}>
      <header className={styles.treatmentHero}>
        <div className={styles.readingWidth}>
          <p className={styles.eyebrow}>Care guided by your goals</p>
          <h1>Treatments<br /><span>&amp; Care</span></h1>
          <p>Many common muscle and joint conditions can be effectively managed with chiropractic manipulation, soft tissue therapies, and education about proper movement. Dr. DeFries selects care based on your examination findings, individual needs, and goals, with an emphasis on decreasing pain, improving function, and supporting ongoing mobility and wellness.</p>
        </div>
      </header>
      <div className={styles.readingWidth}>
        <H2>Fundamental Care</H2>
        <nav aria-label="Treatment sections" className={styles.treatmentNav}>
          {TREATMENTS.map((t, i) => <Link key={t.id} href={`#${t.id}`}><span><small aria-hidden="true">0{i + 1}</small>{t.title}</span><span aria-hidden="true">↓</span></Link>)}
        </nav>
        <section className={styles.goals}>
          <H2>What are we working toward?</H2>
          <p className="mt-4">Your care starts with understanding what is affecting you and what you want to do more comfortably. The overall goals are to decrease pain and improve function.</p>
          <ul><li>Improve joint mobility</li><li>Reduce muscle spasm and tension</li><li>Restore strength, endurance, and coordination</li><li>Improve posture and movement habits</li><li>Address nerve irritation when appropriate for conservative care</li></ul>
          <p>Within Dr. DeFries’s chiropractic approach, care also aims to support healthy nervous system function and overall well-being. Progress is assessed through your symptoms, examination findings, and everyday activities.</p>
        </section>
        {TREATMENTS.map((t, i) => <section key={t.id} id={t.id} className={styles.treatmentSection}>
          <span className={styles.sectionNumber} aria-hidden="true">0{i + 1}</span>
          <H2>{t.title}</H2>
          {t.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <div className={styles.treatmentGoal}>
            <GoalIcon kind={t.id === "exercise" ? "strength" : "pain"}/>
            <p>{t.id === "exercise" ? "Strength, posture, movement control, and everyday function" : "Pain relief and more comfortable movement"}</p>
          </div>
          {(t.id === "soft-tissue" || t.id === "adjustment") && <figure className={styles.treatmentPhoto}>
            <Image src={t.id === "adjustment" ? "/images/care/home-low-back-adjustment.jpg" : "/images/care/soft-tissue-care.jpg"} alt={t.id === "adjustment" ? "Dr. David DeFries performing a chiropractic adjustment during a home visit" : "Dr. David DeFries providing instrument-assisted soft tissue care during a home visit"} width={t.id === "adjustment" ? 360 : 1200} height={t.id === "adjustment" ? 480 : 1600} sizes="(min-width: 700px) 440px, 100vw" />
          </figure>}
        </section>)}
        <WholePersonBanner/>
        <div className={styles.bottomCTA}><CTAButton href="/book-online">Book Online →</CTAButton></div>
      </div>
    </article>
  </>;
}
