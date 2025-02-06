export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  cover_image: string | null;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
}

export interface AuthState {
  user: any | null;
  loading: boolean;
}