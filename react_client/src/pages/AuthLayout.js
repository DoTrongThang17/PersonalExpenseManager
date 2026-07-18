import { BookOpen } from 'lucide-react';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.brandPanel}>
        <div className={styles.brandMark}>
          <BookOpen size={22} strokeWidth={2.2} />
        </div>
        <h1 className={styles.brandTitle}>Sổ Quỹ</h1>
        <p className={styles.brandTag}>Ghi lại từng đồng ra vào — hiểu rõ dòng tiền của bạn.</p>

        <dl className={styles.ledgerLines}>
          <div className={styles.ledgerRow}>
            <dt>Thu nhập tháng này</dt>
            <dd className={styles.thu}>+ Rõ ràng, không sót khoản nào</dd>
          </div>
          <div className={styles.ledgerRow}>
            <dt>Chi tiêu tháng này</dt>
            <dd className={styles.chi}>− Theo dõi theo từng danh mục</dd>
          </div>
          <div className={styles.ledgerRow}>
            <dt>Ngân sách đặt ra</dt>
            <dd>Cảnh báo trước khi vượt mức</dd>
          </div>
        </dl>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formCard}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
