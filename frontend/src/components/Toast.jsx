import React from 'react';

export default function Toast({ message, type = 'success' }) {
  if (!message) return null;
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-550 bg-green-600';
  return (
    <div className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow-lg ${bgColor}`}>
      {message}
    </div>
  );
}