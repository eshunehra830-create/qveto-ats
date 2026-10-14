import React, { useState, useEffect } from 'react';
import { fetchCandidates, updateCandidateStage, addCandidateWithResume } from '../services/api';
import CandidateModel from '../components/CandidateModel';
import Toast from '../components/Toast';

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

const INITIAL_MOCK_CANDIDATES = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@qveto.com', phone: '+91 9876543210', jobId: 'React Dev', stage: 'Applied' },
  { id: '2', name: 'Priya Verma', email: 'priya@qveto.com', phone: '+91 8765432109', jobId: 'Node Dev', stage: 'Interview' },
  { id: '3', name: 'Aman Gupta', email: 'aman@qveto.com', phone: '+91 7654321098', jobId: 'UI/UX', stage: 'Hired' }
];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(INITIAL_MOCK_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobId, setJobId] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadCandidates = async () => {
    try {
      const data = await fetchCandidates();
      if (Array.isArray(data) && data.length > 0) {
        setCandidates(data);
      }
    } catch (err) {
      console.log('Running on mock state.');
    }
  };

  const handleStageChange = async (id, newStage) => {
    try {
      await updateCandidateStage(id, newStage);
    } catch (err) {
      console.log('Local stage shift updated');
    }
    setCandidates(prev => prev.map(c => (c.id === id || c._id === id) ? { ...c, stage: newStage } : c));
    showToast(`Candidate moved to ${newStage}!`);
  };

  const handleAddCandidateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('jobId', jobId);
    formData.append('stage', 'Applied');
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    try {
      const newCand = await addCandidateWithResume(formData);
      setCandidates(prev => [...prev, newCand]);
    } catch (err) {
      const mockCandidate = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        jobId,
        stage: 'Applied',
        resumeUrl: resumeFile ? URL.createObjectURL(resumeFile) : null
      };
      setCandidates(prev => [...prev, mockCandidate]);
    }

    setName('');
    setEmail('');
    setPhone('');
    setJobId('');
    setResumeFile(null);
    setShowAddModal(false);
    showToast('Candidate successfully added!');
  };

  const exportToCSV = () => {
    if (candidates.length === 0) return alert('No candidate data to export!');

    const headers = ["ID,Name,Email,Phone,Job Title,Stage\n"];
    const rows = candidates.map(c => 
      `"${c.id || c._id}","${c.name}","${c.email}","${c.phone || ''}","${c.jobId || ''}","${c.stage}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Qveto_Candidates_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('CSV Report Downloaded Successfully!');
  };

  const filteredCandidates = candidates.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Analytics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Applicants</p>
            <p className="text-2xl font-bold text-slate-900">{candidates.length}</p>
          </div>
          <span className="text-2xl">👥</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase">In Interview Stage</p>
            <p className="text-2xl font-bold text-slate-900">{candidates.filter(c => c.stage === 'Interview').length}</p>
          </div>
          <span className="text-2xl">🎯</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase">Successfully Hired</p>
            <p className="text-2xl font-bold text-slate-900">{candidates.filter(c => c.stage === 'Hired').length}</p>
          </div>
          <span className="text-2xl">🎉</span>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Candidates Pipeline</h2>
          <p className="text-sm text-slate-500">Track candidate progress across recruitment stages</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate..." 
            className="px-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
          />
          
          <button 
            onClick={exportToCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-colors whitespace-nowrap flex items-center space-x-1"
          >
            <span>📥 Export CSV</span>
          </button>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-colors whitespace-nowrap"
          >
            + Add Candidate
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter(c => c.stage === stage);
          return (
            <div key={stage} className="bg-slate-200/60 rounded-2xl p-4 flex flex-col min-h-[500px]">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-700">{stage}</span>
                <span className="bg-white text-slate-700 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                  {stageCandidates.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stageCandidates.map((candidate) => (
                  <div 
                    key={candidate.id || candidate._id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                      {candidate.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{candidate.email}</p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-medium">Move:</span>
                      <select 
                        value={candidate.stage}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStageChange(candidate.id || candidate._id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 focus:outline-none font-medium"
                      >
                        {STAGES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                
                {stageCandidates.length === 0 && (
                  <div className="h-28 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CandidateModel candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Candidate</h3>
            
            <form onSubmit={handleAddCandidateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="e.g. Rahul Sharma" 
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="e.g. rahul@gmail.com" 
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="e.g. +91 9876543210" 
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Title</label>
                <input 
                  type="text" 
                  value={jobId} 
                  onChange={(e) => setJobId(e.target.value)} 
                  placeholder="e.g. React Developer" 
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Upload Resume (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])} 
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow"
                >
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert Component */}
      <Toast message={toastMessage} />
    </div>
  );
}