'use client';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import PosterCarousel from './PosterCarousel';
import TrustBar from './TrustBar';

const easeOut = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Main Welcome Hero">
      {/* Full-width auto-scrolling poster carousel */}
      <PosterCarousel />

      {/* Compact headline + CTA block below carousel */}
      <motion.div
        className={styles.heroContent}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <div className={styles.copyBlock}>
            <motion.h1 variants={fadeUp} className={styles.headline}>
              A Sacred Home for Krishna Is Rising.{' '}
              <span className={styles.headlineAccent}>Claim Your Sq. Ft.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className={styles.ctaRow}>
              <a href="/donate?seva=mandir-nirman" className={`btn ${styles.primaryCta}`}>
                🛕 Claim Your Sq. Ft. — ₹2,500
              </a>
              <a href="#seva-highlights" className={`btn btn-outline ${styles.secondaryCta}`}>
                Explore All Seva Options →
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className={styles.microCta}>
              Prefer to start smaller?{' '}
              <a href="/donate?seva=mandir-nirman&amount=101" className={styles.microCtaLink}>
                Sponsor a brick for ₹101 →
              </a>
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Trust credentials strip */}
      <TrustBar />
    </section>
  );
}
