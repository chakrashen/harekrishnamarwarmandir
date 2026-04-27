'use client';
import { Heart } from 'lucide-react';
import styles from './DonationSpotlight.module.css';

const primarySevas = [
  { emoji: '🛕', label: 'Claim a Sq. Ft.', amount: '₹2,500', impact: 'Your name in temple history', href: '/donate?seva=mandir-nirman', recommended: true },
  { emoji: '🐄', label: 'Protect a Cow', amount: '₹2,100', impact: 'Monthly shelter & care', href: '/donate?seva=gau-seva' },
  { emoji: '🍛', label: 'Feed 50 People', amount: '₹1,700', impact: 'Full day prasadam', href: '/donate?seva=anna-daan' },
];

const microSevas = [
  { emoji: '🧱', label: 'Sponsor a Brick', amount: '₹101', href: '/donate?amount=101' },
  { emoji: '🌿', label: 'Feed a Cow', amount: '₹51/day', href: '/donate?amount=51' },
  { emoji: '🍛', label: 'Feed 1 Person', amount: '₹34', href: '/donate?amount=34' },
];

export default function DonationSpotlight() {
  return (
    <section id="donate-spotlight" className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.textBlock}>
            <span className={styles.eyebrow}>Choose Your Seva</span>
            <h2 className={styles.title}>Every Offering Creates Daily Impact</h2>
            <p className={styles.desc}>
              Offer your devotion through seva that nourishes hearts, supports dharma, and helps complete this sacred mandir.
            </p>
            <a href="/donate" className={`btn btn-donate ${styles.cta}`}>
              <Heart size={16} /> Explore All Seva Options
            </a>
            <p className={styles.reassure}>Grand Opening March 2027 — Be part before completion.</p>
          </div>

          <div className={styles.amountBlock}>
            {/* Primary seva cards */}
            <span className={styles.amountLabel}>Choose a Seva</span>
            <div className={styles.amountGrid}>
              {primarySevas.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`${styles.amountCard} ${item.recommended ? styles.amountRecommended : ''}`}
                >
                  <span className={styles.amountEmoji}>{item.emoji}</span>
                  <span className={styles.amountName}>{item.label}</span>
                  <span className={styles.amountValue}>{item.amount}</span>
                  <span className={styles.amountImpact}>{item.impact}</span>
                  {item.recommended && <span className={styles.amountTag}>Most Popular</span>}
                </a>
              ))}
            </div>

            {/* Micro-commitment row */}
            <span className={styles.microLabel}>Start Smaller</span>
            <div className={styles.microGrid}>
              {microSevas.map((item) => (
                <a key={item.label} href={item.href} className={styles.microCard}>
                  <span className={styles.microEmoji}>{item.emoji}</span>
                  <span className={styles.microName}>{item.label}</span>
                  <span className={styles.microAmount}>{item.amount}</span>
                </a>
              ))}
            </div>

            <p className={styles.amountHelp}>Tap a seva to continue instantly. All sevas include 80G tax benefit.</p>
          </div>
        </div>
      </div>
    </section>
  );
}