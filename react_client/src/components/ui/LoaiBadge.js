import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import styles from './LoaiBadge.module.css';

export default function LoaiBadge({ loai, size = 'md' }) {
  const isThu = loai === 'thu';
  return (
    <span
      className={`${styles.badge} ${isThu ? styles.thu : styles.chi} ${styles[size]}`}
    >
      {isThu ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
      {isThu ? 'Thu' : 'Chi'}
    </span>
  );
}
