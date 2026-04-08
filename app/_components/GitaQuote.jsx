import styles from './GitaQuote.module.css';

export default function GitaQuote() {
  return (
    <section className={`section-pad ${styles.section}`}>
      <div className="container">
        <div className={styles.card}>
          <p className={styles.translation}>
            "Whatever you do, whatever you give, do it as an offering to Me."
          </p>
          <p className={styles.ref}>— Bhagavad Gita</p>
        </div>
      </div>
    </section>
  );
}
