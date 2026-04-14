'use client';

import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true, immediate = false } = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (immediate) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setRevealed(true);
        return;
      }

      const rafId = window.requestAnimationFrame(() => setRevealed(true));
      return () => window.cancelAnimationFrame(rafId);
    }

    const revealIfInView = () => {
      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        setRevealed(true);
        return true;
      }
      return false;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    if (revealIfInView() && once) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, once, rootMargin, threshold]);

  return { ref, revealed };
}
