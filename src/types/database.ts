export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: AuthUser | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}
