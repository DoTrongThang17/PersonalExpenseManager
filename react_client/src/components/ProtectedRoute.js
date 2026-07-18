import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageSpinner from './ui/PageSpinner';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) return <PageSpinner label="Đang kiểm tra phiên đăng nhập…" />;
  if (!isAuthenticated) return <Navigate to="/dang-nhap" replace />;

  return children;
}
