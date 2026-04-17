import styles from './GitaQuote.module.css';

export default function GitaQuote() {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.card}>
          <p className={styles.sanskrit}>
            &ldquo;यत् करोषि यद् अश्नासि यज् जुहोषि ददासि यत् ।<br />
            यत् तपस्यसि कौन्तेय तत् कुरुष्व मदर्पणम् ॥&rdquo;
          </p>
          <p className={styles.translation}>
            &ldquo;Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kuntī, as an offering to Me.&rdquo;
          </p>
          <p className={styles.ref}>— Bhagavad Gita 9.27</p>
        </div>
      </div>
    </section>
  );
}
