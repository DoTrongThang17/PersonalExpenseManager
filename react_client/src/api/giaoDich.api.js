import { apiClient } from './client';

export const giaoDichApi = {
  list: (params) => apiClient.get('/giao-dich', { params }).then((r) => r.data),
  get: (id) => apiClient.get(`/giao-dich/${id}`).then((r) => r.data),
  create: (payload) => apiClient.post('/giao-dich', payload).then((r) => r.data),
  update: (id, payload) =>
    apiClient.put(`/giao-dich/${id}`, payload).then((r) => r.data),
  remove: (id) => apiClient.delete(`/giao-dich/${id}`).then((r) => r.data),
  tongHop: (thang, nam) =>
    apiClient
      .get('/giao-dich/tong-hop', { params: { thang, nam } })
      .then((r) => r.data),
};
