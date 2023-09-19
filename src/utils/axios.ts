import axios from 'axios';
export const TOKEN_KEY = 'auth-token';

export const axiosInstance = axios.create({
  baseURL: `https://beatway2.phamduylai.com/api/v1/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => new URLSearchParams(params).toString(),
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
    if (config?.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('axios error request', error);
    // Promise.reject(error);
    return error;
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('axios error response', error);
    // Promise.reject(error);
    return error;
  },
);
