'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import styles from './FloatingButtons.module.css';

const WHATSAPP_URL = 'https://wa.me/919928766773?text=Hare%20Krishna!%20I%20want%20to%20know%20about%20seva%20options.%20Please%20share%20a%20link%20to%20get%20started.';

export default function FloatingButtons() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after a brief delay so it doesn't distract from initial load
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.wrap}>
      {showTooltip && (
        <div className={styles.tooltip}>
          <button
            className={styles.tooltipClose}
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
          <p className={styles.tooltipText}>
            Want to donate for a specific seva?<br />
            <strong>Chat with a devotee</strong>
          </p>
        </div>
      )}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
        aria-label="Chat on WhatsApp about seva options"
        onMouseEnter={() => setShowTooltip(true)}
        onClick={() => setShowTooltip(false)}
      >
        <MessageCircle size={26} fill="white" />
      </a>
    </div>
  );
}
