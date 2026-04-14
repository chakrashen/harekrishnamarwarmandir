'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, BadgeCheck, Users } from 'lucide-react';
import styles from './Hero.module.css';
import WaveBackdrop from './WaveBackdrop';

const trustBadges = [
  { icon: BadgeCheck, text: '80G Tax Benefit' },
  { icon: ShieldCheck, text: 'Secure Payment' },
  { icon: Users, text: '10,000+ Devotees' },
];

const easeOut = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const staggerGroup = (delay = 0.05, stagger = 0.1) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.heroImageWrap} aria-hidden="true">
          <Image
            src="/home page backgrond image.png"
            alt=""
            fill
            loading="eager"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <WaveBackdrop variant="home" />
        <div className={styles.rays} />
        <div className={styles.particles} />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <motion.div
          className={styles.copyBlock}
          variants={staggerGroup(0.05, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span variants={fadeUp} className={styles.kicker}>Bhakti • Seva • Sanskriti</motion.span>
          <motion.h1 variants={fadeUp} className={styles.headline}>Be Part of Krishna&apos;s Seva in Marwar</motion.h1>
          <motion.p variants={fadeUp} className={styles.supporting}>
            Every contribution builds devotion, feeds devotees, and serves dharma.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.ctaRow}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <a href="/donate" className={`btn ${styles.primaryCta}`}>
            <Heart size={18} /> Offer Your Seva
          </a>
          <a href="/visit" className={`btn btn-outline ${styles.secondaryCta}`}>
            Explore Mandir
          </a>
        </motion.div>

        <motion.div
          className={styles.badgesRow}
          variants={staggerGroup(0.05, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          {trustBadges.map((badge) => (
            <motion.div key={badge.text} className={styles.badgeItem} variants={fadeUp}>
              <badge.icon size={15} aria-hidden="true" />
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.heroFooter}>
          <div className={styles.quickDonate}>
            <span className={styles.quickLabel}>Choose Your Seva</span>
            <motion.div
              className={styles.quickGrid}
              variants={staggerGroup(0.05, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.a href="/donate?amount=501" className={styles.quickCard} variants={fadeUp}>
                <span>₹501</span>
                <span className={styles.quickMeta}>Feeds devotees</span>
              </motion.a>
              <motion.a href="/donate?amount=1101" className={`${styles.quickCard} ${styles.quickRecommended}`} variants={fadeUp}>
                <span>₹1101</span>
                <span className={styles.quickMeta}>1 Day Prasadam Seva</span>
                <span className={styles.quickTag}>Recommended</span>
              </motion.a>
              <motion.a href="/donate?amount=2101" className={styles.quickCard} variants={fadeUp}>
                <span>₹2101</span>
                <span className={styles.quickMeta}>Temple Construction Support</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
