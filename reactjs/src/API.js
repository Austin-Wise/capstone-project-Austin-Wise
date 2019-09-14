import axios from 'axios';
// ? Create one instance of Axios to cut down on unnecessary setup

// TODO: add tokens to this file for authentication.
const API = axios.create({
  baseURL:
    process.env.API_URL || 'https://endpoint.yourcode.app/Austin-Wise/api/'
});

export default API;
