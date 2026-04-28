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

  const gauSevaSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gau Seva - Cow Protection Donation",
    "url": "https://harekrishnamarwar.org/seva/gau-seva",
    "description": "Donate for cow protection and care at Hare Krishna Marwar Mandir Jodhpur.",
    "potentialAction": {
      "@type": "DonateAction",
      "target": "https://harekrishnamarwar.org/seva/gau-seva",
      "name": "Donate for Gau Seva"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gauSevaSchema) }} />
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

        {/* ── Expanded Content Section (500+ words requirement) ── */}
        <section className={styles.storySection} style={{ background: 'var(--bg-light)', padding: '6rem 0' }}>
          <div className="container">
            <div className={styles.contentBlock} style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-main)', lineHeight: '1.8' }}>
              <h2 className={styles.trustTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>The Spiritual and Social Significance of Gau Seva</h2>
              
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                In the timeless traditions of Sanatana Dharma, the cow is revered not merely as an animal, but as a universal mother—<i>Gau Mata</i>. According to the Vedic scriptures, a cow’s body is the abode of thirty-three crore demigods. Protecting and serving the cow is considered one of the highest forms of spiritual duty, equivalent to performing great sacrifices (yajnas). In a rapidly urbanizing world where livestock are often abandoned once they stop producing milk, Hare Krishna Marwar Mandir has taken a solemn vow to provide a lifelong, loving sanctuary for these gentle creatures.
              </p>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--green-earth)', marginBottom: '1rem', marginTop: '2.5rem' }}>A Lifelong Sanctuary</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Our goshala in Jodhpur is not a dairy farm; it is a permanent retirement home and sanctuary for destitute, rescued, and elderly cows. When a cow is brought to our facility, she is guaranteed safety, food, and medical attention for the rest of her natural life. We understand that cows are sentient beings capable of feeling fear, pain, and joy. Our dedicated staff and volunteers work tirelessly to ensure that every cow is treated with the utmost respect and dignity. They are provided with nutrient-rich fodder, clean drinking water, spacious roaming areas, and regular check-ups by qualified veterinarians. 
              </p>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--green-earth)', marginBottom: '1rem', marginTop: '2.5rem' }}>Ecological Harmony and Organic Agriculture</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Beyond the spiritual merits, protecting cows has profound ecological benefits. Our goshala operates on a model of sustainability and harmony with nature. Cow dung (gobar) and cow urine (gomutra) are highly valuable resources in natural farming. We utilize these by-products to produce rich, organic compost and natural pest repellents, which are then used in local agriculture and the temple&apos;s own gardens. This closed-loop system not only revitalizes the soil and promotes chemical-free food production but also demonstrates how cow protection is integrally linked to environmental conservation and human health.
              </p>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--green-earth)', marginBottom: '1rem', marginTop: '2.5rem' }}>How Your Contribution Helps</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Running a goshala of this magnitude requires immense resources. Your contribution towards Gau Seva directly funds the daily procurement of high-quality fodder (like green grass, jaggery, and grains), the maintenance of shelters to protect the cows from extreme weather, and the stocking of essential medical supplies for sick or injured animals. By sponsoring a cow for a day, a month, or a year, you become a direct participant in this noble mission. You help us expand our facilities to rescue even more abandoned cattle from the streets.
              </p>
              
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                We invite you to visit our goshala in Jodhpur to witness the serenity and joy of the cows firsthand. Brush their coats, feed them fresh greens, and experience the profound inner peace that comes from serving Krishna&apos;s beloved animals. Let us come together as a community to uphold this sacred tradition and ensure that no cow in Marwar is left without shelter, food, or love.
              </p>
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
