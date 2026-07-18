import styles from './EmptyState.module.css';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className={styles.wrap}>
      {Icon && (
        <div className={styles.iconWrap}>
          <Icon size={26} strokeWidth={1.6} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {action}
    </div>
  );
}
