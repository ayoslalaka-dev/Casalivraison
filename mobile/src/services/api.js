import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Remplace localhost par ton IP locale si tu testes sur un device physique (ex: 192.168.1.XX)
// Pour l'émulateur Android standard: 10.0.2.2
const API_URL = 'http://10.0.2.2:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
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

export default api;
