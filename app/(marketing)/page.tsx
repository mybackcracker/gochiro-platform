import { SERVICE_AREA_STATEMENT } from "@/lib/serviceArea";
import PageSearchSchema from "@/components/PageSearchSchema";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ZipChecker from "@/components/ZipChecker";
import { HOME_VISIT_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
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

const people = [
  {
    title: "Pain affecting everyday life",
    text: "Back, neck, shoulder, or joint discomfort making it harder to work, sleep, walk, or get through your day.",
  },
  {
    title: "Stiffness or limited movement",
    text: "Difficulty turning, bending, reaching, or returning to the activities you want to do more comfortably.",
  },
  {
    title: "Care that fits your day",
    text: "One-on-one chiropractic care at home or work, without the trip to an office. Your examination and goals guide the plan.",
  },
];

const steps = [
  {
    title: "Talk & examine",
    text: "We discuss your concerns and evaluate how the problem affects your movement and everyday activities.",
  },
  {
    title: "Care chosen for you",
    text: "When appropriate, treatment is based on the examination and may include adjustments, soft tissue work, or guided movement.",
  },
  {
    title: "A clear next step",
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
                <h1>Your chiropractor.<br /><span>Your own front door.</span></h1>
                <p className={styles.lead}>
                  Back pain, neck stiffness, or movement that feels harder than it should?
                  I bring personalized chiropractic care to your home or workplace,
                  starting with an examination and a conversation about what matters to you.
                </p>
                <p className={styles.support}>
                  One-on-one visits with Dr. David DeFries, DC, at your home or workplace.
                </p>
                <p className={styles.area}>{SERVICE_AREA_STATEMENT}</p>
                <div className={styles.actions}>
                  <Link className={styles.primary} href="#service-area">
                    Check availability & book <Arrow />
                  </Link>
                  <Link className={styles.outline} href="/what-to-expect">
                    What is a house call like?
                  </Link>
                </div>
              </div>
              <div className={styles.heroPhoto}>
                <Image
                  src={HOME_VISIT_IMAGE.src}
                  alt={HOME_VISIT_IMAGE.alt}
                  fill
                  priority
                  sizes="(min-width: 1180px) 470px, (min-width: 701px) 42vw, calc(100vw - 36px)"
                  className={styles.photo}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={[styles.wrap, styles.section].join(" ")} id="service-area" aria-labelledby="booking-heading">
          <div className={styles.availability}>
            <div>
              <p className={styles.eyebrow}>Book your first visit</p>
              <h2 id="booking-heading">First, let’s check<br /><span>your location.</span></h2>
              <p>
                Enter your ZIP, choose New Patient, and select an available time.
                Your location and exact price are confirmed before you book.
                Outside the regular area? You can request a visit by arrangement.
              </p>
              <p className={styles.bookingNote}>After booking, complete your intake so I can review your history before I arrive.</p>
              <Link href="/service-areas" className={styles.textLink}>
                Explore service areas <Arrow />
              </Link>
            </div>
            <div className={styles.zip}><ZipChecker /></div>
          </div>
        </section>

        <section className={[styles.wrap, styles.section].join(" ")} aria-labelledby="people-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Who I help</p>
              <h2 id="people-heading">When moving hurts,<br />let’s start there.</h2>
            </div>
            <p>
              You do not need to know which treatment you need before booking.
              We start by understanding your symptoms, movement, and goals.
            </p>
          </div>
          <div className={styles.people}>
            {people.map((item, i) => (
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

        <section className={styles.darkSection} aria-labelledby="visit-heading">
          <div className={styles.wrap}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Your first house call</p>
                <h2 id="visit-heading">Here’s what happens<br />when I arrive.</h2>
              </div>
              <p>I bring a portable treatment table. You bring your questions. Wear loose, comfortable clothing and leave room for the table.</p>
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


        <section className={[styles.wrap, styles.doctor, styles.doctorSection].join(" ")} aria-labelledby="doctor-heading">
          <div className={styles.doctorPhoto}>
            <Image
              src={DOCTOR_PORTRAIT_IMAGE.src}
              alt={DOCTOR_PORTRAIT_IMAGE.alt}
              fill
              sizes="(min-width: 1180px) 445px, (min-width: 701px) 36vw, calc(100vw - 36px)"
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

        <div className={styles.wrap}><Testimonials /></div>
        <section className={[styles.wrap, styles.section, styles.finalCta].join(" ")} aria-labelledby="ready-heading">
          <p className={styles.eyebrow}>Care starts with a conversation</p>
          <h2 id="ready-heading">Ready for your first house call?</h2>
          <p>Check your location to see visit options. Have a question first? <Link href="/contact" className={styles.textLink}>Contact the practice <Arrow /></Link></p>
          <Link href="#service-area" className={styles.primary}>Check availability & book <Arrow /></Link>
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

