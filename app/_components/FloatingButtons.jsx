'use client';
import { MessageCircle } from 'lucide-react';
import styles from './FloatingButtons.module.css';

export default function FloatingButtons() {
  return (
    <div className={styles.wrap}>
      <a href="https://wa.me/919928766773" target="_blank" rel="noopener noreferrer" className={styles.whatsapp} aria-label="Chat on WhatsApp">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
