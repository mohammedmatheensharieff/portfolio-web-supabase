import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../lib/api';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function ResetPassword() {
  useDocumentTitle('Reset Password — Mohammed Matheen');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const token = searchParams.get('token');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    if (!token) {
      setError('Reset token missing or invalid. Please request a new email.');
      setStatus('error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setStatus('error');
      return;
    }

    try {
      await api.post('/auth/reset-password', {
        token,
        password: formData.password,
      });
      setStatus('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unable to reset password');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-gray-900 to-background-dark py-16 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          Set New Password
        </h1>
        <p className="text-gray-400 mb-8">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
                required
                minLength={6}
              />
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
                required
                minLength={6}
              />
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {status === 'success' ? (
            <div className="p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-400">
              Password updated successfully! Redirecting to login...
            </div>
          ) : (
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
              className={`w-full bg-gradient-to-r from-gradient-start to-gradient-end text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 ${
                status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                  <span>Updating...</span>
                </>
              ) : (
                'Update Password'
              )}
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
}
