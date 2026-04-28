'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, BookOpen, Utensils, Leaf, Music } from 'lucide-react';
import styles from './EventsContent.module.css';
import { events } from '../_data/events';
import { getDaysLeft, getUpcomingEvents } from '../_utils/getUpcomingEvents';
import WaveBackdrop from '@/app/_components/WaveBackdrop';

import heroImg from '../../../public/event page/event page background.jpeg';

const upcomingEvents = getUpcomingEvents(events);

const programs = [
  { icon: BookOpen, title: 'Bhagavad Gita Classes', schedule: 'Every Sunday, 10 AM', desc: 'Weekly study of Bhagavad Gita with practical life applications.', color: '#8B1A1A' },
  { icon: Utensils, title: 'Anna Daan Seva', schedule: 'Daily, 12 PM', desc: 'Free nutritious prasadam served daily to everyone.', color: '#E05C00' },
  { icon: Leaf, title: 'Gau Seva', schedule: 'Daily, 6 AM & 5 PM', desc: 'Cow feeding and care at our Gau Shala.', color: '#2D7D2D' },
  { icon: Music, title: 'Evening Kirtan', schedule: 'Daily, 7 PM', desc: 'Soul-stirring congregational chanting of the Holy Names.', color: '#6B21A8' },
  { icon: Users, title: 'Youth Program', schedule: 'Every Saturday, 5 PM', desc: 'Secrets of Success — value-based guidance for young minds.', color: '#C8961E' },
  { icon: Calendar, title: 'Ekadashi Celebration', schedule: 'Twice Monthly', desc: 'Special fasting, kirtan, and spiritual discourse on Ekadashi.', color: '#1A5276' },
];

export default function EventsContent() {
  const hasUpcomingEvents = upcomingEvents.length > 0;

  return (
    <>
      {hasUpcomingEvents && upcomingEvents.map((event) => (
        <script
          key={event.title}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": event.title,
              "startDate": event.date,
              "location": {
                "@type": "Place",
                "name": "Hare Krishna Marwar Mandir",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Jodhpur",
                  "addressRegion": "Rajasthan",
                  "addressCountry": "IN"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Hare Krishna Marwar Mandir",
                "url": "https://harekrishnamarwar.org"
              }
            })
          }}
        />
      ))}
      <section className={styles.hero} aria-label="Events and Festivals Hero">
        <div className={styles.heroBg}>
          <WaveBackdrop variant="events" />
          <Image
            src={heroImg}
            alt="Devotees performing kirtan at Hare Krishna Mandir Jodhpur"
            fill
            placeholder="blur"
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-label" style={{ color: 'var(--saffron-light)' }}>Festivals & Programs</span>
          <h1 className={styles.heroTitle}>Events at the Mandir</h1>
          <p className={styles.heroDesc}>
            Every festival and kirtan is made possible by devotee seva. Your donation keeps prasadam,
            cow care, and spiritual programs open to all.
          </p>
          <div className={styles.heroActions}>
            <a href="/donate" className="btn btn-donate">Donate Now</a>
            <a href="#upcoming-events" className="btn btn-outline">View Upcoming</a>
          </div>
          <div className={styles.heroTrust}>
            <span>Secure ICICI payment</span>
            <span>80G tax benefit</span>
            <span>Serving since 2012</span>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="section-pad" id="upcoming-events" aria-label="Upcoming Events Section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Upcoming</span>
            <h2 className="section-title">Festivals & Celebrations</h2>
            <div className="section-divider" />
          </div>
          <div className={styles.eventsGrid}>
            {hasUpcomingEvents ? (
              upcomingEvents.map((event, i) => (
                <motion.article
                  key={event.title}
                  className={`card ${styles.eventCard}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.eventImg}>
                    <Image
                      src={event.image}
                      alt={`Upcoming festival: ${event.title} at Hare Krishna Marwar Mandir Jodhpur`}
                      fill
                      className={styles.eventImage}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className={styles.daysLeftBadge}>{getDaysLeft(event.date)} days left</span>
                  </div>
                  <div className={styles.eventBody}>
                    <div className={styles.eventMeta}>
                      <span className={styles.eventDate}><Calendar size={14} /> {event.date}</span>
                      <span className={styles.eventTime}><Clock size={14} /> {event.time}</span>
                    </div>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventDesc}>{event.description}</p>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className={styles.emptyState}>No upcoming festivals in the next 30 days</div>
            )}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className={`section-pad ${styles.programsBg}`} aria-label="Regular Weekly and Daily Programs">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Weekly & Daily</span>
            <h2 className="section-title">Regular Programs</h2>
            <div className="section-divider" />
            <p className="section-desc">Join our regular spiritual programs and become a part of the devotional community.</p>
          </div>
          <div className={styles.programsGrid}>
            {programs.map((p, i) => (
              <motion.article key={p.title} className={styles.programCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.08 }}>
                <div className={styles.programIcon} style={{ background: `${p.color}15`, color: p.color }}><p.icon size={24} /></div>
                <div>
                  <h3 className={styles.programTitle} lang={p.title.match(/[\u0900-\u097F]/) ? "hi" : "en"}>{p.title}</h3>
                  <span className={styles.programSchedule}>{p.schedule}</span>
                  <p className={styles.programDesc}>{p.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
