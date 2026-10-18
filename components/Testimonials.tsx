import { GOOGLE_BUSINESS_PROFILE_URL, TESTIMONIALS } from "@/lib/testimonials";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="patient-reviews-heading">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Patient perspectives</p>
          <h2 id="patient-reviews-heading">In patients’ own words.</h2>
        </div>
        <p>Real patient feedback about listening, education, and the care experience. Read the full reviews on Google.</p>
      </div>
      <div className={styles.grid}>
        {TESTIMONIALS.map((review) => (
          <figure className={styles.card} key={review.id}>
            <p className={styles.theme}>{review.theme}</p>
            <blockquote><p>“{review.quote}”</p></blockquote>
            <figcaption>{review.name}<span>Google review excerpt</span></figcaption>
          </figure>
        ))}
      </div>
      <a className={styles.link} href={GOOGLE_BUSINESS_PROFILE_URL}>
        Read our Google reviews <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
