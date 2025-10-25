import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import {
  BadgeCheck,
  Calendar,
  Hash,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Mail,
  PenLine,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Dashboard() {
  useDocumentTitle('Creator Hub — Mohammed Matheen');
  const { user, loading, refreshUser, updateProfile, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [fullNameInput, setFullNameInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const hydrateUser = async () => {
      setRefreshing(true);
      try {
        await refreshUser();
      } finally {
        if (isMounted) {
          setRefreshing(false);
        }
      }
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, [refreshUser]);

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  const displayName = useMemo(() => {
    if (!user) return '';
    return user.fullName || user.username || user.email;
  }, [user]);

  const formatDate = (value?: string, options?: Intl.DateTimeFormatOptions) => {
    if (!value) return 'Not available';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not available';
    return new Intl.DateTimeFormat(undefined, options ?? { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center text-gray-300">
        Checking your profile...
      </div>
    );
  }

  const profileScore = useMemo(() => {
    const checks = [
      { label: 'Full name', value: user.fullName },
      { label: 'Username', value: user.username },
      { label: 'Avatar', value: user.avatarUrl },
    ];

    const completed = checks.filter(({ value }) => Boolean(value?.trim())).length;
    const score = Math.round((completed / checks.length) * 100);
    const incomplete = checks.filter(({ value }) => !value?.trim()).map(({ label }) => label);

    return {
      score,
      incomplete,
    };
  }, [user.avatarUrl, user.fullName, user.username]);

  const quickStats = [
    {
      label: 'Account Role',
      value: user.role === 'admin' ? 'Administrator' : 'Creator',
      icon: <BadgeCheck className="h-5 w-5 text-green-400" />,
    },
    {
      label: 'Member Since',
      value: formatDate(user.createdAt, { dateStyle: 'medium' }),
      icon: <Calendar className="h-5 w-5 text-indigo-400" />,
    },
    {
      label: 'Last Synced',
      value: loading || refreshing ? 'Syncing…' : formatDate(user.updatedAt),
      icon: <RefreshCw className="h-5 w-5 text-cyan-400" />,
    },
    {
      label: 'Profile Score',
      value: `${profileScore.score}% complete`,
      helper: profileScore.incomplete.length ? `Finish: ${profileScore.incomplete.join(', ')}` : 'All set!',
      icon: <Sparkles className="h-5 w-5 text-amber-300" />,
    },
  ];

  const accountDetails = [
    {
      label: 'Email',
      value: user.email,
      icon: <Mail size={18} />,
    },
    {
      label: 'Username',
      value: user.username || 'Not set',
      icon: <Hash size={18} />,
    },
    {
      label: 'Full Name',
      value: user.fullName || 'Not set',
      icon: <UserIcon size={18} />,
    },
    {
      label: 'Role',
      value: user.role === 'admin' ? 'Administrator' : 'Creator',
      icon: <BadgeCheck size={18} />,
    },
    {
      label: 'Member Since',
      value: formatDate(user.createdAt),
      icon: <Calendar size={18} />,
    },
    {
      label: 'Last Updated',
      value: formatDate(user.updatedAt),
      icon: <RefreshCw size={18} />,
    },
  ];

  useEffect(() => {
    setFullNameInput(user.fullName || '');
    setAvatarInput(user.avatarUrl || '');
  }, [user.avatarUrl, user.fullName]);

  const handleProfileSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    setProfileMessage(null);
    try {
      await updateProfile({
        fullName: fullNameInput.trim() || undefined,
        avatarUrl: avatarInput.trim() || undefined,
      });
      setProfileMessage('Profile updated successfully.');
    } catch (error: any) {
      console.error('Failed to update profile', error);
      const message = error?.response?.data?.message || 'Unable to update profile. Please try again.';
      setProfileMessage(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-background-dark via-background-dark/90 to-black p-8 shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-start/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-gradient-end/10 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.42em] text-white/60">Creator Hub</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">Welcome back, {displayName}</h1>
              <p className="max-w-xl text-sm text-gray-300">
                Fine-tune your account, keep your profile polished, and stay ahead with quick insights tailored to your
                workflow.
              </p>
              {(loading || refreshing) && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Syncing account data…
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/50 px-5 py-4 backdrop-blur">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="h-16 w-16 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gradient-start to-gradient-end text-2xl font-semibold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-base font-semibold text-white">{displayName}</p>
                <p className="text-xs text-gray-300">{user.email}</p>
                <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wide text-white/70">
                  <ShieldCheck className="h-3.5 w-3.5 text-gradient-start" />
                  {user.role === 'admin' ? 'Admin Access' : 'Creator Access'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 grid gap-6 lg:grid-cols-[2fr,1fr]"
        >
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/5 bg-black/40 p-4 shadow-lg shadow-black/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-full bg-white/5 p-2">
                      {stat.icon}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">{stat.label}</p>
                      <p className="text-sm font-semibold text-white">{stat.value}</p>
                    </div>
                  </div>
                  {stat.helper && <p className="mt-3 text-xs text-gray-400">{stat.helper}</p>}
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 shadow-xl shadow-black/20">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Sparkles className="h-5 w-5 text-gradient-start" />
                  Creator Snapshot
                </h2>
                <p className="mt-3 text-sm text-gray-300">
                  Your account is dialed-in and synced with our auth platform. Continue polishing your public profile so
                  collaborators know how to reach you.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gradient-start" />
                    Primary email verified with the current authentication provider.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gradient-mid" />
                    Profile updates sync instantly across the portfolio.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gradient-end" />
                    Additional creator tools ship from this hub first.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">Profile Health</h2>
                <p className="mt-2 text-sm text-gray-300">
                  Keep your account details crisp so your network knows how to collaborate.
                </p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-white">{profileScore.score}%</p>
                    <p className="text-xs uppercase tracking-wide text-gray-400">Complete</p>
                  </div>
                  <div className="h-16 w-16 rounded-full border-4 border-gradient-start/60 border-b-white/10 border-r-white/20 border-t-white/40" />
                </div>
                {profileScore.incomplete.length > 0 ? (
                  <p className="mt-4 text-xs text-amber-300">Finish: {profileScore.incomplete.join(', ')}</p>
                ) : (
                  <p className="mt-4 text-xs text-emerald-300">Everything looks complete. Great work!</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 shadow-xl shadow-black/20">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <PenLine className="h-5 w-5 text-gradient-start" />
                Profile Preferences
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Update your creator identity and avatar. Changes sync instantly across the site.
              </p>
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleProfileSave}>
                <label className="flex flex-col text-sm text-gray-300">
                  Full name
                  <input
                    value={fullNameInput}
                    onChange={(event) => setFullNameInput(event.target.value)}
                    placeholder="Add a name for better personalization"
                    className="mt-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                  />
                </label>
                <label className="flex flex-col text-sm text-gray-300">
                  Avatar URL
                  <div className="mt-2 flex gap-2">
                    <input
                      value={avatarInput}
                      onChange={(event) => setAvatarInput(event.target.value)}
                      placeholder="https://…"
                      className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                    />
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400">
                      <ImageIcon size={18} />
                    </span>
                  </div>
                </label>
                <div className="md:col-span-2 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-4 py-2 text-sm font-semibold text-background-dark transition hover:-translate-y-0.5 hover:shadow-lg ${
                        savingProfile ? 'cursor-not-allowed opacity-70 hover:translate-y-0 hover:shadow-none' : ''
                      }`}
                    >
                      {savingProfile ? <Loader2 size={16} className="animate-spin" /> : <PenLine size={16} />}
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="text-xs text-gray-400 transition hover:text-gray-200"
                      onClick={() => {
                        setFullNameInput(user.fullName || '');
                        setAvatarInput(user.avatarUrl || '');
                        setProfileMessage(null);
                      }}
                    >
                      Reset fields
                    </button>
                    {profileMessage && <span className="text-xs text-gray-300">{profileMessage}</span>}
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-white/5 bg-black/20 p-3 text-xs text-gray-400">
                  <Sparkles size={14} className="text-gradient-start" />
                  Tip: Use a square image URL for best results. Secure storage coming soon.
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 shadow-xl shadow-black/20">
              <h2 className="text-lg font-semibold text-white">Account Details</h2>
              <p className="mt-2 text-sm text-gray-300">
                These values mirror the data stored in your account service. Keep them fresh to stay connected.
              </p>
              <div className="mt-5 space-y-4">
                {accountDetails.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-black/20 px-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gradient-start">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">{item.label}</p>
                        <p className="text-sm text-white">{item.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500/60 px-4 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                {loggingOut ? 'Signing out…' : 'Logout'}
              </button>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 shadow-xl shadow-black/20">
              <h2 className="text-lg font-semibold text-white">Security Checklist</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-gradient-start" />
                  Enable two-factor authentication once available to protect your account sessions.
                </li>
                <li className="flex items-start gap-3">
                  <RefreshCw className="mt-0.5 h-4 w-4 text-gradient-mid" />
                  Refresh this dashboard if you update details elsewhere to pull the latest data.
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-gradient-end" />
                  Keep your contact email up-to-date so collaborators can reach you quickly.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
