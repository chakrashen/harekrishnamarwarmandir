'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.rays} />
        <div className={styles.particles} />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <p className={styles.eyebrow}>Hare Krishna • Jodhpur, Rajasthan</p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          Experience Divine Seva with Lord Krishna
        </motion.h1>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut', delay: 0.04 }}
        >
          Serve, Support, and Be Blessed
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut', delay: 0.06 }}
        >
          <a href="/donate" className={`btn ${styles.primaryCta}`}>
            <Heart size={18} /> Offer Your Seva
          </a>
        </motion.div>
      </div>
    </section>
  );
}
