import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function AdminLogin() {
  useDocumentTitle('Admin Login — Mohammed Matheen');
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(formData);
      navigate('/admin/users');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Invalid admin credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8 space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end text-background-dark shadow-lg shadow-gradient-mid/20">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-3xl font-semibold text-white">Admin access</h1>
          <p className="text-text-muted text-sm">
            Use your admin credentials to manage user accounts and roles.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-border-subtle/60 bg-background-dark/75 p-8 shadow-xl shadow-black/25">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-xl border border-border-subtle/60 bg-background-dark/70 py-2 pl-10 pr-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                autoComplete="username"
                required
              />
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                className="w-full rounded-xl border border-border-subtle/60 bg-background-dark/70 py-2 pl-10 pr-3 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                autoComplete="current-password"
                required
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            className={`w-full rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-5 py-2 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            {loading ? 'Signing in…' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
