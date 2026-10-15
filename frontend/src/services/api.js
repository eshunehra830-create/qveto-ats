import axios from 'axios';

// Live Render Backend URL
const API_BASE_URL = 'https://qveto-ats-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;