'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  { name: 'Devoted Visitor', role: 'Regular Devotee', text: 'The experience at Hare Krishna Marwar Mandir is truly divine. The atmosphere, the kirtans, and the prasadam — everything fills your heart with devotion and peace.', video: 'testimonial-video-1.mp4', thumb: 'testimonial-1.jpg' },
  { name: 'Local Supporter', role: 'Monthly Donor', text: 'I am proud to support this temple\'s mission. The Anna Daan Seva has been feeding hundreds in our community. This is true service to Lord Krishna.', video: 'testimonial-video-2.mp4', thumb: 'testimonial-2.jpg' },
  { name: 'Youth Volunteer', role: 'Student Volunteer', text: 'The youth programs transformed my life. Learning about Bhagavad Gita, doing kirtan, and serving others — it gave me real purpose and happiness.', video: 'testimonial-video-3.mp4', thumb: 'testimonial-3.jpg' },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((idx + 1) % testimonials.length);

  return (
    <section className={`section-pad dark-section`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Voices of Devotion</h2>
          <div className="section-divider" />
        </div>

        <motion.div
          key={idx}
          className={styles.card}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.videoSide}>
            <div className="img-placeholder" style={{ height: '100%', minHeight: '250px', borderRadius: 'var(--radius-lg)' }}>
              <span>{t.thumb}</span>
              <button className={styles.playBtn}><Play size={28} fill="white" /></button>
            </div>
          </div>
          <div className={styles.textSide}>
            <Quote size={36} className={styles.quoteIcon} />
            <p className={styles.quoteText}>{t.text}</p>
            <div className={styles.author}>
              <div className={styles.authorAvatar}>{t.name[0]}</div>
              <div>
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.authorRole}>{t.role}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className={styles.nav}>
          <button onClick={prev} className={styles.navBtn}><ChevronLeft size={22} /></button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`} onClick={() => setIdx(i)} />
            ))}
          </div>
          <button onClick={next} className={styles.navBtn}><ChevronRight size={22} /></button>
        </div>
      </div>
    </section>
  );
}
