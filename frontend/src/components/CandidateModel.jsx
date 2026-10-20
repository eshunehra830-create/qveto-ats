import React from 'react';

export default function CandidateModel({ candidate, onStageChange }) {
  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="font-bold text-lg">{candidate.name || 'Candidate Name'}</h3>
      <p className="text-gray-600 text-sm mb-2">{candidate.email || 'No Email'}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {candidate.stage || 'Applied'}
        </span>
        <button 
          onClick={() => onStageChange(candidate._id || candidate.id, 'Interview')}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Next Stage
        </button>
      </div>
    </div>
  );
}