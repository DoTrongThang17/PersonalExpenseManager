import styles from './PageSpinner.module.css';

export default function PageSpinner({ label = 'Đang tải…' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
