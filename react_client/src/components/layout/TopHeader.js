import { useEffect, useRef, useState } from 'react';
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './TopHeader.module.css';

export default function TopHeader({ notifications = [] }) {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const initials = (user?.ho_ten || user?.email || '?')
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.searchWrap}>
        <Search size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Tìm kiếm giao dịch, danh mục…"
          aria-label="Tìm kiếm"
        />
      </div>

      <div className={styles.right}>
        <div className={styles.notifWrap} ref={notifRef}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Thông báo"
          >
            <Bell size={18} />
            {notifications.length > 0 && <span className={styles.dot} />}
          </button>
          {notifOpen && (
            <div className={styles.notifPanel}>
              <div className={styles.notifTitle}>Thông báo</div>
              {notifications.length === 0 ? (
                <p className={styles.notifEmpty}>Chưa có thông báo mới.</p>
              ) : (
                <ul className={styles.notifList}>
                  {notifications.map((n, i) => (
                    <li key={i} className={styles.notifItem}>
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className={styles.userWrap} ref={userMenuRef}>
          <button
            type="button"
            className={styles.userBtn}
            onClick={() => setUserMenuOpen((o) => !o)}
          >
            <span className={styles.avatar}>{initials}</span>
            <span className={styles.userName}>{user?.ho_ten || 'Người dùng'}</span>
            <ChevronDown size={15} />
          </button>
          {userMenuOpen && (
            <div className={styles.userMenu}>
              <div className={styles.userMenuEmail}>{user?.email}</div>
              <button type="button" className={styles.userMenuItem} onClick={logout}>
                <LogOut size={15} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
