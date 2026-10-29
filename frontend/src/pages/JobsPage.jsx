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

  return (
    <div>
      <h2>Jobs Management</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          <input type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} style={{ flex: 2, padding: '8px' }} />
          <button type="submit" style={{ padding: '8px 16px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px' }}>Add Job</button>
        </form>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3>Job Openings</h3>
        {jobs.length === 0 ? <p>No jobs added yet.</p> : (
          <ul style={{ paddingLeft: '20px' }}>
            {jobs.map(j => (
              <li key={j.id} style={{ marginBottom: '10px' }}>
                <strong>{j.title}</strong> - {j.desc}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}