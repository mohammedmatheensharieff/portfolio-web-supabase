import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto py-12 px-4"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">Create Account</h1>
      
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

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-gradient-start to-gradient-end text-black font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow-lg"
        >
          Register
        </motion.button>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gradient-start hover:text-white transition-colors"
          >
            Login
          </button>
        </p>
      </form>
    </motion.div>
  );
}