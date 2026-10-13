const API_BASE_URL = 'http://localhost:5000/api';

// 1. Login User
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

// 2. Fetch all jobs
export const fetchJobs = async () => {
  const response = await fetch(`${API_BASE_URL}/jobs`);
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
};

// 3. Create a new job
export const createJob = async (jobData) => {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
};

// 4. Fetch all candidates
export const fetchCandidates = async () => {
  const response = await fetch(`${API_BASE_URL}/candidates`);
  if (!response.ok) throw new Error('Failed to fetch candidates');
  return response.json();
};