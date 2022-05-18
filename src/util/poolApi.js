import axios from 'axios';
const request = axios.create({
  baseURL:  `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

request.interceptors.request.use(
    async config => {
      let token;
      try {
        token = await localStorage.getItem('token');
      } catch (e) {}
      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

// after send request
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default request;
