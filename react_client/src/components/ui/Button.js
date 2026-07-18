import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        Icon && <Icon size={16} strokeWidth={2.25} />
      )}
      {children}
    </button>
  );
}
