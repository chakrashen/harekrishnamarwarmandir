'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Share2, Home, ArrowRight, Download } from 'lucide-react';
import styles from './ThankYouContent.module.css';

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('status');
  const refNo = searchParams.get('ref');
  const [resolvedRefNo, setResolvedRefNo] = useState('');
  const [donationStatus, setDonationStatus] = useState('');
  const [sevaType, setSevaType] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');
  const [receiptStatus, setReceiptStatus] = useState('');
  const [receiptError, setReceiptError] = useState('');
  const [receiptLoading, setReceiptLoading] = useState(false);
  const shareText = "I just donated to Hare Krishna Marwar Mandir, Jodhpur! 🙏 You can too: https://www.harekrishnamarwar.org/donate";

  const displayRefNo = resolvedRefNo || refNo || '';
  const effectivePaymentStatus = donationStatus || paymentStatus || '';
  const shouldShowReceiptPanel = Boolean(refNo) && effectivePaymentStatus !== 'failed';

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    if (!refNo) return;

    let isMounted = true;
    setReceiptLoading(true);
    setReceiptError('');

    fetch(`/api/receipt?ref=${encodeURIComponent(refNo)}`, { cache: 'no-store' })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(body.error || 'Receipt lookup failed');
        }
        return body;
      })
      .then((body) => {
        if (!isMounted) return;
        setResolvedRefNo(body.referenceNo || '');
        setDonationStatus(body.donationStatus || '');
        setSevaType(body.sevaType || '');
        setReceiptUrl(body.receiptUrl || '');
        setReceiptStatus(body.receiptStatus || '');
      })
      .catch((error) => {
        if (!isMounted) return;
        setReceiptError(error?.message || 'Receipt lookup failed');
      })
      .finally(() => {
        if (isMounted) {
          setReceiptLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [refNo]);

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
            <p>&ldquo;Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kuntī, as an offering to Me.&rdquo;</p>
            <span>— Bhagavad Gita 9.27</span>
          </div>

          {shouldShowReceiptPanel && (
            <div className={styles.receiptPanel}>
              <div className={styles.receiptTitle}>Receipt</div>
              <div className={styles.receiptMeta}>Reference: {displayRefNo}</div>
              {receiptLoading && (
                <p className={styles.receiptStatus}>Preparing your receipt. This can take a minute.</p>
              )}
              {!receiptLoading && receiptUrl && (
                <a
                  href={receiptUrl}
                  className={`btn btn-outline ${styles.receiptBtn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} /> Download Receipt (PDF)
                </a>
              )}
              {!receiptLoading && !receiptUrl && !receiptError && (
                <p className={styles.receiptStatus}>
                  Your receipt is being prepared. We will also email it to you shortly.
                </p>
              )}
              {!receiptLoading && receiptError && (
                <p className={styles.receiptError}>
                  We could not fetch the receipt right now. Please try again shortly.
                </p>
              )}
              {!receiptLoading && receiptStatus === 'failed' && !receiptUrl && !receiptError && (
                <p className={styles.receiptError}>
                  Receipt generation failed. Please contact us with your reference number.
                </p>
              )}
            </div>
          )}

          {sevaType?.includes('Mandir Nirman') && (
            <div className={styles.giftPanel}>
              <div className={styles.giftIconWrapSmall}>
                <Heart size={20} fill="var(--saffron)" color="var(--saffron)" />
              </div>
              <div className={styles.giftText}>
                <strong>Blessed Gifts on the Way!</strong>
                <p>Your "Krishna Gift" set (Calendar, Mala, Prasadam & Book) will reach your address soon.</p>
              </div>
            </div>
          )}

          <p className={styles.receipt}>
            A receipt will be sent to your email shortly. For any queries, contact us at{' '}
            <a href="mailto:harekrishna@hkmjodhpur.org">harekrishna@hkmjodhpur.org</a> or{' '}
            <a href="tel:+919928766773">+91 99287 66773</a>.
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
