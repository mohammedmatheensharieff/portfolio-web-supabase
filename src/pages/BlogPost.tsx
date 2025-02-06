import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Edit2, Trash2, Clock, User } from 'lucide-react';
import type { BlogPost } from '../types/database';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id (
            username,
            avatar_url
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-start"></div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-gray-900 to-background-dark py-16 px-4">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {post.cover_image && (
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
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
              <span>{post.profiles?.username || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {user && user.id === post.author_id && (
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
              >
                <Trash2 size={20} />
                Delete
              </motion.button>
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.article>
    </div>
  );
}