'use client';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, BadgeCheck, Users } from 'lucide-react';
import styles from './Hero.module.css';
import WaveBackdrop from './WaveBackdrop';

const trustBadges = [
  { icon: BadgeCheck, text: '80G Tax Benefit' },
  { icon: ShieldCheck, text: 'Secure Payment' },
  { icon: Users, text: '10,000+ Devotees' },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <WaveBackdrop variant="home" />
        <div className={styles.rays} />
        <div className={styles.particles} />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.copyBlock}>
          <span className={styles.kicker}>Bhakti • Seva • Sanskriti</span>
          <h1 className={styles.headline}>Be Part of Krishna&apos;s Seva in Marwar</h1>
          <p className={styles.supporting}>
            Every contribution builds devotion, feeds devotees, and serves dharma.
          </p>
        </div>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <a href="/donate" className={`btn ${styles.primaryCta}`}>
            <Heart size={18} /> Offer Your Seva
          </a>
          <a href="/visit" className={`btn btn-outline ${styles.secondaryCta}`}>
            Explore Mandir
          </a>
        </motion.div>

        <div className={styles.badgesRow}>
          {trustBadges.map((badge) => (
            <div key={badge.text} className={styles.badgeItem}>
              <badge.icon size={15} aria-hidden="true" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.heroFooter}>
          <div className={styles.quickDonate}>
            <span className={styles.quickLabel}>Choose Your Seva</span>
            <div className={styles.quickGrid}>
              <a href="/donate?amount=501" className={styles.quickCard}>
                <span>₹501</span>
                <span className={styles.quickMeta}>Feeds devotees</span>
              </a>
              <a href="/donate?amount=1101" className={`${styles.quickCard} ${styles.quickRecommended}`}>
                <span>₹1101</span>
                <span className={styles.quickMeta}>1 Day Prasadam Seva</span>
                <span className={styles.quickTag}>Recommended</span>
              </a>
              <a href="/donate?amount=2101" className={styles.quickCard}>
                <span>₹2101</span>
                <span className={styles.quickMeta}>Temple Construction Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
