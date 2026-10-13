import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchJobs, createJob, fetchCandidates } from '../services/api';

export default function PlaceholderPage() {
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State for New Job Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', department: '', location: '', status: 'Active' });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      if (path === 'jobs') {
        const result = await fetchJobs();
        setData(result);
      } else if (path === 'candidates') {
        const result = await fetchCandidates();
        setData(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (path === 'jobs' || path === 'candidates') {
      loadData();
    } else {
      setLoading(false);
    }
  }, [path]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await createJob(formData);
      setFormData({ title: '', department: '', location: '', status: 'Active' });
      setIsModalOpen(false);
      loadData(); // Refresh list after adding
    } catch (err) {
      alert('Error creating job: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold capitalize">{path} Management</h1>
        {path === 'jobs' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold"
          >
            + Create New Job
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading live data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (path === 'jobs' || path === 'candidates') && data.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department / Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title || item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.department || item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-gray-600">No data found in database yet.</p>
        </div>
      )}

      {/* Modal for Creating Job */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Job Posting</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border p-2 rounded mt-1"
                  placeholder="e.g. Node.js Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full border p-2 rounded mt-1"
                  placeholder="e.g. Engineering"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}