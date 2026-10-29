import React, { useState, useEffect } from 'react';

export default function JobsPage() {
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

  const handleDelete = (id) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    localStorage.setItem('qveto_jobs', JSON.stringify(updated));
  };

  return (
    <div>
      <h2>💼 Jobs Management Portal</h2>
      
      {/* Post Job Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>Post New Opening</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Job</button>
        </form>
      </div>

      {/* Jobs List */}
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
                <button onClick={() => handleDelete(j.id)} style={{ padding: '6px 12px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}