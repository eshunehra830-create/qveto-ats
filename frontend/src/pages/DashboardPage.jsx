import React, { useEffect, useState } from 'react';
import { fetchJobs, fetchCandidates } from '../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCandidates: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [jobs, candidates] = await Promise.all([
          fetchJobs(),
          fetchCandidates()
        ]);
        setStats({
          totalJobs: jobs.length,
          totalCandidates: candidates.length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading Dashboard...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading dashboard: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Active Jobs</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Total Candidates</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalCandidates}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Welcome to Qveto ATS</h2>
        <p className="text-gray-600">
          Your recruitment pipeline is connected and running live with the backend database. Use the sidebar to manage jobs and view applicants.
        </p>
      </div>
    </div>
  );
}