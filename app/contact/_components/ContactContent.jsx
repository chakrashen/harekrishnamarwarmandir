'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Check } from 'lucide-react';
import styles from './ContactContent.module.css';

const contactInfo = [
  { icon: Phone, title: 'Phone', value: '+91 99287 66773', href: 'tel:+919928766773' },
  { icon: Mail, title: 'Email', value: 'harekrishna@hkmjodhpur.org', href: 'mailto:harekrishna@hkmjodhpur.org' },
  { icon: MessageCircle, title: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919928766773' },
  { icon: MapPin, title: 'Address', value: 'Hare Krishna Marwar Mandir, Jodhpur, Rajasthan 342001', href: 'https://maps.google.com/?q=Jodhpur+Rajasthan' },
  { icon: Clock, title: 'Temple Hours', value: 'Daily 4:30 AM — 8:30 PM' },
];

export default function ContactContent() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/contact page background.png"
            alt="Contact Hare Krishna Marwar Mandir"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.overlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-label" style={{ color: 'var(--saffron-light)' }}>Get in Touch</span>
          <h1 className={styles.heroTitle}>Contact Us</h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className={styles.layout}>
            {/* Contact Info */}
            <div className={styles.infoSide}>
              <h2 className={styles.sideTitle}>We&apos;d Love to Hear from You</h2>
              <p className={styles.sideDesc}>Whether you have questions about donations, events, or visiting the temple — reach out anytime.</p>
              <div className={styles.infoList}>
                {contactInfo.map((c, i) => {
                  const isExternal = c.href?.startsWith('http');
                  const Wrapper = c.href ? motion.a : motion.div;
                  const linkProps = c.href
                    ? {
                      href: c.href,
                      target: isExternal ? '_blank' : undefined,
                      rel: isExternal ? 'noopener noreferrer' : undefined,
                    }
                    : {};

                  return (
                    <Wrapper
                      key={c.title}
                      {...linkProps}
                      className={styles.infoItem}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className={styles.infoIcon}><c.icon size={20} /></div>
                      <div>
                        <strong>{c.title}</strong>
                        <span>{c.value}</span>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <motion.div className={styles.formSide} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {sent ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}><Check size={36} /></div>
                  <h3>Hare Krishna! 🙏</h3>
                  <p>Thank you for reaching out. We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Send us a Message</h3>
                  <div className={styles.row}>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name *" className={styles.input} />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className={styles.input} />
                  </div>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address *" className={styles.input} />
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className={styles.input} />
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Your Message *" rows={5} className={styles.textarea} />
                  {error && <p className={styles.errorText}>{error}</p>}
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={sending}>
                    <Send size={18} /> {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Map */}
          <div className={styles.mapWrap}>
            <iframe
              className={styles.mapFrame}
              title="Hare Krishna Marwar Mandir Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.138524674495!2d73.0093552!3d26.3193949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c1b5d51f5a9%3A0x7a7b1b7c4f0e7b91!2sHare%20Krishna%20Marwar%20Mandir!5e0!3m2!1sen!2sin!4v1713100000000!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
