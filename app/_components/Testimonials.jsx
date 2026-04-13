'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonialVideoUrl = 'https://www.youtube.com/embed/t1Qoh6UWhWc?rel=0';

const testimonials = [
  { name: 'Devoted Visitor', role: 'Regular Devotee', text: 'The experience at Hare Krishna Marwar Mandir is truly divine. The atmosphere, the kirtans, and the prasadam — everything fills your heart with devotion and peace.', videoUrl: testimonialVideoUrl },
  { name: 'Local Supporter', role: 'Monthly Donor', text: 'I am proud to support this temple\'s mission. The Anna Daan Seva has been feeding hundreds in our community. This is true service to Lord Krishna.', videoUrl: testimonialVideoUrl },
  { name: 'Youth Volunteer', role: 'Student Volunteer', text: 'The youth programs transformed my life. Learning about Bhagavad Gita, doing kirtan, and serving others — it gave me real purpose and happiness.', videoUrl: testimonialVideoUrl },
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
            <iframe
              className={styles.videoFrame}
              src={t.videoUrl}
              title={`Testimonial video from ${t.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
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
