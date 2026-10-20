import React, { useState, useEffect } from 'react';
import { fetchCandidates, updateCandidateStage, addCandidateWithResume } from '../services/api';
import CandidateModel from '../components/CandidateModel';
import Toast from '../components/Toast';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data || []);
    } catch (err) {
      setError('Failed to fetch candidates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStageChange = async (id, newStage) => {
    try {
      await updateCandidateStage(id, { stage: newStage });
      loadCandidates();
    } catch (err) {
      console.error('Failed to update stage', err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading candidates...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Candidates Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <CandidateModel 
            key={candidate._id || candidate.id} 
            candidate={candidate} 
            onStageChange={handleStageChange} 
          />
        ))}
      </div>
    </div>
  );
}