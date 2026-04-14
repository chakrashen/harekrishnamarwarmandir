'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import styles from './SevaHighlights.module.css';

const sevaItems = [
  {
    name: 'Gau Seva',
    image: 'gau dan seva.png',
    impact: 'Protect and nourish Gau Mata with love.',
    description: 'Provide shelter, fodder, and care for sacred cows.',
    parallaxSpeed: 0.06,
  },
  {
    name: 'Anna Daan',
    image: 'aan dan seva.png',
    impact: 'Feed devotees with sanctified prasadam.',
    description: 'Serve meals that nourish body and soul.',
  },
  {
    name: 'Mandir Nirman',
    image: 'mandir-nirman-seva.png',
    impact: 'Build a sacred home for Krishna.',
    description: 'Complete the mandir for darshan and kirtan.',
    parallaxSpeed: 0.06,
  },
];

function SevaImage({ src, alt, parallaxSpeed }) {
  const safeSrc = `/${src.split('/').map(encodeURIComponent).join('/')}`;
  return (
    <div
      className={styles.cardImageWrap}
      data-parallax={parallaxSpeed ? 'true' : undefined}
      data-parallax-speed={parallaxSpeed ? String(parallaxSpeed) : undefined}
    >
      <Image
        src={safeSrc}
        alt={alt}
        fill
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
          <h2 className="section-title">Offer Seva That Transforms Lives</h2>
          <div className="section-divider" />
          <p className="section-desc">
            Each seva is a doorway to devotion. Choose a path that deepens bhakti and brings blessings to many.
          </p>
        </div>

        <div className={styles.grid}>
          {sevaItems.map((item) => (
            <div key={item.name} className={styles.card}>
              <SevaImage src={item.image} alt={item.name} parallaxSpeed={item.parallaxSpeed} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardImpact}>{item.impact}</p>
                <p className={styles.cardDesc}>{item.description}</p>
                <a href="/donate" className={`btn btn-donate btn-sm ${styles.cardCta}`}>
                  <Heart size={14} /> Offer Your Seva
                </a>
                <a href="/visit" className={`btn btn-outline btn-sm ${styles.cardCtaAlt}`}>
                  Explore Mandir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
