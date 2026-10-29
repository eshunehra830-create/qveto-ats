import React, { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('qveto_jobs')) || [
      { id: 1, title: 'Full Stack Developer', desc: 'React.js & Node.js' }
    ];
    const savedCandidates = JSON.parse(localStorage.getItem('qveto_candidates')) || [
      { id: 1, name: 'Rahul Sharma', status: 'Shortlisted' }
    ];
    setJobs(savedJobs);
    setCandidates(savedCandidates);
  }, []);

  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const pendingCount = candidates.filter(c => c.status === 'Pending').length;

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p style={{ color: '#666' }}>Welcome to Qveto ATS Portal.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3>Total Jobs</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>{jobs.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3>Shortlisted Candidates</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>{shortlistedCount}</p>
        </div>
      </div>
    </div>
  );
}