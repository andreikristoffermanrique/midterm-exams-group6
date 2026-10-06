import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

const MOCK_DETAILS = {
  1: { id: 1, title: 'Welcome to the News Portal', content: 'This is the initial mock post for testing the list UI. Full details show extended text content and complete information here.', author: 'Admin' },
  2: { id: 2, title: 'Second Sample News Post', content: 'Another post demonstrating grid and listing functionality. Detailed view provides full article body.', author: 'User1' }
};

export default function EditPostPage({ getPostById, onUpdatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        if (getPostById) {
          const data = await getPostById(id);
          setPostData(data);
        } else {
          setPostData(MOCK_DETAILS[id] || { id, title: `Post #${id}`, content: 'Sample content for editing.' });
        }
      } catch (err) {
        setError(err.message || 'Failed to load post for editing');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id, getPostById]);

  const handleUpdatePost = async (formData) => {
    setIsSubmitting(true);
    setError('');

    try {
      if (onUpdatePost) {
        await onUpdatePost(id, formData);
      } else {
        console.log(`Post #${id} updated (mock):`, formData);
      }
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading post data...</div>;
  if (error && !postData) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Post #{id}</h1>
      <PostForm
        initialValues={{ title: postData?.title || '', content: postData?.content || '' }}
        onSubmit={handleUpdatePost}
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
}