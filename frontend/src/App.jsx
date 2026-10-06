import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import CreatePostPage from './pages/CreatePostPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <nav className="bg-blue-600 text-white shadow-md p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">NewsPortal</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/posts/create" className="bg-white text-blue-600 px-3 py-1 rounded font-semibold hover:bg-gray-100 transition">
                + Create Post
              </Link>
            </div>
          </div>
        </nav>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PostListPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/posts/create" element={<CreatePostPage />} />
          </Routes>
        </main>
      </div>
          </Routes>
        </main>
      </div>
    </Router>
  );
}