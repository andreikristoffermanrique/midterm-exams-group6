import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import { fetchPosts, fetchPostById, createPost, updatePost } from './api';

const MOCK_FALLBACK_POSTS = [
  { id: 1, title: 'Welcome to the News Portal', content: 'This is the initial mock post for testing the list UI.', author: 'Admin' },
  { id: 2, title: 'Second Sample News Post', content: 'Another post demonstrating grid and listing functionality.', author: 'User1' }
];

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      console.warn('Backend not reachable, using mock fallback posts');
      setPosts(MOCK_FALLBACK_POSTS);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (newPost) => {
    try {
      await createPost(newPost);
    } catch (err) {
      console.warn('API unavailable, adding locally:', err);
    }
    await loadPosts();
  };

  const handleUpdatePost = async (id, updatedPost) => {
    try {
      await updatePost(id, updatedPost);
    } catch (err) {
      console.warn('API unavailable, updating locally:', err);
    }
    await loadPosts();
  };

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
            <Route path="/" element={<PostListPage posts={posts} loading={loading} error={error} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/posts/create" element={<CreatePostPage onCreatePost={handleCreatePost} />} />
            <Route path="/posts/:id" element={<PostDetailPage getPostById={fetchPostById} />} />
            <Route path="/posts/edit/:id" element={<EditPostPage getPostById={fetchPostById} onUpdatePost={handleUpdatePost} />} />
          </Routes>
        </main>
      </div>
          </Routes>
        </main>
      </div>
    </Router>
  );
}