'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Home, Leaf, Award, ChevronRight, MessageSquareQuote, ShieldCheck, BadgeCheck } from 'lucide-react';
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';
import FloatingButtons from '@/app/_components/FloatingButtons';
import BottomNav from '@/app/_components/BottomNav';
import styles from '../_components/SevaPage.module.css';

import heroImg from '../../../public/gau dan seva.png';
import trustImg from '../../../public/Gau Seva seva impact.jpg';

const stats = [
  { label: 'Cows Protected', value: '50+', icon: Home },
  { label: 'Fresh Fodder', value: 'Daily', icon: Leaf },
  { label: 'Tax Benefit', value: '80G', icon: Award },
];

const badges = [
  { icon: Home, text: 'Lifetime Shelter' },
  { icon: Award, text: 'Registered Goshala' },
  { icon: Leaf, text: 'Organic Farming Focus' },
  { icon: ShieldCheck, text: '24/7 Medical Care' },
];

const easeOut = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: i * 0.1 } }),
};

export default function GauSevaPage() {
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
                alt="Gau Seva — protecting sacred cows"
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
              Mother Cow Protection
            </motion.span>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show" className={styles.heroTitle}>
              Gau Seva<br />
              <span className={styles.heroTitleAccentGreen}>Nourish Mother</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="show" className={styles.heroSubtitle}>
              &ldquo;The cow is the mother of all entities. Protecting her is protecting humanity itself.&rdquo;
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className={styles.heroActions}>
              <Link href="/donate?seva=gau-seva" className={`btn btn-donate ${styles.heroBtn}`}>
                <Heart size={18} /> Become a Gau Sevak
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
                    <s.icon size={20} className={styles.statIconGreen} />
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
                  <span className={styles.storyDecoChar} aria-hidden="true">गौ</span>
                  <h2 className={styles.storyHeading}>
                    A Sanctuary for the<br />
                    <span className={styles.storyAccentGreen}>Sacred</span> Mother.
                  </h2>
                </div>

                <div className={styles.storyBody}>
                  <p className={styles.storyPara}>
                    In the Marwar landscape, the cow represents purity and abundance. Our{' '}
                    <span className={styles.storyHighlightGreen}>Goshala</span> provides a lifelong
                    home for neglected, elderly, and abandoned cows.
                  </p>
                  <blockquote className={styles.storyQuoteGreen}>
                    &ldquo;Surabhi cows are the source of all prosperity. By serving them, one attains
                    all the spiritual goals of life.&rdquo;
                  </blockquote>
                  <p className={styles.storyPara}>
                    Every cow in our care receives fresh fodder, medical attention, and the love of
                    our devotees. We believe that cow protection is not just a duty, but a sacred
                    path to spiritual peace.
                  </p>
                </div>

                <Link href="/donate?seva=gau-seva" className={styles.storyLinkGreen}>
                  Support our Goshala <ChevronRight size={16} />
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
                  <Image src={trustImg} alt="Gau Seva at the Goshala" fill className={styles.storyImg} />
                  <div className={styles.storyImgOverlayGreen} />
                  <div className={styles.storyImgCaption}>
                    <span className={styles.storyImgCaptionLabelGreen}>Sanctuary Impact</span>
                    <p className={styles.storyImgCaptionTitle}>24/7 Care & Medical Support</p>
                  </div>
                </div>
                <div className={styles.storyBadge} style={{ background: 'var(--green-earth)' }}>
                  Top Rated Animal Sanctuary
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Trust / Bento Section ── */}
        <section className={styles.trustSection}>
          <div className="container">
            <div className={styles.trustHeader}>
              <span className={styles.trustLabelGreen}>Our Promise</span>
              <h2 className={styles.trustTitle}>Compassion in Action</h2>
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
                <MessageSquareQuote size={100} className={styles.bentoQuoteIconGreen} />
                <p className={styles.bentoQuoteText}>
                  &ldquo;Serving a cow is equivalent to serving all the demigods and the Supreme
                  Lord himself.&rdquo;
                </p>
                <span className={styles.bentoQuoteSourceGreen}>— Vedic Wisdom</span>
              </motion.div>

              <motion.div
                className={styles.bentoStat}
                style={{ background: 'linear-gradient(135deg, #4a7c59, #2d5a3d)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className={styles.bentoStatValue}>50+</span>
                <span className={styles.bentoStatLabel}>Sacred cows find refuge in our sanctuary every year</span>
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
                    <div className={styles.bentoBadgeIcon} style={{ background: 'rgba(107,142,122,0.12)', color: 'var(--green-earth)' }}>
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
          <div className={styles.ctaBgGreen} />
          <div className={styles.ctaInner}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <h2 className={styles.ctaTitle}>
                Protect the<br />
                <span className={styles.ctaAccentGreen}>Mother</span> Today.
              </h2>
              <p className={styles.ctaDesc}>
                Become a Gau Sevak and ensure that our sacred cows live a life of peace,
                fullness, and divine care.
              </p>
              <Link
                href="/donate?seva=gau-seva"
                className={styles.ctaBtn}
                style={{ background: 'linear-gradient(135deg, #4a7c59, #2d5a3d)', boxShadow: '0 12px 36px rgba(74,124,89,0.35)' }}
              >
                <Heart size={20} fill="currentColor" />
                Become a Gau Sevak
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
