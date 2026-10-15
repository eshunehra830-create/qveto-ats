import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CandidatesPage from './pages/candidatespage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}