import axios from 'axios';

// ⚠️ ध्यान दें: अगर बैकएंड Render/Cyclic पर डिप्लॉय है तो उसका HTTPS URL यहाँ डालें
// अगर लोकल टेस्ट कर रहे हैं तो 'http://localhost:5000/api' इस्तेमाल करें
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-domain.onrender.com/api';

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

export default API;