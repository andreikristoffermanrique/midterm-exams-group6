import React, { useState } from 'react';
import PostList from '../components/PostList';

const INITIAL_POSTS = [
  { id: 1, title: 'Welcome to the News Portal', content: 'This is the initial mock post for testing the list UI.', author: 'Admin' },
  { id: 2, title: 'Second Sample News Post', content: 'Another post demonstrating grid and listing functionality.', author: 'User1' }
];

export default function PostListPage({ posts = INITIAL_POSTS, loading = false, error = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts dynamically based on search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Latest Posts</h1>
        
        {/* Search Input Bar */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      <PostList posts={filteredPosts} loading={loading} error={error} />
    </div>
  );
}