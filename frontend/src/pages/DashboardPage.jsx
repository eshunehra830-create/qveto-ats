import React, { useEffect, useState } from 'react';
import { fetchJobs, fetchCandidates } from '../services/api';

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jobsData = await fetchJobs();
        const candidatesData = await fetchCandidates();
        setJobs(jobsData || []);
        setCandidates(candidatesData || []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Jobs ({jobs.length})</h2>
          {/* यहाँ अपनी Job List रेंडर करें */}
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Candidates ({candidates.length})</h2>
          {/* यहाँ अपनी Candidate List रेंडर करें */}
        </div>
      </div>
    </div>
  );
}