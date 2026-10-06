import React, { useState } from 'react';
import PostList from '../components/PostList';

const MOCK_POSTS = [
  { id: 1, title: 'Welcome to the News Portal', content: 'This is the initial mock post for testing the list UI.', author: 'Admin' },
  { id: 2, title: 'Second Sample News Post', content: 'Another post demonstrating grid and listing functionality.', author: 'User1' }
];

export default function PostListPage({ initialPosts }) {
  const [posts] = useState(initialPosts || MOCK_POSTS);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Latest Posts</h1>
      </div>
      <PostList posts={posts} />
    </div>
  );
}