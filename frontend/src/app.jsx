import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // Form states
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candStatus, setCandStatus] = useState('Pending');
  const [candFilter, setCandFilter] = useState('All');

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('qveto_jobs')) || [
      { id: 1, title: 'Full Stack Developer', desc: 'React.js & Node.js integration.' }
    ];
    const savedCandidates = JSON.parse(localStorage.getItem('qveto_candidates')) || [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', status: 'Shortlisted' }
    ];
    setJobs(savedJobs);
    setCandidates(savedCandidates);
  }, []);

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!jobTitle) return;
    const newJob = { id: Date.now(), title: jobTitle, desc: jobDesc };
    const updated = [...jobs, newJob];
    setJobs(updated);
    localStorage.setItem('qveto_jobs', JSON.stringify(updated));
    setJobTitle('');
    setJobDesc('');
  };

  const handleDeleteJob = (id) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    localStorage.setItem('qveto_jobs', JSON.stringify(updated));
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!candName || !candEmail) return;
    const newCand = { id: Date.now(), name: candName, email: candEmail, status: candStatus };
    const updated = [...candidates, newCand];
    setCandidates(updated);
    localStorage.setItem('qveto_candidates', JSON.stringify(updated));
    setCandName('');
    setCandEmail('');
    setCandStatus('Pending');
  };

  const handleDeleteCandidate = (id) => {
    const updated = candidates.filter(c => c.id !== id);
    setCandidates(updated);
    localStorage.setItem('qveto_candidates', JSON.stringify(updated));
  };

  const handleExportCSV = () => {
    if (candidates.length === 0) {
      alert("No data to export!");
      return;
    }
    const headers = ["ID", "Name", "Email", "Status"];
    const rows = candidates.map(c => [c.id, `"${c.name}"`, `"${c.email}"`, `"${c.status}"`]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "qveto_candidates.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const pendingCount = candidates.filter(c => c.status === 'Pending').length;
  const rejectedCount = candidates.filter(c => c.status === 'Rejected').length;

  const filteredCandidates = candidates.filter(c => candFilter === 'All' || c.status === candFilter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5' }}>
      
      {/* Sidebar Navigation */}
      <div style={{ width: '220px', background: '#001529', color: 'white', padding: '20px', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#1890ff', fontSize: '20px', marginBottom: '30px' }}>Qveto ATS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={{ background: activeTab === 'dashboard' ? '#1890ff' : 'transparent', color: 'white', border: 'none', padding: '12px', textAlign: 'left', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('jobs')} 
            style={{ background: activeTab === 'jobs' ? '#1890ff' : 'transparent', color: 'white', border: 'none', padding: '12px', textAlign: 'left', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}
          >
            💼 Jobs Portal
          </button>
          <button 
            onClick={() => setActiveTab('candidates')} 
            style={{ background: activeTab === 'candidates' ? '#1890ff' : 'transparent', color: 'white', border: 'none', padding: '12px', textAlign: 'left', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}
          >
            👥 Candidates
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '30px', boxSizing: 'border-box', overflowY: 'auto' }}>
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h2>Dashboard Overview</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Welcome back! Here is a summary of your ATS platform.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #1890ff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Total Jobs</h4>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#1890ff' }}>{jobs.length}</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #faad14', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Pending</h4>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#faad14' }}>{pendingCount}</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #52c41a', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Shortlisted</h4>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#52c41a' }}>{shortlistedCount}</p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', borderTop: '4px solid #ff4d4f', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#666' }}>Rejected</h4>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#ff4d4f' }}>{rejectedCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: JOBS PORTAL */}
        {activeTab === 'jobs' && (
          <div>
            <h2>💼 Jobs Management Portal</h2>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 15px 0' }}>Post New Opening</h4>
              <form onSubmit={handleAddJob} style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="text" placeholder="Description" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Job</button>
              </form>
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 15px 0' }}>All Job Openings</h4>
              {jobs.length === 0 ? <p style={{ color: '#888' }}>No jobs found.</p> : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {jobs.map(j => (
                    <li key={j.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: '#1890ff', fontSize: '16px' }}>{j.title}</strong>
                        <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>{j.desc}</p>
                      </div>
                      <button onClick={() => handleDeleteJob(j.id)} style={{ padding: '6px 12px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CANDIDATES PORTAL */}
        {activeTab === 'candidates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>👥 Candidates Management Portal</h2>
              <button onClick={handleExportCSV} style={{ padding: '8px 16px', backgroundColor: '#722ed1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                📥 Export CSV
              </button>
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 15px 0' }}>Register Candidate</h4>
              <form onSubmit={handleAddCandidate} style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Name" value={candName} onChange={(e) => setCandName(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="email" placeholder="Email" value={candEmail} onChange={(e) => setCandEmail(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <select value={candStatus} onChange={(e) => setCandStatus(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: 'white' }}>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
              </form>
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ margin: 0 }}>Registered Candidates</h4>
                <select value={candFilter} onChange={(e) => setCandFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'white' }}>
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {filteredCandidates.length === 0 ? <p style={{ color: '#888' }}>No candidates found.</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                      <th style={{ padding: '10px' }}>Name</th>
                      <th style={{ padding: '10px' }}>Email</th>
                      <th style={{ padding: '10px' }}>Status</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '10px', fontWeight: '600' }}>{c.name}</td>
                        <td style={{ padding: '10px', color: '#555' }}>{c.email}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', background: c.status === 'Shortlisted' ? '#e6f7ff' : c.status === 'Rejected' ? '#fff1f0' : '#fffbe6', color: c.status === 'Shortlisted' ? '#1890ff' : c.status === 'Rejected' ? '#ff4d4f' : '#faad14' }}>
                            {c.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>
                          <button onClick={() => handleDeleteCandidate(c.id)} style={{ padding: '5px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}