import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// अपने असली Pages और Components यहाँ Import करें
import Login from './pages/Login'; // या जहाँ आपकी Login फ़ाइल है
import DashboardPage from './pages/DashboardPage'; // या आपका मुख्य Dashboard component
import CandidatesPage from './pages/candidatespage'; 
import JobsPage from './pages/JobsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}