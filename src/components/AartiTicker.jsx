import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import './AartiTicker.css';

const aartiSchedule = [
  { name: 'Mangala Aarti', hour: 4, minute: 30 },
  { name: 'Darshan Aarti', hour: 7, minute: 0 },
  { name: 'Raj Bhog Aarti', hour: 12, minute: 0 },
  { name: 'Utthapan Aarti', hour: 16, minute: 0 },
  { name: 'Sandhya Aarti', hour: 19, minute: 30 },
  { name: 'Shayan Aarti', hour: 20, minute: 30 },
];

export default function AartiTicker() {
  const [nextAarti, setNextAarti] = useState(null);
  const [timeLeft, setTimeLeft] = useState('--:--:--');

  useEffect(() => {
    const calculateNextAarti = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let targetAarti = null;
      for (const aarti of aartiSchedule) {
        const aartiMinutes = aarti.hour * 60 + aarti.minute;
        if (aartiMinutes > currentMinutes) {
          targetAarti = aarti;
          break;
        }
      }
      
      if (!targetAarti) targetAarti = aartiSchedule[0];
      setNextAarti(targetAarti.name);

      const targetTime = new Date(now);
      targetTime.setHours(targetAarti.hour, targetAarti.minute, 0, 0);
      if (targetTime <= now) targetTime.setDate(targetTime.getDate() + 1);

      const diff = targetTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    calculateNextAarti();
    const interval = setInterval(calculateNextAarti, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aarti-ticker-wrapper">
      <div className="container ticker-container">
        <motion.div 
          className="ticker-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="ticker-label">
            <Flame size={18} color="var(--color-saffron-light)" />
            <span>Next Darshan</span>
          </div>
          <div className="ticker-aarti-name">
            {nextAarti || 'Loading...'}
          </div>
          <div className="ticker-countdown">
            {timeLeft}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
