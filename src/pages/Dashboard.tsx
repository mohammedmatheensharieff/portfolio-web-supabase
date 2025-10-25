import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BadgeCheck, Calendar, Hash, Mail, RefreshCw, User as UserIcon, Image as ImageIcon, PenLine, Loader2 } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Dashboard() {
  useDocumentTitle('Dashboard — Mohammed Matheen');
  const { user, loading, refreshUser, updateProfile } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [fullNameInput, setFullNameInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

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

  const formatDate = (value?: string) => {
    if (!value) return 'Not available';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not available';
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center text-gray-300">
        Checking your profile...
      </div>
    );
  }

  const accountDetails = [
    {
      label: 'Email',
      value: user.email,
      icon: <Mail size={20} />,
    },
    {
      label: 'Username',
      value: user.username || 'Not set',
      icon: <Hash size={20} />,
    },
    {
      label: 'Full Name',
      value: user.fullName || 'Not set',
      icon: <UserIcon size={20} />,
    },
    {
      label: 'Role',
      value: user.role === 'admin' ? 'Administrator' : 'User',
      icon: <BadgeCheck size={20} />,
    },
    {
      label: 'Member Since',
      value: formatDate(user.createdAt),
      icon: <Calendar size={20} />,
    },
    {
      label: 'Last Updated',
      value: formatDate(user.updatedAt),
      icon: <RefreshCw size={20} />,
    },
  ];

  useEffect(() => {
    setFullNameInput(user.fullName || '');
    setAvatarInput(user.avatarUrl || '');
  }, [user]);

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

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {displayName}</h1>
          <p className="text-gray-400">Here is the latest information about your account.</p>
          {(loading || refreshing) && <p className="text-sm text-gray-500 mt-2">Refreshing account data...</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
            >
              <div className="flex items-center space-x-4 mb-4">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                  alt={displayName}
                    className="w-16 h-16 rounded-full border border-gray-700 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center text-2xl font-semibold text-white">
                    {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xl font-semibold text-white">{displayName}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Manage your account details, update your profile information, and keep track of when things change. This
              dashboard now reflects the details stored with your authenticated account.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
          >
            <h2 className="text-xl font-bold text-white mb-4">Account Details</h2>
            <div className="space-y-4">
              {accountDetails.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3 text-gray-300">
                    <span className="text-gradient-start">{item.icon}</span>
                    <span className="text-sm uppercase tracking-wide text-gray-500">{item.label}</span>
                  </div>
                  <span className="text-white">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 bg-gray-900 rounded-lg border border-gray-800 p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <PenLine size={18} className="text-gradient-start" />
            Profile Preferences
          </h2>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleProfileSave}>
            <label className="flex flex-col text-sm text-gray-300">
              Full name
              <input
                value={fullNameInput}
                onChange={(event) => setFullNameInput(event.target.value)}
                placeholder="Add a name for better personalization"
                className="mt-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
              />
            </label>
            <label className="flex flex-col text-sm text-gray-300">
              Avatar URL
              <div className="mt-2 flex gap-2">
                <input
                  value={avatarInput}
                  onChange={(event) => setAvatarInput(event.target.value)}
                  placeholder="https://…"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                />
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 text-gray-400">
                  <ImageIcon size={18} />
                </span>
              </div>
            </label>
            <div className="md:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end px-4 py-2 text-sm font-semibold text-background-dark transition hover:-translate-y-0.5 hover:shadow-lg ${
                    savingProfile ? 'opacity-70 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''
                  }`}
                >
                  {savingProfile ? <Loader2 size={16} className="animate-spin" /> : <PenLine size={16} />}
                  Save changes
                </button>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-300 transition"
                  onClick={() => {
                    setFullNameInput(user.fullName || '');
                    setAvatarInput(user.avatarUrl || '');
                    setProfileMessage(null);
                  }}
                >
                  Reset
                </button>
              </div>
              {profileMessage && (
                <p className="text-xs text-gray-400">
                  {profileMessage}
                </p>
              )}
            </div>
            <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-gray-800 bg-black/40 p-3 text-xs text-gray-400">
              <Sparkles size={14} className="text-gradient-start" />
              Tip: Use a square image URL for best results. Secure storage coming soon.
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 bg-gray-900 rounded-lg border border-gray-800 p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-2">Need to update something?</h2>
          <p className="text-gray-400">
            Visit your profile settings to change your email, username, or add additional details. Your dashboard will
            always show the most recent information stored on your account.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
