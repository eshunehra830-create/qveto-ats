import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // States for Jobs and Candidates
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // Form inputs
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('qveto_jobs')) || [
      { id: 1, title: 'Frontend Developer', desc: 'React.js & Tailwind CSS' },
      { id: 2, title: 'Backend Developer', desc: 'Node.js & MongoDB' }
    ];
    const savedCandidates = JSON.parse(localStorage.getItem('qveto_candidates')) || [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', job: 'Frontend Developer' }
    ];

    setJobs(savedJobs);
    setCandidates(savedCandidates);
  }, []);

  // Add Job Handler
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

  // Add Candidate Handler
  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!candName || !candEmail) return;
    const newCand = { id: Date.now(), name: candName, email: candEmail, job: selectedJob || 'General' };
    const updatedCandidates = [...candidates, newCand];
    setCandidates(updatedCandidates);
    localStorage.setItem('qveto_candidates', JSON.stringify(updatedCandidates));
    setCandName('');
    setCandEmail('');
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h2>Qveto ATS - Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Counters / Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <h3>Total Jobs</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>{jobs.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <h3>Total Candidates</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{candidates.length}</p>
        </div>
      </div>

      {/* Forms Section to Add Data */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        
        {/* Add Job Form */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4>Add New Job</h4>
          <form onSubmit={handleAddJob} style={{ marginTop: '10px' }}>
            <input 
              type="text" 
              placeholder="Job Title" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <input 
              type="text" 
              placeholder="Job Description" 
              value={jobDesc} 
              onChange={(e) => setJobDesc(e.target.value)} 
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add Job
            </button>
          </form>
        </div>

        {/* Add Candidate Form */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4>Add New Candidate</h4>
          <form onSubmit={handleAddCandidate} style={{ marginTop: '10px' }}>
            <input 
              type="text" 
              placeholder="Candidate Name" 
              value={candName} 
              onChange={(e) => setCandName(e.target.value)} 
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <input 
              type="email" 
              placeholder="Candidate Email" 
              value={candEmail} 
              onChange={(e) => setCandEmail(e.target.value)} 
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add Candidate
            </button>
          </form>
        </div>

      </div>

      {/* Lists Display Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Jobs List */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4>Jobs List</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            {jobs.map(job => (
              <li key={job.id} style={{ marginBottom: '8px' }}>
                <strong>{job.title}</strong> - {job.desc}
              </li>
            ))}
          </ul>
        </div>

        {/* Candidates List */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4>Candidates List</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            {candidates.map(cand => (
              <li key={cand.id} style={{ marginBottom: '8px' }}>
                <strong>{cand.name}</strong> ({cand.email})
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}