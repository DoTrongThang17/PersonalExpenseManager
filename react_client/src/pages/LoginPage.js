import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { Field, Input } from '../components/ui/FormControls';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import styles from './AuthForm.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', mat_khau: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/';

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email.trim(), form.mat_khau);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Chào mừng trở lại"
      title="Đăng nhập"
      subtitle="Tiếp tục theo dõi thu chi của bạn."
    >
      <form className={styles.form} onSubmit={onSubmit} noValidate>
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

        <Field label="Mật khẩu" required htmlFor="mat_khau">
          <Input
            id="mat_khau"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.mat_khau}
            onChange={onChange('mat_khau')}
          />
        </Field>

        {error && <p className={styles.formError}>{error}</p>}

        <Button type="submit" size="lg" icon={LogIn} loading={loading} style={{ width: '100%' }}>
          Đăng nhập
        </Button>
      </form>

      <p className={styles.switchLine}>
        Chưa có tài khoản? <Link to="/dang-ky">Đăng ký ngay</Link>
      </p>
    </AuthLayout>
  );
}
