import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Backend runs on port 3000
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthorized, logout user
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default api;
