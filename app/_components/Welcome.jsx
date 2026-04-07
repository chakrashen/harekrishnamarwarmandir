'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import styles from './Welcome.module.css';

export default function Welcome() {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.videoSide}>
            <div className={styles.videoPlaceholder}>
              <Image
                src="/temple-intro-video-thumbnail.jpg"
                alt="Temple intro video thumbnail"
                className={styles.videoThumb}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
              <div className={styles.videoOverlay} />
              <button className={styles.playBtn}><Play size={32} fill="white" /></button>
            </div>
          </div>
          <motion.div
            className={styles.textSide}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">About Our Temple</span>
            <h2 className={styles.heading}>Welcome to<br />Hare Krishna Marwar Mandir</h2>
            <p className={styles.body}>
              In the royal city of Jodhpur, renowned for its rich heritage and timeless architecture, 
              Hare Krishna Marwar Mandir is envisioned as a magnificent spiritual landmark — 
              a sanctuary of devotion, culture, and divine harmony.
            </p>
            <p className={styles.body}>
              Guided by the teachings of the Bhagavad Gita and Srimad Bhagavatam, we promote 
              devotion, service, and spiritual growth through Annadana Seva, Gau Seva, 
              youth empowerment, and cultural festivals.
            </p>
            <a href="/about" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
              Discover More →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
