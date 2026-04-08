'use client';
import { Heart } from 'lucide-react';
import styles from './DonationSpotlight.module.css';

const quickAmounts = [
  { amount: 501, label: '₹501' },
  { amount: 1101, label: '₹1101', recommended: true },
  { amount: 2101, label: '₹2101' },
];

export default function DonationSpotlight() {
  return (
    <section id="donate-spotlight" className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.textBlock}>
            <span className={styles.eyebrow}>Divine Giving</span>
            <h2 className={styles.title}>Be Part of Krishna's Seva</h2>
            <p className={styles.desc}>
              Offer your devotion through seva that nourishes hearts and uplifts the community.
            </p>
            <a href="/donate" className={`btn btn-donate ${styles.cta}`}>
              <Heart size={16} /> Donate Securely
            </a>
            <p className={styles.reassure}>100% Secure • 80G • Trusted</p>
          </div>

          <div className={styles.amountBlock}>
            <span className={styles.amountLabel}>Quick Donate</span>
            <div className={styles.amountGrid}>
              {quickAmounts.map((item) => (
                <a
                  key={item.amount}
                  href={`/donate?amount=${item.amount}`}
                  className={`${styles.amountCard} ${item.recommended ? styles.amountRecommended : ''}`}
                >
                  <span className={styles.amountValue}>{item.label}</span>
                  {item.recommended && <span className={styles.amountTag}>Recommended</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}