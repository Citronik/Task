import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the token with every request
apiClient.interceptors.request.use(
  (config) => {
    config.headers.common = {};
    const store = localStorage.getItem('userStore');
    const token = store ? JSON.parse(store).token : null;
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    //config.params = { ...config.params, app_key: 'T6fXLyRiEXmYa4y-E6FgKGEbRSAlnfnD' };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
