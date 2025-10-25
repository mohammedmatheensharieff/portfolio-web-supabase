import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BadgeCheck, Calendar, Hash, Mail, RefreshCw, User as UserIcon } from 'lucide-react';

export default function Dashboard() {
  const { user, loading, refreshUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

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
