'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import styles from './ExploreTemple.module.css';

const places = [
  { title: 'Gau Shala', desc: 'Sacred cow shelter', img: '/explore-gaushala.jpg' },
  { title: 'Anna Daan Kitchen', desc: 'Free meals daily', img: '/explore-kitchen.jpg' },
  { title: 'Bhagavad Gita Classes', desc: 'Weekly study groups', img: '/explore-gita-class.JPG' },
  { title: 'Youth Programs', desc: 'Secrets of Success', img: '/explore-youth.jpg' },
  { title: 'Deity Darshan', desc: 'Divine experience', img: '/explore-darshan.jpg' },
  { title: 'Temple Garden', desc: 'Peaceful sanctuary', img: '/explore-garden.png' },
];

export default function ExploreTemple() {
  return (
    <section className="section-pad">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">Explore</span>
            <h2 className="section-title">Discover Our Temple</h2>
            <div className="section-divider" />
            <p className="section-desc">Become acquainted with the various services, immerse yourself in the transcendental environment.</p>
          </div>
        </ScrollReveal>
        <div className={styles.grid}>
          {places.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.cardImg}>
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className={styles.cardOverlay}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
