import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Clock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import type { BlogPost } from '../types/database';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get<{ post: BlogPost }>(`/blog/${slug}`);
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug, navigate]);

  const handleDelete = async () => {
    if (!post) return;
    const confirm = window.confirm('Delete this post?');
    if (!confirm) return;
    try {
      await api.delete(`/blog/${post.slug}`);
      navigate('/blog');
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-start" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-400">Post not found</p>
      </div>
    );
  }

  const canEdit = user && user.id === post.authorId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-gray-900 to-background-dark py-16 px-4">
      <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        {post.coverImage && (
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-8 text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{post.author?.username || post.author?.email || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {canEdit && (
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/blog/edit/${post.slug}`)}
                className="flex items-center gap-2 text-gradient-start hover:text-white transition-colors"
              >
                <Edit2 size={20} />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                onClick={handleDelete}
              >
                <Trash2 size={20} />
                Delete
              </motion.button>
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none whitespace-pre-line text-gray-300">
          {post.content}
        </div>
      </motion.article>
    </div>
  );
}
