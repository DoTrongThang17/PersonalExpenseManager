import { apiClient } from './client';

export const authApi = {
  register: (payload) => apiClient.post('/nguoi-dung', payload).then((r) => r.data),
  login: (payload) => apiClient.post('/auth/login', payload).then((r) => r.data),
};
