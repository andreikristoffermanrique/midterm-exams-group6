import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {post.author || 'Anonymous'}</span>
        <Link to={`/posts/${post.id}`} className="text-blue-600 font-semibold hover:underline">
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
}