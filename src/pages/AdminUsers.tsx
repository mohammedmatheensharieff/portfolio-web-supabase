import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import adminApi from '../lib/adminApi';
import type { AuthUser } from '../types/database';
import { useAdminAuth } from '../context/AdminAuthContext';

type ManagedUser = AuthUser;
type FetchState = 'idle' | 'loading' | 'error';
type Toast = { type: 'success' | 'error'; message: string } | null;

export default function AdminUsers() {
  const { admin } = useAdminAuth();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
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

  const showToast = (payload: Toast) => {
    setToast(payload);
    if (payload) {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const updateUser = async (id: string, payload: Partial<ManagedUser> & { password?: string }) => {
    try {
      const { data } = await adminApi.patch<{ user: ManagedUser }>(`/admin/users/${id}`, payload);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data.user } : u)));
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

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-text-muted flex items-center gap-2">
          <ShieldCheck size={16} className="text-gradient-start" />
          Admin Portal
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-white">Manage Users</h1>
        <p className="text-text-muted max-w-2xl">
          Review member access, adjust privileges, and reset credentials. Changes apply immediately.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by email, username, or name"
            className="w-full rounded-xl border border-border-subtle/60 bg-background-dark/70 py-2 pl-9 pr-4 text-sm text-white outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
          />
        </div>
        <button
          type="button"
          onClick={() => setSearch('')}
          className="flex items-center gap-2 rounded-full border border-border-subtle/60 px-4 py-2 text-sm text-text-muted transition hover:border-gradient-start hover:text-white"
        >
          <RefreshCw size={16} />
          Clear search
        </button>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm ${
            toast.type === 'success'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-300'
          }`}
        >
          {toast.type === 'success' ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
          <span>{toast.message}</span>
        </motion.div>
      )}

      <div className="overflow-hidden rounded-3xl border border-border-subtle/60 bg-background-dark/80 shadow-lg shadow-black/20">
        <div className="hidden grid-cols-[2fr,1.2fr,1fr,1fr,1fr] gap-4 px-6 py-3 text-xs uppercase tracking-[0.35em] text-text-muted md:grid">
          <span>Email</span>
          <span>Username</span>
          <span>Role</span>
          <span>Joined</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-border-subtle/40">
          {fetchState === 'loading' && (
            <div className="px-6 py-6 text-sm text-text-muted">Loading users…</div>
          )}
          {fetchState === 'error' && (
            <div className="px-6 py-6 text-sm text-red-300">
              Unable to fetch users right now. Please refresh.
            </div>
          )}
          {fetchState === 'idle' && filteredUsers.length === 0 && (
            <div className="px-6 py-6 text-sm text-text-muted">No users found.</div>
          )}
          {filteredUsers.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 px-6 py-5 text-sm text-white md:grid-cols-[2fr,1.2fr,1fr,1fr,1fr]"
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
                  className="w-full rounded-lg border border-border-subtle/60 bg-background-dark/70 px-3 py-2 text-sm outline-none transition focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/40"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="text-text-muted">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <button
                  type="button"
                  className="rounded-lg border border-border-subtle/60 px-3 py-2 text-xs uppercase tracking-[0.3em] text-text-muted transition hover:border-gradient-start hover:text-white"
                  onClick={() => handleResetPassword(item)}
                >
                  Reset password
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
