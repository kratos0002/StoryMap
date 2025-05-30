-- StoryMap Supabase Row Level Security Policies
-- This script sets up security policies for controlling access to data

-- Enable Row Level Security on tables
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_contexts ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Public read access to stories and related content
CREATE POLICY "Public stories are viewable by everyone" 
  ON stories FOR SELECT USING (true);

CREATE POLICY "Public authors are viewable by everyone" 
  ON authors FOR SELECT USING (true);

CREATE POLICY "Public story_authors are viewable by everyone" 
  ON story_authors FOR SELECT USING (true);

CREATE POLICY "Public locations are viewable by everyone" 
  ON locations FOR SELECT USING (true);

CREATE POLICY "Public story_locations are viewable by everyone" 
  ON story_locations FOR SELECT USING (true);

CREATE POLICY "Public translations are viewable by everyone" 
  ON translations FOR SELECT USING (true);

CREATE POLICY "Public themes are viewable by everyone" 
  ON themes FOR SELECT USING (true);

CREATE POLICY "Public story_themes are viewable by everyone" 
  ON story_themes FOR SELECT USING (true);

CREATE POLICY "Public cultural_contexts are viewable by everyone" 
  ON cultural_contexts FOR SELECT USING (true);

CREATE POLICY "Public images are viewable by everyone" 
  ON images FOR SELECT USING (true);

-- User profile policies
CREATE POLICY "Users can view any profile" 
  ON user_profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- User interaction policies
CREATE POLICY "Users can view their own interactions" 
  ON user_interactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interactions" 
  ON user_interactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions" 
  ON user_interactions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions" 
  ON user_interactions FOR DELETE USING (auth.uid() = user_id);

-- Admin policies (assuming an admin role exists)
-- Note: These would be implemented once you have an admin role defined
-- CREATE POLICY "Admins can do anything with stories"
--   ON stories USING (auth.uid() IN (SELECT user_id FROM admin_users));
