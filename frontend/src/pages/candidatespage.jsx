import React, { useState, useEffect } from 'react';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qveto_candidates')) || [];
    setCandidates(saved);
  }, []);

  const filtered = candidates.filter(c => filter === 'All' || c.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>👥 Candidates Portal</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="All">All Candidates</option>
          <option value="Pending">Pending</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px', fontWeight: '600' }}>{c.name}</td>
                <td style={{ padding: '12px', color: '#555' }}>{c.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', background: c.status === 'Shortlisted' ? '#e6f7ff' : '#fff1f0', color: c.status === 'Shortlisted' ? '#1890ff' : '#ff4d4f' }}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}