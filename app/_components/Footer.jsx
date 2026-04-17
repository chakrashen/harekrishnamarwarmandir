import Image from 'next/image';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Visit Us', href: '/visit' },
  { name: 'Contact', href: '/contact' },
];

const sevaLinks = [
  { name: 'Anna Daan Seva', href: '/seva/anna-daan' },
  { name: 'Gau Seva', href: '/seva/gau-seva' },
  { name: 'Mandir Nirman Seva', href: '/seva/mandir-nirman' },
  { name: 'Monthly Giving', href: '/donate#recurring' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>🙏</div>
              <div>
                <h3 className={styles.logoTitle}>Hare Krishna</h3>
                <span className={styles.logoSub}>Marwar Mandir</span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              A sacred sanctuary in Jodhpur dedicated to Lord Sri Krishna — promoting devotion,
              culture, cow protection, and community upliftment through timeless Vedic wisdom.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            {quickLinks.map(l => <a key={l.name} href={l.href} className={styles.link}>{l.name}</a>)}
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Seva Options</h4>
            {sevaLinks.map(l => <a key={l.name} href={l.href} className={styles.link}>{l.name}</a>)}
            <div className={styles.bankDetails}>
              <h5 className={styles.bankTitle}>Bank Details</h5>
              <p style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>Account Name: Hare Krishna Movement Jodhpur</p>
              <p>A/C: 729901000990</p>
              <p>IFSC: ICIC0007299</p>
              <p>Bank: ICICI Bank</p>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="tel:+919928766773" className={styles.contactLink}><Phone size={14} /> +91 99287 66773</a>
            <a href="mailto:harekrishna@hkmjodhpur.org" className={styles.contactLink}><Mail size={14} /> harekrishna@hkmjodhpur.org</a>
            <div className={styles.contactLink}><MapPin size={14} /> Jodhpur, Rajasthan, India</div>
            <div style={{ marginTop: '1rem' }}>
              <Image src="/6244790021147790970.jpg" alt="Payment QR" width={180} height={180} style={{ width: 'auto', height: 'auto' }} />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Hare Krishna Marwar Mandir. All rights reserved.</p>
          <p className={styles.madeWith}>Made with <Heart size={12} fill="var(--maroon)" color="var(--maroon)" /> for Lord Krishna</p>
        </div>
      </div>
    </footer>
  );
}
