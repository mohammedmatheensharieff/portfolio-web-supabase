import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Clock,
  Globe,
  Headphones,
  Newspaper,
  NotebookPen,
  Plus,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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

const shimmerBlocks = Array.from({ length: 4 });

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
  },
};

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
        return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(Math.round(duration), division.unit);
      }
      duration /= division.amount;
    }
    return 'Recently';
  };

  const lastUpdatedLabel = useMemo(() => {
    if (!newsMeta?.fetchedAt) return null;
    return formatRelativeTime(newsMeta.fetchedAt);
  }, [newsMeta?.fetchedAt]);

  const featuredPost = !loading && posts.length > 0 ? posts[0] : null;
  const remainingPosts = !loading && posts.length > 1 ? posts.slice(1) : [];
  const curatedArticles = !newsLoading && news.length > 0 ? news.slice(0, 4) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background-dark via-black to-background-dark pb-16 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-40 right-10 h-96 w-96 rounded-full bg-gradient-start/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-end/15 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/20 via-transparent to-transparent" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
                Cloud · DevOps · FinOps · Fullstack
              </span>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Playbooks, retrospectives, and daily radar across cloud architecture, DevOps, FinOps, and fullstack
                product shipping.
              </h1>
              <p className="text-sm text-gray-300 sm:text-base">
                Tap into experiments I run inside production platforms and the macro signals shaping infrastructure,
                automation, economics, and product delivery. Published here first—so you can adapt faster.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-5 text-sm text-gray-300">
              <div className="flex items-center gap-3 text-white">
                <NotebookPen className="h-5 w-5 text-gradient-start" />
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-gray-400">Creator Log</p>
                  <p className="text-sm">Long-form field notes and debriefs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <Newspaper className="h-5 w-5 text-gradient-mid" />
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-gray-400">Daily Radar</p>
                  <p className="text-sm">Global headlines refreshed throughout the day</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <Headphones className="h-5 w-5 text-gradient-end" />
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-gray-400">Ship Room</p>
                  <p className="text-sm">Playback sessions from launches and incidents</p>
                </div>
              </div>
            </div>
          </div>
          {user && (
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/blog/new')}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-5 py-2.5 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition hover:-translate-y-0.5 hover:shadow-gradient-mid/40"
              >
                <Plus size={16} />
                Write a post
              </motion.button>
            </div>
          )}
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr]">
          <motion.section variants={fade} initial="hidden" animate="show" className="space-y-6">
            <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-300">
              <div className="flex items-start gap-3 text-white">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start/70 via-gradient-mid/60 to-gradient-end/70 text-background-dark shadow-lg shadow-gradient-mid/30">
                  <NotebookPen size={22} />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-white">Featured long-form insight</h2>
                  <p className="mt-2 text-xs text-gray-400">
                    Deep dives into the work happening inside our platforms—architecture, automation, FinOps, and product outcomes.
                  </p>
                </div>
              </div>
            </header>

            {loading ? (
              <div className="grid gap-5 md:grid-cols-2">
                {shimmerBlocks.map((_, index) => (
                  <div key={index} className="h-72 animate-pulse rounded-2xl border border-white/5 bg-white/5" />
                ))}
              </div>
            ) : featuredPost ? (
              <motion.article
                variants={itemVariants}
                className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl shadow-black/30"
              >
                {featuredPost.coverImage && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/80" />
                  </div>
                )}
                <div className="flex flex-col gap-4 p-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-gradient-start">
                    <span>Featured</span>
                    <span className="rounded-full border border-gradient-start/30 px-2 py-0.5">
                      {featuredPost.category || 'Platform'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    <Link to={`/blog/${featuredPost.slug}`} className="hover:underline">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-400">
                    {featuredPost.excerpt || `${featuredPost.content.slice(0, 220)}…`}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-2">
                      <User size={14} />
                      {featuredPost.author?.username || featuredPost.author?.email || 'Anonymous'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} />
                      {new Date(featuredPost.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.article>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-gray-400">
                Publish your first long-form piece to anchor the blog.
              </div>
            )}

            {remainingPosts.length > 0 && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-5 md:grid-cols-2">
                {remainingPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/35 transition duration-300 hover:border-gradient-start/60"
                  >
                    {post.coverImage && (
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/80" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5 text-sm text-gray-300">
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-gradient-start">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-xs text-gray-400">
                        {post.excerpt || `${post.content.slice(0, 150)}…`}
                      </p>
                      <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-2">
                          <User size={14} />
                          {post.author?.username || post.author?.email || 'Anonymous'}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </motion.section>

          <motion.section variants={fade} initial="hidden" animate="show" className="space-y-6">
            <header className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-300">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start/70 via-gradient-mid/60 to-gradient-end/70 text-background-dark shadow-lg shadow-gradient-mid/30">
                <Globe size={22} />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-white">Industry radar & inspiration</h2>
                <p className="mt-2 text-xs text-gray-400">
                  Curated external reads across DevOps, Cloud, FinOps, and Fullstack product delivery that complement our perspective.
                </p>
              </div>
            </header>

            {newsLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-28 animate-pulse rounded-2xl border border-white/5 bg-white/5" />
                ))}
              </div>
            ) : newsError ? (
              <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6 text-sm text-yellow-100">
                {newsError}
              </div>
            ) : curatedArticles.length > 0 ? (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {curatedArticles.map((article) => (
                  <motion.a
                    key={article.id}
                    variants={itemVariants}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:border-gradient-start/70 hover:bg-black/60"
                  >
                    <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-gradient-start/0 via-transparent to-gradient-end/0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gradient-start">
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
                        {article.excerpt && <p className="mt-3 line-clamp-3 text-sm text-gray-300">{article.excerpt}</p>}
                      </div>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gradient-start/30 text-gradient-start transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
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
                {lastUpdatedLabel && (
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-gray-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-gradient-start" />
                    Radar refreshed {lastUpdatedLabel}. More additions roll in daily.
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-gray-400">
                When noteworthy reads surface across the community, we’ll log them here alongside our takeaways.
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
