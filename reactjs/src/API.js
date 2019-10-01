import axios from 'axios';
// ? Create one instance of Axios to cut down on unnecessary setup

const API = axios.create({
  baseURL: process.env.API_URL || '/api/',
});

API.interceptors.request.use(async config => {
  const token = localStorage.authToken;
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${localStorage.authToken}`,
    };
  }
  return config;
});

export default API;
