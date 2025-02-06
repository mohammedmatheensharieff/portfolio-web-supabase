/*
  # Blog and Membership System

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `published` (boolean)
      - `cover_image` (text)

    - `memberships`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `expires_at` (timestamp)
      - `payment_id` (text)
      - `price_paid` (numeric)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  slug text UNIQUE NOT NULL,
  excerpt text,
  published boolean DEFAULT false,
  cover_image text
);

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text NOT NULL CHECK (type IN ('basic', 'premium')),
  status text NOT NULL CHECK (status IN ('active', 'expired', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  payment_id text,
  price_paid numeric NOT NULL
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Blog post policies
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authors can manage their own posts"
  ON blog_posts
  USING (auth.uid() = author_id);

-- Membership policies
CREATE POLICY "Users can view their own membership"
  ON memberships
  FOR SELECT
  USING (auth.uid() = user_id);

-- Add membership status function
CREATE OR REPLACE FUNCTION public.has_active_membership(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM memberships
    WHERE user_id = $1
    AND status = 'active'
    AND expires_at > now()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;