-- BoardGameBoost Initial Schema Migration
-- Created: 2025-11-18

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website_url TEXT,
  twitter_handle TEXT,
  bgg_username TEXT,

  -- Membership
  membership_tier TEXT NOT NULL DEFAULT 'basic' CHECK (membership_tier IN ('basic', 'premium')),
  membership_status TEXT NOT NULL DEFAULT 'active' CHECK (membership_status IN ('active', 'expired', 'pending')),
  membership_expiry TIMESTAMPTZ,
  join_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Gamification
  total_contribution_points INTEGER NOT NULL DEFAULT 0,
  total_testing_points INTEGER NOT NULL DEFAULT 0,

  -- Preferences
  notification_preferences JSONB NOT NULL DEFAULT '{
    "session_scheduled": true,
    "session_reminder": true,
    "feedback_received": true,
    "badge_unlocked": true,
    "queue_update": false,
    "weekly_digest": true
  }'::jsonb,

  -- Role
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for profiles
CREATE INDEX idx_profiles_membership ON profiles(membership_tier, membership_status);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_points ON profiles(total_contribution_points DESC);

-- =====================================================
-- GAME PROJECTS TABLE
-- =====================================================
CREATE TABLE game_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  designer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tagline TEXT,

  -- Development Stage
  stage TEXT NOT NULL CHECK (stage IN (
    'concept',
    'prototype',
    'playtesting',
    'refining',
    'pitching',
    'published'
  )),

  -- Game Specs
  player_count_min INTEGER NOT NULL CHECK (player_count_min >= 1 AND player_count_min <= 20),
  player_count_max INTEGER NOT NULL CHECK (player_count_max >= player_count_min AND player_count_max <= 20),
  play_time INTEGER NOT NULL CHECK (play_time >= 5 AND play_time <= 600),
  complexity INTEGER NOT NULL CHECK (complexity >= 1 AND complexity <= 5),

  -- Categories
  mechanics TEXT[] NOT NULL DEFAULT '{}',
  themes TEXT[] NOT NULL DEFAULT '{}',

  -- Version
  current_version TEXT NOT NULL DEFAULT '0.1',

  -- Media
  cover_image_url TEXT,

  -- Settings
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'unlisted')),
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Publication
  published_at TIMESTAMPTZ,
  publisher_name TEXT,
  bgg_id INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT player_count_valid CHECK (player_count_max >= player_count_min),
  CONSTRAINT title_length CHECK (char_length(title) >= 3 AND char_length(title) <= 100),
  CONSTRAINT description_length CHECK (char_length(description) >= 50)
);

-- Indexes for game_projects
CREATE INDEX idx_projects_designer ON game_projects(designer_id);
CREATE INDEX idx_projects_stage ON game_projects(stage);
CREATE INDEX idx_projects_active ON game_projects(is_active);
CREATE INDEX idx_projects_designer_stage ON game_projects(designer_id, stage, is_active);
CREATE INDEX idx_projects_search ON game_projects USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_projects_mechanics ON game_projects USING gin(mechanics);

-- =====================================================
-- PROJECT MATERIALS TABLE
-- =====================================================
CREATE TABLE project_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,

  -- File Info
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,

  -- Metadata
  material_type TEXT NOT NULL CHECK (material_type IN (
    'rulebook',
    'sell_sheet',
    'prototype_image',
    'component_image',
    'playtest_document',
    'other'
  )),
  description TEXT,
  version TEXT,

  -- Timestamps
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);

CREATE INDEX idx_materials_project ON project_materials(project_id);
CREATE INDEX idx_materials_type ON project_materials(material_type);

-- =====================================================
-- PLAYTEST SESSIONS TABLE
-- =====================================================
CREATE TABLE playtest_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,
  facilitator_id UUID NOT NULL REFERENCES profiles(id),

  -- Schedule
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL DEFAULT 120,

  -- Capacity
  max_players INTEGER NOT NULL CHECK (max_players >= 2 AND max_players <= 10),

  -- Location
  venue TEXT NOT NULL,
  venue_type TEXT NOT NULL DEFAULT 'in_person' CHECK (venue_type IN ('in_person', 'online', 'hybrid')),
  online_link TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN (
    'scheduled',
    'ongoing',
    'completed',
    'cancelled'
  )),

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Results
  actual_start_time TIMESTAMPTZ,
  actual_end_time TIMESTAMPTZ,
  attendance_count INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT future_date CHECK (scheduled_date > created_at)
);

CREATE INDEX idx_sessions_project ON playtest_sessions(game_project_id);
CREATE INDEX idx_sessions_date ON playtest_sessions(scheduled_date);
CREATE INDEX idx_sessions_status ON playtest_sessions(status);
CREATE INDEX idx_sessions_status_date ON playtest_sessions(status, scheduled_date);

-- =====================================================
-- SESSION REGISTRATIONS TABLE
-- =====================================================
CREATE TABLE session_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES playtest_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Status
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN (
    'registered',
    'waitlisted',
    'attended',
    'no_show',
    'cancelled'
  )),

  -- Timestamps
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(session_id, user_id)
);

CREATE INDEX idx_registrations_session ON session_registrations(session_id);
CREATE INDEX idx_registrations_user ON session_registrations(user_id);
CREATE INDEX idx_registrations_status ON session_registrations(status);

-- =====================================================
-- QUEUE ENTRIES TABLE
-- =====================================================
CREATE TABLE queue_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,

  -- Priority
  priority INTEGER NOT NULL DEFAULT 0,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Status
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN (
    'queued',
    'scheduled',
    'completed',
    'withdrawn'
  )),

  -- Scheduling
  scheduled_session_id UUID REFERENCES playtest_sessions(id),
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_queue_status ON queue_entries(status);
CREATE INDEX idx_queue_priority ON queue_entries(priority DESC) WHERE status = 'queued';
CREATE INDEX idx_queue_project ON queue_entries(game_project_id);
CREATE UNIQUE INDEX idx_queue_active_project ON queue_entries(game_project_id) WHERE status IN ('queued', 'scheduled');

-- =====================================================
-- FEEDBACK TABLE
-- =====================================================
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES playtest_sessions(id) ON DELETE CASCADE,
  game_project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES profiles(id),

  -- Ratings (1-5 scale)
  rating_fun INTEGER NOT NULL CHECK (rating_fun >= 1 AND rating_fun <= 5),
  rating_clarity INTEGER NOT NULL CHECK (rating_clarity >= 1 AND rating_clarity <= 5),
  rating_balance INTEGER NOT NULL CHECK (rating_balance >= 1 AND rating_balance <= 5),
  rating_theme INTEGER NOT NULL CHECK (rating_theme >= 1 AND rating_theme <= 5),
  rating_mechanics INTEGER NOT NULL CHECK (rating_mechanics >= 1 AND rating_mechanics <= 5),

  -- Qualitative Comments
  comment_liked TEXT NOT NULL,
  comment_disliked TEXT,
  comment_suggestions TEXT,
  comment_confusing TEXT,

  -- Behavioral
  would_play_again BOOLEAN NOT NULL,
  would_recommend BOOLEAN NOT NULL,

  -- Meta
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 5),

  -- Designer Response
  designer_response TEXT,
  designer_responded_at TIMESTAMPTZ,

  -- Timestamps
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(session_id, player_id)
);

CREATE INDEX idx_feedback_session ON feedback(session_id);
CREATE INDEX idx_feedback_project ON feedback(game_project_id);
CREATE INDEX idx_feedback_player ON feedback(player_id);

-- =====================================================
-- GAME ITERATIONS TABLE
-- =====================================================
CREATE TABLE game_iterations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,

  -- Version
  version TEXT NOT NULL,
  changes_description TEXT NOT NULL,

  -- Feedback Links
  inspiring_feedback_ids UUID[],

  -- Materials
  has_new_materials BOOLEAN NOT NULL DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

CREATE INDEX idx_iterations_project ON game_iterations(game_project_id);
CREATE INDEX idx_iterations_date ON game_iterations(created_at DESC);

-- =====================================================
-- POINT TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Transaction
  type TEXT NOT NULL CHECK (type IN (
    'playtest_given',
    'game_tested',
    'feedback_quality',
    'iteration_completed',
    'game_published',
    'badge_earned',
    'admin_adjustment'
  )),
  points INTEGER NOT NULL,
  description TEXT NOT NULL,

  -- Related Entity
  related_entity_type TEXT,
  related_entity_id UUID,

  -- Admin
  admin_id UUID REFERENCES profiles(id),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON point_transactions(user_id);
CREATE INDEX idx_transactions_type ON point_transactions(type);
CREATE INDEX idx_transactions_date ON point_transactions(created_at DESC);

-- =====================================================
-- BADGES TABLE
-- =====================================================
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'milestone',
    'contribution',
    'publishing',
    'community',
    'special'
  )),

  -- Criteria
  criteria JSONB NOT NULL,

  -- Display
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  is_hidden BOOLEAN NOT NULL DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- USER BADGES TABLE
-- =====================================================
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,

  -- Timestamps
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Content
  type TEXT NOT NULL CHECK (type IN (
    'session_scheduled',
    'session_reminder',
    'feedback_received',
    'badge_unlocked',
    'queue_update',
    'system_announcement'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,

  -- Status
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_date ON notifications(created_at DESC);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON game_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON playtest_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON session_registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_queue_updated_at
  BEFORE UPDATE ON queue_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE playtest_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE queue_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_iterations ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Public profiles viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Game Projects RLS Policies
CREATE POLICY "Public projects viewable by all"
  ON game_projects FOR SELECT
  USING (is_active = true AND visibility = 'public');

CREATE POLICY "Designers can view own projects"
  ON game_projects FOR SELECT
  USING (auth.uid() = designer_id);

CREATE POLICY "Designers can insert own projects"
  ON game_projects FOR INSERT
  WITH CHECK (auth.uid() = designer_id);

CREATE POLICY "Designers can update own projects"
  ON game_projects FOR UPDATE
  USING (auth.uid() = designer_id);

CREATE POLICY "Designers can delete own projects"
  ON game_projects FOR DELETE
  USING (auth.uid() = designer_id);

-- Project Materials RLS Policies
CREATE POLICY "Materials viewable if project viewable"
  ON project_materials FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = project_materials.project_id
      AND (
        (is_active = true AND visibility = 'public')
        OR designer_id = auth.uid()
      )
    )
  );

CREATE POLICY "Designers can manage own project materials"
  ON project_materials FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = project_materials.project_id
      AND designer_id = auth.uid()
    )
  );

-- Sessions RLS Policies (more permissive for now, admin control added later)
CREATE POLICY "Everyone can view scheduled sessions"
  ON playtest_sessions FOR SELECT
  USING (true);

-- Registrations RLS Policies
CREATE POLICY "Users can view own registrations"
  ON session_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for sessions"
  ON session_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel own registrations"
  ON session_registrations FOR UPDATE
  USING (auth.uid() = user_id);

-- Queue RLS Policies
CREATE POLICY "Everyone can view queue"
  ON queue_entries FOR SELECT
  USING (true);

CREATE POLICY "Designers can add own games to queue"
  ON queue_entries FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = queue_entries.game_project_id
      AND designer_id = auth.uid()
    )
  );

-- Feedback RLS Policies
CREATE POLICY "Designers can view feedback on own projects"
  ON feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = feedback.game_project_id
      AND designer_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own feedback"
  ON feedback FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "Registered users can submit feedback"
  ON feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM session_registrations
      WHERE session_id = feedback.session_id
      AND user_id = auth.uid()
    )
  );

-- Iterations RLS Policies
CREATE POLICY "Everyone can view iterations for public projects"
  ON game_iterations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = game_iterations.game_project_id
      AND ((is_active = true AND visibility = 'public') OR designer_id = auth.uid())
    )
  );

CREATE POLICY "Designers can manage own project iterations"
  ON game_iterations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM game_projects
      WHERE id = game_iterations.game_project_id
      AND designer_id = auth.uid()
    )
  );

-- Point Transactions RLS Policies
CREATE POLICY "Users can view own point transactions"
  ON point_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Badges RLS Policies
CREATE POLICY "Everyone can view non-hidden badges"
  ON badges FOR SELECT
  USING (is_hidden = false);

-- User Badges RLS Policies
CREATE POLICY "Everyone can view earned badges"
  ON user_badges FOR SELECT
  USING (true);

-- Notifications RLS Policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
