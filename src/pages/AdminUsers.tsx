import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import adminApi from '../lib/adminApi';
import type { AuthUser } from '../types/database';
import { useAdminAuth } from '../context/AdminAuthContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

type ManagedUser = AuthUser;
type FetchState = 'idle' | 'loading' | 'error';
type Toast = { type: 'success' | 'error'; message: string } | null;

const formatTimestamp = (value?: string | null, fallback: string = 'Not available') => {
  if (!value) return fallback;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed);
};

export default function AdminUsers() {
  useDocumentTitle('Admin — User Management | Mohammed Matheen');
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    if (!admin) return;

    const fetchUsers = async () => {
      setFetchState('loading');
      try {
        const { data } = await adminApi.get<{ users: ManagedUser[] }>('/admin/users', {
          params: search ? { search } : undefined,
        });
        setUsers(data.users || []);
        setLastSyncedAt(new Date());
        setFetchState('idle');
      } catch (error) {
        console.error('Failed to load users', error);
        setFetchState('error');
        setToast({ type: 'error', message: 'Unable to load users. Please try again.' });
      }
    };

    fetchUsers();
  }, [admin, search]);

  const filteredUsers = useMemo(() => users, [users]);

  const metrics = useMemo(() => {
    const totalUsers = users.length;
    const adminCount = users.filter((user) => user.role === 'admin').length;
    const creatorCount = Math.max(totalUsers - adminCount, 0);
    const latestUser = [...users]
      .filter((user) => user.createdAt)
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })[0];

    return {
      totalUsers,
      adminCount,
      creatorCount,
      latestUser,
    };
  }, [users]);

  const showToast = (payload: Toast) => {
    setToast(payload);
    if (payload) {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const updateUser = async (id: string, payload: Partial<ManagedUser> & { password?: string }) => {
    try {
      const { data } = await adminApi.patch<{ user: ManagedUser }>(`/admin/users/${id}`, payload);
      setUsers((prev) => prev.map((item) => (item.id === id ? { ...item, ...data.user } : item)));
      showToast({ type: 'success', message: 'User updated successfully.' });
    } catch (error: any) {
      console.error('Failed to update user', error);
      const message = error?.response?.data?.message || 'Failed to update user. Please try again.';
      showToast({ type: 'error', message });
    }
  };

  const handleRoleChange = (targetUser: ManagedUser, role: 'user' | 'admin') => {
    updateUser(targetUser.id, { role });
  };

  const handleResetPassword = (targetUser: ManagedUser) => {
    const password = window.prompt(`Enter a new password for ${targetUser.email}`);
    if (!password) return;
    if (password.length < 6) {
      showToast({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }
    updateUser(targetUser.id, { password });
  };

  const deleteUser = async (id: string) => {
    try {
      await adminApi.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      showToast({ type: 'success', message: 'User deleted successfully.' });
    } catch (error: any) {
      console.error('Failed to delete user', error);
      const message = error?.response?.data?.message || 'Unable to delete user. Please try again.';
      showToast({ type: 'error', message });
    }
  };

  const handleDeleteUser = (targetUser: ManagedUser) => {
    if (targetUser.id === admin?.id) {
      showToast({ type: 'error', message: 'You cannot delete your own account.' });
      return;
    }
    const confirmed = window.confirm(`Delete ${targetUser.email}? This action cannot be undone.`);
    if (!confirmed) return;
    deleteUser(targetUser.id);
  };

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-background-dark via-background-dark/80 to-black p-8 shadow-2xl shadow-black/30"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-start/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-gradient-end/15 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/70">
              <ShieldCheck className="h-3.5 w-3.5 text-gradient-start" />
              Admin Portal
            </span>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">User Operations Center</h1>
            <p className="max-w-2xl text-sm text-gray-300">
              Resolve access issues, promote trusted collaborators, and keep the creator network running smoothly. All
              updates sync instantly across the platform.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <Users className="h-3.5 w-3.5 text-gradient-start" />
                {metrics.totalUsers} accounts tracked
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <RefreshCw className="h-3.5 w-3.5 text-gradient-end" />
                {fetchState === 'loading'
                  ? 'Syncing latest data…'
                  : `Last synced ${lastSyncedAt ? formatTimestamp(lastSyncedAt.toISOString()) : '—'}`}
              </span>
            </div>
          </div>
          <div className="self-start rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Latest Member</p>
            {metrics.latestUser ? (
              <div className="mt-3 space-y-2">
                <p className="text-lg font-semibold text-white">{metrics.latestUser.email}</p>
                <p className="text-xs text-gray-300">
                  Joined {formatTimestamp(metrics.latestUser.createdAt || undefined, 'Recently')}
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/70">
                  {metrics.latestUser.role === 'admin' ? (
                    <>
                      <Crown className="h-3.5 w-3.5 text-amber-300" />
                      Admin
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5 text-emerald-300" />
                      Creator
                    </>
                  )}
                </span>
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                <ShieldQuestion className="h-4 w-4" />
                No recent signups yet.
              </div>
            )}
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-2xl border border-white/5 bg-black/35 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-wide text-gray-400">Total Accounts</p>
          <p className="mt-2 text-2xl font-semibold text-white">{metrics.totalUsers}</p>
          <p className="mt-1 text-xs text-gray-400">Creators and admins combined</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-black/35 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-wide text-gray-400">Administrators</p>
          <p className="mt-2 text-2xl font-semibold text-white">{metrics.adminCount}</p>
          <p className="mt-1 text-xs text-amber-200">Keep admin roster lean and trusted</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-black/35 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-wide text-gray-400">Creators</p>
          <p className="mt-2 text-2xl font-semibold text-white">{metrics.creatorCount}</p>
          <p className="mt-1 text-xs text-emerald-200">Active members in the hub</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-black/35 p-5 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-wide text-gray-400">Sync Status</p>
          <p className="mt-2 text-sm font-semibold text-white">
            {fetchState === 'loading'
              ? 'Refreshing directory…'
              : `Updated ${lastSyncedAt ? formatTimestamp(lastSyncedAt.toISOString()) : 'moments ago'}`}
          </p>
          <p className="mt-1 text-xs text-gray-400">Pull fresh data anytime</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by email, username, or name"
            className="w-full rounded-xl border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSearch('')}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-gradient-start hover:text-white"
          >
            <RefreshCw size={16} />
            Clear search
          </button>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.35em] ${
              fetchState === 'loading'
                ? 'border-gradient-start/60 text-gradient-start'
                : fetchState === 'error'
                  ? 'border-red-500/60 text-red-300'
                  : 'border-emerald-500/60 text-emerald-300'
            }`}
          >
            <RefreshCw size={14} className={fetchState === 'loading' ? 'animate-spin' : ''} />
            {fetchState === 'loading' ? 'Syncing' : fetchState === 'error' ? 'Error' : 'Live'}
          </span>
        </div>
      </motion.div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
            toast.type === 'success'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-300'
          }`}
        >
          {toast.type === 'success' ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
          <span>{toast.message}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 overflow-hidden rounded-3xl border border-white/5 bg-black/35 shadow-2xl shadow-black/20"
      >
        <div className="hidden grid-cols-[2fr,1.2fr,1fr,1fr,1.2fr] gap-4 border-b border-white/5 px-6 py-3 text-xs uppercase tracking-[0.35em] text-text-muted md:grid">
          <span>Email</span>
          <span>Username</span>
          <span>Role</span>
          <span>Joined</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-white/5">
          {fetchState === 'loading' && (
            <div className="px-6 py-6 text-sm text-text-muted">Loading users…</div>
          )}
          {fetchState === 'error' && (
            <div className="px-6 py-6 text-sm text-red-300">Unable to fetch users right now. Please refresh.</div>
          )}
          {fetchState === 'idle' && filteredUsers.length === 0 && (
            <div className="px-6 py-6 text-sm text-text-muted">No users found.</div>
          )}
          {filteredUsers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="grid gap-4 px-6 py-5 text-sm text-white md:grid-cols-[2fr,1.2fr,1fr,1fr,1.2fr]"
            >
              <div className="space-y-1">
                <p className="font-semibold">{item.email}</p>
                <p className="text-xs text-text-muted">
                  ID: <span className="font-mono">{item.id}</span>
                </p>
              </div>
              <div className="text-text-muted">{item.username || '—'}</div>
              <div>
                <select
                  value={item.role}
                  onChange={(event) => handleRoleChange(item, event.target.value as 'user' | 'admin')}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                >
                  <option value="user">Creator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="text-text-muted">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <button
                  type="button"
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.3em] text-text-muted transition hover:border-gradient-start hover:text-white"
                  onClick={() => handleResetPassword(item)}
                >
                  Reset password
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-red-500/40 px-3 py-2 text-xs uppercase tracking-[0.3em] text-red-300 transition hover:border-red-400 hover:text-red-200"
                  onClick={() => handleDeleteUser(item)}
                >
                  <span className="inline-flex items-center gap-1">
                    <Trash2 size={14} />
                    Delete
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
