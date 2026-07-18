import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/format';
import styles from './TrendChart.module.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const thu = payload.find((p) => p.dataKey === 'tongThu')?.value ?? 0;
  const chi = payload.find((p) => p.dataKey === 'tongChi')?.value ?? 0;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      <div className={styles.tooltipRow}>
        <span className={styles.dotThu} /> Thu <b>{formatCurrency(thu)}</b>
      </div>
      <div className={styles.tooltipRow}>
        <span className={styles.dotChi} /> Chi <b>{formatCurrency(chi)}</b>
      </div>
    </div>
  );
}

export default function TrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="fillThu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f6650" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#3f6650" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillChi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#833141" stopOpacity={0.24} />
            <stop offset="100%" stopColor="#833141" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#dde2e8" />
        <XAxis
          dataKey="nhan"
          tick={{ fontSize: 12, fill: '#8992a3' }}
          axisLine={{ stroke: '#dde2e8' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#8992a3' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => (v >= 1000000 ? `${v / 1000000}tr` : v)}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="tongThu"
          stroke="#3f6650"
          strokeWidth={2}
          fill="url(#fillThu)"
        />
        <Area
          type="monotone"
          dataKey="tongChi"
          stroke="#833141"
          strokeWidth={2}
          fill="url(#fillChi)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
