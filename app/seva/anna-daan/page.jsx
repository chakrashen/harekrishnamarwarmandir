'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Users, Utensils, Award, ChevronRight, MessageSquareQuote, ShieldCheck, BadgeCheck } from 'lucide-react';
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import FloatingButtons from '@/app/_components/FloatingButtons';
import BottomNav from '@/app/_components/BottomNav';
import styles from '../_components/SevaPage.module.css';

import heroImg from '../../../public/aan dan seva.png';
import trustImg from '../../../public/Anna Daan Seva seva impact.png';

const stats = [
  { label: 'Meals Served', value: '1.51L+', icon: Utensils },
  { label: 'Daily Souls Fed', value: '500+', icon: Users },
  { label: 'Tax Benefit', value: '80G', icon: Award },
];

const badges = [
  { icon: Award, text: 'FSSAI Certified Kitchen' },
  { icon: BadgeCheck, text: '80G Tax Benefit' },
  { icon: Users, text: 'Devotee Prepared' },
  { icon: ShieldCheck, text: 'Serving Since 2012' },
];

const easeOut = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: i * 0.1 } }),
};

export default function AnnaDaanPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <>
      <Navbar />
      <main className={styles.pageRoot}>

        {/* ── Hero ── */}
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.heroBg}>
            <motion.div style={{ y: imgY }} className={styles.heroImgMotion}>
              <Image
                src={heroImg}
                alt="Anna Daan Seva — feeding devotees"
                fill
                priority
                placeholder="blur"
                className={styles.heroImage}
              />
            </motion.div>
            <div className={styles.heroOverlay} />
          </div>

          <motion.div
            style={{ opacity: contentOpacity }}
            className={`container ${styles.heroContent}`}
          >
            <motion.span variants={fadeUp} custom={0} initial="hidden" animate="show" className={styles.heroKicker}>
              Hare Krishna Movement
            </motion.span>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show" className={styles.heroTitle}>
              Anna Daan<br />
              <span className={styles.heroTitleAccent}>Mahadan</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="show" className={styles.heroSubtitle}>
              &ldquo;Hunger is not just a lack of food, but a lack of hope. Every meal is a prayer answered.&rdquo;
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className={styles.heroActions}>
              <Link href="/donate?seva=anna-daan" className={`btn btn-donate ${styles.heroBtn}`}>
                <Heart size={18} /> Offer Anna Daan Seva
              </Link>
              <Link href="/donate" className={`btn btn-outline ${styles.heroBtnOutline}`}>
                View All Sevas
              </Link>
            </motion.div>

            {/* Stats — inside hero content, below CTAs */}
            <motion.div
              className={styles.statsBar}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: easeOut }}
            >
              <div className={styles.statsCard}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.statItem}>
                    <s.icon size={20} className={styles.statIcon} />
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Story Section ── */}
        <section className={styles.storySection}>
          <div className="container">
            <div className={styles.storyGrid}>

              <motion.div
                className={styles.storyLeft}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <div className={styles.storyHeadingWrap}>
                  <span className={styles.storyDecoChar} aria-hidden="true">अ</span>
                  <h2 className={styles.storyHeading}>
                    Feeding the Jodhpur<br />
                    <span className={styles.storyAccent}>Community</span> Since 2012.
                  </h2>
                </div>

                <div className={styles.storyBody}>
                  <p className={styles.storyPara}>
                    In the heart of Marwar, we believe that{' '}
                    <span className={styles.storyHighlight}>no soul</span> should go to sleep hungry.
                    What started as a small kitchen in our mandir has grown into a spiritual lifeline
                    for thousands across Jodhpur.
                  </p>
                  <blockquote className={styles.storyQuote}>
                    &ldquo;The merciful distribution of prasadam is the most authorized way to uplift
                    society from its present distress.&rdquo;
                  </blockquote>
                  <p className={styles.storyPara}>
                    Every day, our devotees cook fresh, sanctified meals with the highest standards of
                    hygiene and devotion. We aren&apos;t just serving food — we are sharing the mercy
                    of Lord Krishna.
                  </p>
                </div>

                <Link href="/donate?seva=anna-daan" className={styles.storyLink}>
                  Support our Daily Kitchen <ChevronRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                className={styles.storyRight}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <div className={styles.storyImgWrap}>
                  <Image src={trustImg} alt="Anna Daan Seva in action" fill className={styles.storyImg} />
                  <div className={styles.storyImgOverlay} />
                  <div className={styles.storyImgCaption}>
                    <span className={styles.storyImgCaptionLabel}>Live Impact</span>
                    <p className={styles.storyImgCaptionTitle}>150+ Slum Settlements Covered</p>
                  </div>
                </div>
                <div className={styles.storyBadge} style={{ background: 'var(--saffron)' }}>
                  Voted #1 Community Seva in Jodhpur
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Trust / Bento Section ── */}
        <section className={styles.trustSection}>
          <div className="container">
            <div className={styles.trustHeader}>
              <span className={styles.trustLabel}>Transparency</span>
              <h2 className={styles.trustTitle}>Your Mercy in Motion</h2>
              <div className="section-divider" />
            </div>

            <div className={styles.bentoGrid}>
              <motion.div
                className={styles.bentoQuote}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <MessageSquareQuote size={100} className={styles.bentoQuoteIcon} />
                <p className={styles.bentoQuoteText}>
                  &ldquo;Offering food to the hungry is not just charity; it is bringing Vaikuntha
                  to the streets of Jodhpur.&rdquo;
                </p>
                <span className={styles.bentoQuoteSource}>— Mandir Board</span>
              </motion.div>

              <motion.div
                className={styles.bentoStat}
                style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-light))' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className={styles.bentoStatValue}>100%</span>
                <span className={styles.bentoStatLabel}>Direct Impact — every rupee goes to grain and distribution</span>
              </motion.div>

              <motion.div
                className={styles.bentoBadges}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {badges.map((b) => (
                  <div key={b.text} className={styles.bentoBadgeItem}>
                    <div className={styles.bentoBadgeIcon} style={{ background: 'rgba(230,126,34,0.1)', color: 'var(--saffron)' }}>
                      <b.icon size={18} />
                    </div>
                    <span className={styles.bentoBadgeText}>{b.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBg} />
          <div className={styles.ctaInner}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <h2 className={styles.ctaTitle}>
                Be the Reason Someone<br />
                <span className={styles.ctaAccent}>Eats</span> Today.
              </h2>
              <p className={styles.ctaDesc}>
                Your contribution, no matter the size, provides the most basic human right —
                nourishment — infused with spiritual love.
              </p>
              <Link
                href="/donate?seva=anna-daan"
                className={styles.ctaBtn}
                style={{ background: 'linear-gradient(135deg, var(--saffron), var(--saffron-light))' }}
              >
                <Heart size={20} fill="currentColor" />
                Offer Seva Now
                <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
