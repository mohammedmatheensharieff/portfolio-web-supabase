import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Register() {
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

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        username: formData.username || undefined,
      });
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2 text-gray-300">
            Username (optional)
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-gradient-start focus:ring-1 focus:ring-gradient-start outline-none transition-all duration-200"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`w-full bg-gradient-to-r from-gradient-start to-gradient-end text-black font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow-lg ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating account...' : 'Register'}
        </motion.button>
      </form>
    </motion.div>
  );
}
