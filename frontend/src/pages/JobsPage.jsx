import React, { useState, useEffect } from 'react';
import { fetchJobs, createJob } from '../services/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert('Only Admins can create jobs!');
    try {
      await createJob({ title, department });
      setTitle('');
      setDepartment('');
      loadJobs();
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtered jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6">
      
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Job Openings</h2>
          <p className="text-sm text-slate-500">Manage active job listings and requirements</p>
        </div>
        
        {/* Instant Search Bar */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or department..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

      {/* ADMIN ONLY: Create Job Form */}
      {isAdmin ? (
        <form onSubmit={handleCreateJob} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
              placeholder="e.g. Senior React Developer" 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
            <input 
              type="text" 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)} 
              required
              placeholder="e.g. Engineering" 
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow"
          >
            + Create New Job
          </button>
        </form>
      ) : (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-blue-700 text-sm rounded">
          ℹ️ You are logged in as a <strong>Recruiter</strong>. Job creation is restricted to Admins.
        </div>
      )}

      {/* Jobs Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id || job._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-md uppercase">
              {job.department}
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-3">{job.title}</h3>
            <p className="text-xs text-slate-400 mt-1">Posted recently</p>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 font-medium">
            No matching jobs found.
          </div>
        )}
      </div>
    </div>
  );
}