import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  open,
  title = 'Xác nhận',
  message,
  confirmLabel = 'Xoá',
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      width={400}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Huỷ
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.6 }}>{message}</p>
    </Modal>
  );
}
