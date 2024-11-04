import api from '..';

export const login = (userInfo) => api.post('/auth/login', userInfo);

export const logout = () => api.post('/auth/logout');

export const registration = (userInfo) => api.post('/auth/register', userInfo);

export const getNewToken = (refreshToken) => api.post('/auth/refresh-token', { refreshToken });