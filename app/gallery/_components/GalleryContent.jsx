'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import styles from './GalleryContent.module.css';

const categories = ['All', 'Temple', 'Gau Seva', 'Anna Daan', 'Events', 'Mandir Event'];

const photos = [
  { src: 'gallery-anna-daan-serving.jpg', cat: 'Anna Daan', title: 'Prasadam Serving Seva', aspect: 'tall' },
  { src: 'gallery-gau-seva-monks.jpg', cat: 'Gau Seva', title: 'Monks Feeding Cows', aspect: 'tall' },
  { src: 'gallery-gau-seva-volunteer.jpg', cat: 'Gau Seva', title: 'Gau Seva Volunteer Moment', aspect: 'tall' },
  { src: 'gallery-anna-daan-students.jpg', cat: 'Anna Daan', title: 'Anna Daan for School Children', aspect: 'tall' },
  { src: 'mandir event/mandir event.JPG', cat: 'Mandir Event', title: 'Mandir Event Gathering', aspect: 'wide' },
  { src: 'mandir event/mandir.JPG', cat: 'Temple', title: 'Mandir Exterior View' },
  { src: 'mandir event/mandir 2.JPG', cat: 'Temple', title: 'Mandir Temple Premises' },
  { src: 'mandir event/shri krishna mandir.JPG', cat: 'Temple', title: 'Shri Krishna Mandir' },
  { src: 'mandir event/krishna ji.JPG', cat: 'Temple', title: 'Krishna Ji Darshan', aspect: 'tall' },
  { src: 'mandir event/guru ji.JPG', cat: 'Events', title: 'Guru Ji Blessings' },
  { src: 'mandir event/mandir guru ji.JPG', cat: 'Events', title: 'Guru Ji at Mandir Event' },
  { src: 'mandir event/0I0A3133.JPG', cat: 'Mandir Event', title: 'Mandir Event Moment 1' },
  { src: 'mandir event/0I0A3160.JPG', cat: 'Mandir Event', title: 'Mandir Event Moment 2' },
  { src: 'mandir event/0I0A3229.JPG', cat: 'Mandir Event', title: 'Mandir Event Moment 3', aspect: 'wide' },
];

function GalleryImage({ src, alt, className }) {
  const [showFallback, setShowFallback] = useState(false);
  const safeSrc = `/gallery/${src.split('/').map(encodeURIComponent).join('/')}`;

  if (showFallback) {
    return (
      <div className={`img-placeholder ${className ?? ''}`} style={{ height: '100%' }}>
        <span>{src}</span>
      </div>
    );
  }

  return (
    <Image
      src={safeSrc}
      alt={alt}
      className={className}
      width={1200}
      height={900}
      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
      loading="lazy"
      onError={() => setShowFallback(true)}
    />
  );
}

export default function GalleryContent() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? photos : photos.filter(p => p.cat === filter);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/gallery/gallery page background.jpeg"
            alt="Gallery at Hare Krishna Marwar Mandir"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-label" style={{ color: 'var(--saffron-light)' }}>Photo Gallery</span>
          <h1 className={styles.heroTitle}>Moments of Devotion</h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          {/* Filter tabs */}
          <div className={styles.filters}>
            {categories.map(c => (
              <button key={c} className={`${styles.filterBtn} ${filter === c ? styles.filterActive : ''}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>

          {/* Grid */}
          <motion.div className={styles.grid} layout>
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.src}
                  className={`${styles.gridItem} ${p.aspect === 'tall' ? styles.tall : ''} ${p.aspect === 'wide' ? styles.wide : ''}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  onClick={() => setLightbox(p)}
                >
                  <GalleryImage src={p.src} alt={p.title} className={styles.gridImage} />
                  <div className={styles.itemOverlay}>
                    <ZoomIn size={24} />
                    <span>{p.title}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className={styles.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <button className={styles.lightboxClose}><X size={28} /></button>
            <motion.div className={styles.lightboxContent} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()}>
              <GalleryImage src={lightbox.src} alt={lightbox.title} className={styles.lightboxImage} />
              <p className={styles.lightboxTitle}>{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
