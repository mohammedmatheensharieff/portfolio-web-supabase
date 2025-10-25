import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Mail, MessageSquare, Send, Sparkles, TimerReset } from 'lucide-react';
import api from '../lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error:', error);
      const message = error?.response?.data?.message || 'Something glitched. Email me directly at mohammed@zoeencloud.in.';
      setErrorMessage(message);
      setStatus('error');
    }
  };

  const touchpoints = [
    {
      label: 'Email',
      value: 'mohammed@zoeencloud.in',
      description: 'Best for project briefs & partnership proposals.',
    },
    {
      label: 'Location',
      value: 'Bengaluru • IST (UTC+5:30)',
      description: 'Collaborating with teams across EMEA, APAC, and North America.',
    },
    {
      label: 'Response Pace',
      value: '< 24 hours',
      description: 'Thoughtful replies with next steps and clarity on availability.',
    },
  ];

  const availability = [
    'Fractional cloud architect retainers',
    'DevOps leadership coaching pods',
    'Cloud readiness assessments & roadmaps',
  ];

  return (
    <div className="relative overflow-hidden py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-gradient-start/15 via-gradient-mid/15 to-gradient-end/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-gradient-mid/15 via-gradient-start/15 to-gradient-end/15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[0.9fr,1.1fr]"
      >
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gradient-start/40 bg-background-dark/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-text-muted">
            <Sparkles className="h-4 w-4 text-gradient-start" />
            Connect
          </span>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Let's architect cloud outcomes that <span className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">actually stick</span>
          </h1>
          <p className="text-sm text-text-muted md:text-base">
            Share what you’re building, the obstacles in your way, or the team you want to empower. I’ll respond with clarity on fit, potential roadmaps, and how we can gauge success together.
          </p>

          <div className="space-y-4">
            {touchpoints.map((point) => (
              <div
                key={point.label}
                className="rounded-3xl border border-border-subtle/60 bg-background-dark/70 p-5 shadow-lg shadow-black/20"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-text-muted">{point.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{point.value}</p>
                <p className="mt-1 text-sm text-text-muted">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-gradient-start/40 bg-gradient-to-br from-gradient-start/10 via-gradient-mid/10 to-gradient-end/10 p-6 text-sm text-text-muted shadow-xl shadow-gradient-mid/30">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gradient-start">
              <TimerReset className="h-4 w-4" />
              Availability 2024
            </div>
            <ul className="mt-4 space-y-2">
              {availability.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-gradient-start" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-border-subtle/60 bg-background-dark/80 p-8 shadow-xl shadow-black/25 backdrop-blur-xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-gradient-start" />
            <p className="text-sm font-semibold text-white">Drop the brief</p>
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-text-muted">
            Outline the mission, current friction, and the timeline you are aiming for.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border-subtle/60 bg-background-dark/70 px-4 py-3 text-sm text-white outline-none transition-all focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border-subtle/60 bg-background-dark/70 px-4 py-3 text-sm text-white outline-none transition-all focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="mt-2 w-full resize-none rounded-xl border border-border-subtle/60 bg-background-dark/70 px-4 py-3 text-sm text-white outline-none transition-all focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                placeholder="Share what you’re building and the transformation you’re targeting."
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
            whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
            className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-6 py-3 text-sm font-semibold text-background-dark shadow-xl shadow-gradient-mid/30 transition-all ${
              status === 'loading' ? 'opacity-70' : 'hover:scale-[1.01]'
            }`}
          >
            {status === 'loading' ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-background-dark border-r-transparent" />
                Sending
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </motion.button>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              <CheckCircle className="h-4 w-4" />
              Message received! Expect a response with next steps shortly.
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              <AlertCircle className="h-4 w-4" />
              {errorMessage || 'Something glitched. Email me directly at mohammed@zoeencloud.in.'}
            </motion.div>
          )}

          <div className="rounded-2xl border border-border-subtle/50 bg-background-dark/70 p-4 text-xs uppercase tracking-[0.35em] text-text-muted">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gradient-start" />
              Or send a direct email: <span className="text-white">mohammed@zoeencloud.in</span>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
