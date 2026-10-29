import React, { useState, useEffect } from 'react';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Pending');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qveto_candidates')) || [];
    setCandidates(saved);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const newCand = { id: Date.now(), name, email, status };
    const updated = [...candidates, newCand];
    setCandidates(updated);
    localStorage.setItem('qveto_candidates', JSON.stringify(updated));
    setName('');
    setEmail('');
    setStatus('Pending');
  };

  const handleDelete = (id) => {
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
    link.setAttribute("download", "candidates_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = candidates.filter(c => filter === 'All' || c.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>👥 Candidates Management Portal</h2>
        <button onClick={handleExportCSV} style={{ padding: '8px 16px', backgroundColor: '#722ed1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
          📥 Export CSV
        </button>
      </div>

      {/* Add Candidate Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>Register Candidate</h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: 'white' }}>
            <option value="Pending">Pending</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
        </form>
      </div>

      {/* Candidates Table */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ margin: 0 }}>Registered Candidates</h4>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'white' }}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {filtered.length === 0 ? <p style={{ color: '#888' }}>No candidates found.</p> : (
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
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>{c.name}</td>
                  <td style={{ padding: '10px', color: '#555' }}>{c.email}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', background: c.status === 'Shortlisted' ? '#e6f7ff' : '#fff1f0', color: c.status === 'Shortlisted' ? '#1890ff' : '#ff4d4f' }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(c.id)} style={{ padding: '5px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}