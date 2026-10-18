import { SERVICE_AREA_STATEMENT } from "@/lib/serviceArea";
import PageSearchSchema from "@/components/PageSearchSchema";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ZipChecker from "@/components/ZipChecker";
import { SHOULDER_EXERCISE_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/businessSchema";
import { LOCAL_AREAS } from "@/lib/localAreas";
import Testimonials from "@/components/Testimonials";
import styles from "./home.module.css";

const title = "Mobile Chiropractor in Delaware County & Surrounding Areas";
const description =
  "Personalized mobile chiropractic care with Dr. David DeFries, DC. Thoughtful evaluation, patient education, and goal-directed treatment at your home or workplace in Delaware County and surrounding areas.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title,
  description,
};

const principles = [
  {
    title: "Understand the bigger picture",
    text: "We look beyond the painful area to consider your history, how you move, and what may be contributing to the problem.",
  },
  {
    title: "Care based on your needs",
    text: "Your examination, concerns, and goals guide treatment—not a preset routine applied to every patient.",
  },
  {
    title: "Knowledge you can use",
    text: "Clear explanations and practical guidance help you take an active role in better movement and function between visits.",
  },
];

const steps = [
  {
    title: "Start with your goals",
    text: "We discuss your concerns and evaluate how the problem affects your movement and everyday activities.",
  },
  {
    title: "Choose care thoughtfully",
    text: "When appropriate, treatment is based on the examination and may include adjustments, soft tissue work, or guided movement.",
  },
  {
    title: "Leave understanding your next step",
    text: "You learn what we found, what you can do between visits, and whether further care makes sense for you.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function HomePage() {
  return (
    <>
      <PageSearchSchema path="/" name={title} description={description} />
      <JsonLd data={localBusinessSchema(Object.values(LOCAL_AREAS))} />
      <div className={styles.home}>
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Mobile chiropractic care · Delaware County, PA</p>
                <h1>Chiropractic care that looks <span>beyond where it hurts.</span></h1>
                <p className={styles.lead}>
                  Relieving pain matters. So does understanding what is contributing to it. I take
                  time to examine, explain what I find, and tailor care to your goals—so you can
                  move better, function better, and make informed decisions about your health.
                </p>
                <p className={styles.support}>
                  One-on-one visits with Dr. David DeFries, DC, at your home or workplace.
                </p>
                <p className={styles.area}>{SERVICE_AREA_STATEMENT}</p>
                <div className={styles.actions}>
                  <Link className={styles.primary} href="#service-area">
                    Check availability <Arrow />
                  </Link>
                  <Link className={styles.outline} href="/philosophy">
                    Explore my approach
                  </Link>
                </div>
              </div>
              <div className={styles.heroPhoto}>
                <Image
                  src={SHOULDER_EXERCISE_IMAGE.src}
                  alt={SHOULDER_EXERCISE_IMAGE.alt}
                  fill
                  priority
                  sizes="(min-width: 900px) 45vw, 100vw"
                  className={styles.photo}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={[styles.wrap, styles.section].join(" ")} aria-labelledby="approach-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>My approach to care</p>
              <h2 id="approach-heading">Understand first.<br />Make progress together.</h2>
            </div>
            <p>
              Good care is more than a quick adjustment. We start by understanding the problem
              and work toward the improvements that matter to you.
            </p>
          </div>
          <div className={styles.people}>
            {principles.map((item, i) => (
              <div className={styles.person} key={item.title}>
                <span className={styles.number}>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <Link href="/philosophy" className={styles.textLink}>
            Read my philosophy of care <Arrow />
          </Link>
        </section>

        <section className={[styles.wrap, styles.doctor].join(" ")} aria-labelledby="doctor-heading">
          <div className={styles.doctorPhoto}>
            <Image
              src={DOCTOR_PORTRAIT_IMAGE.src}
              alt={DOCTOR_PORTRAIT_IMAGE.alt}
              fill
              sizes="(min-width: 900px) 35vw, 100vw"
              className={styles.photo}
            />
          </div>
          <div className={styles.doctorCopy}>
            <p className={styles.eyebrow}>Meet your chiropractor</p>
            <h2 id="doctor-heading">Experience matters.<br />So does being heard.</h2>
            <p>
              I&apos;m Dr. David DeFries, a third-generation chiropractor practicing since 2003.
              I grew up seeing the value of a doctor who knows their patients, listens carefully,
              and takes time to explain what is happening.
            </p>
            <p>
              That&apos;s the kind of care I aim to provide: thoughtful, personal, and focused on helping
              you understand and manage your health—not simply returning for the next adjustment.
            </p>
            <Link href="/about" className={styles.textLink}>
              Meet Dr. DeFries <Arrow />
            </Link>
            <div className={styles.credentials}>
              <div><strong>2003</strong><span>In practice since</span></div>
              <div><strong>3rd</strong><span>Generation chiropractor</span></div>
            </div>
          </div>
        </section>

        <section className={styles.darkSection} aria-labelledby="visit-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Your visit</p>
                <h2 id="visit-heading">Thoughtful care.<br />Clear next steps.</h2>
              </div>
              <p>From the first conversation to practical guidance you can use afterward.</p>
            </div>
            <div className={styles.steps}>
              {steps.map((step, i) => (
                <div key={step.title}>
                  <span className={styles.stepNumber}>0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <Link href="/what-to-expect" className={styles.darkLink}>
              What to expect at your visit <Arrow />
            </Link>
          </div>
        </section>

        <div className={styles.wrap}><Testimonials /></div>

        <section className={[styles.wrap, styles.section].join(" ")} id="service-area">
          <div className={styles.availability}>
            <div>
              <p className={styles.eyebrow}>Personal care, at your location</p>
              <h2>Ready to take<br /><span>the next step?</span></h2>
              <p>
                Enter your ZIP to view regular online booking options or request a visit
                by arrangement. Appointments are available seven days a week.
              </p>
              <Link href="/service-areas" className={styles.textLink}>
                Explore service areas <Arrow />
              </Link>
            </div>
            <div className={styles.zip}><ZipChecker /></div>
          </div>
          <nav className={styles.resourceLinks} aria-label="More patient information">
            <Link href="/conditions">Conditions we help with <Arrow /></Link>
            <Link href="/treatments">Explore treatments <Arrow /></Link>
            <Link href="/pricing">Visit pricing <Arrow /></Link>
            <Link href="/group-visits">Group visits <Arrow /></Link>
          </nav>
        </section>
      </div>
    </>
  );
}
