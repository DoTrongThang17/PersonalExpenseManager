// Định dạng số tiền kiểu Việt Nam (vd: 1.250.000 ₫)
// Luôn ép về Number trước vì cột decimal từ MySQL/TypeORM trả về dạng
// chuỗi ("1250000.00"), không parse trước sẽ dính lỗi nối chuỗi.
export function formatCurrency(value) {
  const n = Number(value) || 0;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(n);
}

// Định dạng số tiền không kèm ký hiệu ₫ (dùng trong input/hiển thị gọn)
export function formatNumber(value) {
  const n = Number(value) || 0;
  return new Intl.NumberFormat('vi-VN').format(n);
}

export function formatDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const TEN_THANG = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export function thangNamHienTai() {
  const now = new Date();
  return { thang: now.getMonth() + 1, nam: now.getFullYear() };
}

// Chuyển Date -> chuỗi 'YYYY-MM-DD' theo giờ local (tránh lệch múi giờ
// khi dùng toISOString() trực tiếp, vốn quy về UTC).
export function toDateInputValue(date = new Date()) {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}
