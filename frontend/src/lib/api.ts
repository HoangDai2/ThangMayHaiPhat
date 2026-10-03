import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor to attach token
api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle responses
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 403) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/403';
    }
  }
  return Promise.reject(error);
});

export default api;
