'use client';
import { Home, Heart, Calendar, Camera, Phone } from 'lucide-react';
import styles from './BottomNav.module.css';

const items = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Heart, label: 'Donate', href: '/donate', primary: true },
  { icon: Camera, label: 'Gallery', href: '/gallery' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`${styles.item} ${item.primary ? styles.primary : ''}`}
        >
          <item.icon size={item.primary ? 22 : 20} />
          <span className={styles.label}>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
