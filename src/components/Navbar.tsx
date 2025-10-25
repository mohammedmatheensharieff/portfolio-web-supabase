import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Cloud, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { admin, logout: adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      // ignore admin logout errors
    }
    logout();
    navigate('/');
  };

  const hasAdminAccess = Boolean(admin) || user?.role === 'admin';

  const baseNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const navItems = hasAdminAccess ? [...baseNavItems, { name: 'Admin', path: '/admin/users' }] : baseNavItems;

  const isActive = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) =>
    `group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? 'text-white'
        : 'text-text-muted hover:-translate-y-0.5 hover:text-white hover:tracking-[0.08em] hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)]'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle/60 bg-background-dark/70 backdrop-blur-3xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/70 via-gradient-mid/70 to-gradient-end/70 text-background-dark shadow-lg shadow-gradient-mid/20">
            <Cloud className="h-6 w-6" />
            <motion.span
              className="absolute -bottom-2 right-2 text-xs uppercase tracking-wide text-gradient-start"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Lead
            </motion.span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-[0.4em] text-text-muted">Mohammed</span>
            <span className="text-xl font-semibold text-white">
              <span className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">
                Matheen
              </span>
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-border-subtle/50 bg-background-dark/60 px-2 py-1 shadow-lg shadow-black/20">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className={navLinkClasses(item.path)}>
                <span className="absolute inset-0 -z-30 rounded-full bg-gradient-to-r from-gradient-start/0 via-transparent to-gradient-end/0 opacity-0 blur-xl transition-all duration-300 group-hover:from-gradient-start/25 group-hover:via-gradient-mid/20 group-hover:to-gradient-end/25 group-hover:opacity-100 group-hover:scale-110" />
                <span className="absolute inset-[2px] -z-20 rounded-full border border-white/0 bg-gradient-to-r from-white/0 via-white/0 to-white/0 transition-all duration-300 group-hover:border-white/10 group-hover:from-white/5 group-hover:to-white/5 group-hover:backdrop-blur group-hover:opacity-100" />
                {isActive(item.path) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gradient-start/25 via-gradient-mid/25 to-gradient-end/25 shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="text-sm font-medium text-text-muted transition-colors hover:text-white">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-5 py-2 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition-transform hover:scale-[1.02]"
                >
                  Join The Hub
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-text-muted transition-colors hover:text-white">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-red-500/60 px-5 py-2 text-sm font-semibold text-red-400 transition-all hover:border-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            )}
            <Link
              to="/contact"
              className="group hidden items-center gap-2 rounded-full border border-gradient-start/50 px-5 py-2 text-sm font-semibold text-gradient-start transition-all hover:border-gradient-start hover:bg-gradient-start/10 md:flex"
            >
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Let's Build
            </Link>
          </div>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center rounded-full border border-border-subtle/60 p-2 text-text-muted transition-colors hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="md:hidden">
          <div className="space-y-4 border-t border-border-subtle/60 bg-background-dark/95 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block rounded-2xl border border-border-subtle/40 px-4 py-3 text-sm font-semibold transition-all hover:border-gradient-start/60 hover:text-white ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-gradient-start/10 via-gradient-mid/10 to-gradient-end/10 text-white'
                    : 'text-text-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="grid gap-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-border-subtle/40 px-4 py-3 text-sm font-semibold text-text-muted transition-all hover:border-gradient-start/60 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-4 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30"
                  >
                    Join The Hub
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl border border-border-subtle/40 px-4 py-3 text-sm font-semibold text-text-muted transition-all hover:border-gradient-start/60 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  {hasAdminAccess && (
                    <Link
                      to="/admin/users"
                      onClick={() => setIsOpen(false)}
                      className="rounded-xl border border-border-subtle/40 px-4 py-3 text-sm font-semibold text-text-muted transition-all hover:border-gradient-start/60 hover:text-white"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full rounded-xl border border-red-500/50 px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:border-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </>
              )}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gradient-start/60 px-4 py-3 text-sm font-semibold text-gradient-start transition-all hover:bg-gradient-start/10"
              >
                <Sparkles className="h-4 w-4" />
                Let's Build
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
