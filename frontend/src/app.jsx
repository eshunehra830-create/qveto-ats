import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// यहाँ सारे पेजेस को उनके सही और असली नाम से इम्पोर्ट किया गया है
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CandidatesPage from "./pages/candidatespage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}