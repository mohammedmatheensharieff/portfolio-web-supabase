import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthState, AuthUser } from '../types/database';
import api from '../lib/api';

interface AuthContextValue extends AuthState {
  token: string | null;
  login: (credentials: { identity: string; password: string }) => Promise<void>;
  register: (payload: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (payload: { username?: string; fullName?: string; avatarUrl?: string }) => Promise<void>;
}

const defaultContext: AuthContextValue = {
  user: null,
  loading: true,
  token: null,
  login: async () => undefined,
  register: async () => undefined,
  logout: () => undefined,
  refreshUser: async () => undefined,
  updateProfile: async () => undefined,
};

const AuthContext = createContext<AuthContextValue>(defaultContext);

const TOKEN_KEY = 'auth.token';
const USER_KEY = 'auth.user';

const normalizeUser = (incoming: AuthUser): AuthUser => ({
  ...incoming,
  role: incoming.role || 'user',
});

const persistAuth = (token: string, user: AuthUser) => {
  if (typeof window === 'undefined') return;
  const normalized = normalizeUser(user);
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(normalized));
};

const clearPersistedAuth = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    const hasToken = typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
    if (!hasToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get<{ user: AuthUser }>('/auth/me');
      if (data?.user) {
        const normalized = normalizeUser(data.user);
        setUser(normalized);
        setToken(hasToken);
        persistAuth(hasToken, normalized);
      } else {
        clearPersistedAuth();
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Unable to refresh user session', error);
      clearPersistedAuth();
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
    const storedUser = typeof window !== 'undefined' ? window.localStorage.getItem(USER_KEY) : null;

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(normalizeUser(JSON.parse(storedUser)));
      } catch (error) {
        clearPersistedAuth();
      }
    }
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (credentials: { identity: string; password: string }) => {
    const { data } = await api.post<{ token: string; user: AuthUser }>('/auth/login', credentials);
    const normalized = normalizeUser(data.user);
    setToken(data.token);
    setUser(normalized);
    persistAuth(data.token, normalized);
  }, []);

  const register = useCallback(async (payload: { email: string; password: string; username: string }) => {
    const { data } = await api.post<{ token: string; user: AuthUser }>('/auth/register', payload);
    const normalized = normalizeUser(data.user);
    setToken(data.token);
    setUser(normalized);
    persistAuth(data.token, normalized);
  }, []);

  const logout = useCallback(() => {
    clearPersistedAuth();
    setUser(null);
    setToken(null);
  }, []);

  const updateProfile = useCallback(
    async (payload: { username?: string; fullName?: string; avatarUrl?: string }) => {
      const { data } = await api.put<{ user: AuthUser }>('/auth/profile', payload);
      const normalized = normalizeUser(data.user);
      setUser(normalized);
      const currentToken = typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null;
      if (currentToken) {
        persistAuth(currentToken, normalized);
      }
    },
    []
  );

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, loading, login, register, logout, refreshUser, updateProfile }),
    [user, token, loading, login, register, logout, refreshUser, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
