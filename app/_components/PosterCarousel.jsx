'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './PosterCarousel.module.css';

const slides = [
  {
    id: 'temple-vision',
    image: '/home page backgrond image.png',
    headline: 'A Sacred Home for Krishna',
    subtext: 'Rising in Jodhpur. Opening March 2027.',
    href: '/donate?seva=mandir-nirman',
  },
  {
    id: 'construction',
    image: '/Mandir Nirman seva impact.jpg',
    headline: '8,400 Sq. Ft. Already Built',
    subtext: '310 families have claimed their legacy. Join them.',
    href: '/donate?seva=mandir-nirman',
  },
  {
    id: 'anna-daan',
    image: '/aan dan seva.png',
    headline: '1.5 Lakh Meals Served',
    subtext: 'Every ₹34 feeds a hungry devotee today.',
    href: '/donate?seva=anna-daan',
  },
  {
    id: 'gau-seva',
    image: '/gau dan seva.png',
    headline: 'Serve the Sacred',
    subtext: 'Protect Gau Mata. ₹2,100 cares for a cow for a month.',
    href: '/donate?seva=gau-seva',
  },
];

const INTERVAL = 4000;

export default function PosterCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const timerRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);
  const containerRef = useRef(null);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-scroll timer
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setPaused(true);
    touchStartRef.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaRef.current = e.touches[0].clientX - touchStartRef.current;
  };

  const handleTouchEnd = () => {
    const delta = touchDeltaRef.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    // Resume auto-scroll after 2s
    setTimeout(() => setPaused(false), 2000);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <div
      ref={containerRef}
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Featured seva posters"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      {/* Slides */}
      <div className={styles.track}>
        {slides.map((slide, index) => (
          <a
            key={slide.id}
            href={slide.href}
            className={`${styles.slide} ${index === current ? styles.slideActive : ''}`}
            aria-hidden={index !== current}
            tabIndex={index === current ? 0 : -1}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.headline}`}
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              sizes="100vw"
              quality={60}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={styles.slideImage}
            />
            <div className={styles.slideOverlay} />
            <div className={styles.slideContent}>
              <h2 className={styles.slideHeadline}>{slide.headline}</h2>
              <p className={styles.slideSubtext}>{slide.subtext}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Dot indicators */}
      <div className={styles.dots} role="tablist" aria-label="Carousel navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            onClick={() => goTo(index)}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
          >
            {/* Progress fill for active dot */}
            {index === current && !paused && (
              <span className={styles.dotProgress} key={`progress-${current}`} />
            )}
          </button>
        ))}
      </div>

      {/* Arrow buttons (desktop only) */}
      <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}
