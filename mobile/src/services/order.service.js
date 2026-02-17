import api from './api.service';

export const orderService = {
    create: (payload) => api.post('/orders', payload),
    getAll: (userId) => api.get(`/orders/user/${userId}`),
    getOne: (id) => api.get(`/orders/${id}`),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

export default orderService;
