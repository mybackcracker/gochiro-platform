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

const title = "Mobile Chiropractor in Delaware County, PA & Surrounding Areas";
const description =
  "Mobile chiropractic evaluation and hands-on treatment with Dr. David DeFries, DC, at home or work in Delaware County and surrounding areas. Check availability and fees.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title,
  description,
};

const principles = [
  {
    title: "Evaluation and hands-on treatment",
    text: "Your visit begins with an examination. Treatment is based on what the examination finds.",
  },
  {
    title: "The equipment comes to you",
    text: "Dr. DeFries brings the chiropractic table and equipment to your home or workplace.",
  },
  {
    title: "Understand your next steps",
    text: "Get an explanation of the findings and practical guidance for what to do between visits.",
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
                <p className={styles.eyebrow}>Go Chiro Mobile</p>
                <h1>Mobile Chiropractor in Delaware County, PA &amp; Surrounding Areas</h1>
                <p className={styles.tagline}>Get chiropractic care at home or work.</p>
                <p className={styles.lead}>
                  Dr. David DeFries, DC brings one-on-one evaluation and hands-on treatment
                  to you—for back pain, neck pain, stiffness, and difficulty moving comfortably.
                </p>
                <p className={styles.area}>{SERVICE_AREA_STATEMENT}</p>
                <div className={styles.actions}>
                  <Link className={styles.primary} href="#service-area">
                    Check Availability &amp; Fees
                  </Link>
                  <Link className={styles.outline} href="#mobile-care">
                    Learn About Mobile Care
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

        <section className={[styles.wrap, styles.section].join(" ")} id="mobile-care" aria-labelledby="approach-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>My approach to care</p>
              <h2 id="approach-heading">Chiropractic care that looks beyond where it hurts</h2>
            </div>
            <p>
              Care at your location includes evaluation, appropriate treatment, and an
              explanation of what comes next.
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
              <h2>Check availability &amp; fees</h2>
              <p>
                Enter your ZIP to view regular online booking options or request a visit
                by arrangement. Your price is shown during scheduling, before you confirm.
                Available times depend on your location and visit type.
              </p>
              <div className={styles.actions}>
                <Link href="/service-areas" className={styles.textLink}>Explore service areas</Link>
              </div>
            </div>
            <div className={styles.zip}><ZipChecker /></div>
          </div>
          <nav className={styles.resourceLinks} aria-label="More patient information">
            <Link href="/conditions">Conditions we help with <Arrow /></Link>
            <Link href="/treatments">Explore treatments <Arrow /></Link>
            <Link href="/pricing">Visit pricing <Arrow /></Link>
            <Link href="/group-visits">Group visits <Arrow /></Link>
            <Link href="/workplace-care">Workplace care <Arrow /></Link>
          </nav>
        </section>
      </div>
    </>
  );
}
