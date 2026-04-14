'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Offer Your Seva', href: '/donate' },
  { name: 'Darshan', href: '/visit' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      setScrolled(window.scrollY > 50);
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.topBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.topBarLeft}>
            <a href="mailto:harekrishna@hkmjodhpur.org" className={styles.topBarLink}>
              <Mail size={14} aria-hidden="true" />
              <span>harekrishna@hkmjodhpur.org</span>
            </a>
            <a href="https://wa.me/919116139371" className={styles.topBarLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <a href="tel:+919116139371" className={styles.topBarLink}>
              <Phone size={14} aria-hidden="true" />
              <span>+91 91161 39371</span>
            </a>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.topBarBadge}>
              <Clock size={14} aria-hidden="true" />
              <span>Darshan Open · 4:30 - 13:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`${styles.navWrap} ${scrolled ? styles.navWrapScrolled : ''}`}>
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" className={styles.logo} aria-label="Hare Krishna Mandir home">
              <Image
                src="/gallery/logo.png"
                alt="Hare Krishna Mandir Logo"
                width={200}
                height={64}
                className={styles.logoImage}
                priority
              />
            </Link>

            <nav className={styles.desktopNav} aria-label="Primary navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className={styles.navActions}>
              <Link href="/donate" className={styles.ctaButton}>
                <Heart size={16} aria-hidden="true" />
                <span>Offer Your Seva</span>
              </Link>
              <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileMenu}
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.mobileMenuHeader}>
                <span className={styles.mobileMenuTitle}>Menu</span>
                <button onClick={() => setMenuOpen(false)} className={styles.closeBtn}>
                  <X size={28} />
                </button>
              </div>
              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ''}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link href="/donate" className={styles.mobileCtaButton} onClick={() => setMenuOpen(false)}>
                <Heart size={18} aria-hidden="true" />
                <span>Offer Your Seva</span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
