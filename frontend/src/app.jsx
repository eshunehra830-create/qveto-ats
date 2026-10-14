import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import JobsPage from './pages/JobsPage';
import CandidatesPage from './pages/candidatespage';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // 1. Agar User Logged in nahi hai, toh Login Page dikhao
  if (!user) {
    return <LoginPage onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // 2. Logged in hone par ATS Portal Header + Pages dikhao
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Header & Navigation */}
      <nav className="bg-slate-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-wide text-blue-400">Qveto ATS</span>
            <span className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white font-medium">Pro</span>
          </div>
          
          <div className="flex space-x-4 items-center">
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

            <div className="h-4 w-px bg-slate-700 mx-2"></div>

            <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300 uppercase">
              {user.role || 'Recruiter'}
            </span>

            <button 
              onClick={handleLogout}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Areas */}
      <main className="py-6">
        {activeTab === 'jobs' && <JobsPage />}
        {activeTab === 'candidates' && <CandidatesPage />}
      </main>
    </div>
  );
}