'use client';
import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import styles from './AartiTicker.module.css';

const schedule = [
  { name: 'Mangala Aarti', hour: 4, minute: 30 },
  { name: 'Darshan Aarti', hour: 7, minute: 0 },
  { name: 'Raj Bhog Aarti', hour: 12, minute: 0 },
  { name: 'Utthapan Aarti', hour: 16, minute: 0 },
  { name: 'Sandhya Aarti', hour: 19, minute: 30 },
  { name: 'Shayan Aarti', hour: 20, minute: 30 },
];

export default function AartiTicker() {
  const [next, setNext] = useState('');
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      let target = schedule.find(a => a.hour * 60 + a.minute > mins) || schedule[0];
      setNext(target.name);
      const t = new Date(now);
      t.setHours(target.hour, target.minute, 0, 0);
      if (t <= now) t.setDate(t.getDate() + 1);
      const d = t - now;
      const h = Math.floor(d / 3600000);
      const m = Math.floor((d % 3600000) / 60000);
      const s = Math.floor((d % 60000) / 1000);
      setTime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.ticker}>
      <div className={`container ${styles.content}`}>
        <div className={styles.label}><Flame size={16} /> Next Darshan</div>
        <div className={styles.name}>{next}</div>
        <div className={styles.countdown}>{time}</div>
      </div>
    </div>
  );
}
