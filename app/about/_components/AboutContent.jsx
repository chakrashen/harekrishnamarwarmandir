'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Leaf, Star } from 'lucide-react';
import styles from './AboutContent.module.css';
import WaveBackdrop from '@/app/_components/WaveBackdrop';

import heroImg from '../../../public/about page/About page main background.png';
import quoteImg from '../../../public/srila-prabhupada.jpg';
import missionImg from '../../../public/about-mission.png';
import imgNirman from '../../../public/Mandir Nirman seva impact.jpg';
import imgAnna from '../../../public/Anna Daan Seva seva impact.png';
import imgGau from '../../../public/Gau Seva seva impact.jpg';

const impactStories = [
  {
    icon: BookOpen,
    title: 'Mandir Nirman',
    desc: 'A temple built by devotees. Every offering becomes a stone in a sacred home for bhakti and community.',
    impact: 'Construction is active now. Early seva becomes a founding legacy.',
    image: imgNirman,
    crop: 'center 30%',
  },
  {
    icon: Heart,
    title: 'Anna Daan Seva',
    desc: 'Offer prasadam that nourishes body and soul. Your seva feeds real people today.',
    impact: '1.51+ lakh meals served in Jodhpur through our initiatives.',
    image: imgAnna,
    crop: 'center 35%',
  },
  {
    icon: Leaf,
    title: 'Gau Seva',
    desc: 'Protect sacred cows with shelter, care, and daily nourishment.',
    impact: 'One offering sustains care that begins immediately.',
    image: imgGau,
    crop: 'center 45%',
  },
];

const timeline = [
  { year: '2010', title: 'Foundation', desc: 'Hare Krishna Movement Jodhpur was established with a small group of dedicated devotees.' },
  { year: '2011', title: 'Akshaya Patra Kitchen', desc: 'Mid-day meal service begins, nourishing school children across Jodhpur.' },
  { year: '2013', title: 'Anna Daan Begins', desc: 'Daily free prasadam distribution starts, serving communities every day.' },
  { year: '2017', title: 'Chaitanya Kunj', desc: 'A spiritual center opens for regular programs and festivals.' },
  { year: '2022', title: 'Land Sanctioned', desc: 'Government approval received for the grand temple project at Chopasani.' },
  { year: '2023', title: 'Mandir Construction Begins', desc: 'Construction starts for the 31,000 sq ft Hare Krishna Marwar Mandir.' },
  { year: '2027', title: 'Grand Opening', desc: 'A spiritual landmark for Marwar opens its doors to future generations.' },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <WaveBackdrop variant="about" />
          <Image
            src={heroImg}
            alt="Hare Krishna Marwar Mandir about page hero"
            fill
            placeholder="blur"
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
          <div className={styles.heroTexture} />
          <div className={styles.heroFade} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <motion.span className="section-label" style={{ color: 'var(--saffron-light)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>About Our Temple</motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Be Part of Krishna&apos;s Seva in Marwar
          </motion.h1>
          <motion.p className={styles.heroDesc} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            A sacred home is rising in Jodhpur. Your seva becomes a living legacy of devotion,
            culture, and care for every visitor who enters.
          </motion.p>
          <div className={styles.heroHighlights}>
            <span>31,000 sq ft mandir in progress</span>
            <span>1.51+ lakh meals served</span>
            <span>2010-2027 sacred legacy</span>
          </div>
          <div className={styles.heroCtas}>
            <a href="/donate" className="btn btn-donate">Offer Your Seva</a>
            <a href="/events" className="btn btn-outline">Explore Mandir</a>
          </div>
        </div>
      </section>

      {/* Prabhupada Quote */}
      <section className={`section-pad ${styles.quoteSection}`}>
        <div className="container">
          <motion.div className={styles.quoteCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}>
            <div className={styles.quoteImg}>
              <Image
                src={quoteImg}
                alt="His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 120px, 250px"
                className={styles.quotePortrait}
              />
            </div>
            <div className={styles.quoteText}>
              <p className={styles.quote}>
                &ldquo;The Krishna consciousness movement is not a new movement.
                It is not a new religion. It is the oldest, most authorized,
                and the most exalted system of knowledge.&rdquo;
              </p>
              <div className={styles.quoteAuthor}>
                <strong>His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</strong>
                <span>Founder-Acharya of ISKCON</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className={`section-pad ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.missionGrid}>
            <motion.div className={styles.missionImg} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}>
              <Image
                src={missionImg}
                alt="Devotees and spiritual activities at Hare Krishna Marwar Mandir"
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.missionImage}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}>
              <span className="section-label">Our Mission</span>
              <h2 className={styles.sectionTitle}>A Spiritual Sanctuary Rooted in Srila Prabhupada&apos;s Vision</h2>
              <p className={styles.bodyText}>
                Hare Krishna Marwar Mandir in Jodhpur is dedicated to sharing the teachings of Lord Sri Krishna
                as given by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.
              </p>
              <p className={styles.bodyText}>
                We are building a 31,000 sq ft temple that becomes a beacon of devotion, culture, and community
                upliftment. Your early participation becomes a founding legacy for generations.
              </p>
              <div className={styles.impactStats}>
                <div className={styles.impactCard}>
                  <span className={styles.impactValue}>1,00,000+</span>
                  <span className={styles.impactLabel}>members connected (Jodhpur)</span>
                </div>
                <div className={styles.impactCard}>
                  <span className={styles.impactValue}>1+ crore</span>
                  <span className={styles.impactLabel}>global community</span>
                </div>
                <div className={styles.impactCard}>
                  <span className={styles.impactValue}>1.51+ lakh</span>
                  <span className={styles.impactLabel}>meals served (Jodhpur)</span>
                </div>
                <div className={styles.impactCard}>
                  <span className={styles.impactValue}>500+ crore</span>
                  <span className={styles.impactLabel}>meals served globally</span>
                </div>
              </div>
              <div className={styles.trustMicro}>
                Secure payment • 80G tax benefit • 1+ crore global community
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media Recognition */}
      <section className={`section-pad ${styles.newsSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">In the News</span>
            <h2 className="section-title">Recognized for Our Seva</h2>
            <div className="section-divider" />
            <p className="section-desc">Third-party recognition of the temple&apos;s impact on the community.</p>
          </div>
          <motion.div
            className={styles.newsCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className={styles.newsSource}>
              <span className={styles.newsLogo}>📰</span>
              <div>
                <strong className={styles.newsSourceName}>Dainik Bhaskar</strong>
                <span className={styles.newsSourceDesc}>Rajasthan&apos;s Largest Hindi Daily</span>
              </div>
            </div>
            <blockquote className={styles.newsQuote}>
              <p className={styles.newsHeadlineHindi}>
                &ldquo;हरे कृष्ण मारवाड़ मंदिर: अस्पतालों में कर रहे निशुल्क अन्नदान सेवा&rdquo;
              </p>
              <p className={styles.newsHeadlineEn}>
                Hare Krishna Marwar Temple: Doing Free Food Distribution Service in Hospitals
              </p>
              <p className={styles.newsSummary}>
                The temple has been silently serving patients and their families in Jodhpur&apos;s hospitals,
                providing sanctified meals free of charge to those who need it most. This consistent
                community service extends well beyond the temple&apos;s walls, reaching the most vulnerable.
              </p>
            </blockquote>
            <a
              href="https://www.bhaskar.com/local/rajasthan/jodhpur/news/hare-krishna-marwar-temple-is-doing-free-anna-dan-service-in-hospitals-135871815.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.newsLink}
            >
              Read the full article on Dainik Bhaskar →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Foundational Shlok */}
      <section className={styles.shlokSection}>
        <div className="container">
          <motion.div 
            className={styles.shlokCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.shlokSanskrit}>
              &ldquo;यत् करोषि यद् अश्नासि यज् जुहोषि ददासि यत् ।<br />
              यत् तपस्यसि कौन्तेय तत् कुरुष्व मदर्पणम् ॥&rdquo;
            </p>
            <p className={styles.shlokEnglish}>
              &ldquo;Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kuntī, as an offering to Me.&rdquo;
            </p>
            <p className={styles.shlokRef}>— Bhagavad Gita 9.27</p>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className={`section-pad ${styles.impactSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Seva in Action</span>
            <h2 className="section-title">Your Seva Creates Living Impact</h2>
            <div className="section-divider" />
            <p className="section-desc">Every offering becomes prasadam, protection, and spiritual upliftment. The impact begins now.</p>
          </div>
          <div className={styles.impactGrid}>
            {impactStories.map((story, i) => (
              <motion.div
                key={story.title}
                className={`${styles.impactRow} ${i % 2 === 1 ? styles.impactRowReverse : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={styles.impactMedia}>
                  <Image
                    src={story.image}
                    alt={`${story.title} seva impact`}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.impactImage}
                    style={{ objectPosition: story.crop }}
                  />
                </div>
                <div className={styles.impactContent}>
                  <span className={styles.impactKicker}>Seva Focus</span>
                  <div className={styles.impactIcon}><story.icon size={22} /></div>
                  <h3 className={styles.impactTitle}>{story.title}</h3>
                  <p className={styles.impactDesc}>{story.desc}</p>
                  <p className={styles.impactStat}>{story.impact}</p>
                  <div className={styles.impactCta}>
                    <a href="/donate" className="btn btn-donate btn-sm">Offer Your Seva</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`section-pad ${styles.timelineSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">A Legacy of Seva, A Future for Marwar</h2>
            <div className="section-divider" />
            <p className="section-desc">Construction is underway. Your early seva shapes the mandir for generations.</p>
          </div>
          <div className={styles.timelineWrap}>
            <div className={styles.timelineProgress}>
              <span>2010</span>
              <div className={styles.timelineBar} />
              <span>2027</span>
            </div>
            <div className={styles.timelineCards}>
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                className={styles.timelineCard}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={styles.timelineTop}>
                  <span className={styles.timelineYear}>{t.year}</span>
                  <span className={styles.timelineDot}><Star size={12} /></span>
                </div>
                <div className={styles.timelineContent}>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.finalCta}>
        <div className={`container ${styles.finalCtaInner}`}>
          <span className="section-label">Join the Seva Circle</span>
          <h2 className={styles.finalCtaTitle}>You Are Part of This Temple&apos;s Story</h2>
          <p className={styles.finalCtaText}>
            Offer your seva today and help shape a sacred legacy that will guide generations.
          </p>
          <div className={styles.finalCtaActions}>
            <a href="/donate" className="btn btn-donate">Offer Your Seva</a>
            <a href="/events" className="btn btn-outline">Explore Mandir</a>
          </div>
          <div className={styles.trustMicro}>
            Secure payment • 80G tax benefit • 1+ crore global community
          </div>
        </div>
      </section>
    </>
  );
}
