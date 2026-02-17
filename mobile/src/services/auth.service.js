import api from './api.service';

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/auth/profile'),
    logout: () => api.post('/auth/logout'),
};

export default authService;
