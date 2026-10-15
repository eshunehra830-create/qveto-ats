const API_BASE_URL = 'https://qveto-backend.onrender.com/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

// Auth
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

// Jobs
export const fetchJobs = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

export const createJob = async (jobData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  return handleResponse(response);
};

// Candidates
export const fetchCandidates = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/candidates`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
};

export const updateCandidateStage = async (id, stage) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ stage }),
  });
  return handleResponse(response);
};

export const addCandidate = async (candidateData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/candidates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(candidateData),
  });
  return handleResponse(response);
};

export const addCandidateWithResume = async (formData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/candidates`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData, 
  });
  return handleResponse(response);
};