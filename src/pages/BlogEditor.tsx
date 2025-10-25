import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import type { BlogPost } from '../types/database';

export default function BlogEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get<{ post: BlogPost }>(`/blog/${slug}`);
      const post = data.post;
      if (post.authorId !== user?.id) {
        navigate('/blog');
        return;
      }
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        coverImage: post.coverImage || '',
        published: post.published,
      });
    } catch (err) {
      console.error('Error fetching post:', err);
      navigate('/blog');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      if (slug) {
        await api.put(`/blog/${slug}`, {
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || null,
          coverImage: formData.coverImage || null,
          published: formData.published,
        });
        navigate(`/blog/${slug}`);
      } else {
        const { data } = await api.post<{ post: BlogPost }>('/blog', {
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || null,
          coverImage: formData.coverImage || null,
          published: formData.published,
        });
        navigate(`/blog/${data.post.slug}`);
      }
    } catch (err: any) {
      console.error('Error saving post:', err);
      const message = err?.response?.data?.message || 'Unable to save post. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-gray-900 to-background-dark py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {slug ? 'Edit Post' : 'Create New Post'}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
            Cancel
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-2 text-gray-300">
              Excerpt
            </label>
            <input
              type="text"
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium mb-2 text-gray-300">
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200 resize-none"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="rounded border-gray-700 bg-gray-900/50 text-gradient-start focus:ring-gradient-start"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-300">
              Publish post
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`w-full bg-gradient-to-r from-gradient-start to-gradient-end text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save Post</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
