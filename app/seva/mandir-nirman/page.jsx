'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Landmark, HardHat, Award, ChevronRight, MessageSquareQuote, ShieldCheck, Calendar, Sparkles, Utensils, BookOpen } from 'lucide-react';
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import FloatingButtons from '@/app/_components/FloatingButtons';
import BottomNav from '@/app/_components/BottomNav';
import styles from '../_components/SevaPage.module.css';

import heroImg from '../../../public/mandir-nirman-seva.png';
import trustImg from '../../../public/Mandir Nirman seva impact.jpg';

const stats = [
  { label: 'Temple Size', value: '35K SqFt', icon: Landmark },
  { label: 'Construction', value: 'Active', icon: HardHat },
  { label: 'Tax Benefit', value: '80G', icon: Award },
];

const badges = [
  { icon: Landmark, text: 'State of Art Facility' },
  { icon: Award, text: '80G Donation Benefit' },
  { icon: HardHat, text: '2027 Projected Completion' },
  { icon: ShieldCheck, text: 'Vedic Architecture' },
];

const easeOut = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: i * 0.1 } }),
};

export default function MandirNirmanPage() {
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
                alt="Mandir Nirman Seva — building Krishna's home"
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
              Building a Sacred Legacy
            </motion.span>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show" className={styles.heroTitle}>
              Mandir Nirman<br />
              <span className={styles.heroTitleAccentGold}>A Home for Krishna</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="show" className={styles.heroSubtitle}>
              &ldquo;Lord Krishna resides where His devotees build a home for Him with love and devotion.&rdquo;
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className={styles.heroActions}>
              <Link href="/donate?seva=mandir-nirman" className={`btn btn-donate ${styles.heroBtn}`}>
                <Heart size={18} /> Build the Eternal Home
              </Link>
              <Link href="/donate" className={`btn btn-outline ${styles.heroBtnOutline}`}>
                View All Sevas
              </Link>
            </motion.div>

            {/* Stats — inside hero content */}
            <motion.div
              className={styles.statsBar}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: easeOut }}
            >
              <div className={styles.statsCard}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.statItem}>
                    <s.icon size={20} className={styles.statIconGold} />
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
            <motion.div
              className={styles.storyCenterHead}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <span className="section-label">Eternal Architecture</span>
              <h2 className={styles.storyCenterTitle}>
                Crafting a Spiritual{' '}
                <span className={styles.storyAccentGold}>Sanctuary</span> in Jodhpur.
              </h2>
              <div className="section-divider" />
            </motion.div>

            <div className={styles.storyGrid}>
              <motion.div
                className={styles.storyLeft}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <div className={styles.storyBody}>
                  <p className={styles.storyPara}>
                    The rising towers of{' '}
                    <span className={styles.storyHighlight}>Hare Krishna Marwar Mandir</span> stand
                    as a testament to Jodhpur&apos;s faith. Spanning 31,000 square feet, this
                    architectural marvel combines ancient Vedic design with Marwar&apos;s stone heritage.
                  </p>
                  <blockquote className={styles.storyQuoteGold}>
                    &ldquo;Building a temple is the ultimate way to establish a spiritual foundation
                    for generations to come. Every stone has a soul.&rdquo;
                  </blockquote>
                  <p className={styles.storyPara}>
                    This is not just a building — it is a center for higher consciousness, a home for
                    the community, and a sanctuary where the divine meets the devotee. Your support is
                    critical in helping us complete this monumental journey.
                  </p>
                </div>

                <Link href="/donate?seva=mandir-nirman" className={styles.storyLinkGold}>
                  Support the Construction <ChevronRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                className={styles.storyRight}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <div className={styles.storyImgWrapSquare}>
                  <Image src={trustImg} alt="Temple construction in Jodhpur" fill className={styles.storyImg} />
                  <div className={styles.storyImgOverlay} />
                  <div className={styles.storyImgCaption}>
                    <span className={styles.storyImgCaptionLabelGold}>Construction Status</span>
                    <p className={styles.storyImgCaptionTitle}>Main Shikhara Rising</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust / Bento Section ── */}
        <section className={styles.trustSection}>
          <div className="container">
            <div className={styles.trustHeader}>
              <span className={styles.trustLabelGold}>Legacy</span>
              <h2 className={styles.trustTitle}>Foundation of Faith</h2>
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
                <MessageSquareQuote size={100} className={styles.bentoQuoteIconGold} />
                <p className={styles.bentoQuoteText}>
                  &ldquo;One who builds a temple for Sri Krishna will go to the spiritual world for
                  as many years as there are bricks used.&rdquo;
                </p>
                <span className={styles.bentoQuoteSourceGold}>— Bhagavad Purana</span>
              </motion.div>

              <motion.div
                className={styles.bentoStat}
                style={{ background: 'linear-gradient(135deg, #b8860b, var(--saffron))' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className={styles.bentoStatValue}>31,000</span>
                <span className={styles.bentoStatLabel}>Sq Ft of Spiritual Space</span>
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
                    <div className={styles.bentoBadgeIcon} style={{ background: 'rgba(184,134,11,0.1)', color: '#b8860b' }}>
                      <b.icon size={18} />
                    </div>
                    <span className={styles.bentoBadgeText}>{b.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Gifts Section ── */}
        <section className={styles.giftsSection}>
          <div className="container">
            <div className={styles.giftsHeader}>
              <span className="section-label">Blessed Tokens</span>
              <h2 className={styles.giftsTitle}>A Gift from Krishna to You</h2>
              <p className={styles.giftsDesc}>
                As a token of our heartfelt gratitude, every donor contributing to the Mandir Nirman
                receives a specially blessed "Krishna Gift" set to bring the divine atmosphere of Jodhpur into your home.
              </p>
              <div className="section-divider" style={{ margin: '1.5rem auto' }} />
            </div>

            <div className={styles.giftsGrid}>
              {[
                { name: 'Krishna Gift Calendar', icon: Calendar, detail: 'Beautiful monthly darshans for your wall' },
                { name: 'Sacred Jaap Mala', icon: Sparkles, detail: 'Blessed beads for your daily meditation' },
                { name: 'Mahaprasadam', icon: Utensils, detail: 'Sanctified dry prasadam from the temple' },
                { name: 'Gita Sar Book', icon: BookOpen, detail: 'The essence of Bhagavad Gita for daily wisdom' },
              ].map((gift, i) => (
                <motion.div
                  key={gift.name}
                  className={styles.giftCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className={styles.giftIconWrap}>
                    <gift.icon size={32} />
                  </div>
                  <h3 className={gift.name === 'Krishna Gift Calendar' ? `${styles.giftName} ${styles.giftTitleAccentGold}` : styles.giftName}>
                    {gift.name}
                  </h3>
                  <p className={styles.giftDetail}>{gift.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBgGold} />
          <div className={styles.ctaInner}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <h2 className={styles.ctaTitle}>
                Build the<br />
                <span className={styles.ctaAccentGold}>Eternal</span> Home.
              </h2>
              <p className={styles.ctaDesc}>
                Every stone counts. Every contribution is a seed of faith that will grow into
                a sanctuary for generations to come.
              </p>
              <Link
                href="/donate?seva=mandir-nirman"
                className={styles.ctaBtn}
                style={{ background: 'linear-gradient(135deg, #b8860b, var(--saffron))', boxShadow: '0 12px 36px rgba(184,134,11,0.35)' }}
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
