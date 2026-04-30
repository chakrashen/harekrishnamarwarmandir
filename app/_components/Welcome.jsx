'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import styles from './Welcome.module.css';
import thumbImg from '../../public/temple-intro-video-thumbnail.jpg';

const YOUTUBE_VIDEO_ID = 't1Qoh6UWhWc';

export default function Welcome() {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlay = () => {
    setShowVideo(true);
  };

  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <ScrollReveal y={0} className={styles.videoSide}>
            <div className={styles.videoPlaceholder}>

              {showVideo ? (
                /* YouTube iframe — autoplay + unmute after user click */
                <iframe
                  className={styles.videoIframe}
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="Hare Krishna Marwar Mandir — Temple Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* Custom thumbnail + play button */
                <div className={styles.thumbnailWrapper} onClick={handlePlay}>
                  <Image
                    src={thumbImg}
                    alt="Temple intro video thumbnail"
                    className={styles.videoThumb}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 400px"
                    quality={70}
                    priority={false}
                  />
                  <div className={styles.videoOverlay} />
                  <div className={styles.playBtnContainer}>
                    <button className={styles.playBtn} aria-label="Play temple introduction video">
                      <Play size={32} fill="white" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </ScrollReveal>
          <motion.div
            className={styles.textSide}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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
            <a href="/visit" className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }}>
              Explore Mandir
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
