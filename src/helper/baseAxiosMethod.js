import axios from 'axios';

const baseAxiosMethod = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

baseAxiosMethod.interceptors.request.use(
  (config) => {
    // Add authorization key to config object if it exist
    const token = localStorage.getItem('@userToken');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default baseAxiosMethod;
