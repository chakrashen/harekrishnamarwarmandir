'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Gift } from 'lucide-react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success !== false) {
        setSubmitted(true);
      }
    } catch (error) {
      console.warn('Newsletter signup failed.', error?.message || error);
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.left}>
            <Gift size={40} className={styles.icon} />
            <h3 className={styles.title}>Stay Connected with the Temple</h3>
            <p className={styles.desc}>Get updates on festivals, events, darshan timings, and seva opportunities directly in your inbox.</p>
          </div>
          <div className={styles.right}>
            {submitted ? (
              <div className={styles.success}>
                <span>🙏</span>
                <p>Hare Krishna! You&apos;re subscribed. Check your email for a welcome message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={16} /> Subscribe
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
