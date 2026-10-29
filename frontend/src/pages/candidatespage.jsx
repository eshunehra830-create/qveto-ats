import React, { useState, useEffect } from 'react';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qveto_candidates')) || [];
    setCandidates(saved);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const newCand = { id: Date.now(), name, email, status: 'Pending' };
    const updated = [...candidates, newCand];
    setCandidates(updated);
    localStorage.setItem('qveto_candidates', JSON.stringify(updated));
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Candidates Portal</h2>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          <button type="submit" style={{ padding: '8px 16px', background: '#52c41a', color: 'white', border: 'none', borderRadius: '4px' }}>Add Candidate</button>
        </form>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3>Candidate List</h3>
        {candidates.length === 0 ? <p>No candidates found.</p> : (
          <ul style={{ paddingLeft: '20px' }}>
            {candidates.map(c => (
              <li key={c.id} style={{ marginBottom: '10px' }}>
                <strong>{c.name}</strong> ({c.email}) - <span style={{ color: '#1890ff' }}>{c.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}