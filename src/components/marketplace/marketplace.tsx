import styles from "./marketplace.module.css";

export function Marketplace() {
  return (
    <section
      role="region"
      className={styles.marketplace}
      aria-label="marketplace"
    >
      <h2 className={styles.title}>MARKETPLACE</h2>
    </section>
  );
}
