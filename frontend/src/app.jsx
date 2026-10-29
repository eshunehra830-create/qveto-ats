import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import JobsPage from './pages/JobsPage.jsx';
import CandidatesPage from './pages/candidatespage.jsx';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '220px', background: '#001529', color: 'white', padding: '20px' }}>
        <h2 style={{ color: '#1890ff', fontSize: '20px', marginBottom: '30px' }}>Qveto ATS</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link to="/" style={{ color: '#a6adb4', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>📊 Dashboard</Link>
          <Link to="/jobs" style={{ color: '#a6adb4', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>💼 Jobs</Link>
          <Link to="/candidates" style={{ color: '#a6adb4', textDecoration: 'none', fontSize: '16px', fontWeight: '500' }}>👥 Candidates</Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '30px', boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}