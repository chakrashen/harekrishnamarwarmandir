'use client';
import { BadgeCheck, ShieldCheck, Flame, Users } from 'lucide-react';
import styles from './TrustBar.module.css';

const items = [
  { icon: BadgeCheck, text: '80G Tax Benefit' },
  { icon: ShieldCheck, text: 'Secure ICICI Payment' },
  { icon: Flame, text: 'Serving Since 2012' },
  { icon: Users, text: '1.5+ Lakh Meals Served' },
];

export default function TrustBar() {
  return (
    <div className={styles.bar} role="complementary" aria-label="Trust credentials">
      <div className={`container ${styles.inner}`}>
        {items.map((item) => (
          <div key={item.text} className={styles.item}>
            <item.icon size={15} aria-hidden="true" className={styles.icon} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
