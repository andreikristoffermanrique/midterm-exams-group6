import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostListPage from './pages/PostListPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-blue-600 text-white shadow-md p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">NewsPortal</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
            </div>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<PostListPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}