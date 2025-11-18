-- BoardGameBoost Seed Data Migration
-- Created: 2025-11-18

-- =====================================================
-- SEED BADGES
-- =====================================================

INSERT INTO badges (name, description, icon, category, criteria, tier) VALUES
-- Milestone Badges
('First Feedback', 'Submitted your first piece of feedback', '✍️', 'milestone', '{"type": "feedback_count", "threshold": 1}'::jsonb, 'bronze'),
('Creator', 'Created your first game project', '💡', 'milestone', '{"type": "project_count", "threshold": 1}'::jsonb, 'bronze'),
('First Iteration', 'Completed your first design iteration', '🔄', 'milestone', '{"type": "iteration_count", "threshold": 1}'::jsonb, 'bronze'),

-- Contribution Badges
('Helpful Tester', 'Participated in 5 playtests', '🎯', 'contribution', '{"type": "sessions_attended", "threshold": 5}'::jsonb, 'bronze'),
('Prolific Tester', 'Participated in 10 playtests', '🔬', 'contribution', '{"type": "sessions_attended", "threshold": 10}'::jsonb, 'silver'),
('Testing Legend', 'Participated in 25 playtests', '🏅', 'contribution', '{"type": "sessions_attended", "threshold": 25}'::jsonb, 'gold'),
('Feedback Master', 'Provided 20 quality feedback submissions', '📝', 'contribution', '{"type": "feedback_count", "threshold": 20}'::jsonb, 'silver'),
('Community Champion', 'Earned 1000 contribution points', '🏆', 'contribution', '{"type": "contribution_points", "threshold": 1000}'::jsonb, 'gold'),

-- Publishing Badges
('In Progress', 'Have 3 active projects simultaneously', '🎨', 'publishing', '{"type": "active_project_count", "threshold": 3}'::jsonb, 'bronze'),
('Iterative Designer', 'Completed 3 iterations on a single game', '🔁', 'publishing', '{"type": "project_iteration_count", "threshold": 3}'::jsonb, 'silver'),
('Published Designer', 'Successfully published a game', '🎉', 'publishing', '{"type": "published_count", "threshold": 1}'::jsonb, 'gold'),
('Prolific Publisher', 'Published 3 games', '⭐', 'publishing', '{"type": "published_count", "threshold": 3}'::jsonb, 'platinum'),

-- Community Badges
('Early Adopter', 'Joined during beta period', '🌟', 'special', '{"type": "manual", "threshold": 0}'::jsonb, 'bronze'),
('Mentor', 'Helped 5 new designers with feedback', '👨‍🏫', 'community', '{"type": "mentor_count", "threshold": 5}'::jsonb, 'gold'),
('Collaborator', 'Co-designed a game with another member', '🤝', 'community', '{"type": "collaboration_count", "threshold": 1}'::jsonb, 'silver');

-- =====================================================
-- CREATE REFERENCE TABLES
-- =====================================================

-- Mechanics Reference Table
CREATE TABLE IF NOT EXISTS mechanics_reference (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed common mechanics
INSERT INTO mechanics_reference (name, category) VALUES
-- Worker Placement & Action Selection
('Worker Placement', 'action_selection'),
('Action Queue', 'action_selection'),
('Action Drafting', 'action_selection'),
('Variable Player Powers', 'action_selection'),

-- Card Mechanisms
('Deck Building', 'cards'),
('Hand Management', 'cards'),
('Card Drafting', 'cards'),
('Trick-taking', 'cards'),

-- Dice & Randomness
('Dice Rolling', 'randomness'),
('Push Your Luck', 'randomness'),
('Chit-Pull System', 'randomness'),

-- Territory & Area Control
('Area Control', 'territory'),
('Area Majority', 'territory'),
('Grid Movement', 'territory'),
('Tile Placement', 'territory'),

-- Resource Management
('Resource Management', 'resources'),
('Engine Building', 'resources'),
('Set Collection', 'resources'),
('Trading', 'resources'),

-- Cooperative & Social
('Cooperative Game', 'social'),
('Traitor Game', 'social'),
('Negotiation', 'social'),
('Voting', 'social'),

-- Other Popular Mechanics
('Pattern Building', 'puzzle'),
('Auction Bidding', 'economic'),
('Route Building', 'network'),
('Legacy Game', 'campaign'),
('Real-Time', 'time_pressure'),
('Storytelling', 'narrative')
ON CONFLICT (name) DO NOTHING;

-- Themes Reference Table
CREATE TABLE IF NOT EXISTS themes_reference (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed common themes
INSERT INTO themes_reference (name) VALUES
('Fantasy'),
('Science Fiction'),
('Medieval'),
('Ancient Civilizations'),
('Economic'),
('Abstract'),
('Horror'),
('Adventure'),
('Pirates'),
('Space Exploration'),
('City Building'),
('Farming'),
('Animals'),
('Mystery'),
('War'),
('Mythology'),
('Post-Apocalyptic'),
('Steampunk'),
('Renaissance'),
('Transportation'),
('Nature'),
('Exploration'),
('Politics'),
('Educational')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to calculate queue priority
CREATE OR REPLACE FUNCTION calculate_queue_priority(
  p_designer_id UUID,
  p_submitted_at TIMESTAMPTZ
)
RETURNS INTEGER AS $$
DECLARE
  v_priority INTEGER := 0;
  v_designer profiles%ROWTYPE;
  v_days_waiting INTEGER;
BEGIN
  -- Get designer info
  SELECT * INTO v_designer FROM profiles WHERE id = p_designer_id;

  -- Membership tier bonus
  IF v_designer.membership_tier = 'premium' THEN
    v_priority := v_priority + 100;
  ELSE
    v_priority := v_priority + 50;
  END IF;

  -- Contribution bonus (capped at 50)
  v_priority := v_priority + LEAST(v_designer.total_testing_points * 2, 50);

  -- Time waiting (5 points per day)
  v_days_waiting := EXTRACT(DAY FROM NOW() - p_submitted_at)::INTEGER;
  v_priority := v_priority + (v_days_waiting * 5);

  RETURN v_priority;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate priority on queue insert/update
CREATE OR REPLACE FUNCTION update_queue_priority()
RETURNS TRIGGER AS $$
DECLARE
  v_designer_id UUID;
BEGIN
  IF NEW.status = 'queued' THEN
    -- Get designer_id from project
    SELECT designer_id INTO v_designer_id
    FROM game_projects
    WHERE id = NEW.game_project_id;

    -- Calculate and set priority
    NEW.priority := calculate_queue_priority(v_designer_id, NEW.submitted_at);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER queue_priority_trigger
  BEFORE INSERT OR UPDATE ON queue_entries
  FOR EACH ROW EXECUTE FUNCTION update_queue_priority();

-- Function to award points
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

-- Trigger to award points on feedback submission
CREATE OR REPLACE FUNCTION award_feedback_points()
RETURNS TRIGGER AS $$
DECLARE
  v_designer_id UUID;
BEGIN
  -- Award points to playtester
  PERFORM award_points(
    NEW.player_id,
    'playtest_given',
    10,
    'Provided feedback on playtest session',
    NEW.session_id
  );

  -- Award points to designer
  SELECT designer_id INTO v_designer_id
  FROM game_projects
  WHERE id = NEW.game_project_id;

  PERFORM award_points(
    v_designer_id,
    'game_tested',
    5,
    'Received playtest feedback',
    NEW.session_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER feedback_points_trigger
  AFTER INSERT ON feedback
  FOR EACH ROW EXECUTE FUNCTION award_feedback_points();

-- Trigger to award points on iteration
CREATE OR REPLACE FUNCTION award_iteration_points()
RETURNS TRIGGER AS $$
DECLARE
  v_designer_id UUID;
BEGIN
  SELECT designer_id INTO v_designer_id
  FROM game_projects
  WHERE id = NEW.game_project_id;

  PERFORM award_points(
    v_designer_id,
    'iteration_completed',
    20,
    'Completed iteration ' || NEW.version,
    NEW.id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER iteration_points_trigger
  AFTER INSERT ON game_iterations
  FOR EACH ROW EXECUTE FUNCTION award_iteration_points();
