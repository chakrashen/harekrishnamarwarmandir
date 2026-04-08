import { ShieldCheck, Flame, Flower2, BadgeCheck } from 'lucide-react';
import styles from './TrustSection.module.css';

const trustItems = [
  { icon: ShieldCheck, text: '1000+ Devotees Trust Us' },
  { icon: Flame, text: 'Serving since 2012' },
  { icon: Flower2, text: '80G Tax Benefit Available' },
  { icon: BadgeCheck, text: 'Secure Payment via ICICI Bank' },
];

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Trust & Transparency</span>
          <p className={styles.desc}>Shraddha begins with clarity, care, and secure seva.</p>
        </div>
        <div className={styles.strip}>
          {trustItems.map((item) => (
            <div key={item.text} className={styles.trustItem}>
              <item.icon size={20} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
