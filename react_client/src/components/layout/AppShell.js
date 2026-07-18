import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Tags, PiggyBank, BookOpen } from 'lucide-react';
import TopHeader from './TopHeader';
import Breadcrumb from './Breadcrumb';
import styles from './AppShell.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Tổng quan', icon: LayoutDashboard, end: true },
  { to: '/giao-dich', label: 'Giao dịch', icon: ArrowLeftRight },
  { to: '/danh-muc', label: 'Danh mục', icon: Tags },
  { to: '/ngan-sach', label: 'Ngân sách', icon: PiggyBank },
];

export default function AppShell() {
  const location = useLocation();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <BookOpen size={18} strokeWidth={2.2} />
          </span>
          <span className={styles.brandName}>Sổ Quỹ</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <TopHeader />
        <Breadcrumb path={location.pathname} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
