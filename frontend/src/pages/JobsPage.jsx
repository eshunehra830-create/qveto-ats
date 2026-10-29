import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qveto_jobs')) || [];
    setJobs(saved);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title) return;
    const newJob = { id: Date.now(), title, desc };
    const updated = [...jobs, newJob];
    setJobs(updated);
    localStorage.setItem('qveto_jobs', JSON.stringify(updated));
    setTitle('');
    setDesc('');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>💼 Jobs Management</h2>
      
      {/* Create Job Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>Post New Opening</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Job</button>
        </form>
      </div>

      {/* Jobs Table/List */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>All Job Openings</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {jobs.map(j => (
            <li key={j.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <div>
                <strong 
                  onClick={() => navigate(`/job/${j.id}`)} 
                  style={{ color: '#1890ff', cursor: 'pointer', fontSize: '16px' }}
                >
                  {j.title} ↗
                </strong>
                <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>{j.desc}</p>
              </div>
              <button 
                onClick={() => navigate(`/job/${j.id}`)} 
                style={{ padding: '6px 12px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}