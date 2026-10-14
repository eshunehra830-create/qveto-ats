import React from 'react';

export default function Toast({ message, type = 'success' }) {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-600' : 'bg-slate-900';

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold z-50 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-5 duration-300`}>
      <span>{type === 'error' ? '⚠️' : '✅'}</span>
      <span>{message}</span>
    </div>
  );
}