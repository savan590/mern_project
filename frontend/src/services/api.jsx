import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend server URL
});

export default api;
