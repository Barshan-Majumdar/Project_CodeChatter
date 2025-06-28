/*
  # CodeChatter Database Schema

  1. New Tables
    - `profiles` - User profiles with coding stats
    - `posts` - Social feed posts including problems and updates  
    - `comments` - Comments on posts
    - `likes` - Post likes/reactions
    - `solved_problems` - Track user's solved coding problems
    - `connections` - User network connections
    - `leaderboard_cache` - Cached leaderboard data for performance

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access

  3. Functions
    - Helper functions for leaderboard ranking
    - User stats calculation
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  username text UNIQUE,
  bio text,
  avatar_url text,
  github_username text,
  linkedin_url text,
  website_url text,
  location text,
  skills text[],
  experience_level text DEFAULT 'beginner',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  post_type text DEFAULT 'status' CHECK (post_type IN ('status', 'problem', 'blog', 'challenge-completion', 'media')),
  title text,
  difficulty text CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  tags text[],
  media_url text,
  problem_statement text,
  test_cases jsonb,
  solution_template text,
  points integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT likes_target_check CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR 
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Create solved_problems table
CREATE TABLE IF NOT EXISTS solved_problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  problem_url text NOT NULL,
  problem_title text,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points integer NOT NULL DEFAULT 0,
  solution_code text,
  language text,
  time_complexity text,
  space_complexity text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT connections_not_self CHECK (sender_id != receiver_id),
  CONSTRAINT connections_unique UNIQUE (sender_id, receiver_id)
);

-- Create leaderboard_cache table for performance
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  total_points integer DEFAULT 0,
  problems_solved integer DEFAULT 0,
  current_rank integer,
  rank_change integer DEFAULT 0,
  last_activity timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT bookmarks_unique UNIQUE (user_id, post_id)
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  achievement_name text NOT NULL,
  description text,
  icon_url text,
  earned_at timestamptz DEFAULT now()
);

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_ids uuid[] NOT NULL,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES chat_conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'code', 'image', 'file', 'voice')),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE solved_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Posts policies
CREATE POLICY "Users can view all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = posts.user_id));

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = posts.user_id));

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = posts.user_id));

-- Comments policies
CREATE POLICY "Users can view all comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = comments.user_id));

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = comments.user_id));

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = comments.user_id));

-- Likes policies
CREATE POLICY "Users can view all likes"
  ON likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own likes"
  ON likes FOR ALL
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = likes.user_id));

-- Solved problems policies
CREATE POLICY "Users can view own solved problems"
  ON solved_problems FOR SELECT
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = solved_problems.user_id));

CREATE POLICY "Users can insert own solved problems"
  ON solved_problems FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = solved_problems.user_id));

-- Connections policies
CREATE POLICY "Users can view their connections"
  ON connections FOR SELECT
  TO authenticated
  USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = connections.sender_id) OR
    auth.uid() = (SELECT user_id FROM profiles WHERE id = connections.receiver_id)
  );

CREATE POLICY "Users can create connection requests"
  ON connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = connections.sender_id));

CREATE POLICY "Users can update received connections"
  ON connections FOR UPDATE
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = connections.receiver_id));

-- Leaderboard cache policies
CREATE POLICY "Users can view leaderboard"
  ON leaderboard_cache FOR SELECT
  TO authenticated
  USING (true);

-- Bookmarks policies
CREATE POLICY "Users can manage own bookmarks"
  ON bookmarks FOR ALL
  TO authenticated
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = bookmarks.user_id));

-- User achievements policies
CREATE POLICY "Users can view all achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = user_achievements.user_id));

-- Chat policies
CREATE POLICY "Users can view conversations they participate in"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND id = ANY(chat_conversations.participant_ids)
    )
  );

CREATE POLICY "Users can view messages in their conversations"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations cc
      JOIN profiles p ON p.id = ANY(cc.participant_ids)
      WHERE cc.id = chat_messages.conversation_id
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = chat_messages.sender_id)
    AND EXISTS (
      SELECT 1 FROM chat_conversations cc
      JOIN profiles p ON p.id = ANY(cc.participant_ids)
      WHERE cc.id = chat_messages.conversation_id
      AND p.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(post_type);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_solved_problems_user_id ON solved_problems(user_id);
CREATE INDEX IF NOT EXISTS idx_solved_problems_difficulty ON solved_problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_connections_sender_receiver ON connections(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard_cache(current_rank);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON leaderboard_cache(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id, created_at);

-- Create function to get user rank
CREATE OR REPLACE FUNCTION get_user_rank(target_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_rank integer;
BEGIN
  SELECT rank INTO user_rank
  FROM (
    SELECT 
      lc.user_id,
      RANK() OVER (ORDER BY lc.total_points DESC, lc.problems_solved DESC) as rank
    FROM leaderboard_cache lc
    JOIN profiles p ON p.id = lc.user_id
  ) ranked
  WHERE user_id = target_user_id;
  
  RETURN COALESCE(user_rank, 0);
END;
$$;

-- Create function to update leaderboard cache
CREATE OR REPLACE FUNCTION update_leaderboard_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update leaderboard cache with current stats
  INSERT INTO leaderboard_cache (user_id, total_points, problems_solved, updated_at)
  SELECT 
    p.id as user_id,
    COALESCE(SUM(sp.points), 0) as total_points,
    COUNT(sp.id) as problems_solved,
    now() as updated_at
  FROM profiles p
  LEFT JOIN solved_problems sp ON sp.user_id = p.id
  GROUP BY p.id
  ON CONFLICT (user_id) 
  DO UPDATE SET
    total_points = EXCLUDED.total_points,
    problems_solved = EXCLUDED.problems_solved,
    updated_at = EXCLUDED.updated_at;
    
  -- Update ranks
  WITH ranked_users AS (
    SELECT 
      user_id,
      RANK() OVER (ORDER BY total_points DESC, problems_solved DESC) as new_rank
    FROM leaderboard_cache
  )
  UPDATE leaderboard_cache lc
  SET current_rank = ru.new_rank
  FROM ranked_users ru
  WHERE lc.user_id = ru.user_id;
END;
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO profiles (user_id, full_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  
  -- Initialize leaderboard cache entry
  INSERT INTO leaderboard_cache (user_id, total_points, problems_solved)
  VALUES (NEW.id, 0, 0);
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to automatically update leaderboard when problems are solved
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update leaderboard cache for the user
  INSERT INTO leaderboard_cache (user_id, total_points, problems_solved, updated_at)
  SELECT 
    NEW.user_id,
    COALESCE(SUM(sp.points), 0) as total_points,
    COUNT(sp.id) as problems_solved,
    now() as updated_at
  FROM solved_problems sp
  WHERE sp.user_id = NEW.user_id
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_points = EXCLUDED.total_points,
    problems_solved = EXCLUDED.problems_solved,
    updated_at = EXCLUDED.updated_at;
    
  RETURN NEW;
END;
$$;

-- Create trigger to update stats when problems are solved
CREATE OR REPLACE TRIGGER on_problem_solved
  AFTER INSERT ON solved_problems
  FOR EACH ROW EXECUTE FUNCTION update_user_stats();