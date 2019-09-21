import axios from 'axios';
// ? Create one instance of Axios to cut down on unnecessary setup

// TODO: add tokens to this file for authentication.
export default axios.create({
  baseURL: process.env.API_URL || '/api/',
});
