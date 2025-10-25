import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Lock, Mail, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Register() {
  useDocumentTitle('Join The Hub — Mohammed Matheen');
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        username: formData.username.trim(),
      });
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-background-dark via-background-dark/85 to-black" />
      <div className="pointer-events-none absolute left-10 top-0 -z-10 h-72 w-72 rounded-full bg-gradient-start/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 -z-10 h-80 w-80 rounded-full bg-gradient-end/25 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto grid min-h-[70vh] max-w-6xl gap-12 rounded-3xl border border-white/5 bg-black/40 p-8 shadow-2xl shadow-black/40 backdrop-blur-lg lg:grid-cols-[1fr,1.1fr]"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col justify-center gap-8"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
              Join the Hub
            </span>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Build, launch, and collaborate with fellow creators.
            </h1>
            <p className="max-w-lg text-sm text-gray-300">
              The Hub unlocks early features, admin access requests, and a connected creator community. Set up your
              account to sync your profile, manage projects, and ship work faster.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-white/80">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="font-medium text-white">Creator-first workflows</p>
              <p className="mt-1 text-xs text-gray-300">
                Access dashboards, analytics, and collaboration tools built around shipping ideas quickly.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="font-medium text-white">Community & support</p>
              <p className="mt-1 text-xs text-gray-300">
                Stay in the loop on product drops and get help directly from the admin panel when needed.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Already part of the Hub?{' '}
            <Link to="/login" className="text-gradient-start transition hover:text-white">
              Sign in here
            </Link>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col justify-center rounded-2xl border border-white/10 bg-background-dark/80 p-8 shadow-xl shadow-black/30"
        >
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl font-semibold text-white">Create your account</h2>
            <p className="text-sm text-gray-400">
              We’ll set up your profile and connect it to the Creator Hub instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="flex flex-col gap-2 text-sm text-white/80">
              Email
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  required
                />
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </label>

            <label className="flex flex-col gap-2 text-sm text-white/80">
              Username
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  required
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </label>

            <label className="flex flex-col gap-2 text-sm text-white/80">
              Password
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </label>

            <label className="flex flex-col gap-2 text-sm text-white/80">
              Confirm password
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/60 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </label>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-4 py-3 text-sm font-semibold text-background-dark transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating your account…
                </>
              ) : (
                <>
                  Join the Creator Hub
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
}
