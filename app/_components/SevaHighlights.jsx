'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import styles from './SevaHighlights.module.css';

// Route mapping for dedicated pages
const sevaRoutes = {
  'Gau Seva': '/seva/gau-seva',
  'Anna Daan': '/seva/anna-daan',
  'Mandir Nirman': '/seva/mandir-nirman',
};

// Static LCP optimization
import gauImage from '../../public/gau dan seva.png';
import annaImage from '../../public/aan dan seva.png';
import mandirImage from '../../public/mandir-nirman-seva.png';

const sevaItems = [
  {
    name: 'Anna Daan',
    image: annaImage,
    impact: 'Feed devotees with sanctified prasadam.',
    description: 'This plate is empty until you fill it. Your offering feeds a soul and earns blessings.',
    cta: 'Sponsor a Meal',
    ctaPrice: '₹34/person',
    donateLink: '/donate?seva=anna-daan',
    microCta: null,
  },
  {
    name: 'Gau Seva',
    image: gauImage,
    impact: 'Protect and nourish Gau Mata with love.',
    description: 'She is our mother. Become her guardian — providing food, shelter, and care for a sacred cow.',
    cta: 'Protect a Cow',
    ctaPrice: '₹2,100/month',
    donateLink: '/donate?seva=gau-seva',
    microCta: { label: 'Feed a cow for a day — ₹51', link: '/donate?seva=gau-seva&amount=51' },
    parallaxSpeed: 0.06,
  },
  {
    name: 'Mandir Nirman',
    image: mandirImage,
    impact: 'Build a sacred home for Krishna.',
    description: 'Your family name, etched in the foundation for as long as the temple stands. Donors receive a Krishna Gift set.',
    cta: 'Claim Your Sq. Ft.',
    ctaPrice: '₹2,500',
    donateLink: '/donate?seva=mandir-nirman',
    microCta: { label: 'Sponsor a brick — ₹101', link: '/donate?seva=mandir-nirman&amount=101' },
    parallaxSpeed: 0.06,
  },
];

function SevaImage({ src, alt, parallaxSpeed }) {
  return (
    <div
      className={styles.cardImageWrap}
      data-parallax={parallaxSpeed ? 'true' : undefined}
      data-parallax-speed={parallaxSpeed ? String(parallaxSpeed) : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, 33vw"
        className={parallaxSpeed ? styles.cardImageParallax : styles.cardImage}
      />
    </div>
  );
}

export default function SevaHighlights() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData === true;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    const enableParallax = !prefersReduced && !saveData && !lowMemory && !lowCores && window.innerWidth >= 1024;

    if (!enableParallax) return undefined;

    const items = Array.from(document.querySelectorAll('[data-parallax="true"]'));
    if (!items.length) return undefined;

    let rafId = 0;

    const update = () => {
      const viewport = window.innerHeight || 0;
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > viewport + 160) return;
        const speed = Number(el.dataset.parallaxSpeed || 0.08);
        const offset = (rect.top + rect.height / 2 - viewport / 2) * speed * -1;
        el.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
      });
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Sacred Seva</span>
          <h2 className="section-title">Choose Your Seva — Every Offering Creates Daily Impact</h2>
          <div className="section-divider" />
          <p className="section-desc">
            Each seva is a doorway to devotion. Choose a path that deepens bhakti and brings blessings to many.
          </p>
        </div>

        <div className={styles.grid}>
          {sevaItems.map((item) => (
            <div key={item.name} className={styles.cardWrapper}>
              <Link href={sevaRoutes[item.name]} className={styles.cardLink}>
                <motion.div
                  className={styles.card}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                >
                  <SevaImage src={item.image} alt={item.name} parallaxSpeed={item.parallaxSpeed} />
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.name}</h3>
                    <p className={styles.cardImpact}>{item.impact}</p>
                    <p className={styles.cardDesc}>{item.description}</p>
                    <div className={styles.cardFooter}>
                      <span
                        role="link"
                        tabIndex={0}
                        className={`btn btn-donate btn-sm ${styles.cardCta}`}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = item.donateLink; }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); window.location.href = item.donateLink; } }}
                      >
                        <Heart size={14} /> {item.cta} — {item.ctaPrice}
                      </span>
                      {item.microCta && (
                        <span
                          role="link"
                          tabIndex={0}
                          className={styles.microCta}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = item.microCta.link; }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); window.location.href = item.microCta.link; } }}
                        >
                          {item.microCta.label}
                        </span>
                      )}
                      <span className={styles.learnMore}>
                        View Full Impact <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
