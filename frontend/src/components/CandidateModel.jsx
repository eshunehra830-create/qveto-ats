import React from 'react';

export default function CandidateModel({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
            {candidate.name ? candidate.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
            <p className="text-sm text-slate-500">{candidate.email}</p>
          </div>
        </div>

        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Applied Job ID:</span>
            <span className="font-semibold text-slate-800">{candidate.jobId || 'General Application'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Pipeline Stage:</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {candidate.stage || 'Applied'}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Resume Attachment:</span>
            {candidate.resumeUrl ? (
              <a 
                href={candidate.resumeUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors inline-flex items-center space-x-1"
              >
                <span>📄 View PDF</span>
              </a>
            ) : (
              <span className="text-xs text-slate-400 italic">No Resume Uploaded</span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}