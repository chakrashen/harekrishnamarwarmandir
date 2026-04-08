'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
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
