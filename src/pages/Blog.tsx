import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, User, Globe, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import type { BlogPost } from '../types/database';
import useDocumentTitle from '../hooks/useDocumentTitle';

interface ExternalArticle {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  excerpt?: string;
  author?: string | null;
  source?: {
    name: string;
    url?: string;
  };
  tags?: string[];
}

export default function Blog() {
  useDocumentTitle('DevOps · Cloud · FinOps — Mohammed Matheen');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<ExternalArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [newsMeta, setNewsMeta] = useState<{ fetchedAt?: string; expiresAt?: string } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const [postsResult, newsResult] = await Promise.allSettled([
        api.get<{ posts: BlogPost[] }>('/blog'),
        api.get<{ articles: ExternalArticle[]; fetchedAt?: string; expiresAt?: string }>('/news/daily'),
      ]);

      if (postsResult.status === 'fulfilled') {
        setPosts(postsResult.value.data.posts || []);
      } else {
        console.error('Error fetching posts:', postsResult.reason);
      }

      if (newsResult.status === 'fulfilled') {
        setNews(newsResult.value.data.articles || []);
        setNewsMeta({ fetchedAt: newsResult.value.data.fetchedAt, expiresAt: newsResult.value.data.expiresAt });
      } else {
        console.error('Error fetching news:', newsResult.reason);
        setNewsError('Unable to reach the global DevOps, cloud, and FinOps feed right now.');
      }

      setLoading(false);
      setNewsLoading(false);
    };

    fetchContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const formatRelativeTime = (input?: string) => {
    if (!input) return 'Recently';
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) return 'Recently';

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();

    const divisions = [
      { amount: 60, unit: 'second' as const },
      { amount: 60, unit: 'minute' as const },
      { amount: 24, unit: 'hour' as const },
      { amount: 7, unit: 'day' as const },
      { amount: 4.34524, unit: 'week' as const },
      { amount: 12, unit: 'month' as const },
      { amount: Number.POSITIVE_INFINITY, unit: 'year' as const },
    ];

    let duration = diffMs / 1000;
    for (const division of divisions) {
      if (Math.abs(duration) < division.amount) {
        return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(
          Math.round(duration),
          division.unit
        );
      }
      duration /= division.amount;
    }
    return 'Recently';
  };

  const lastUpdatedLabel = useMemo(() => {
    if (!newsMeta?.fetchedAt) return null;
    return formatRelativeTime(newsMeta.fetchedAt);
  }, [newsMeta?.fetchedAt]);

  const newsPlaceholder = useMemo(() => Array.from({ length: 5 }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-gray-900 to-background-dark py-16 px-4">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-center md:justify-between">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent"
          >
            DevOps · Cloud · FinOps Intelligence Hub
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl text-gray-400">
            Curated daily updates across automation, cloud platforms, and FinOps economics—layered with original
            insights from your own blog. Stay sharp, ship faster, spend smarter.
          </motion.p>
          {user && (
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/blog/new')}
              className="flex items-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-end text-black px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <Plus size={20} />
              Write Post
            </motion.button>
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start/70 via-gradient-mid/60 to-gradient-end/70 text-background-dark shadow-lg shadow-gradient-mid/30">
                  <Globe size={20} />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Daily DevOps · Cloud · FinOps Radar</h2>
                  <p className="text-sm text-gray-400">
                    Aggregated headlines across SRE, infrastructure, automation, and FinOps cost strategy—refreshed
                    throughout the day.
                  </p>
                </div>
              </div>
              {lastUpdatedLabel && (
                <span className="rounded-full border border-border-subtle/40 px-3 py-1 text-xs font-medium text-gray-400">
                  Updated {lastUpdatedLabel}
                </span>
              )}
            </div>

            {newsLoading ? (
              <div className="space-y-4">
                {newsPlaceholder.map((_, index) => (
                  <div
                    key={index}
                    className="h-28 rounded-2xl border border-gray-800 bg-gray-900/40 animate-pulse"
                  />
                ))}
              </div>
            ) : newsError ? (
              <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6 text-sm text-yellow-200">
                {newsError}
              </div>
            ) : news.length > 0 ? (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {news.map((article) => (
                  <motion.a
                    key={article.id}
                    variants={itemVariants}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    className="group relative block overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 p-6 transition-all duration-300 hover:border-gradient-start/80 hover:bg-gray-900/70"
                  >
                    <span className="absolute inset-0 -z-10 bg-gradient-to-br from-gradient-start/0 via-transparent to-gradient-end/0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-gradient-start">
                          <span>{article.source?.name || 'Global Feed'}</span>
                          {article.tags && article.tags.length > 0 && (
                            <span className="rounded-full border border-gradient-start/40 px-2 py-0.5 text-[10px] uppercase">
                              #{article.tags[0]}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-gradient-start">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="mt-3 text-sm text-gray-400 line-clamp-3">{article.excerpt}</p>
                        )}
                      </div>
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gradient-start/30 text-gradient-start transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {formatRelativeTime(article.publishedAt)}
                      </span>
                      {article.author && (
                        <span className="flex items-center gap-1.5">
                          <User size={14} />
                          {article.author}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-border-subtle/40 bg-gray-900/40 p-6 text-sm text-gray-400">
                Nothing surfaced yet today. Check back soon for fresh DevOps, cloud, and FinOps updates.
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Community Posts</h2>
              <p className="text-sm text-gray-400">
                Long-form breakdowns, experiments, and retrospectives captured in your own words.
              </p>
            </div>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-72 rounded-2xl border border-gray-800 bg-gray-900/40 animate-pulse" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -10 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-gradient-start transition-all duration-300"
                  >
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/90" />
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-white hover:text-gradient-start transition-colors">
                        <a href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </a>
                      </h3>

                      <p className="text-gray-400 mb-5 line-clamp-3">
                        {post.excerpt || `${post.content.substring(0, 150)}...`}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{post.author?.username || post.author?.email || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border-subtle/40 bg-gray-900/50 p-8 text-center text-gray-400">
                <p className="mb-4 text-lg font-medium text-white">No posts yet.</p>
                {user ? (
                  <button
                    onClick={() => navigate('/blog/new')}
                    className="inline-flex items-center gap-2 rounded-full border border-gradient-start/60 px-6 py-2 text-sm font-semibold text-gradient-start transition-all hover:bg-gradient-start/10"
                  >
                    <Plus size={16} />
                    Share your first insight
                  </button>
                ) : (
                  <p>Sign in to publish your latest thoughts on DevOps, cloud, and FinOps.</p>
                )}
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  );
}
