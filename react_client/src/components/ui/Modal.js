import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export default function Modal({ open, title, onClose, children, footer, width = 480 }) {
  const dialogRef = useRef(null);

  // Luôn giữ tham chiếu tới onClose mới nhất mà KHÔNG đưa vào dependency
  // array của effect bên dưới — tránh effect chạy lại mỗi khi component
  // cha re-render (vd: mỗi lần gõ phím trong form), vốn là nguyên nhân
  // khiến focus bị "cướp" về khung modal sau mỗi ký tự gõ.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Chỉ focus vào khung modal đúng 1 lần khi modal MỞ (không phải mỗi lần render)
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  // Phím Escape + khoá cuộn trang nền — chỉ gắn/gỡ khi open đổi trạng thái
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.dialog}
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>{title}</h3>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Đóng">
            <X size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
