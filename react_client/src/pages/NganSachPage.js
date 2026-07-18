import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, PiggyBank, TriangleAlert } from 'lucide-react';
import { nganSachApi } from '../api/nganSach.api';
import { giaoDichApi } from '../api/giaoDich.api';
import { danhMucApi } from '../api/danhMuc.api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import PageSpinner from '../components/ui/PageSpinner';
import MonthYearPicker from '../components/ui/MonthYearPicker';
import { Field, Input, Select, TextArea } from '../components/ui/FormControls';
import { useToast } from '../context/ToastContext';
import { formatCurrency, thangNamHienTai, TEN_THANG } from '../utils/format';
import styles from './NganSachPage.module.css';

export default function NganSachPage() {
  const [{ thang, nam }, setThangNam] = useState(thangNamHienTai());
  const [danhMucs, setDanhMucs] = useState([]);
  const [nganSachs, setNganSachs] = useState([]);
  const [giaoDichs, setGiaoDichs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);
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
      const [ns, gd] = await Promise.all([
        nganSachApi.list({ thang, nam }),
        giaoDichApi.list({ thang, nam, loai: 'chi' }),
      ]);
      setNganSachs(ns);
      setGiaoDichs(gd);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thang, nam]);

  const danhMucChi = useMemo(() => danhMucs.filter((d) => d.loai === 'chi'), [danhMucs]);

  const withSpend = useMemo(
    () =>
      nganSachs.map((ns) => {
        const daChi = giaoDichs
          .filter((g) => (g.danhMuc?.id ?? g.danhMucId) === ns.danhMucId)
          .reduce((sum, g) => sum + Number(g.soTien), 0);
        const limit = Number(ns.soTienGioiHan);
        const percent = limit > 0 ? Math.round((daChi / limit) * 100) : 0;
        return { ...ns, daChi, percent, vuotMuc: daChi > limit };
      }),
    [nganSachs, giaoDichs],
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ danhMucId: '', soTienGioiHan: '', thang, nam, ghiChu: '' });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (ns) => {
    setEditing(ns);
    setForm({
      danhMucId: String(ns.danhMucId),
      soTienGioiHan: String(Number(ns.soTienGioiHan)),
      thang: ns.thang,
      nam: ns.nam,
      ghiChu: ns.ghiChu || '',
    });
    setFormError('');
    setModalOpen(true);
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
      soTienGioiHan: Number(form.soTienGioiHan),
      thang: Number(form.thang),
      nam: Number(form.nam),
      ghiChu: form.ghiChu || undefined,
    };

    setSaving(true);
    try {
      if (editing) {
        await nganSachApi.update(editing.id, payload);
        toast.success('Đã cập nhật ngân sách');
      } else {
        await nganSachApi.create(payload);
        toast.success('Đã thêm ngân sách');
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
      await nganSachApi.remove(deleting.id);
      toast.success('Đã xoá ngân sách');
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
          <p className={styles.eyebrow}>Ngân sách</p>
          <h1>Hạn mức chi tiêu</h1>
        </div>
        <div className={styles.headerActions}>
          <MonthYearPicker thang={thang} nam={nam} onChange={setThangNam} />
          <Button icon={Plus} onClick={openCreate}>
            Đặt ngân sách
          </Button>
        </div>
      </header>

      {loading ? (
        <PageSpinner label="Đang tải ngân sách…" />
      ) : withSpend.length === 0 ? (
        <Card>
          <EmptyState
            icon={PiggyBank}
            title="Chưa có ngân sách cho tháng này"
            description="Đặt hạn mức chi tiêu theo từng danh mục để kiểm soát dòng tiền tốt hơn."
            action={
              <Button icon={Plus} onClick={openCreate}>
                Đặt ngân sách
              </Button>
            }
          />
        </Card>
      ) : (
        <div className={styles.grid}>
          {withSpend.map((ns) => (
            <Card key={ns.id} className={styles.budgetCard}>
              <div className={styles.cardTop}>
                <div className={styles.catName}>
                  <span
                    className={styles.dot}
                    style={{ background: ns.danhMuc?.mauSac || '#8992a3' }}
                  />
                  {ns.danhMuc?.tenDanhMuc ?? 'Danh mục'}
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => openEdit(ns)}
                    aria-label="Sửa ngân sách"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setDeleting(ns)}
                    aria-label="Xoá ngân sách"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className={styles.amounts}>
                <span className="tabular-nums">{formatCurrency(ns.daChi)}</span>
                <span className={styles.limitText}>
                  / {formatCurrency(ns.soTienGioiHan)} giới hạn
                </span>
              </div>

              <div className={styles.track}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${Math.min(100, ns.percent)}%`,
                    background: ns.vuotMuc ? 'var(--berry)' : 'var(--gold)',
                  }}
                />
              </div>

              <div className={styles.footRow}>
                <span className={ns.vuotMuc ? styles.percentOver : styles.percent}>
                  {ns.vuotMuc && <TriangleAlert size={13} />}
                  {ns.percent}% đã dùng
                </span>
                {ns.ghiChu && <span className={styles.note}>{ns.ghiChu}</span>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {form && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editing ? 'Sửa ngân sách' : 'Đặt ngân sách mới'}
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Huỷ
              </Button>
              <Button onClick={onSubmit} loading={saving}>
                {editing ? 'Lưu thay đổi' : 'Đặt ngân sách'}
              </Button>
            </>
          }
        >
          <form className={styles.form} onSubmit={onSubmit}>
            <Field label="Danh mục chi tiêu" required htmlFor="dm">
              <Select
                id="dm"
                value={form.danhMucId}
                onChange={(e) => setForm((f) => ({ ...f, danhMucId: e.target.value }))}
              >
                <option value="">— Chọn danh mục —</option>
                {danhMucChi.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.tenDanhMuc}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Hạn mức (VNĐ)" required htmlFor="hanMuc">
              <Input
                id="hanMuc"
                type="number"
                min="1"
                step="10000"
                required
                placeholder="2000000"
                value={form.soTienGioiHan}
                onChange={(e) => setForm((f) => ({ ...f, soTienGioiHan: e.target.value }))}
              />
            </Field>

            <div className={styles.twoCol}>
              <Field label="Tháng" required htmlFor="thangF">
                <Select
                  id="thangF"
                  value={form.thang}
                  onChange={(e) => setForm((f) => ({ ...f, thang: Number(e.target.value) }))}
                >
                  {TEN_THANG.map((l, i) => (
                    <option key={l} value={i + 1}>
                      {l}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Năm" required htmlFor="namF">
                <Input
                  id="namF"
                  type="number"
                  required
                  value={form.nam}
                  onChange={(e) => setForm((f) => ({ ...f, nam: Number(e.target.value) }))}
                />
              </Field>
            </div>

            <Field label="Ghi chú">
              <TextArea
                placeholder="Không bắt buộc"
                value={form.ghiChu}
                onChange={(e) => setForm((f) => ({ ...f, ghiChu: e.target.value }))}
              />
            </Field>

            {formError && <p className={styles.formError}>{formError}</p>}
          </form>
        </Modal>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xoá ngân sách"
        message="Bạn có chắc muốn xoá ngân sách này? Hành động này không thể hoàn tác."
        loading={deleteLoading}
        onConfirm={onDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
