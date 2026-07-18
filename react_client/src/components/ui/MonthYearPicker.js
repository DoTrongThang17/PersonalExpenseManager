import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TEN_THANG } from '../../utils/format';
import styles from './MonthYearPicker.module.css';

export default function MonthYearPicker({ thang, nam, onChange }) {
  const shift = (delta) => {
    let t = thang + delta;
    let n = nam;
    if (t > 12) {
      t = 1;
      n += 1;
    } else if (t < 1) {
      t = 12;
      n -= 1;
    }
    onChange({ thang: t, nam: n });
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => shift(-1)}
        aria-label="Tháng trước"
      >
        <ChevronLeft size={17} />
      </button>

      <select
        className={styles.select}
        value={thang}
        onChange={(e) => onChange({ thang: Number(e.target.value), nam })}
        aria-label="Chọn tháng"
      >
        {TEN_THANG.map((label, i) => (
          <option key={label} value={i + 1}>
            {label}
          </option>
        ))}
      </select>

      <input
        type="number"
        className={styles.year}
        value={nam}
        onChange={(e) => onChange({ thang, nam: Number(e.target.value) || nam })}
        aria-label="Chọn năm"
      />

      <button
        type="button"
        className={styles.arrow}
        onClick={() => shift(1)}
        aria-label="Tháng sau"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
}
