'use client';
import { motion } from 'framer-motion';
import { MapPin, Heart, ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <p
          className={styles.greeting}
        >
          ✦ ॥ हरे कृष्ण ॥ ✦
        </p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05, ease: 'easeOut' }}
        >
          Hare Krishna<br />Marwar Mandir
        </motion.h1>

        <motion.div
          className={styles.location}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
        >
          <MapPin size={16} /> Jodhpur, Rajasthan
        </motion.div>

        <motion.div
          className={styles.verseBox}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.48, ease: 'easeOut' }}
        >
          <p className={styles.verse}>
            &ldquo;सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।<br />
            अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥&rdquo;
          </p>
          <p className={styles.verseRef}>— Bhagavad Gita 18.66</p>
        </motion.div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: 'easeOut' }}
        >
          <a href="/donate" className={`btn btn-donate ${styles.primaryCta}`}>
            <Heart size={18} /> Donate for Seva
          </a>
          <a href="/visit" className={`btn btn-outline ${styles.secondaryCta}`}>
            Plan Your Visit <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.86, ease: 'easeOut' }}
        >
          {[
            { num: '14+', label: 'Years of Seva' },
            { num: '50,000+', label: 'Lives Touched' },
            { num: '50L+', label: 'Meals Served' },
            { num: '200+', label: 'Festivals' },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
