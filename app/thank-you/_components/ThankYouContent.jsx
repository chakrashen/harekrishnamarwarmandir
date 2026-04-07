'use client';
import { motion } from 'framer-motion';
import { Heart, Share2, Home, ArrowRight } from 'lucide-react';
import styles from './ThankYouContent.module.css';

export default function ThankYouContent() {
  const shareText = "I just donated to Hare Krishna Marwar Mandir, Jodhpur! 🙏 You can too: https://www.harekrishnamarwar.org/donate";

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.iconWrap}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <Heart size={48} fill="var(--maroon)" color="var(--maroon)" />
            </motion.div>
          </div>

          <h1 className={styles.title}>Hare Krishna! 🙏</h1>
          <h2 className={styles.subtitle}>Thank You for Your Generous Donation</h2>

          <p className={styles.desc}>
            Your sacred contribution directly supports temple construction, Gau Seva, 
            and Anna Daan at Hare Krishna Marwar Mandir, Jodhpur.
          </p>

          <div className={styles.verse}>
            <p>&ldquo;यत् करोषि यद् अश्नासि यज् जुहोषि ददासि यत् ।<br />
            यत् तपस्यसि कौन्तेय तत् कुरुष्व मदर्पणम् ॥&rdquo;</p>
            <span>— Bhagavad Gita 9.27</span>
          </div>

          <p className={styles.receipt}>
            A receipt will be sent to your email shortly. For any queries, contact us at{' '}
            <a href="mailto:harekrishna@hkmjodhpur.org">harekrishna@hkmjodhpur.org</a> or{' '}
            <a href="tel:+919116139371">+91 91161 39371</a>.
          </p>

          <div className={styles.actions}>
            <button onClick={shareOnWhatsApp} className={`btn btn-primary ${styles.shareBtn}`}>
              <Share2 size={18} /> Share on WhatsApp
            </button>
            <a href="/" className="btn btn-outline btn-sm">
              <Home size={16} /> Back to Home
            </a>
            <a href="/donate" className="btn btn-donate btn-sm">
              Donate Again <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
