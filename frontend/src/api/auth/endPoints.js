import api from '..';

export const registration = async (userInfo) => await api.post('/auth/register', userInfo);

export const login = async (userInfo) => await api.post('/auth/login', userInfo);

export const logout = async () => await api.post('/auth/logout');

export const getNewToken = async (refreshToken) => await api.post('/auth/refresh-token', { refreshToken });

