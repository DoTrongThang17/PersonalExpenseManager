import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Receipt, ListFilter } from 'lucide-react';
import { giaoDichApi } from '../api/giaoDich.api';
import { danhMucApi } from '../api/danhMuc.api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import PageSpinner from '../components/ui/PageSpinner';
import LoaiBadge from '../components/ui/LoaiBadge';
import MonthYearPicker from '../components/ui/MonthYearPicker';
import { Field, Input, Select, TextArea } from '../components/ui/FormControls';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate, thangNamHienTai, toDateInputValue } from '../utils/format';
import styles from './GiaoDichPage.module.css';

const formTrong = () => ({
  danhMucId: '',
  soTien: '',
  loai: 'chi',
  ngayGiaoDich: toDateInputValue(),
  moTa: '',
});

export default function GiaoDichPage() {
  const [{ thang, nam }, setThangNam] = useState(thangNamHienTai());
  const [loaiFilter, setLoaiFilter] = useState('');
  const [danhMucFilter, setDanhMucFilter] = useState('');

  const [danhMucs, setDanhMucs] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(formTrong());
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    danhMucApi.list().then(setDanhMucs).catch((err) => toast.error(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const params = { thang, nam };
      if (loaiFilter) params.loai = loaiFilter;
      if (danhMucFilter) params.danhMucId = danhMucFilter;
      const data = await giaoDichApi.list(params);
      setItems(data);
      setSelectedIds([]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thang, nam, loaiFilter, danhMucFilter]);

  const danhMucTheoLoai = useMemo(
    () => danhMucs.filter((d) => d.loai === form.loai),
    [danhMucs, form.loai],
  );

  const allSelected = items.length > 0 && selectedIds.length === items.length;
  const toggleAll = () => setSelectedIds(allSelected ? [] : items.map((i) => i.id));
  const toggleOne = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const openCreate = () => {
    setEditing(null);
    setForm(formTrong());
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (gd) => {
    setEditing(gd);
    setForm({
      danhMucId: String(gd.danhMucId),
      soTien: String(Number(gd.soTien)),
      loai: gd.loai,
      ngayGiaoDich: gd.ngayGiaoDich,
      moTa: gd.moTa || '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const onLoaiChange = (loai) => {
    setForm((f) => ({
      ...f,
      loai,
      danhMucId: danhMucs.find((d) => d.loai === loai && String(d.id) === f.danhMucId)
        ? f.danhMucId
        : '',
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.danhMucId) {
      setFormError('Vui lòng chọn danh mục.');
      return;
    }

    const payload = {
      danhMucId: Number(form.danhMucId),
      soTien: Number(form.soTien),
      loai: form.loai,
      ngayGiaoDich: form.ngayGiaoDich,
      moTa: form.moTa || undefined,
    };

    setSaving(true);
    try {
      if (editing) {
        await giaoDichApi.update(editing.id, payload);
        toast.success('Đã cập nhật giao dịch');
      } else {
        await giaoDichApi.create(payload);
        toast.success('Đã thêm giao dịch');
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    setDeleteLoading(true);
    try {
      await giaoDichApi.remove(deleting.id);
      toast.success('Đã xoá giao dịch');
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message);
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Giao dịch</p>
          <h1>Danh sách giao dịch</h1>
        </div>
      </header>

      <Card className={styles.filterCard}>
        <div className={styles.filterRow}>
          <div className={styles.filterField}>
            <span className={styles.filterLabel}>Thời gian</span>
            <MonthYearPicker thang={thang} nam={nam} onChange={setThangNam} />
          </div>

          <div className={styles.filterField}>
            <span className={styles.filterLabel}>Loại</span>
            <Select
              value={loaiFilter}
              onChange={(e) => setLoaiFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Tất cả</option>
              <option value="thu">Thu</option>
              <option value="chi">Chi</option>
            </Select>
          </div>

          <div className={styles.filterField}>
            <span className={styles.filterLabel}>Danh mục</span>
            <Select
              value={danhMucFilter}
              onChange={(e) => setDanhMucFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Tất cả</option>
              {danhMucs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.tenDanhMuc}
                </option>
              ))}
            </Select>
          </div>

          <div className={styles.filterActions}>
            <Button variant="secondary" icon={ListFilter} disabled>
              Danh sách
            </Button>
            <Button icon={Plus} onClick={openCreate}>
              Thêm giao dịch
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <PageSpinner label="Đang tải giao dịch…" />
      ) : items.length === 0 ? (
        <Card>
          <EmptyState
            icon={Receipt}
            title="Chưa có giao dịch nào"
            description="Thêm giao dịch để bắt đầu theo dõi thu chi tháng này."
            action={
              <Button icon={Plus} onClick={openCreate}>
                Thêm giao dịch
              </Button>
            }
          />
        </Card>
      ) : (
        <Card padded={false} className={styles.tableCard}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.checkCol}>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Chọn tất cả"
                    />
                  </th>
                  <th className={styles.sttCol}>STT</th>
                  <th>Ngày</th>
                  <th>Danh mục</th>
                  <th>Mô tả</th>
                  <th>Loại</th>
                  <th className={styles.amountCol}>Số tiền</th>
                  <th className={styles.actionCol}>Sửa</th>
                </tr>
              </thead>
              <tbody>
                {items.map((gd, idx) => (
                  <tr key={gd.id} className={selectedIds.includes(gd.id) ? styles.rowSelected : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(gd.id)}
                        onChange={() => toggleOne(gd.id)}
                        aria-label={`Chọn giao dịch ${gd.id}`}
                      />
                    </td>
                    <td className={styles.sttCol}>{idx + 1}</td>
                    <td className={styles.nowrap}>{formatDate(gd.ngayGiaoDich)}</td>
                    <td>
                      <span className={styles.catCell}>
                        <span
                          className={styles.dot}
                          style={{ background: gd.danhMuc?.mauSac || '#8992a3' }}
                        />
                        {gd.danhMuc?.tenDanhMuc ?? 'Danh mục'}
                      </span>
                    </td>
                    <td className={styles.descCell}>{gd.moTa || '—'}</td>
                    <td>
                      <LoaiBadge loai={gd.loai} size="sm" />
                    </td>
                    <td
                      className={`${styles.amountCol} tabular-nums`}
                      data-tone={gd.loai === 'thu' ? 'thu' : 'chi'}
                    >
                      {gd.loai === 'thu' ? '+' : '−'}
                      {formatCurrency(gd.soTien)}
                    </td>
                    <td className={styles.actionCol}>
                      <div className={styles.rowActions}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          onClick={() => openEdit(gd)}
                          aria-label="Sửa giao dịch"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          onClick={() => setDeleting(gd)}
                          aria-label="Xoá giao dịch"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Sửa giao dịch' : 'Thêm giao dịch'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={onSubmit} loading={saving}>
              {editing ? 'Lưu thay đổi' : 'Thêm giao dịch'}
            </Button>
          </>
        }
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.loaiToggle}>
            <button
              type="button"
              className={`${styles.loaiBtn} ${form.loai === 'chi' ? styles.loaiBtnActiveChi : ''}`}
              onClick={() => onLoaiChange('chi')}
            >
              Khoản chi
            </button>
            <button
              type="button"
              className={`${styles.loaiBtn} ${form.loai === 'thu' ? styles.loaiBtnActiveThu : ''}`}
              onClick={() => onLoaiChange('thu')}
            >
              Khoản thu
            </button>
          </div>

          <Field label="Số tiền (VNĐ)" required htmlFor="soTien">
            <Input
              id="soTien"
              type="number"
              min="1"
              step="1000"
              required
              placeholder="50000"
              value={form.soTien}
              onChange={(e) => setForm((f) => ({ ...f, soTien: e.target.value }))}
            />
          </Field>

          <Field label="Danh mục" required htmlFor="danhMuc">
            <Select
              id="danhMuc"
              value={form.danhMucId}
              onChange={(e) => setForm((f) => ({ ...f, danhMucId: e.target.value }))}
            >
              <option value="">— Chọn danh mục —</option>
              {danhMucTheoLoai.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.tenDanhMuc}
                </option>
              ))}
            </Select>
            {danhMucTheoLoai.length === 0 && (
              <span className={styles.warnHint}>
                Chưa có danh mục loại "{form.loai === 'thu' ? 'thu' : 'chi'}" — tạo ở trang Danh
                mục trước.
              </span>
            )}
          </Field>

          <Field label="Ngày giao dịch" required htmlFor="ngay">
            <Input
              id="ngay"
              type="date"
              required
              value={form.ngayGiaoDich}
              onChange={(e) => setForm((f) => ({ ...f, ngayGiaoDich: e.target.value }))}
            />
          </Field>

          <Field label="Ghi chú">
            <TextArea
              placeholder="Ví dụ: Ăn trưa với bạn (không bắt buộc)"
              value={form.moTa}
              onChange={(e) => setForm((f) => ({ ...f, moTa: e.target.value }))}
            />
          </Field>

          {formError && <p className={styles.formError}>{formError}</p>}
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xoá giao dịch"
        message="Bạn có chắc muốn xoá giao dịch này? Hành động này không thể hoàn tác."
        loading={deleteLoading}
        onConfirm={onDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
