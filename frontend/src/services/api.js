import axios from 'axios';

// The API runs as Netlify Functions on the same site, under /api
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Login API Function
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Server network error / Failed to fetch';
  }
};

// Attach the saved login token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Jobs API Functions
export const fetchJobs = async () => {
  const response = await API.get('/jobs');
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await API.post('/jobs', jobData);
  return response.data;
};

// Candidates API Functions
export const fetchCandidates = async () => {
  const response = await API.get('/candidates');
  return response.data;
};

export const updateCandidateStage = async (id, data) => {
  const response = await API.patch(`/candidates/${id}`, data);
  return response.data;
};

export const addCandidateWithResume = async (formData) => {
  const response = await API.post('/candidates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export default API;