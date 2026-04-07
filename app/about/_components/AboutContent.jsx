'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, Leaf, Star, ArrowRight } from 'lucide-react';
import styles from './AboutContent.module.css';

const values = [
  { icon: BookOpen, title: 'Spiritual Wisdom', desc: 'Sharing the timeless teachings of Bhagavad Gita and Srimad Bhagavatam with seekers of all ages.' },
  { icon: Heart, title: 'Anna Daan Seva', desc: 'Providing free nutritious prasadam daily, ensuring no one in our community goes hungry.' },
  { icon: Leaf, title: 'Gau Seva', desc: 'Protecting and caring for sacred cows with love, shelter, food, and medical attention.' },
  { icon: Users, title: 'Youth Empowerment', desc: 'Engaging young minds through value-based programs, kirtans, and leadership training.' },
];

const timeline = [
  { year: '2010', title: 'Foundation', desc: 'Hare Krishna Movement Jodhpur was established with a small group of dedicated devotees.' },
  { year: '2013', title: 'Anna Daan Begins', desc: 'Started daily free prasadam distribution, feeding hundreds of people every day.' },
  { year: '2016', title: 'Gau Shala Established', desc: 'Opened a dedicated cow shelter to protect and care for abandoned cows.' },
  { year: '2019', title: 'Youth Programs Launch', desc: 'Introduced Secrets of Success and Bhagavad Gita study circles for students.' },
  { year: '2023', title: 'Mandir Construction Begins', desc: 'Broke ground for the magnificent 35,000 sq ft Hare Krishna Marwar Mandir.' },
  { year: '2027', title: 'Grand Opening', desc: 'The grand inauguration of Hare Krishna Marwar Mandir — a spiritual landmark for Marwar.' },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/about page/About page main background.png"
            alt="Hare Krishna Marwar Mandir about page hero"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <motion.span className="section-label" style={{ color: 'var(--saffron-light)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>About Our Temple</motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            A Legacy of Devotion<br />& Service
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad">
        <div className="container">
          <div className={styles.missionGrid}>
            <motion.div className={styles.missionImg} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Image
                src="/about-mission.png"
                alt="Devotees and spiritual activities at Hare Krishna Marwar Mandir"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.missionImage}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-label">Our Mission</span>
              <h2 className={styles.sectionTitle}>Spreading the Message of Lord Krishna</h2>
              <p className={styles.bodyText}>
                Hare Krishna Marwar Mandir, situated in the royal city of Jodhpur, is dedicated to 
                propagating the teachings of Lord Sri Krishna as given by His Divine Grace A.C. Bhaktivedanta 
                Swami Prabhupada — the founder-acharya of ISKCON.
              </p>
              <p className={styles.bodyText}>
                Our mission is to create a magnificent spiritual sanctuary — a 35,000 sq ft temple — 
                that serves as a beacon of devotion, culture, and community upliftment in the heart of Marwar.
              </p>
              <a href="/donate" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                Support Our Mission <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prabhupada Quote */}
      <section className={`section-pad dark-section`}>
        <div className="container">
          <motion.div className={styles.quoteCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.quoteImg}>
              <Image
                src="/srila-prabhupada.jpg"
                alt="His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                fill
                sizes="(max-width: 768px) 220px, 250px"
                className={styles.quotePortrait}
              />
            </div>
            <div className={styles.quoteText}>
              <p className={styles.quote}>
                &ldquo;The Krishna consciousness movement is not a new movement. 
                It is not a new religion. It is the oldest, most authorized, 
                and the most exalted system of knowledge.&rdquo;
              </p>
              <div className={styles.quoteAuthor}>
                <strong>His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</strong>
                <span>Founder-Acharya of ISKCON</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Our Core Values & Services</h2>
            <div className="section-divider" />
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className={`card ${styles.valueCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.valueIcon}><v.icon size={28} /></div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`section-pad ${styles.timelineBg}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Timeline of Service</h2>
            <div className="section-divider" />
          </div>
          <div className={styles.timeline}>
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.timelineYear}>{t.year}</div>
                <div className={styles.timelineDot}><Star size={14} /></div>
                <div className={styles.timelineContent}>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Be a Part of This Sacred Journey</h2>
          <div className="section-divider" />
          <p className="section-desc" style={{ marginBottom: '2rem' }}>
            Whether through seva, donations, or volunteering — every contribution brings us closer to realizing Srila Prabhupada&apos;s vision.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/donate" className="btn btn-donate">🪔 Donate Now</a>
            <a href="/contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
