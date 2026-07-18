import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, TrendingDown, TrendingUp, Scale } from 'lucide-react';
import { giaoDichApi } from '../api/giaoDich.api';
import { nganSachApi } from '../api/nganSach.api';
import Card from '../components/ui/Card';
import LoaiBadge from '../components/ui/LoaiBadge';
import MonthYearPicker from '../components/ui/MonthYearPicker';
import PageSpinner from '../components/ui/PageSpinner';
import EmptyState from '../components/ui/EmptyState';
import TrendChart from '../components/charts/TrendChart';
import { formatCurrency, formatDate, thangNamHienTai, TEN_THANG } from '../utils/format';
import { useToast } from '../context/ToastContext';
import styles from './DashboardPage.module.css';

function shiftThangNam(thang, nam, delta) {
  const idx = (thang - 1) + delta;
  const n = nam + Math.floor(idx / 12);
  const t = ((idx % 12) + 12) % 12;
  return { thang: t + 1, nam: n };
}

export default function DashboardPage() {
  const [{ thang, nam }, setThangNam] = useState(thangNamHienTai());
  const [loading, setLoading] = useState(true);
  const [tongHop, setTongHop] = useState(null);
  const [giaoDichs, setGiaoDichs] = useState([]);
  const [nganSachs, setNganSachs] = useState([]);
  const [trend, setTrend] = useState([]);
  const toast = useToast();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const trendMonths = Array.from({ length: 6 }).map((_, i) =>
          shiftThangNam(thang, nam, i - 5),
        );

        const [th, gd, ns, trendData] = await Promise.all([
          giaoDichApi.tongHop(thang, nam),
          giaoDichApi.list({ thang, nam }),
          nganSachApi.list({ thang, nam }),
          Promise.all(
            trendMonths.map((tn) =>
              giaoDichApi
                .tongHop(tn.thang, tn.nam)
                .catch(() => ({ tongThu: 0, tongChi: 0, ...tn })),
            ),
          ),
        ]);

        if (cancelled) return;
        setTongHop(th);
        setGiaoDichs(gd);
        setNganSachs(ns);
        setTrend(
          trendData.map((d, i) => ({
            ...d,
            nhan: `${TEN_THANG[trendMonths[i].thang - 1].replace('Tháng ', 'Th.')}`,
          })),
        );
      } catch (err) {
        if (!cancelled) toast.error(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thang, nam]);

  if (loading && !tongHop) return <PageSpinner label="Đang tải tổng quan…" />;

  const chiTheoDanhMuc = Object.values(
    giaoDichs
      .filter((g) => g.loai === 'chi')
      .reduce((acc, g) => {
        const key = g.danhMuc?.id ?? g.danhMucId;
        if (!acc[key]) {
          acc[key] = {
            id: key,
            ten: g.danhMuc?.tenDanhMuc ?? 'Khác',
            mauSac: g.danhMuc?.mauSac || '#833141',
            tong: 0,
          };
        }
        acc[key].tong += Number(g.soTien);
        return acc;
      }, {}),
  )
    .sort((a, b) => b.tong - a.tong)
    .slice(0, 6);

  const tongChiChoBar = chiTheoDanhMuc[0]?.tong || 1;

  const budgetsWithSpend = nganSachs.map((ns) => {
    const daChi = giaoDichs
      .filter((g) => g.loai === 'chi' && (g.danhMuc?.id ?? g.danhMucId) === ns.danhMucId)
      .reduce((sum, g) => sum + Number(g.soTien), 0);
    const limit = Number(ns.soTienGioiHan);
    const percent = limit > 0 ? Math.min(100, Math.round((daChi / limit) * 100)) : 0;
    return { ...ns, daChi, percent, vuotMuc: daChi > limit };
  });

  const recentTransactions = giaoDichs.slice(0, 6);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Tổng quan</p>
          <h1>Sổ Quỹ của bạn</h1>
        </div>
        <MonthYearPicker thang={thang} nam={nam} onChange={setThangNam} />
      </header>

      <section className={styles.heroGrid}>
        <Card className={styles.heroCard}>
          <span className={styles.heroIcon} data-tone="thu">
            <TrendingUp size={18} />
          </span>
          <span className={styles.heroLabel}>Tổng thu</span>
          <span className={`${styles.heroValue} tabular-nums`} data-tone="thu">
            {formatCurrency(tongHop?.tongThu)}
          </span>
        </Card>

        <Card className={styles.heroCard}>
          <span className={styles.heroIcon} data-tone="chi">
            <TrendingDown size={18} />
          </span>
          <span className={styles.heroLabel}>Tổng chi</span>
          <span className={`${styles.heroValue} tabular-nums`} data-tone="chi">
            {formatCurrency(tongHop?.tongChi)}
          </span>
        </Card>

        <Card className={styles.heroCard}>
          <span className={styles.heroIcon} data-tone={tongHop?.chenhLech >= 0 ? 'thu' : 'chi'}>
            <Scale size={18} />
          </span>
          <span className={styles.heroLabel}>Chênh lệch</span>
          <span
            className={`${styles.heroValue} tabular-nums`}
            data-tone={tongHop?.chenhLech >= 0 ? 'thu' : 'chi'}
          >
            {tongHop?.chenhLech >= 0 ? '+' : ''}
            {formatCurrency(tongHop?.chenhLech)}
          </span>
        </Card>
      </section>

      <section className={styles.mainGrid}>
        <Card className={styles.trendCard}>
          <h3 className={styles.cardTitle}>Xu hướng 6 tháng gần đây</h3>
          <TrendChart data={trend} />
        </Card>

        <Card className={styles.categoryCard}>
          <h3 className={styles.cardTitle}>Chi nhiều nhất theo danh mục</h3>
          {chiTheoDanhMuc.length === 0 ? (
            <p className={styles.mutedText}>Chưa có khoản chi nào trong tháng này.</p>
          ) : (
            <ul className={styles.barList}>
              {chiTheoDanhMuc.map((c) => (
                <li key={c.id} className={styles.barRow}>
                  <div className={styles.barTop}>
                    <span>{c.ten}</span>
                    <span className="tabular-nums">{formatCurrency(c.tong)}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${Math.max(6, (c.tong / tongChiChoBar) * 100)}%`,
                        background: c.mauSac,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <section className={styles.mainGrid}>
        <Card>
          <div className={styles.cardHeaderRow}>
            <h3 className={styles.cardTitle}>Ngân sách tháng {thang}</h3>
            <Link to="/ngan-sach" className={styles.viewAll}>
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>
          {budgetsWithSpend.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="Chưa đặt ngân sách"
              description="Đặt hạn mức chi tiêu theo danh mục để kiểm soát tốt hơn."
            />
          ) : (
            <ul className={styles.budgetList}>
              {budgetsWithSpend.slice(0, 4).map((b) => (
                <li key={b.id} className={styles.budgetRow}>
                  <div className={styles.barTop}>
                    <span>{b.danhMuc?.tenDanhMuc ?? 'Danh mục'}</span>
                    <span className="tabular-nums">
                      {formatCurrency(b.daChi)} / {formatCurrency(b.soTienGioiHan)}
                    </span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${b.percent}%`,
                        background: b.vuotMuc ? 'var(--berry)' : 'var(--gold)',
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <div className={styles.cardHeaderRow}>
            <h3 className={styles.cardTitle}>Giao dịch gần đây</h3>
            <Link to="/giao-dich" className={styles.viewAll}>
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="Chưa có giao dịch"
              description="Thêm giao dịch đầu tiên của tháng này."
            />
          ) : (
            <ul className={styles.txList}>
              {recentTransactions.map((tx) => (
                <li key={tx.id} className={styles.txRow}>
                  <div>
                    <div className={styles.txName}>{tx.danhMuc?.tenDanhMuc ?? 'Khác'}</div>
                    <div className={styles.txDate}>{formatDate(tx.ngayGiaoDich)}</div>
                  </div>
                  <div className={styles.txRight}>
                    <span
                      className={`tabular-nums ${styles.txAmount}`}
                      data-tone={tx.loai === 'thu' ? 'thu' : 'chi'}
                    >
                      {tx.loai === 'thu' ? '+' : '−'}
                      {formatCurrency(tx.soTien)}
                    </span>
                    <LoaiBadge loai={tx.loai} size="sm" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}
