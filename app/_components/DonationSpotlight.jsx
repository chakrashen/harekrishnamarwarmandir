'use client';
import { Heart } from 'lucide-react';
import styles from './DonationSpotlight.module.css';

const quickAmounts = [
  { amount: 501, label: '₹501', impact: 'Feeds devotees' },
  { amount: 1101, label: '₹1101', impact: '1 Day Prasadam Seva', recommended: true },
  { amount: 2101, label: '₹2101', impact: 'Temple Construction Support' },
];

export default function DonationSpotlight() {
  return (
    <section id="donate-spotlight" className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.textBlock}>
            <span className={styles.eyebrow}>Offer Seva</span>
            <h2 className={styles.title}>Offer Your Seva for Mandir Completion</h2>
            <p className={styles.desc}>
              Offer your devotion through seva that nourishes hearts, supports dharma, and helps complete this sacred mandir.
            </p>
            <a href="/donate" className={`btn btn-donate ${styles.cta}`}>
              <Heart size={16} /> Offer Your Seva
            </a>
            <a href="/visit" className={`btn btn-outline ${styles.secondaryCta}`}>Explore Mandir</a>
            <p className={styles.reassure}>Grand Opening March 2027 - Be part before completion.</p>
          </div>

          <div className={styles.amountBlock}>
            <span className={styles.amountLabel}>Choose Seva Amount</span>
            <div className={styles.amountGrid}>
              {quickAmounts.map((item) => (
                <a
                  key={item.amount}
                  href={`/donate?amount=${item.amount}`}
                  className={`${styles.amountCard} ${item.recommended ? styles.amountRecommended : ''}`}
                >
                  <span className={styles.amountValue}>{item.label}</span>
                  <span className={styles.amountImpact}>{item.impact}</span>
                  {item.recommended && <span className={styles.amountTag}>Recommended</span>}
                </a>
              ))}
            </div>
            <p className={styles.amountHelp}>Tap an amount to continue seva instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}