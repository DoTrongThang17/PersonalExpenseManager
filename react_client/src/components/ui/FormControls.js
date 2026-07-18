import styles from './FormControls.module.css';

export function Field({ label, error, required, hint, children, htmlFor }) {
  return (
    <label className={styles.field} htmlFor={htmlFor}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </span>
      {children}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}

export function Input({ error, ...rest }) {
  return (
    <input className={`${styles.control} ${error ? styles.controlError : ''}`} {...rest} />
  );
}

export function TextArea({ error, ...rest }) {
  return (
    <textarea
      className={`${styles.control} ${styles.textarea} ${error ? styles.controlError : ''}`}
      {...rest}
    />
  );
}

export function Select({ error, children, ...rest }) {
  return (
    <select className={`${styles.control} ${error ? styles.controlError : ''}`} {...rest}>
      {children}
    </select>
  );
}
