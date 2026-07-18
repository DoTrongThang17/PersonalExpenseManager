import { apiClient } from './client';

export const danhMucApi = {
  list: () => apiClient.get('/danh-muc').then((r) => r.data),
  get: (id) => apiClient.get(`/danh-muc/${id}`).then((r) => r.data),
  create: (payload) => apiClient.post('/danh-muc', payload).then((r) => r.data),
  update: (id, payload) =>
    apiClient.put(`/danh-muc/${id}`, payload).then((r) => r.data),
  remove: (id) => apiClient.delete(`/danh-muc/${id}`).then((r) => r.data),
};
