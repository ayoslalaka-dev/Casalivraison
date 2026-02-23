import api from './api.service';

export const restaurantService = {
    getAll: (params) => api.get('/restaurants', { params }),
    getOne: (id) => api.get(`/restaurants/${id}`),
    getMenus: (id) => api.get(`/menus/restaurant/${id}`),
};

export default restaurantService;
