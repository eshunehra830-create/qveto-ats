import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // Form states
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candStatus, setCandStatus] = useState('Pending');

  // Search states
  const [jobSearch, setJobSearch] = useState('');
  const [candSearch, setCandSearch] = useState('');

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('qveto_jobs')) || [
      { id: 1, title: 'Full Stack Developer', desc: 'React.js, Node.js & MongoDB integration.' },
      { id: 2, title: 'AI Integration Engineer', desc: 'Implementing generative AI SDKs and automation.' }
    ];
    const savedCandidates = JSON.parse(localStorage.getItem('qveto_candidates')) || [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', status: 'Shortlisted' },
      { id: 2, name: 'Priya Verma', email: 'priya@gmail.com', status: 'Pending' }
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

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('qveto_jobs', JSON.stringify(updatedJobs));
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!candName || !candEmail) return;
    const newCand = { id: Date.now(), name: candName, email: candEmail, status: candStatus };
    const updatedCandidates = [...candidates, newCand];
    setCandidates(updatedCandidates);
    localStorage.setItem('qveto_candidates', JSON.stringify(updatedCandidates));
    setCandName('');
    setCandEmail('');
    setCandStatus('Pending');
  };

  const handleDeleteCandidate = (id) => {
    const updatedCandidates = candidates.filter(cand => cand.id !== id);
    setCandidates(updatedCandidates);
    localStorage.setItem('qveto_candidates', JSON.stringify(updatedCandidates));
  };

  // Export Candidates List to CSV File
  const handleExportCSV = () => {
    if (candidates.length === 0) {
      alert("No candidate data to export!");
      return;
    }
    const headers = ["ID", "Name", "Email", "Status"];
    const rows = candidates.map(c => [c.id, `"${c.name}"`, `"${c.email}"`, `"${c.status}"`]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "qveto_candidates_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(jobSearch.toLowerCase()));
  const filteredCandidates = candidates.filter(cand => cand.name.toLowerCase().includes(candSearch.toLowerCase()) || cand.email.toLowerCase().includes(candSearch.toLowerCase()));

  // Analytics
  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const pendingCount = candidates.filter(c => c.status === 'Pending').length;
  const rejectedCount = candidates.filter(c => c.status === 'Rejected').length;

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'white', padding: '20px 30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>Qveto ATS - Enterprise Dashboard</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>Candidate Management & Analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExportCSV} style={{ padding: '10px 18px', backgroundColor: '#722ed1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            📥 Export CSV
          </button>
          <button onClick={handleLogout} style={{ padding: '10px 18px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #1890ff' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Total Jobs</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#1890ff' }}>{jobs.length}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #faad14' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Pending</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#faad14' }}>{pendingCount}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #52c41a' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Shortlisted</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#52c41a' }}>{shortlistedCount}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid #ff4d4f' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>Rejected</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#ff4d4f' }}>{rejectedCount}</p>
        </div>
      </div>

      {/* Forms Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        
        {/* Add Job Form */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>➕ Post New Job</h4>
          <form onSubmit={handleAddJob}>
            <input 
              type="text" 
              placeholder="Job Title" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              required
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box' }}
            />
            <input 
              type="text" 
              placeholder="Job Description" 
              value={jobDesc} 
              onChange={(e) => setJobDesc(e.target.value)} 
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              Add Job
            </button>
          </form>
        </div>

        {/* Add Candidate Form */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>👤 Register Candidate</h4>
          <form onSubmit={handleAddCandidate}>
            <input 
              type="text" 
              placeholder="Candidate Name" 
              value={candName} 
              onChange={(e) => setCandName(e.target.value)} 
              required
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box' }}
            />
            <input 
              type="email" 
              placeholder="Candidate Email" 
              value={candEmail} 
              onChange={(e) => setCandEmail(e.target.value)} 
              required
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box' }}
            />
            <select 
              value={candStatus} 
              onChange={(e) => setCandStatus(e.target.value)} 
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box', backgroundColor: 'white' }}
            >
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              Add Candidate
            </button>
          </form>
        </div>

      </div>

      {/* Lists & Search Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Jobs List */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>📋 Jobs List</h4>
          <input 
            type="text" 
            placeholder="Search jobs..." 
            value={jobSearch} 
            onChange={(e) => setJobSearch(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box' }}
          />
          {filteredJobs.length === 0 ? <p style={{ color: '#888' }}>No jobs found.</p> : (
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
              {filteredJobs.map(job => (
                <li key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '10px', background: '#fafafa', borderRadius: '6px', border: '1px solid #eee' }}>
                  <div>
                    <strong style={{ color: '#1890ff' }}>{job.title}</strong><br />
                    <span style={{ fontSize: '13px', color: '#666' }}>{job.desc}</span>
                  </div>
                  <button onClick={() => handleDeleteJob(job.id)} style={{ padding: '6px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Candidates List */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>👥 Candidates List</h4>
          <input 
            type="text" 
            placeholder="Search candidates..." 
            value={candSearch} 
            onChange={(e) => setCandSearch(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d9d9d9', boxSizing: 'border-box' }}
          />
          {filteredCandidates.length === 0 ? <p style={{ color: '#888' }}>No candidates found.</p> : (
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
              {filteredCandidates.map(cand => (
                <li key={cand.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '10px', background: '#fafafa', borderRadius: '6px', border: '1px solid #eee' }}>
                  <div>
                    <strong style={{ color: '#389e0d' }}>{cand.name}</strong><br />
                    <span style={{ fontSize: '13px', color: '#666' }}>{cand.email}</span><br />
                    <span style={{ fontSize: '11px', padding: '2px 6px', background: cand.status === 'Shortlisted' ? '#e6f7ff' : cand.status === 'Rejected' ? '#fff1f0' : '#fffbe6', color: cand.status === 'Shortlisted' ? '#1890ff' : cand.status === 'Rejected' ? '#ff4d4f' : '#faad14', borderRadius: '4px', fontWeight: 'bold' }}>
                      {cand.status}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteCandidate(cand.id)} style={{ padding: '6px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

    </div>
  );
}