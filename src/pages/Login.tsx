import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Login() {
  useDocumentTitle('Login — Mohammed Matheen');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
              required
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
              required
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-gradient-start hover:text-white transition-colors">
            Forgot Password?
          </Link>
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
              <span>Logging in...</span>
            </>
          ) : (
            'Login'
          )}
        </motion.button>

        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-gradient-start hover:text-white transition-colors">
            Sign Up
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
