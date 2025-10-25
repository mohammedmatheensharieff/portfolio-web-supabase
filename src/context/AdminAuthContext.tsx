import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import adminApi from '../lib/adminApi';
import type { AuthUser } from '../types/database';

interface AdminContextValue {
  admin: AuthUser | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const defaultValue: AdminContextValue = {
  admin: null,
  loading: true,
  login: async () => undefined,
  logout: async () => undefined,
  refresh: async () => undefined,
};

const AdminAuthContext = createContext<AdminContextValue>(defaultValue);

const normalize = (incoming: AuthUser): AuthUser => ({
  ...incoming,
  role: incoming.role || 'admin',
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { data } = await adminApi.get<{ admin: AuthUser }>('/admin/auth/me');
      if (data?.admin) {
        setAdmin(normalize(data.admin));
      } else {
        setAdmin(null);
      }
    } catch (error) {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const { data } = await adminApi.post<{ admin: AuthUser }>('/admin/auth/login', { email, password });
    setAdmin(normalize(data.admin));
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminApi.post('/admin/auth/logout');
    } catch (_error) {
      // ignore
    }
    setAdmin(null);
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({ admin, loading, login, logout, refresh }),
    [admin, loading, login, logout, refresh]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);
