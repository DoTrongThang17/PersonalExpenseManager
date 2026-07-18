import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import styles from './ToastContext.module.css';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message, type = 'success') => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => dismiss(id), 3600);
    },
    [dismiss],
  );

  const value = useRef({
    success: (msg) => notify(msg, 'success'),
    error: (msg) => notify(msg, 'error'),
  }).current;

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.wrap} role="status" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles.toast} ${t.type === 'error' ? styles.error : styles.success}`}
          >
            {t.type === 'error' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast phải được dùng bên trong <ToastProvider>');
  return ctx;
}
