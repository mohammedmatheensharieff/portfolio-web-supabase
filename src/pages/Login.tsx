import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Lock, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Login() {
  useDocumentTitle('Login — Mohammed Matheen');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ identity: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-background-dark via-background-dark/85 to-black" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-gradient-start/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-end/20 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto grid min-h-[70vh] max-w-6xl gap-12 rounded-3xl border border-white/5 bg-black/40 p-8 shadow-2xl shadow-black/40 backdrop-blur-lg lg:grid-cols-[1.1fr,1fr]"
      >
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
              Creator Hub
            </span>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Welcome back, creator.
            </h1>
            <p className="max-w-lg text-sm text-gray-300">
              Your projects, collaborators, and community tools live here. Sign in to pick up where you left
              off, publish new work, or fine-tune your profile. Everything stays synced across your workspace.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-white/80">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="font-medium text-white">One account, full access</p>
              <p className="mt-1 text-xs text-gray-300">
                Manage your portfolio, track admin updates, and join creator experiments from a single login.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="font-medium text-white">Secure sessions</p>
              <p className="mt-1 text-xs text-gray-300">
                Sessions are protected end-to-end. We never store plain-text passwords.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col justify-center rounded-2xl border border-white/10 bg-background-dark/80 p-8 shadow-xl shadow-black/30"
        >
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl font-semibold text-white">Sign in</h2>
            <p className="text-sm text-gray-400">
              Enter your credentials to access the Creator Hub dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="flex flex-col gap-2 text-sm text-white/80">
              Email or username
              <div className="relative">
                <input
                  id="identity"
                  value={formData.identity}
                  onChange={(event) => setFormData({ ...formData, identity: event.target.value })}
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
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </label>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <Link to="/forgot-password" className="underline-offset-4 transition hover:text-gradient-start">
                Forgot password?
              </Link>
              <span>
                Need an account?{' '}
                <Link to="/register" className="text-gradient-start transition hover:text-white">
                  Join the hub
                </Link>
              </span>
            </div>

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
                  Logging in…
                </>
              ) : (
                <>
                  Access your hub
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
