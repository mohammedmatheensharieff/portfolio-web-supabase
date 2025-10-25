import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cloud, Sparkles, CloudCog, Coins, Code2, ShieldCheck, NotebookPen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { admin } = useAdminAuth();
  const location = useLocation();

  const hasAdminAccess = Boolean(admin) || user?.role === 'admin';

  const baseNavItems = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' },
    ],
    []
  );

  const navItems = useMemo(() => {
    const items = [...baseNavItems];

    if (user) {
      items.push({ name: 'Creator Hub', path: '/dashboard' });
    }

    if (hasAdminAccess) {
      items.push({ name: 'Admin', path: '/admin/users' });
    }

    return items;
  }, [baseNavItems, hasAdminAccess, user]);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) =>
    `group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
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
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-1 shadow-lg shadow-black/25">
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
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start/20 via-gradient-mid/15 to-gradient-end/20 ${
                      isActive(item.path) ? 'text-background-dark' : 'text-gradient-start'
                    }`}
                  >
                    {item.name === 'Home' && <CloudCog className="h-3 w-3" />}
                    {item.name === 'About' && <Sparkles className="h-3 w-3" />}
                    {item.name === 'Projects' && <Cloud className="h-3 w-3" />}
                    {item.name === 'Blog' && <NotebookPen className="h-3 w-3" />}
                    {item.name === 'Contact' && <Coins className="h-3 w-3" />}
                    {item.name === 'Creator Hub' && <Code2 className="h-3 w-3" />}
                    {item.name === 'Admin' && <ShieldCheck className="h-3 w-3" />}
                  </span>
                  <span>{item.name}</span>
                </span>
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
                  className="rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-5 py-2 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30 transition-transform hover:scale_[1.02]"
                >
                  Join The Hub
                </Link>
              </>
            ) : (
              null
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
          <div className="space-y-6 border-t border-white/10 bg-background-dark/95 px-4 py-8">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-4 py-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gradient-start/50 via-gradient-mid/40 to-gradient-end/50 text-background-dark shadow-md shadow-gradient-mid/30">
                  <Cloud className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.35em] text-text-muted">Mohammed</span>
                  <span className="text-base font-semibold text-white">Matheen</span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-muted transition hover:text-white"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold transition-all hover:border-gradient-start hover:bg-gradient-start/10 ${
                    isActive(item.path) ? 'text-white' : 'text-text-muted'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start/20 via-gradient-mid/15 to-gradient-end/20 text-background-dark">
                    {isActive(item.path) ? <Sparkles className="h-4 w-4" /> : <CloudCog className="h-4 w-4 text-gradient-start" />}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="grid gap-3">
              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-text-muted transition-all hover:border-gradient-start hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-4 py-3 text-sm font-semibold text-background-dark shadow-lg shadow-gradient-mid/30"
                  >
                    Join The Hub
                  </Link>
                </>
              )}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-gradient-start/60 px-4 py-3 text-sm font-semibold text-gradient-start transition-all hover:bg-gradient-start/10"
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
