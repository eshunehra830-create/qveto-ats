import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('qveto_jobs')) || [
      { id: 1, title: 'Full Stack Developer', desc: 'React.js, Node.js & MongoDB integration.' },
      { id: 2, title: 'AI Integration Engineer', desc: 'Implementing generative AI SDKs and automation.' }
    ];
    const savedCandidates = JSON.parse(localStorage.getItem('qveto_candidates')) || [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com' }
    ];

    setJobs(savedJobs);
    setCandidates(savedCandidates);
  }, []);

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!jobTitle) return;
    const newJob = { id: Date.now(), title: jobTitle, desc: jobDesc };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem('qveto_jobs', JSON.stringify(updatedJobs));
    setJobTitle('');
    setJobDesc('');
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!candName || !candEmail) return;
    const newCand = { id: Date.now(), name: candName, email: candEmail };
    const updatedCandidates = [...candidates, newCand];
    setCandidates(updatedCandidates);
    localStorage.setItem('qveto_candidates', JSON.stringify(updatedCandidates));
    setCandName('');
    setCandEmail('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'white', padding: '20px 30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>Qveto ATS Dashboard</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>Welcome back, Admin</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 5px rgba(255,77,79,0.3)' }}>
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'linear-gradient(135deg, #36cfc9 0%, #1890ff 100%)', color: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(24,144,255,0.3)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '500' }}>Total Jobs Posted</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{jobs.length}</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', color: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(82,196,26,0.3)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '500' }}>Total Candidates Applied</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{candidates.length}</p>
        </div>
      </div>

      {/* Forms Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        
        {/* Add Job Form */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>➕ Add New Job</h4>
          <form onSubmit={handleAddJob}>
            <input 
              type="text" 
              placeholder="Job Title (e.g. Full Stack Developer)" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              required
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box', outline: 'none' }}
            />
            <input 
              type="text" 
              placeholder="Job Description" 
              value={jobDesc} 
              onChange={(e) => setJobDesc(e.target.value)} 
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box', outline: 'none' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              Publish Job
            </button>
          </form>
        </div>

        {/* Add Candidate Form */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>👤 Add New Candidate</h4>
          <form onSubmit={handleAddCandidate}>
            <input 
              type="text" 
              placeholder="Candidate Name" 
              value={candName} 
              onChange={(e) => setCandName(e.target.value)} 
              required
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box', outline: 'none' }}
            />
            <input 
              type="email" 
              placeholder="Candidate Email" 
              value={candEmail} 
              onChange={(e) => setCandEmail(e.target.value)} 
              required
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box', outline: 'none' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              Register Candidate
            </button>
          </form>
        </div>

      </div>

      {/* Lists Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Jobs List */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>📋 Active Job Openings</h4>
          {jobs.length === 0 ? <p style={{ color: '#888' }}>No jobs available.</p> : (
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {jobs.map(job => (
                <li key={job.id} style={{ marginBottom: '12px', color: '#444' }}>
                  <strong style={{ color: '#1890ff' }}>{job.title}</strong><br />
                  <span style={{ fontSize: '13px', color: '#666' }}>{job.desc}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Candidates List */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>👥 Registered Candidates</h4>
          {candidates.length === 0 ? <p style={{ color: '#888' }}>No candidates registered.</p> : (
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {candidates.map(cand => (
                <li key={cand.id} style={{ marginBottom: '12px', color: '#444' }}>
                  <strong style={{ color: '#52c41a' }}>{cand.name}</strong><br />
                  <span style={{ fontSize: '13px', color: '#666' }}>{cand.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

    </div>
  );
}