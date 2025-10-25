import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Code2,
  CloudCog,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/mohammedmatheensharieff', icon: <Github size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammedmatheensharieff/', icon: <Linkedin size={18} /> },
  { label: 'Email', href: 'mailto:mohammed@zoeencloud.in', icon: <Mail size={18} /> },
];

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const capabilities = [
  { label: 'Platform Architecture', icon: <CloudCog size={18} /> },
  { label: 'DevOps Enablement', icon: <Workflow size={18} /> },
  { label: 'Secure Delivery', icon: <ShieldCheck size={18} /> },
  { label: 'Fullstack Engineering', icon: <Code2 size={18} /> },
];

const footnotes = [
  'Trusted auth and content pipeline',
  'Observability-first DevOps mindset',
  'FinOps guardrails baked into every launch',
];

export default function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background-dark/80 via-black to-background-dark" />
      <div className="pointer-events-none absolute -top-32 right-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-start/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-gradient-end/20 blur-[120px]" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 rounded-3xl bg-gradient-to-l from-gradient-end/15 via-transparent to-transparent" />
          <div className="space-y-6 md:flex md:items-center md:justify-between md:space-y-0">
            <div className="max-w-xl space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.38em] text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-gradient-start" />
                Let's Ship
              </span>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Build a resilient platform without burning through your cloud budget.
              </h2>
              <p className="text-sm text-gray-300">
                Tap into cloud architecture, DevOps leadership, and FinOps coaching to launch fast while staying in
                control of spend and reliability.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gradient-start/50 bg-black/60 px-5 py-2.5 text-sm font-semibold text-gradient-start transition hover:border-gradient-start hover:bg-gradient-start/10"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[1.4fr,1fr] lg:grid-cols-[1.5fr,1fr,1fr]">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/30 via-gradient-mid/25 to-gradient-end/30 text-background-dark shadow-lg shadow-gradient-mid/30">
                <CloudCog size={22} />
                <span className="absolute -bottom-2 right-2 text-[11px] uppercase tracking-[0.32em] text-gradient-start">
                  Lead
                </span>
              </span>
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.38em] text-gray-400">Mohammed</p>
                <p className="text-lg font-semibold text-white">Matheen</p>
              </div>
            </Link>
            <p className="max-w-sm text-sm text-gray-400">
              Platform architect and DevOps lead building calm, scalable systems with tight FinOps guardrails. From
              cloud blueprints to shipping production features, the hub keeps collaboration focused.
            </p>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >
                  {capability.icon}
                  {capability.label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Navigate</h3>
            <nav className="grid gap-2 text-sm text-gray-400">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-gradient-start/80" />
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-2 text-xs text-gray-500">
              {footnotes.map((note) => (
                <p key={note} className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-start" />
                  {note}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Connect</h3>
            <p className="text-sm text-gray-400">
              Open to roadmapping sessions, engineering leadership support, and hands-on platform ship work.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-white/30 hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Mohammed Matheen. Built with DevOps calm and FinOps clarity.
        </div>
      </div>
    </footer>
  );
}
