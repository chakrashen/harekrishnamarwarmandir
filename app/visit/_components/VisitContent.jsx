'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, MapPin, Shirt, Car, Train, Plane, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import styles from './VisitContent.module.css';

// Static LCP optimization
import visitBg from '../../../public/visit page background.png';

const darshan = [
  { name: 'Mangala Aarti', time: '4:30 AM' },
  { name: 'Darshan Aarti', time: '7:00 AM' },
  { name: 'Raj Bhog Aarti', time: '12:00 PM' },
  { name: 'Utthapan Aarti', time: '4:00 PM' },
  { name: 'Sandhya Aarti', time: '7:30 PM' },
  { name: 'Shayan Aarti', time: '8:30 PM' },
];

const faqs = [
  { q: 'Is there an entry fee to visit the temple?', a: 'No, Hare Krishna Marwar Mandir is open to all visitors free of charge. Everyone is welcome to come for darshan at any time during temple hours.' },
  { q: 'Is free prasadam available?', a: 'Yes! Free nutritious prasadam (blessed vegetarian food) is served daily after the Raj Bhog Aarti at 12:00 PM. All are welcome.' },
  { q: 'Can I volunteer at the temple?', a: 'Absolutely! We welcome volunteers for kitchen seva, cleaning, event management, and devotional programs. Contact us at +91 99287 66773 to join.' },
  { q: 'How can I donate for a specific seva?', a: 'Visit our Donate page to choose from Anna Daan (₹3,400 for 100 meals), Mandir Nirman (₹2,500/sq ft), or Gau Seva (₹2,100/day). Note: Mandir Nirman donors receive a "Krishna Gift" set including a Calendar, Mala, Prasadam, and Book.' },
  { q: 'Is photography allowed inside the temple?', a: 'Yes, photography is allowed in most areas. However, please be respectful during aarti and darshan times. Flash photography is not permitted near the deities.' },
  { q: 'Are there accommodation facilities?', a: 'Guest house facilities are under construction and will be available after the Mandir opening in March 2027. For current accommodation, we can suggest nearby options.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQ} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <motion.div className={styles.faqA} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }}><p>{a}</p></motion.div>}
    </div>
  );
}

export default function VisitContent() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={visitBg}
            alt="Visit Hare Krishna Marwar Mandir"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-label" style={{ color: 'var(--saffron-light)' }}>Plan Your Visit</span>
          <h1 className={styles.heroTitle}>Visit the Mandir</h1>
          <p className={styles.heroDesc}>
            Your darshan is a blessing. Your seva keeps prasadam, cow care, and daily worship open
            for every visitor.
          </p>
          <div className={styles.heroActions}>
            <a href="/donate" className="btn btn-donate">Donate Now</a>
            <a href="#darshan-timings" className="btn btn-outline">View Timings</a>
          </div>
          <div className={styles.heroTrust}>
            <span>Secure ICICI payment</span>
            <span>80G tax benefit</span>
            <span>Serving since 2012</span>
          </div>
        </div>
      </section>

      {/* Darshan Timings */}
      <section className="section-pad" id="darshan-timings">
        <div className="container">
          <div className={styles.topGrid}>
            <motion.div className={styles.timingsCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className={styles.cardTitle}><Clock size={22} /> Daily Darshan Timings</h2>
              <div className={styles.timingsList}>
                {darshan.map(d => (
                  <div key={d.name} className={styles.timingRow}>
                    <span className={styles.timingName}>{d.name}</span>
                    <span className={styles.timingTime}>{d.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.guidelinesCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <h2 className={styles.cardTitle}><Shirt size={22} /> Visitor Guidelines</h2>
              <ul className={styles.guideList}>
                <li>Wear modest, clean clothing — no shorts or sleeveless tops</li>
                <li>Remove shoes before entering the temple hall</li>
                <li>Silence mobile phones during aarti and darshan</li>
                <li>Photography is allowed but no flash near deities</li>
                <li>Free prasadam available after Raj Bhog Aarti daily</li>
                <li>Children are welcome — supervised at all times</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className={`section-pad ${styles.reachBg}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Getting Here</span>
            <h2 className="section-title">How to Reach</h2>
            <div className="section-divider" />
          </div>
          <div className={styles.reachGrid}>
            {[
              { icon: Plane, title: 'By Air', desc: 'Jodhpur Airport (JDH) is just 15 minutes from the temple. Pre-paid taxi and auto-rickshaw available.' },
              { icon: Train, title: 'By Train', desc: 'Jodhpur Junction (JU) is the nearest railway station — well connected to Delhi, Mumbai, Jaipur.' },
              { icon: Car, title: 'By Road', desc: 'Jodhpur is well connected via NH-62 and NH-25. Ample parking available at the temple premises.' },
              { icon: Phone, title: 'Need Help?', desc: 'Call us at +91 99287 66773 or WhatsApp for directions and transportation assistance.' },
            ].map((r, i) => (
              <motion.div key={r.title} className={styles.reachCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className={styles.reachIcon}><r.icon size={24} /></div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-divider" />
          </div>
          <div className={styles.faqList}>
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>
    </>
  );
}
