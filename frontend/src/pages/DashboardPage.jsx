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
  const rejectedCount = candidates.filter(c => c.status === 'Rejected').length;

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p style={{ color: '#666', marginBottom: '25px' }}>Welcome to Qveto Enterprise ATS Portal.</p>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #1890ff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Jobs</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#1890ff' }}>{jobs.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #52c41a', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Shortlisted</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#52c41a' }}>{shortlistedCount}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #faad14', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Pending</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#faad14' }}>{pendingCount}</p>
        </div>
      </div>
    </div>
  );
}