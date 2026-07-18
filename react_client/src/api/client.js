import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'so_quy_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Tự động đính kèm Bearer token vào mọi request (nếu đã đăng nhập)
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Chuẩn hoá lỗi trả về từ NestJS: { message: string | string[], statusCode }
// -> luôn trả ra 1 chuỗi dễ hiển thị cho người dùng.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    let message = 'Đã có lỗi xảy ra, vui lòng thử lại.';

    if (Array.isArray(data?.message)) {
      message = data.message.join('. ');
    } else if (typeof data?.message === 'string') {
      message = data.message;
    } else if (error.message === 'Network Error') {
      message =
        'Không kết nối được tới máy chủ. Kiểm tra lại backend đã chạy chưa.';
    }

    // Phiên đăng nhập hết hạn / token không hợp lệ -> đưa về trang đăng nhập
    if (error.response?.status === 401 && tokenStorage.get()) {
      tokenStorage.clear();
      if (!window.location.pathname.startsWith('/dang-nhap')) {
        window.location.href = '/dang-nhap';
      }
    }

    return Promise.reject(new Error(message));
  },
);
