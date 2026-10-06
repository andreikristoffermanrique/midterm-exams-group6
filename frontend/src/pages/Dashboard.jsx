import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    let parsedUser = null;
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        parsedUser = JSON.parse(userStr);
      } catch {
        parsedUser = null;
      }
    }

    // Fallback: parse JWT payload if needed
    if (!parsedUser || !parsedUser.username) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        parsedUser = {
          id: payload.id || payload.user_id,
          username: payload.username,
          role: payload.role || 'user'
        };
      } catch {
        parsedUser = { username: 'User', role: 'user' };
      }
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header Banner */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 mr-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Logged In
            </span>
            <span className="text-xs text-gray-500 font-medium capitalize">
              Role: {user.role || 'user'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome, <span className="text-blue-600">{user.username}</span>!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account and explore the platform.
          </p>
        </div>
        <button
          onClick={handleLogout}
          id="dashboard-logout-btn"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow transition duration-150 ease-in-out"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Account Info Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Account Details</span>
            <span className="text-xs text-gray-400 font-normal">Stored User Profile</span>
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <dt className="text-gray-500 font-medium">Username</dt>
              <dd className="text-gray-900 font-semibold" id="dashboard-username">{user.username}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <dt className="text-gray-500 font-medium">Role</dt>
              <dd className="text-gray-900 font-medium capitalize" id="dashboard-role">{user.role || 'user'}</dd>
            </div>
            {user.id && (
              <div className="flex justify-between py-1 border-b border-gray-50">
                <dt className="text-gray-500 font-medium">User ID</dt>
                <dd className="text-gray-900 font-mono" id="dashboard-user-id">{user.id}</dd>
              </div>
            )}
            <div className="flex justify-between py-1">
              <dt className="text-gray-500 font-medium">Session Status</dt>
              <dd className="text-green-600 font-medium">Active (Token stored)</dd>
            </div>
          </dl>
        </div>

        {/* User Functionality / Navigation Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              Platform Navigation
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Browse news posts and interact with the platform community.
            </p>
            <div className="space-y-3">
              <Link
                to="/"
                className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition duration-150"
              >
                <div className="font-medium text-blue-600">Browse News Feed &rarr;</div>
                <div className="text-xs text-gray-500 mt-0.5">Read latest posts published on the portal</div>
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
            Session authenticated with JWT token
          </div>
        </div>
      </div>
    </div>
  );
}
