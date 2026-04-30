'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Darshan', href: '/visit' },
  { name: 'Contact', href: '/contact' },
];

/* ─── Scroll thresholds ─── */
const TOPBAR_HIDE = 80;   // TopHeader hides after 80px
const NAV_STICKY = 80;    // Navbar becomes sticky + white after 80px
const NAV_AUTOHIDE = 200; // Navbar hides on scroll-down after 200px

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll state
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [navSticky, setNavSticky] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  const lastScrollY = useRef(0);
  const rafId = useRef(0);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  /**
   * Scroll detection logic:
   * - scrollY < TOPBAR_HIDE  → TopBar visible, Navbar transparent/flat
   * - scrollY >= TOPBAR_HIDE  → TopBar slides up, Navbar gets white bg + blur + shadow
   * - scrollY >= NAV_AUTOHIDE AND scrolling DOWN → Navbar slides up (hidden)
   * - Any scroll UP → Navbar immediately reappears
   * - scrollY returns to 0 → Everything resets
   */
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    const delta = y - lastScrollY.current;

    // TopBar visibility
    setTopBarVisible(y < TOPBAR_HIDE);

    // Sticky state (white bg + blur)
    setNavSticky(y >= NAV_STICKY);

    // Auto-hide on scroll down / show on scroll up
    if (y >= NAV_AUTOHIDE) {
      if (delta > 2) {
        // Scrolling down — hide
        setNavHidden(true);
      } else if (delta < -1) {
        // Scrolling up (any tiny upward gesture) — show immediately
        setNavHidden(false);
      }
    } else {
      setNavHidden(false);
    }

    lastScrollY.current = y;
    rafId.current = 0;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Top Info Header ─── */}
      <div className={`${styles.topBar} ${topBarVisible ? '' : styles.topBarHidden}`}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.topBarLeft}>
            <a href="mailto:harekrishna@hkmjodhpur.org" className={styles.topBarLink}>
              <Mail size={14} aria-hidden="true" />
              <span>harekrishna@hkmjodhpur.org</span>
            </a>
            <a href="https://wa.me/919928766773" className={styles.topBarLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <a href="tel:+919928766773" className={styles.topBarLink}>
              <Phone size={14} aria-hidden="true" />
              <span>+91 99287 66773</span>
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

      {/* ─── Main Navbar ─── */}
      <header
        className={[
          styles.navbar,
          navSticky ? styles.navSticky : '',
          navHidden ? styles.navHidden : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className={styles.logo} aria-label="Hare Krishna Mandir home">
            <Image
              src="/gallery/logo.png"
              alt="Hare Krishna Mandir Logo"
              width={160}
              height={88}
              sizes="80px"
              quality={75}
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
              <span>Donate Now</span>
            </Link>

            {/* Hamburger / X button */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu (slides from top) ─── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              id="mobile-menu"
              initial={{ y: '-100%', opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0.9 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <div className={styles.mobileMenuHeader}>
                <span className={styles.mobileMenuTitle}>Menu</span>
                <button onClick={closeMenu} className={styles.closeBtn} aria-label="Close menu">
                  <span className={styles.closeBtnX}>✕</span>
                </button>
              </div>
              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ''}`}
                      onClick={closeMenu}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link href="/donate" className={styles.mobileCtaButton} onClick={closeMenu}>
                <Heart size={18} aria-hidden="true" />
                <span>Donate Now</span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
