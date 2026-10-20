import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// 1. Login User
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// 2. Fetch Jobs
export const fetchJobs = async () => {
  try {
    const response = await API.get('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// 3. Fetch Candidates
export const fetchCandidates = async () => {
  try {
    const response = await API.get('/candidates');
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
};

// 4. Update Candidate Stage (यह अभी जोड़ना है)
export const updateCandidateStage = async (id, stageData) => {
  try {
    const response = await API.put(`/candidates/${id}/stage`, stageData);
    return response.data;
  } catch (error) {
    console.error('Error updating candidate stage:', error);
    throw error;
  }
};

// 5. Add Candidate With Resume (यह भी जोड़ना है)
export const addCandidateWithResume = async (formData) => {
  try {
    const response = await API.post('/candidates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
    throw error;
  }
};

export default API;