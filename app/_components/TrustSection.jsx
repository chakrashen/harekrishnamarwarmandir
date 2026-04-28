'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Flower2, BadgeCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import styles from './TrustSection.module.css';

const sevaRoutes = {
  'Gau Seva': '/seva/gau-seva',
  'Anna Daan Seva': '/seva/anna-daan',
  'Mandir Nirman': '/seva/mandir-nirman',
};

const trustItems = [
  { icon: Flame, text: '14+ Years Serving' },
  { icon: Flower2, text: '1.5 Lakh+ Meals Served' },
  { icon: ShieldCheck, text: '50+ Cows Protected' },
  { icon: BadgeCheck, text: '80G Tax Benefit Available' },
];

const proofItems = [
  {
    title: 'Anna Daan Seva',
    desc: 'Daily prasadam offering with community participation.',
    img: '/gallery/gallery-anna-daan-serving.jpg',
    alt: 'Volunteers distributing free prasadam during Anna Daan seva in Jodhpur',
  },
  {
    title: 'Gau Seva',
    desc: 'Sacred cow care supported by devotees across Marwar.',
    img: '/gallery/gallery-gau-seva-volunteer.jpg',
    alt: 'Desi cows being cared for at Hare Krishna Marwar Mandir Gaushala Jodhpur',
  },
  {
    title: 'Mandir Nirman',
    desc: 'A growing spiritual home built with collective seva.',
    img: '/mandir-nirman-seva.png',
    alt: 'Hare Krishna Marwar Mandir temple facade in Jodhpur Rajasthan',
  },
];

export default function TrustSection() {
  return (
    <section className={styles.section} aria-label="Trust and Impact Section">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.label}>Trust & Transparency</span>
            <h2 className={styles.desc}>Shraddha begins with clarity, care, and secure seva.</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className={styles.strip}>
            {trustItems.map((item, i) => (
              <motion.div
                key={item.text}
                className={styles.trustItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <item.icon size={20} />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className={styles.proofGrid}>
          {proofItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={0.1 + i * 0.12} y={40}>
              <Link href={sevaRoutes[item.title] || '/#'} className={styles.proofLink}>
                <motion.article 
                  className={styles.proofCard}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                >
                  <div className={styles.proofImageWrap}>
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.proofImage}
                    />
                    <div className={styles.proofOverlay}>
                      <span>View Impact <ArrowRight size={14} /></span>
                    </div>
                  </div>
                  <div className={styles.proofBody}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
