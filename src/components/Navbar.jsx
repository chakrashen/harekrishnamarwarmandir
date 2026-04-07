import { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Gallery', href: '#' },
  { name: 'Visit', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo">
            <span className="logo-title">Hare Krishna Marwar</span>
            <span className="logo-sub">Jodhpur · Rajasthan</span>
          </a>

          <nav className="nav-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="btn-primary donate-nav-btn font-sans">
              <HeartHandshake size={20} />
              Donate Now
            </button>
            <button 
              className="hamburger"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} color="var(--color-cream)" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-header">
               <button onClick={() => setMobileMenuOpen(false)} className="close-menu">
                 <X size={32} color="var(--color-gold-bright)" />
               </button>
            </div>
            
            <div className="mobile-links">
              {navLinks.map((link, idx) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  className="mobile-link"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length }}
                style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
              >
                 <button className="btn-primary font-sans" style={{ width: '100%', maxWidth: '300px' }}>
                    <HeartHandshake size={20} /> Donate Now
                 </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
