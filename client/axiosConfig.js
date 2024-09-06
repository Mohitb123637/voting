import axios from 'axios';

// Use the base URL from environment variables
const apiUrl = import.meta.env.VITE_API_URL;

const axiosConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
