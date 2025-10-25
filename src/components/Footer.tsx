import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  CloudCog,
  Coins,
  Workflow,
  Sparkles,
  ArrowUpRight,
  Code2,
} from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/mohammedmatheensharieff', icon: <Github size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammedmatheensharieff/', icon: <Linkedin size={18} /> },
  { label: 'Email', href: 'mailto:mohammed@zoeencloud.in', icon: <Mail size={18} /> },
];

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const capabilities = [
  { label: 'Platform Architecture', icon: <CloudCog size={16} /> },
  { label: 'DevOps Enablement', icon: <Workflow size={16} /> },
  { label: 'Fullstack Engineering', icon: <Code2 size={16} /> },
  { label: 'FinOps Strategy', icon: <Coins size={16} /> },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-gray-950 via-gray-900 to-background-dark">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-48 w-48 rounded-full bg-gradient-to-br from-gradient-start/20 via-gradient-mid/10 to-gradient-end/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-gradient-to-br from-gradient-mid/20 via-gradient-start/10 to-gradient-end/20 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr,1fr,1fr]">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/25 via-gradient-mid/20 to-gradient-end/30 text-white shadow-lg shadow-gradient-mid/20">
                <Sparkles size={22} />
              </span>
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Mohammed</p>
                <p className="text-lg font-semibold text-white">Matheen</p>
              </div>
            </Link>
            <p className="max-w-sm text-sm text-gray-400">
              Cloud architect, DevOps lead, and FinOps strategist partnering with teams to ship reliable platforms that
              protect customer trust and cloud spend.
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

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Explore</h3>
            <nav className="flex flex-col gap-2 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-gray-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Collab</h3>
            <p className="text-sm text-gray-400">
              Open to platform roadmapping sessions, FinOps reviews, and DevOps leadership coaching.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-gray-300 sm:flex sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-400">
            <Sparkles size={14} className="text-gradient-start" />
            Currently onboarding new platform collaborations
          </div>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gradient-start/50 px-4 py-2 text-xs font-semibold text-gradient-start transition hover:border-gradient-start hover:bg-gradient-start/10 sm:mt-0"
          >
            <ArrowUpRight size={14} />
            Start the conversation
          </Link>
        </motion.div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Mohammed Matheen. Built with DevOps calm and FinOps clarity.
        </div>
      </div>
    </footer>
  );
}
