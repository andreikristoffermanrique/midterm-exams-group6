import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MOCK_DETAILS = {
  1: { id: 1, title: 'Welcome to the News Portal', content: 'This is the initial mock post for testing the list UI. Full details show extended text content and complete information here.', author: 'Admin', created_at: '2026-10-06' },
  2: { id: 2, title: 'Second Sample News Post', content: 'Another post demonstrating grid and listing functionality. Detailed view provides full article body.', author: 'User1', created_at: '2026-10-06' }
};

export default function PostDetailPage({ getPostById }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        if (getPostById) {
          const data = await getPostById(id);
          setPost(data);
        } else {
          setPost(MOCK_DETAILS[id] || { id, title: `Post #${id}`, content: 'Sample detail content for this post.', author: 'System' });
        }
      } catch (err) {
        setError(err.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id, getPostById]);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading post details...</div>;
  if (error || !post) return <div className="text-center py-12 text-red-500">{error || 'Post not found'}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-blue-600 hover:underline font-medium">&larr; Back to Posts</Link>
        <Link to={`/posts/edit/${id}`} className="bg-amber-500 text-white px-4 py-1.5 rounded font-semibold hover:bg-amber-600 transition text-sm">
          Edit Post
        </Link>
      </div>
      <article className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6 border-b pb-4 flex justify-between">
          <span>By <strong className="text-gray-700">{post.author || 'Anonymous'}</strong></span>
          <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recently'}</span>
        </div>
        <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
          {post.content}
        </div>
      </article>
    </div>
  );
}