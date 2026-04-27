'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './ConstructionMeter.module.css';

const TOTAL_SQFT = 31000;
const BUILT_SQFT = 8400; // ~27% — update this as construction progresses
const FAMILIES_COUNT = 310; // Approximate number of families who have contributed
const WEEKLY_SQFT = 47; // Sq ft claimed this week (update weekly)
const PERCENT = Math.round((BUILT_SQFT / TOTAL_SQFT) * 100);
const OPENING_DATE = new Date('2027-03-15');

function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 20);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function Countdown() {
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = OPENING_DATE - now;
      if (ms <= 0) return;
      setDiff({
        d: Math.floor(ms / 86400000),
        h: Math.floor((ms % 86400000) / 3600000),
        m: Math.floor((ms % 3600000) / 60000),
        s: Math.floor((ms % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.countdown}>
      {[
        { v: diff.d, l: 'Days' },
        { v: diff.h, l: 'Hours' },
        { v: diff.m, l: 'Mins' },
        { v: diff.s, l: 'Secs' },
      ].map((u) => (
        <div key={u.l} className={styles.countUnit}>
          <span className={styles.countNum}>{String(u.v).padStart(2, '0')}</span>
          <span className={styles.countLabel}>{u.l}</span>
        </div>
      ))}
    </div>
  );
}

export default function ConstructionMeter() {
  return (
    <section className={`section-pad dark-section`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Grand Opening March 2027</span>
          <h2 className="section-title">Be Part Before Completion</h2>
          <div className="section-divider" />
          <p className="section-desc">
            Grand Opening March 2027 — offer your seva today to help complete a 31,000 sq ft devotional landmark in the heart of Jodhpur.
          </p>
        </div>

        <Countdown />

        <motion.div
          className={styles.meterCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.meterTop}>
            <div className={styles.meterInfo}>
              <h3 className={styles.meterTitle}>Construction Progress</h3>
              <p className={styles.meterSub}>Every ₹2,500 builds 1 sq ft of the Mandir</p>
            </div>
            <div className={styles.meterPercent}><Counter target={PERCENT} suffix="%" /></div>
          </div>

          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              whileInView={{ width: `${PERCENT}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {/* Social proof line */}
          <p className={styles.socialProof}>
            <strong>{FAMILIES_COUNT}+ families</strong> have already claimed their legacy.{' '}
            <span className={styles.weeklyBadge}>🔥 {WEEKLY_SQFT} sq ft claimed this week</span>
          </p>

          <div className={styles.meterBottom}>
            <div className={styles.meterStat}>
              <span className={styles.meterStatNum}><Counter target={BUILT_SQFT} /></span>
              <span className={styles.meterStatLabel}>Sq Ft Built</span>
            </div>
            <div className={styles.meterStat}>
              <span className={styles.meterStatNum}><Counter target={TOTAL_SQFT} /></span>
              <span className={styles.meterStatLabel}>Sq Ft Goal</span>
            </div>
            <div className={styles.meterStat}>
              <span className={styles.meterStatNum}><Counter target={TOTAL_SQFT - BUILT_SQFT} /></span>
              <span className={styles.meterStatLabel}>Sq Ft Remaining</span>
            </div>
          </div>

          {/* Emotional hook */}
          <p className={styles.emotionalHook}>
            {(TOTAL_SQFT - BUILT_SQFT).toLocaleString()} sq ft remain. Will your family be among them?
          </p>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="/donate?seva=mandir-nirman" className="btn btn-donate">🛕 Claim Your Family&apos;s Sq. Ft. — ₹2,500</a>
          </div>
          <p className={styles.microCtaLine}>
            <a href="/donate?amount=101" className={styles.microCtaLink}>
              Start smaller? Sponsor a brick for ₹101 →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
