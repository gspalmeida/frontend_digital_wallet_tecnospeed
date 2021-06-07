import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL

console.log(baseURL);

const api = axios.create({
  baseURL: baseURL,
});

export default api;
