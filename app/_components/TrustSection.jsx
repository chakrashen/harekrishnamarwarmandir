import Image from 'next/image';
import { ShieldCheck, Flame, Flower2, BadgeCheck } from 'lucide-react';
import styles from './TrustSection.module.css';

const trustItems = [
  { icon: ShieldCheck, text: '10,000+ Devotees Trust This Mission' },
  { icon: Flame, text: 'Serving since 2012' },
  { icon: Flower2, text: '80G Tax Benefit Available' },
  { icon: BadgeCheck, text: 'Secure Payment via ICICI Bank' },
];

const proofItems = [
  {
    title: 'Anna Daan Seva',
    desc: 'Daily prasadam offering with community participation.',
    img: '/gallery/gallery-anna-daan-serving.jpg',
  },
  {
    title: 'Gau Seva',
    desc: 'Sacred cow care supported by devotees across Marwar.',
    img: '/gallery/gallery-gau-seva-volunteer.jpg',
  },
  {
    title: 'Mandir Nirman',
    desc: 'A growing spiritual home built with collective seva.',
    img: '/mandir-nirman-seva.png',
  },
];

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Trust & Transparency</span>
          <p className={styles.desc}>Shraddha begins with clarity, care, and secure seva.</p>
        </div>
        <div className={styles.strip}>
          {trustItems.map((item) => (
            <div key={item.text} className={styles.trustItem}>
              <item.icon size={20} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.proofGrid}>
          {proofItems.map((item) => (
            <article key={item.title} className={styles.proofCard}>
              <div className={styles.proofImageWrap}>
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.proofImage}
                />
              </div>
              <div className={styles.proofBody}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
