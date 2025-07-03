import axios from 'axios';

const baseURL = 'http://localhost:3500';

// Public instance
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
