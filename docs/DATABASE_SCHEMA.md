# BoardGameBoost - Database Schema

**Database:** PostgreSQL (Supabase)
**Version:** 1.0
**Date:** 2025-11-18

---

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [Core Tables](#core-tables)
3. [Relationships](#relationships)
4. [Indexes](#indexes)
5. [Functions & Triggers](#functions--triggers)
6. [Row-Level Security](#row-level-security)
7. [Migration Scripts](#migration-scripts)

---

## Schema Overview

### Entity Relationship Diagram

```
┌─────────────┐
│   profiles  │──┐
└─────────────┘  │
       │         │
       │ 1:N     │
       ▼         │
┌─────────────────────┐
│   game_projects     │──┐
└─────────────────────┘  │
       │                  │
       ├─────┬────┬──────┤
       │ 1:N │ 1:N│ 1:N  │ 1:N
       ▼     ▼    ▼      ▼
┌──────────┐ │ ┌──────┐ ┌──────────┐
│ queue_   │ │ │ game_│ │ project_ │
│ entries  │ │ │ iter │ │ materials│
└──────────┘ │ └──────┘ └──────────┘
             │
             ▼
      ┌────────────────┐
      │  playtest_     │──┐
      │  sessions      │  │
      └────────────────┘  │
             │            │ 1:N
             ├────────────┤
             │ 1:N        ▼
             ▼       ┌──────────────┐
       ┌──────────┐ │   session_   │
       │ feedback │ │ registrations│
       └──────────┘ └──────────────┘

┌─────────────┐
│   profiles  │──┐
└─────────────┘  │
       │         │ 1:N
       ├─────────┴──────┬──────┐
       │ 1:N   1:N      │ 1:N  │ 1:N
       ▼       ▼        ▼      ▼
 ┌───────────┐ ┌──────┐ │ ┌────────────┐
 │ point_    │ │ user_│ │ │notifications│
 │ trans     │ │badges│ │ └────────────┘
 └───────────┘ └──────┘ │
                        │
                   ┌────────┐
                   │ badges │
                   └────────┘
```

---

## Core Tables

### profiles

Extends Supabase auth.users with additional profile data.

```sql
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

-- Indexes
CREATE INDEX idx_profiles_membership ON profiles(membership_tier, membership_status);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_points ON profiles(total_contribution_points DESC);
```

---

### game_projects

Board game projects in various stages of development.

```sql
CREATE TABLE game_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Indexes
CREATE INDEX idx_projects_designer ON game_projects(designer_id);
CREATE INDEX idx_projects_stage ON game_projects(stage);
CREATE INDEX idx_projects_active ON game_projects(is_active);
CREATE INDEX idx_projects_designer_stage ON game_projects(designer_id, stage, is_active);
CREATE INDEX idx_projects_search ON game_projects USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_projects_mechanics ON game_projects USING gin(mechanics);
```

---

### project_materials

File attachments for game projects (rules, images, etc.).

```sql
CREATE TABLE project_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,

  -- File Info
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Path in Supabase Storage
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL, -- bytes

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

-- Indexes
CREATE INDEX idx_materials_project ON project_materials(project_id);
CREATE INDEX idx_materials_type ON project_materials(material_type);
```

---

### playtest_sessions

Scheduled playtesting sessions.

```sql
CREATE TABLE playtest_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,
  facilitator_id UUID NOT NULL REFERENCES profiles(id),

  -- Schedule
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL DEFAULT 120, -- minutes

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
  internal_notes TEXT, -- Admin only

  -- Results
  actual_start_time TIMESTAMPTZ,
  actual_end_time TIMESTAMPTZ,
  attendance_count INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT future_date CHECK (scheduled_date > created_at),
  CONSTRAINT venue_link CHECK (
    (venue_type = 'online' AND online_link IS NOT NULL) OR
    (venue_type != 'online')
  )
);

-- Indexes
CREATE INDEX idx_sessions_project ON playtest_sessions(game_project_id);
CREATE INDEX idx_sessions_date ON playtest_sessions(scheduled_date);
CREATE INDEX idx_sessions_status ON playtest_sessions(status);
CREATE INDEX idx_sessions_status_date ON playtest_sessions(status, scheduled_date);
```

---

### session_registrations

User registrations for playtest sessions.

```sql
CREATE TABLE session_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Indexes
CREATE INDEX idx_registrations_session ON session_registrations(session_id);
CREATE INDEX idx_registrations_user ON session_registrations(user_id);
CREATE INDEX idx_registrations_status ON session_registrations(status);
```

---

### queue_entries

Playtest queue management.

```sql
CREATE TABLE queue_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(game_project_id) WHERE status IN ('queued', 'scheduled')
);

-- Indexes
CREATE INDEX idx_queue_status ON queue_entries(status);
CREATE INDEX idx_queue_priority ON queue_entries(priority DESC) WHERE status = 'queued';
CREATE INDEX idx_queue_project ON queue_entries(game_project_id);
```

---

### feedback

Structured feedback from playtest sessions.

```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  quality_score INTEGER, -- Admin rated (1-5)

  -- Designer Response
  designer_response TEXT,
  designer_responded_at TIMESTAMPTZ,

  -- Timestamps
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(session_id, player_id)
);

-- Indexes
CREATE INDEX idx_feedback_session ON feedback(session_id);
CREATE INDEX idx_feedback_project ON feedback(game_project_id);
CREATE INDEX idx_feedback_player ON feedback(player_id);
CREATE INDEX idx_feedback_ratings ON feedback(
  (rating_fun + rating_clarity + rating_balance + rating_theme + rating_mechanics) / 5.0
);
```

---

### game_iterations

Version history and iteration tracking.

```sql
CREATE TABLE game_iterations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_project_id UUID NOT NULL REFERENCES game_projects(id) ON DELETE CASCADE,

  -- Version
  version TEXT NOT NULL,
  changes_description TEXT NOT NULL,

  -- Feedback Links
  inspiring_feedback_ids UUID[], -- Array of feedback IDs

  -- Materials
  has_new_materials BOOLEAN NOT NULL DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Indexes
CREATE INDEX idx_iterations_project ON game_iterations(game_project_id);
CREATE INDEX idx_iterations_date ON game_iterations(created_at DESC);
```

---

### point_transactions

Gamification point history.

```sql
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  related_entity_type TEXT, -- 'session', 'feedback', 'project', etc.
  related_entity_id UUID,

  -- Admin
  admin_id UUID REFERENCES profiles(id), -- If admin adjustment

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_user ON point_transactions(user_id);
CREATE INDEX idx_transactions_type ON point_transactions(type);
CREATE INDEX idx_transactions_date ON point_transactions(created_at DESC);
```

---

### badges

Achievement badge definitions.

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- Emoji or icon name
  category TEXT NOT NULL CHECK (category IN (
    'milestone',
    'contribution',
    'publishing',
    'community',
    'special'
  )),

  -- Criteria (JSONB for flexibility)
  criteria JSONB NOT NULL,
  -- Example: {"type": "project_count", "threshold": 5}
  -- Example: {"type": "feedback_count", "threshold": 10}

  -- Display
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  is_hidden BOOLEAN NOT NULL DEFAULT false, -- Secret achievements

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data
INSERT INTO badges (name, description, icon, category, criteria) VALUES
('First Feedback', 'Submitted your first piece of feedback', '✍️', 'milestone', '{"type": "feedback_count", "threshold": 1}'),
('Prolific Tester', 'Participated in 10 playtests', '🔬', 'contribution', '{"type": "sessions_attended", "threshold": 10}'),
('Creator', 'Created your first game project', '💡', 'milestone', '{"type": "project_count", "threshold": 1}'),
('Published Designer', 'Successfully published a game', '🎉', 'publishing', '{"type": "published_count", "threshold": 1}'),
('Community Champion', 'Earned 1000 contribution points', '🏆', 'contribution', '{"type": "contribution_points", "threshold": 1000}');
```

---

### user_badges

User-earned badges.

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,

  -- Timestamps
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  UNIQUE(user_id, badge_id)
);

-- Indexes
CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);
```

---

### notifications

In-app notification system.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_date ON notifications(created_at DESC);
```

---

## Functions & Triggers

### Auto-update `updated_at` timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON game_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON playtest_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Calculate Queue Priority

```sql
CREATE OR REPLACE FUNCTION calculate_queue_priority(
  designer_id UUID,
  submitted_at TIMESTAMPTZ
)
RETURNS INTEGER AS $$
DECLARE
  priority INTEGER := 0;
  designer profiles%ROWTYPE;
  days_waiting INTEGER;
BEGIN
  -- Get designer info
  SELECT * INTO designer FROM profiles WHERE id = designer_id;

  -- Membership tier bonus
  IF designer.membership_tier = 'premium' THEN
    priority := priority + 100;
  ELSE
    priority := priority + 50;
  END IF;

  -- Contribution bonus (capped at 50)
  priority := priority + LEAST(designer.total_testing_points * 2, 50);

  -- Time waiting
  days_waiting := EXTRACT(DAY FROM NOW() - submitted_at);
  priority := priority + (days_waiting * 5);

  RETURN priority;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate priority on insert/update
CREATE OR REPLACE FUNCTION update_queue_priority()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'queued' THEN
    NEW.priority := calculate_queue_priority(
      (SELECT designer_id FROM game_projects WHERE id = NEW.game_project_id),
      NEW.submitted_at
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER queue_priority_trigger
  BEFORE INSERT OR UPDATE ON queue_entries
  FOR EACH ROW EXECUTE FUNCTION update_queue_priority();
```

### Award Points Function

```sql
CREATE OR REPLACE FUNCTION award_points(
  p_user_id UUID,
  p_type TEXT,
  p_points INTEGER,
  p_description TEXT,
  p_related_entity_id UUID DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  -- Insert transaction
  INSERT INTO point_transactions (user_id, type, points, description, related_entity_id)
  VALUES (p_user_id, p_type, p_points, p_description, p_related_entity_id);

  -- Update user totals
  IF p_type IN ('playtest_given', 'game_tested') THEN
    UPDATE profiles
    SET total_testing_points = total_testing_points + p_points
    WHERE id = p_user_id;
  ELSE
    UPDATE profiles
    SET total_contribution_points = total_contribution_points + p_points
    WHERE id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Check Badge Unlocks

```sql
CREATE OR REPLACE FUNCTION check_badge_unlocks(p_user_id UUID)
RETURNS void AS $$
DECLARE
  user_rec profiles%ROWTYPE;
  badge_rec badges%ROWTYPE;
  criteria_type TEXT;
  threshold INTEGER;
  actual_value INTEGER;
BEGIN
  SELECT * INTO user_rec FROM profiles WHERE id = p_user_id;

  FOR badge_rec IN SELECT * FROM badges WHERE id NOT IN (
    SELECT badge_id FROM user_badges WHERE user_id = p_user_id
  ) LOOP
    criteria_type := badge_rec.criteria->>'type';
    threshold := (badge_rec.criteria->>'threshold')::INTEGER;

    -- Check criteria
    CASE criteria_type
      WHEN 'contribution_points' THEN
        actual_value := user_rec.total_contribution_points;
      WHEN 'project_count' THEN
        SELECT COUNT(*) INTO actual_value
        FROM game_projects
        WHERE designer_id = p_user_id AND is_active = true;
      WHEN 'feedback_count' THEN
        SELECT COUNT(*) INTO actual_value
        FROM feedback
        WHERE player_id = p_user_id;
      WHEN 'sessions_attended' THEN
        SELECT COUNT(*) INTO actual_value
        FROM session_registrations
        WHERE user_id = p_user_id AND status = 'attended';
      WHEN 'published_count' THEN
        SELECT COUNT(*) INTO actual_value
        FROM game_projects
        WHERE designer_id = p_user_id AND stage = 'published';
      ELSE
        CONTINUE;
    END CASE;

    -- Award badge if threshold met
    IF actual_value >= threshold THEN
      INSERT INTO user_badges (user_id, badge_id)
      VALUES (p_user_id, badge_rec.id);

      -- Award bonus points
      PERFORM award_points(
        p_user_id,
        'badge_earned',
        50,
        'Earned badge: ' || badge_rec.name,
        badge_rec.id
      );

      -- Send notification
      INSERT INTO notifications (user_id, type, title, message)
      VALUES (
        p_user_id,
        'badge_unlocked',
        'Badge Unlocked!',
        'You earned the "' || badge_rec.name || '" badge!'
      );
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Row-Level Security

### Enable RLS on all tables

```sql
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
```

### Sample RLS Policies

See [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md#row-level-security-rls-policies) for complete policy definitions.

---

## Migration Scripts

### Initial Schema Migration

```sql
-- migrations/001_initial_schema.sql

-- Create profiles table
-- (See full table definitions above)

-- Create game_projects table
-- ...

-- Create all other tables
-- ...

-- Create indexes
-- ...

-- Create functions
-- ...

-- Enable RLS
-- ...

-- Create RLS policies
-- ...
```

### Seed Data

```sql
-- migrations/002_seed_data.sql

-- Insert default badges
-- (Already shown in badges table section)

-- Insert example mechanics
CREATE TABLE IF NOT EXISTS mechanics_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO mechanics_reference (name) VALUES
('Worker Placement'),
('Deck Building'),
('Hand Management'),
('Set Collection'),
('Tile Placement'),
('Dice Rolling'),
('Area Control'),
('Cooperative'),
('Engine Building'),
('Drafting');
```

---

## Maintenance

### Vacuum & Analyze

```sql
-- Run periodically (automated in Supabase)
VACUUM ANALYZE;
```

### Index Maintenance

```sql
-- Check index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- Rebuild index if needed
REINDEX INDEX idx_name;
```

---

**Document Status:** Living document
**Last Updated:** 2025-11-18
**Next Review:** After schema changes
