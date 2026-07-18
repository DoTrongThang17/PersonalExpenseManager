import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authApi } from '../api/auth.api';
import { tokenStorage } from '../api/client';

const USER_KEY = 'so_quy_user';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Khôi phục phiên đăng nhập khi tải lại trang
  useEffect(() => {
    const token = tokenStorage.get();
    const cachedUser = localStorage.getItem(USER_KEY);
    if (token && cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
        tokenStorage.clear();
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const persistSession = useCallback((token, userData) => {
    tokenStorage.set(token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const login = useCallback(
    async (email, mat_khau) => {
      const res = await authApi.login({ email, mat_khau });
      persistSession(res.access_token, res.user);
      return res.user;
    },
    [persistSession],
  );

  const register = useCallback(
    async (payload) => {
      await authApi.register(payload);
      // Đăng ký xong tự động đăng nhập luôn cho mượt trải nghiệm
      return login(payload.email, payload.mat_khau);
    },
    [login],
  );

  const logout = useCallback(() => {
    tokenStorage.clear();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, isAuthenticated: Boolean(user), login, register, logout }),
    [user, isReady, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  return ctx;
}
