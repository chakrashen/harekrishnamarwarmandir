'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Visit', href: '/visit' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Top Info Bar */}
      <div className={styles.topBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.topBarLeft}>
            <a href="mailto:harekrishna@hkmjodhpur.org" className={styles.topBarLink}>
              <Mail size={14} /> harekrishna@hkmjodhpur.org
            </a>
            <a href="https://wa.me/919116139371" className={styles.topBarLink}>
              <Phone size={14} /> +91 91161 39371
            </a>
          </div>
          <div className={styles.topBarRight}>
            <a href="#" aria-label="YouTube" className={styles.socialIcon}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12c0 1.9.2 3.8.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-2 .5-3.9.5-5.8s-.2-3.8-.5-5.8zM9.6 15.7V8.3l6.5 3.7-6.5 3.7z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialIcon}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm8.2 2H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-4 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm4.8-2.3a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialIcon}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M13.6 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.4v2.2H7.5v3.2h2.8V22h3.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`${styles.navWrap} ${scrolled ? styles.navWrapScrolled : ''}`}>
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" className={styles.logo}>
              <Image
                src="/gallery/logo.png"
                alt="Hare Krishna Mandir Logo"
                width={140}
                height={48}
                className={styles.logoImage}
                priority
              />
            </a>

            <nav className={styles.desktopNav}>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className={styles.navLink}>
                  {link.name}
                </a>
              ))}
            </nav>

            <div className={styles.navActions}>
              <a href="/donate" className="btn btn-donate btn-sm">
                <Heart size={16} /> Donate Now
              </a>
              <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
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
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={styles.mobileLink}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <a href="/donate" className="btn btn-donate" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setMenuOpen(false)}>
                <Heart size={18} /> Donate Now
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
