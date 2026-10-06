import React from 'react';
import PostCard from './PostCard';

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500 text-center py-8">No posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}