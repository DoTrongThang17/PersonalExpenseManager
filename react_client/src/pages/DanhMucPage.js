import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Tags } from 'lucide-react';
import { danhMucApi } from '../api/danhMuc.api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import PageSpinner from '../components/ui/PageSpinner';
import { Field, Input, Select, TextArea } from '../components/ui/FormControls';
import { useToast } from '../context/ToastContext';
import styles from './DanhMucPage.module.css';

const MAU_GOI_Y = ['#ad7f24', '#3f6650', '#833141', '#4d6a8f', '#7a5ba6', '#b0763f'];

const FORM_TRONG = { tenDanhMuc: '', moTa: '', loai: 'chi', mauSac: MAU_GOI_Y[0], bieuTuong: '' };

export default function DanhMucPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tat-ca');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(FORM_TRONG);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toast = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const data = await danhMucApi.list();
      setItems(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'tat-ca') return items;
    return items.filter((d) => d.loai === filter);
  }, [items, filter]);

  const openCreate = () => {
    setEditing(null);
    setForm(FORM_TRONG);
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (dm) => {
    setEditing(dm);
    setForm({
      tenDanhMuc: dm.tenDanhMuc,
      moTa: dm.moTa || '',
      loai: dm.loai,
      mauSac: dm.mauSac || MAU_GOI_Y[0],
      bieuTuong: dm.bieuTuong || '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      if (editing) {
        await danhMucApi.update(editing.id, form);
        toast.success('Đã cập nhật danh mục');
      } else {
        await danhMucApi.create(form);
        toast.success('Đã thêm danh mục mới');
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
      await danhMucApi.remove(deleting.id);
      toast.success('Đã xoá danh mục');
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message);
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <PageSpinner label="Đang tải danh mục…" />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Danh mục</p>
          <h1>Nhóm khoản thu chi</h1>
        </div>
        <Button icon={Plus} onClick={openCreate}>
          Thêm danh mục
        </Button>
      </header>

      <div className={styles.tabs}>
        {[
          { key: 'tat-ca', label: 'Tất cả' },
          { key: 'thu', label: 'Thu' },
          { key: 'chi', label: 'Chi' },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.tab} ${filter === t.key ? styles.tabActive : ''}`}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={Tags}
            title="Chưa có danh mục nào"
            description="Tạo danh mục để phân loại các khoản thu chi của bạn."
            action={
              <Button icon={Plus} onClick={openCreate}>
                Thêm danh mục
              </Button>
            }
          />
        </Card>
      ) : (
        <div className={styles.grid}>
          {filtered.map((dm) => (
            <Card key={dm.id} className={styles.dmCard}>
              <div className={styles.dmTop}>
                <span className={styles.swatch} style={{ background: dm.mauSac || '#ad7f24' }}>
                  {dm.bieuTuong || dm.tenDanhMuc[0]}
                </span>
                <div className={styles.dmActions}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => openEdit(dm)}
                    aria-label={`Sửa ${dm.tenDanhMuc}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => setDeleting(dm)}
                    aria-label={`Xoá ${dm.tenDanhMuc}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className={styles.dmName}>{dm.tenDanhMuc}</div>
              <span className={`${styles.dmLoai} ${styles[dm.loai]}`}>
                {dm.loai === 'thu' ? 'Thu nhập' : 'Chi tiêu'}
              </span>
              {dm.moTa && <p className={styles.dmDesc}>{dm.moTa}</p>}
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Sửa danh mục' : 'Thêm danh mục'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={onSubmit} loading={saving}>
              {editing ? 'Lưu thay đổi' : 'Thêm danh mục'}
            </Button>
          </>
        }
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <Field label="Tên danh mục" required htmlFor="ten">
            <Input
              id="ten"
              required
              maxLength={100}
              placeholder="Ăn uống, Di chuyển, Lương…"
              value={form.tenDanhMuc}
              onChange={(e) => setForm((f) => ({ ...f, tenDanhMuc: e.target.value }))}
            />
          </Field>

          <Field label="Loại" required htmlFor="loai">
            <Select
              id="loai"
              value={form.loai}
              onChange={(e) => setForm((f) => ({ ...f, loai: e.target.value }))}
            >
              <option value="chi">Chi tiêu</option>
              <option value="thu">Thu nhập</option>
            </Select>
          </Field>

          <Field label="Màu sắc">
            <div className={styles.colorRow}>
              {MAU_GOI_Y.map((mau) => (
                <button
                  key={mau}
                  type="button"
                  className={styles.colorSwatchBtn}
                  style={{
                    background: mau,
                    outline: form.mauSac === mau ? '2px solid var(--ink)' : 'none',
                    outlineOffset: 2,
                  }}
                  onClick={() => setForm((f) => ({ ...f, mauSac: mau }))}
                  aria-label={`Chọn màu ${mau}`}
                />
              ))}
              <input
                type="color"
                className={styles.colorPicker}
                value={form.mauSac}
                onChange={(e) => setForm((f) => ({ ...f, mauSac: e.target.value }))}
                aria-label="Chọn màu tuỳ chỉnh"
              />
            </div>
          </Field>

          <Field label="Biểu tượng (emoji)" hint="Ví dụ: 🍔 🚌 📚 💡">
            <Input
              maxLength={4}
              placeholder="🍔"
              value={form.bieuTuong}
              onChange={(e) => setForm((f) => ({ ...f, bieuTuong: e.target.value }))}
            />
          </Field>

          <Field label="Mô tả">
            <TextArea
              placeholder="Ghi chú thêm cho danh mục này (không bắt buộc)"
              value={form.moTa}
              onChange={(e) => setForm((f) => ({ ...f, moTa: e.target.value }))}
            />
          </Field>

          {formError && <p className={styles.formError}>{formError}</p>}
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xoá danh mục"
        message={`Bạn có chắc muốn xoá danh mục "${deleting?.tenDanhMuc}"? Hành động này không thể hoàn tác.`}
        loading={deleteLoading}
        onConfirm={onDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
