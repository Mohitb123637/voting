import axios from 'axios';

// Create an axios instance
const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add a request interceptor to include the token in every request
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;
