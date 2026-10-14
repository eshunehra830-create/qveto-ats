import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-wide text-blue-400">Qveto ATS</span>
          <span className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white font-medium">Pro</span>
        </div>
        
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            Jobs Management
          </button>
          
          <button 
            onClick={() => setActiveTab('candidates')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'candidates' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
          >
            Candidates Pipeline
          </button>
        </div>
      </div>
    </nav>
  );
}