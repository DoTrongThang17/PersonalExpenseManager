import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

const MAP = {
  '/': ['Sổ Quỹ', 'Tổng quan'],
  '/giao-dich': ['Giao dịch', 'Danh sách giao dịch'],
  '/danh-muc': ['Danh mục', 'Danh sách danh mục'],
  '/ngan-sach': ['Ngân sách', 'Danh sách ngân sách'],
};

export default function Breadcrumb({ path }) {
  const parts = MAP[path] || ['Sổ Quỹ'];

  return (
    <nav className={styles.crumb} aria-label="breadcrumb">
      {parts.map((part, i) => (
        <span key={part} className={styles.item}>
          {i > 0 && <ChevronRight size={13} className={styles.sep} />}
          <span className={i === parts.length - 1 ? styles.current : styles.parent}>
            {part}
          </span>
        </span>
      ))}
    </nav>
  );
}
