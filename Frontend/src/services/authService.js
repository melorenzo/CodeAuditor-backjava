import api from './api';

export const login = async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ username: response.data.username, email: response.data.email }));
    }
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await api.post('/api/auth/register', { username, email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ username: response.data.username, email: response.data.email }));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};