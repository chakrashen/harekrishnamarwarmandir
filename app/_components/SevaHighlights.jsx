'use client';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import styles from './SevaHighlights.module.css';

const sevaItems = [
  {
    name: 'Gau Seva',
    image: 'gau dan seva.png',
    impact: 'Protect and nourish Gau Mata with love.',
    description: 'Provide shelter, fodder, and care for sacred cows.',
  },
  {
    name: 'Anna Daan',
    image: 'aan dan seva.png',
    impact: 'Feed devotees with sanctified prasadam.',
    description: 'Serve meals that nourish body and soul.',
  },
  {
    name: 'Mandir Nirman',
    image: 'mandir-nirman-seva.png',
    impact: 'Build a sacred home for Krishna.',
    description: 'Complete the mandir for darshan and kirtan.',
  },
];

function SevaImage({ src, alt }) {
  const safeSrc = `/${src.split('/').map(encodeURIComponent).join('/')}`;
  return (
    <div className={styles.cardImageWrap}>
      <Image
        src={safeSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={styles.cardImage}
      />
    </div>
  );
}

export default function SevaHighlights() {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Sacred Seva</span>
          <h2 className="section-title">Offer Seva That Transforms Lives</h2>
          <div className="section-divider" />
          <p className="section-desc">
            Each seva is a doorway to devotion. Choose a path that deepens bhakti and brings blessings to many.
          </p>
        </div>

        <div className={styles.grid}>
          {sevaItems.map((item) => (
            <div key={item.name} className={styles.card}>
              <SevaImage src={item.image} alt={item.name} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardImpact}>{item.impact}</p>
                <p className={styles.cardDesc}>{item.description}</p>
                <a href="/donate" className={`btn btn-donate btn-sm ${styles.cardCta}`}>
                  <Heart size={14} /> Offer Your Seva
                </a>
                <a href="/visit" className={`btn btn-outline btn-sm ${styles.cardCtaAlt}`}>
                  Explore Mandir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
