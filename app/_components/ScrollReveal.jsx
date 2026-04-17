'use client';
import { motion } from 'framer-motion';

/**
 * Reusable scroll‑reveal wrapper.
 * Wraps any children with a fade‑up animation that triggers once on scroll.
 *
 * @param {number}  delay      – seconds to wait before starting (default 0)
 * @param {number}  duration   – animation length in seconds (default 0.7)
 * @param {number}  y          – starting Y offset in px (default 32)
 * @param {string}  className  – optional extra CSS class
 * @param {string}  as         – HTML tag to render, e.g. "section" (default "div")
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 32,
  className = '',
  as = 'div',
  ...rest
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1], // Apple‑style ease‑out
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
