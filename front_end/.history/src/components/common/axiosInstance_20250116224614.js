import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'https://work-hive.liara.run',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('bearer'); // Get token from cookies
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
