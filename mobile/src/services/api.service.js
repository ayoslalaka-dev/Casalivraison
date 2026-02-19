import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Remplace localhost par ton IP locale si tu testes sur un device physique (ex: 192.168.1.XX)
// Pour l'émulateur Android standard: 10.0.2.2
const API_URL = 'http://192.168.100.6:5001/api/v1'; // Standardized to backend port 5001

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Service API Wrapper
const api = {
    // Expose raw instance if needed
    axios: instance,

    // Auth
    auth: {
        login: (email, password) => instance.post('/auth/login', { email, password }),
        register: (data) => instance.post('/auth/register', data),
    },

    // Restaurants
    restaurants: {
        getAll: (params) => instance.get('/restaurants', { params }), // supports ?zone=...
        getOne: (id) => instance.get(`/restaurants/${id}`),
        getMenus: (id) => instance.get(`/menus/restaurant/${id}`), // Route specifique
    },

    // Orders
    orders: {
        create: (payload) => instance.post('/orders', payload),
        getAll: (userId) => instance.get(`/orders/user/${userId}`),
        getOne: (id) => instance.get(`/orders/${id}`),
        updateStatus: (id, status) => instance.put(`/orders/${id}/status`, { status }),
    },

    // Compatibility methods (to not break existing usages like api.get(...))
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    delete: (url, config) => instance.delete(url, config),
};

export default api;
