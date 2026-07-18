import { apiClient } from './client';

export const nganSachApi = {
  list: (params) => apiClient.get('/ngan-sach', { params }).then((r) => r.data),
  get: (id) => apiClient.get(`/ngan-sach/${id}`).then((r) => r.data),
  create: (payload) => apiClient.post('/ngan-sach', payload).then((r) => r.data),
  update: (id, payload) =>
    apiClient.put(`/ngan-sach/${id}`, payload).then((r) => r.data),
  remove: (id) => apiClient.delete(`/ngan-sach/${id}`).then((r) => r.data),
};
