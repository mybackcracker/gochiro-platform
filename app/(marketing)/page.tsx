import PageSearchSchema from "@/components/PageSearchSchema";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ZipChecker from "@/components/ZipChecker";
import { BUSINESS_HOURS } from "@/lib/gochiro";
import { HOME_VISIT_IMAGE, DOCTOR_PORTRAIT_IMAGE } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/businessSchema";
import { LOCAL_AREAS } from "@/lib/localAreas";
import styles from "./home.module.css";

const description = "Personalized mobile chiropractic care in Delaware County and the Main Line, with Chester County and Philadelphia visits by arrangement.";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Mobile Chiropractor in the Greater Philadelphia Region",
  description,
};
const people = [
  ["Pain or trouble moving", "An evaluation, clear explanations, and care based on what we find."],
  ["Busy schedules", "When the drive and waiting room don’t fit your day."],
  ["Difficulty traveling", "Care at home for people who are homebound or have limited mobility."],
  ["Personal attention", "One-on-one care, whether you’re new to chiropractic or looking for a different approach."],
  ["Function & wellness", "Support for better movement and ongoing wellness, guided by your goals."],
];
const steps = [
  ["Start with your goals", "We discuss your concerns, evaluate the problem, and assess how you’re moving."],
  ["Care that fits your findings", "Treatment begins during the same visit when appropriate, based on your examination."],
  ["Leave with a clear next step", "Understand the findings, what you can do between visits, and whether further care makes sense."],
];
function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function HomePage() {
  return <>
    <PageSearchSchema path="/" name="Mobile Chiropractor in the Greater Philadelphia Region" description={description} />
    <JsonLd data={localBusinessSchema(Object.values(LOCAL_AREAS))} />
    <div className={styles.home}>
      <div className={styles.notice}><span><i aria-hidden="true" />Appointments available 7 days a week</span><a href="sms:+16104940412">Need care today? Text 610-494-0412 <Arrow /></a></div>
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Mobile chiropractic · Since 2003</p>
              <h1>Personal care.<br /><span>Your place.</span></h1>
              <p className={styles.lead}>One-on-one chiropractic care with Dr. David DeFries, DC, at your home or workplace. The table, the equipment, and the attention come to you.</p>
              <p className={styles.area}>Delaware County &amp; the Main Line. Chester County and Philadelphia by arrangement.</p>
              <div className={styles.actions}><Link className={styles.primary} href="#service-area">Check your availability <Arrow /></Link><Link className={styles.outline} href="/what-to-expect">What to expect</Link></div>
            </div>
            <div className={styles.heroPhoto}><Image src={HOME_VISIT_IMAGE.src} alt={HOME_VISIT_IMAGE.alt} fill priority sizes="(min-width: 900px) 48vw, 100vw" className={styles.photo} /><div className={styles.photoNote}>Less travel for you.<br /><strong>More time for your care.</strong></div></div>
          </div>
        </div>
      </section>
      <div className={styles.concerns}><div className={styles.wrap}><span className={styles.eyebrow}>Common concerns</span>{["Back pain", "Neck pain", "Headaches", "Sciatica", "Joint pain"].map(x => <span key={x}>{x}</span>)}</div></div>
      <section className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectionHeading}><h2>Care built around<br />how you live.</h2><p>Relief, better movement, and ongoing wellness. We start with what matters to you and review your progress together.</p></div>
        <div className={styles.people}>{people.map(([title, text], i) => <div className={styles.person} key={title}><span className={styles.number}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>
      <section className={`${styles.wrap} ${styles.careGrid}`}>
        <div className={styles.carePhoto}><Image src="/images/home-shoulder-care.jpg" alt="Dr. David DeFries assisting a patient with shoulder movement during a home visit" fill sizes="(min-width: 900px) 48vw, 100vw" className={styles.shoulderPhoto} /></div>
        <div className={styles.careCopy}><p className={styles.eyebrow}>More than a quick adjustment</p><h2>Your concerns.<br />Your goals.<br /><span>Your care.</span></h2><p>Chiropractic manipulation or mobilization, soft tissue therapy, electrotherapy, and guided movement may be included when appropriate. Your examination helps determine what fits.</p><Link href="/what-to-expect" className={styles.textLink}>See what a visit includes <Arrow /></Link></div>
      </section>
      <section className={styles.darkSection}><div className={styles.wrap}><div className={styles.sectionHeading}><h2>Your first visit,<br />made clear.</h2><p>I bring the treatment table and equipment to your home or workplace.</p></div><div className={styles.steps}>{steps.map(([title, text], i) => <div key={title}><span className={styles.stepNumber}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
      <section className={`${styles.wrap} ${styles.doctor}`}>
        <div className={styles.doctorPhoto}><Image src={DOCTOR_PORTRAIT_IMAGE.src} alt={DOCTOR_PORTRAIT_IMAGE.alt} fill sizes="(min-width: 900px) 35vw, 100vw" className={styles.photo} /></div>
        <div><p className={styles.eyebrow}>Meet your doctor</p><h2>Dr. David<br />DeFries, DC</h2><p>A third-generation chiropractor practicing since 2003. A Parker College of Chiropractic graduate providing personalized mobile care in Pennsylvania.</p><Link href="/about" className={styles.textLink}>Meet Dr. DeFries <Arrow /></Link><div className={styles.credentials}><div><strong>2003</strong><span>In practice since</span></div><div><strong>3rd</strong><span>Generation chiropractor</span></div></div></div>
      </section>
      <section className={`${styles.wrap} ${styles.section}`} id="service-area">
        <div className={styles.availability}><div><p className={styles.eyebrow}>Start with your location</p><h2>Do we come<br /><span>to you?</span></h2><p>Enter your ZIP to see regular booking options or request a visit by arrangement.</p><Link href="/service-areas" className={styles.textLink}>Explore service areas <Arrow /></Link></div><div className={styles.zip}><ZipChecker /></div></div>
      </section>
      <section className={`${styles.wrap} ${styles.planning}`}>
        <div className={styles.details}><div><h3>Appointment hours</h3><dl>{[{day:"Monday–Thursday", hours:BUSINESS_HOURS[0].hours}, ...BUSINESS_HOURS.slice(4)].map(x => <div key={x.day}><dt>{x.day}</dt><dd>{x.hours}</dd></div>)}</dl></div><div className={styles.pricing}><p className={styles.eyebrow}>Clear costs before you commit</p><h3>Know your price<br />before booking.</h3><p>Regular online booking shows your exact price before you confirm. Visits by arrangement are individually quoted for care and travel and require a deposit to confirm.</p><p>No payment is required to request a visit.</p><Link href="/pricing" className={styles.textLink}>View regular booking prices <Arrow /></Link></div></div>
      </section>
      <section className={`${styles.wrap} ${styles.beyond}`}><div><p className={styles.eyebrow}>Care beyond the everyday</p><h2>Philadelphia.<br />Backstage.<br />On location.</h2></div><div><p>Visits for individuals, hotel guests, workplaces, performers, and touring crews are available by arrangement at Pennsylvania locations.</p><div className={styles.beyondLinks}><Link href="/philadelphia">Explore Philadelphia care <Arrow /></Link><Link href="/philadelphia/hotel-visits">Hotel &amp; traveler visits <Arrow /></Link><Link href="/touring-production-care">Touring &amp; production care <Arrow /></Link></div></div></section>
      <section className={styles.last}><div className={styles.wrap}><h2>Stay where you are.<br /><span>We’ll come to you.</span></h2><div className={styles.actions}><Link className={styles.primary} href="#service-area">Check your availability <Arrow /></Link><a href="sms:+16104940412" className={styles.outline}>Text 610-494-0412</a></div></div></section>
    </div>
  </>;
}
