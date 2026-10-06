import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

export default function CreatePostPage({ onAddPost }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (formData) => {
    setIsSubmitting(true);
    setError('');

    try {
      if (onAddPost) {
        await onAddPost(formData);
      } else {
        // Fallback demo action when backend is not connected
        console.log('Post created (mock):', formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Post</h1>
      <PostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} error={error} />
    </div>
  );
}