'use client';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Heart, Calendar, Camera, Phone } from 'lucide-react';
import styles from './BottomNav.module.css';

const items = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Calendar, label: 'Seva', href: '/events' },
  { icon: Camera, label: 'Gallery', href: '/gallery' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const activeHref = useMemo(() => {
    if (!pathname) return '/';
    const direct = items.find((item) => item.href === pathname);
    if (direct) return direct.href;
    const nested = items.find((item) => item.href !== '/' && pathname.startsWith(item.href));
    return nested?.href || '/';
  }, [pathname]);

  return (
    <>
      {pathname !== '/donate' && (
        <a href="/donate" className={styles.stickyDonate} aria-label="Offer your seva">
          <Heart size={18} /> Offer Your Seva
        </a>
      )}

      <nav className={styles.nav}>
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`${styles.item} ${activeHref === item.href ? styles.active : ''}`}
            aria-current={activeHref === item.href ? 'page' : undefined}
          >
            <item.icon size={19} />
            <span className={styles.label}>{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
