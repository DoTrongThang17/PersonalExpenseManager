import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { Field, Input } from '../components/ui/FormControls';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import styles from './AuthForm.module.css';

const EMPTY = { ho_ten: '', email: '', mat_khau: '', xac_nhan_mat_khau: '', so_dien_thoai: '' };

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.mat_khau !== form.xac_nhan_mat_khau) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      await register({
        ho_ten: form.ho_ten.trim(),
        email: form.email.trim(),
        mat_khau: form.mat_khau,
        so_dien_thoai: form.so_dien_thoai.trim(),
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Bắt đầu"
      title="Tạo tài khoản"
      subtitle="Mất chưa đến 1 phút để bắt đầu ghi sổ."
    >
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <Field label="Họ và tên" required htmlFor="ho_ten">
          <Input
            id="ho_ten"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            value={form.ho_ten}
            onChange={onChange('ho_ten')}
          />
        </Field>

        <Field label="Email" required htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ban@vidu.com"
            value={form.email}
            onChange={onChange('email')}
          />
        </Field>

        <Field label="Số điện thoại" required htmlFor="sdt">
          <Input
            id="sdt"
            required
            autoComplete="tel"
            placeholder="09xxxxxxxx"
            value={form.so_dien_thoai}
            onChange={onChange('so_dien_thoai')}
          />
        </Field>

        <Field label="Mật khẩu" required hint="Tối thiểu 6 ký tự" htmlFor="mat_khau">
          <Input
            id="mat_khau"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.mat_khau}
            onChange={onChange('mat_khau')}
          />
        </Field>

        <Field label="Xác nhận mật khẩu" required htmlFor="xac_nhan">
          <Input
            id="xac_nhan"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.xac_nhan_mat_khau}
            onChange={onChange('xac_nhan_mat_khau')}
          />
        </Field>

        {error && <p className={styles.formError}>{error}</p>}

        <Button
          type="submit"
          size="lg"
          icon={UserPlus}
          loading={loading}
          style={{ width: '100%' }}
        >
          Tạo tài khoản
        </Button>
      </form>

      <p className={styles.switchLine}>
        Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
      </p>
    </AuthLayout>
  );
}
