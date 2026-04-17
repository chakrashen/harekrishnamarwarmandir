import styles from './GitaQuote.module.css';

export default function GitaQuote() {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.card}>
          <p className={styles.translation}>
            "तुम जो कुछ भी करते हो, जो खाते हो, जो यज्ञ करते हो, जो दान देते हो, और जो तप करते हो — वह सब मुझे अर्पण करो।"
          </p>
          <p className={styles.ref}>— Bhagavad Gita</p>
        </div>
      </div>
    </section>
  );
}
