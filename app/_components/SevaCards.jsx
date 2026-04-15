'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import styles from './SevaCards.module.css';

const sevas = [
  { icon: '🍛', name: 'Anna Daan Seva', amount: '₹3,400', impact: 'Feed 100 People', desc: 'Sponsor a day of free prasadam for 100 devotees and the needy.', img: 'aan dan seva.png' },
  { icon: '🛕', name: 'Mandir Nirman Seva', amount: '₹2,500', impact: '1 Sq Ft of Mandir', desc: 'Build the temple brick by brick. Every sq ft counts.', img: 'mandir-nirman-seva.png' },
  { icon: '🐄', name: 'Gau Seva', amount: '₹2,100', impact: '1 Day', desc: 'Provide food, shelter, and medical care for a sacred cow.', img: 'gau dan seva.png' },
];

function SevaImage({ src, alt }) {
  const [showFallback, setShowFallback] = useState(false);
  const safeSrc = `/${src.split('/').map(encodeURIComponent).join('/')}`;

  if (showFallback) {
    return (
      <div className="img-placeholder" style={{ height: '100%' }}>
        <span>{src}</span>
      </div>
    );
  }

  return (
    <Image
      src={safeSrc}
      alt={alt}
      className={styles.cardImage}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="lazy"
      onError={() => setShowFallback(true)}
    />
  );
}

export default function SevaCards() {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Donate Generously</span>
          <h2 className="section-title">Choose Your Seva</h2>
          <div className="section-divider" />
          <p className="section-desc">
            With your support, we can uplift society through prasadam, cow protection, and temple construction.
          </p>
        </div>

        <div className={styles.grid}>
          {sevas.map((seva, i) => (
            <motion.div
              key={seva.name}
              className={`card ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className={styles.cardImg}>
                <SevaImage src={seva.img} alt={seva.name} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.sevaIcon}>{seva.icon}</div>
                <h3 className={styles.sevaName}>{seva.name}</h3>
                <div className={styles.sevaAmount}>{seva.amount}</div>
                <div className={styles.sevaImpact}>{seva.impact}</div>
                <p className={styles.sevaDesc}>{seva.desc}</p>
                <a href="/donate" className={`btn btn-donate btn-sm ${styles.sevaBtn}`}>
                  <Heart size={14} /> Donate Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <motion.div
          className={styles.socialProof}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className={styles.proofDot} />
          <span>1,247+ devotees donated this month</span>
        </motion.div>
      </div>
    </section>
  );
}
