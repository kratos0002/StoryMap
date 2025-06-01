-- StoryMap Enhanced Discovery Features - Schema Extensions
-- This script creates additional tables and modifies existing ones to support enhanced story discovery features

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. New tables for enhanced metadata

-- Reading difficulty levels
CREATE TABLE IF NOT EXISTS reading_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE, -- 'Easy', 'Moderate', 'Advanced'
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default reading levels
INSERT INTO reading_levels (name, description) VALUES
('Easy', 'Simple vocabulary and sentence structure, suitable for beginners or casual reading'),
('Moderate', 'Average complexity with some challenging vocabulary, suitable for most readers'),
('Advanced', 'Complex language, themes, and literary devices, may require focused attention');

-- Time periods for historical context
CREATE TABLE IF NOT EXISTS time_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE, -- 'Victorian Era', 'Renaissance', 'Modern'
  start_year INTEGER NOT NULL,
  end_year INTEGER,  -- NULL for ongoing periods
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common literary time periods
INSERT INTO time_periods (name, start_year, end_year, description) VALUES
('Ancient', -3000, 500, 'Literature from ancient civilizations up to the fall of the Roman Empire'),
('Medieval', 500, 1400, 'Literature from the Middle Ages'),
('Renaissance', 1400, 1600, 'Literature from the European Renaissance period'),
('Enlightenment', 1600, 1800, 'Literature from the Age of Reason and Enlightenment'),
('Romantic', 1800, 1850, 'Literature from the Romantic period'),
('Victorian', 1837, 1901, 'Literature from the Victorian era'),
('Modernist', 1900, 1945, 'Literature from the early to mid-20th century modernist movement'),
('Contemporary', 1945, NULL, 'Literature from the post-World War II era to present day');

-- Story tags for more granular categorization
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL, -- 'literary_device', 'mood', 'subject', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common literary tags by category
-- Literary devices
INSERT INTO tags (name, category) VALUES
('Allegory', 'literary_device'),
('Foreshadowing', 'literary_device'),
('Irony', 'literary_device'),
('Metaphor', 'literary_device'),
('Symbolism', 'literary_device'),
('Unreliable Narrator', 'literary_device');

-- Mood/tone tags
INSERT INTO tags (name, category) VALUES
('Atmospheric', 'mood'),
('Comedic', 'mood'),
('Dark', 'mood'),
('Melancholic', 'mood'),
('Nostalgic', 'mood'),
('Suspenseful', 'mood'),
('Whimsical', 'mood');

-- Subject matter tags
INSERT INTO tags (name, category) VALUES
('Coming of Age', 'subject'),
('Death', 'subject'),
('Family', 'subject'),
('Identity', 'subject'),
('Love', 'subject'),
('Nature', 'subject'),
('Society', 'subject'),
('War', 'subject');

-- 2. Relationship tables

-- Associate stories with reading levels
CREATE TABLE IF NOT EXISTS story_reading_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  reading_level_id UUID REFERENCES reading_levels(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, reading_level_id)
);

-- Associate stories with time periods
CREATE TABLE IF NOT EXISTS story_time_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  time_period_id UUID REFERENCES time_periods(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, time_period_id)
);

-- Associate stories with tags
CREATE TABLE IF NOT EXISTS story_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, tag_id)
);

-- 3. Modifications to existing tables

-- Add fields to stories table
ALTER TABLE stories
ADD COLUMN IF NOT EXISTS word_count INTEGER,
ADD COLUMN IF NOT EXISTS popularity_score NUMERIC(5,2) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS writing_era VARCHAR(100);

-- Update word count for existing stories based on original_text
UPDATE stories
SET word_count = (
  SELECT ARRAY_LENGTH(REGEXP_SPLIT_TO_ARRAY(original_text, '\s+'), 1)
  WHERE original_text IS NOT NULL AND LENGTH(TRIM(original_text)) > 0
);

-- 4. Create indexes for improved query performance

-- Indexes for new tables
CREATE INDEX IF NOT EXISTS idx_reading_levels_name ON reading_levels(name);
CREATE INDEX IF NOT EXISTS idx_time_periods_years ON time_periods(start_year, end_year);
CREATE INDEX IF NOT EXISTS idx_tags_category ON tags(category);

-- Indexes for relationship tables
CREATE INDEX IF NOT EXISTS idx_story_reading_levels_story_id ON story_reading_levels(story_id);
CREATE INDEX IF NOT EXISTS idx_story_reading_levels_level_id ON story_reading_levels(reading_level_id);
CREATE INDEX IF NOT EXISTS idx_story_time_periods_story_id ON story_time_periods(story_id);
CREATE INDEX IF NOT EXISTS idx_story_time_periods_period_id ON story_time_periods(time_period_id);
CREATE INDEX IF NOT EXISTS idx_story_tags_story_id ON story_tags(story_id);
CREATE INDEX IF NOT EXISTS idx_story_tags_tag_id ON story_tags(tag_id);

-- Indexes for new columns in stories table
CREATE INDEX IF NOT EXISTS idx_stories_word_count ON stories(word_count);
CREATE INDEX IF NOT EXISTS idx_stories_popularity_score ON stories(popularity_score);
CREATE INDEX IF NOT EXISTS idx_stories_writing_era ON stories(writing_era);

-- 5. Full-text search configuration

-- Create a function to update the search vector
CREATE OR REPLACE FUNCTION update_story_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector = 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.summary, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.original_text, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add search vector column to stories table
ALTER TABLE stories
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_stories_search_vector ON stories USING GIN(search_vector);

-- Create trigger to update search vector on insert or update
DROP TRIGGER IF EXISTS trig_update_story_search_vector ON stories;
CREATE TRIGGER trig_update_story_search_vector
BEFORE INSERT OR UPDATE ON stories
FOR EACH ROW
EXECUTE FUNCTION update_story_search_vector();

-- Update search vector for existing stories
UPDATE stories
SET search_vector = 
  setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(summary, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(original_text, '')), 'C');

-- 6. Create views for common discovery queries

-- View for stories with complete metadata
CREATE OR REPLACE VIEW view_stories_with_metadata AS
SELECT 
  s.id,
  s.title,
  s.summary,
  s.publication_year,
  s.reading_time_minutes,
  s.word_count,
  s.popularity_score,
  s.writing_era,
  rl.name AS reading_level,
  ARRAY_AGG(DISTINCT t.name) AS themes,
  ARRAY_AGG(DISTINCT tg.name) AS tags,
  ARRAY_AGG(DISTINCT tp.name) AS time_periods,
  ARRAY_AGG(DISTINCT l.region) FILTER (WHERE l.region IS NOT NULL) AS regions
FROM 
  stories s
LEFT JOIN 
  story_reading_levels srl ON s.id = srl.story_id
LEFT JOIN 
  reading_levels rl ON srl.reading_level_id = rl.id
LEFT JOIN 
  story_themes st ON s.id = st.story_id
LEFT JOIN 
  themes t ON st.theme_id = t.id
LEFT JOIN 
  story_tags stg ON s.id = stg.story_id
LEFT JOIN 
  tags tg ON stg.tag_id = tg.id
LEFT JOIN 
  story_time_periods stp ON s.id = stp.story_id
LEFT JOIN 
  time_periods tp ON stp.time_period_id = tp.id
LEFT JOIN 
  story_locations sl ON s.id = sl.story_id
LEFT JOIN 
  locations l ON sl.location_id = l.id
GROUP BY 
  s.id, s.title, s.summary, s.publication_year, s.reading_time_minutes, 
  s.word_count, s.popularity_score, s.writing_era, rl.name;

-- View for story similarity calculation
CREATE OR REPLACE VIEW view_story_similarity_factors AS
SELECT 
  s.id AS story_id,
  ARRAY_AGG(DISTINCT t.id) AS theme_ids,
  ARRAY_AGG(DISTINCT tg.id) AS tag_ids,
  ARRAY_AGG(DISTINCT tp.id) AS time_period_ids,
  ARRAY_AGG(DISTINCT l.id) AS location_ids
FROM 
  stories s
LEFT JOIN 
  story_themes st ON s.id = st.story_id
LEFT JOIN 
  themes t ON st.theme_id = t.id
LEFT JOIN 
  story_tags stg ON s.id = stg.story_id
LEFT JOIN 
  tags tg ON stg.tag_id = tg.id
LEFT JOIN 
  story_time_periods stp ON s.id = stp.story_id
LEFT JOIN 
  time_periods tp ON stp.time_period_id = tp.id
LEFT JOIN 
  story_locations sl ON s.id = sl.story_id
LEFT JOIN 
  locations l ON sl.location_id = l.id
GROUP BY 
  s.id;

-- 7. Create functions for enhanced discovery features

-- Function to find similar stories based on metadata overlap
CREATE OR REPLACE FUNCTION find_similar_stories(p_story_id UUID, p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  story_id UUID,
  similarity_score NUMERIC
) AS $$
DECLARE
  v_theme_ids UUID[];
  v_tag_ids UUID[];
  v_time_period_ids UUID[];
  v_location_ids UUID[];
BEGIN
  -- Get metadata for the source story
  SELECT 
    theme_ids, tag_ids, time_period_ids, location_ids
  INTO 
    v_theme_ids, v_tag_ids, v_time_period_ids, v_location_ids
  FROM 
    view_story_similarity_factors
  WHERE 
    story_id = p_story_id;
  
  -- Calculate similarity scores and return results
  RETURN QUERY
  SELECT 
    vsf.story_id,
    (
      -- Theme overlap (weighted 0.4)
      (COALESCE(ARRAY_LENGTH(ARRAY(SELECT UNNEST(vsf.theme_ids) INTERSECT SELECT UNNEST(v_theme_ids)), 1), 0)::NUMERIC / 
       GREATEST(ARRAY_LENGTH(v_theme_ids, 1), 1)) * 0.4 +
      
      -- Tag overlap (weighted 0.3)
      (COALESCE(ARRAY_LENGTH(ARRAY(SELECT UNNEST(vsf.tag_ids) INTERSECT SELECT UNNEST(v_tag_ids)), 1), 0)::NUMERIC / 
       GREATEST(ARRAY_LENGTH(v_tag_ids, 1), 1)) * 0.3 +
      
      -- Time period overlap (weighted 0.2)
      (COALESCE(ARRAY_LENGTH(ARRAY(SELECT UNNEST(vsf.time_period_ids) INTERSECT SELECT UNNEST(v_time_period_ids)), 1), 0)::NUMERIC / 
       GREATEST(ARRAY_LENGTH(v_time_period_ids, 1), 1)) * 0.2 +
      
      -- Location overlap (weighted 0.1)
      (COALESCE(ARRAY_LENGTH(ARRAY(SELECT UNNEST(vsf.location_ids) INTERSECT SELECT UNNEST(v_location_ids)), 1), 0)::NUMERIC / 
       GREATEST(ARRAY_LENGTH(v_location_ids, 1), 1)) * 0.1
    ) AS similarity_score
  FROM 
    view_story_similarity_factors vsf
  WHERE 
    vsf.story_id != p_story_id
  ORDER BY 
    similarity_score DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function for advanced story search with ranking
CREATE OR REPLACE FUNCTION search_stories(
  p_query TEXT,
  p_themes TEXT[] DEFAULT NULL,
  p_tags TEXT[] DEFAULT NULL,
  p_time_periods TEXT[] DEFAULT NULL,
  p_regions TEXT[] DEFAULT NULL,
  p_reading_level TEXT DEFAULT NULL,
  p_min_year INTEGER DEFAULT NULL,
  p_max_year INTEGER DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  summary TEXT,
  rank NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH filtered_stories AS (
    SELECT 
      s.id,
      s.title,
      s.summary,
      s.search_vector,
      s.publication_year
    FROM 
      stories s
    LEFT JOIN 
      story_themes st ON s.id = st.story_id
    LEFT JOIN 
      themes t ON st.theme_id = t.id
    LEFT JOIN 
      story_tags stg ON s.id = stg.story_id
    LEFT JOIN 
      tags tg ON stg.tag_id = tg.id
    LEFT JOIN 
      story_time_periods stp ON s.id = stp.story_id
    LEFT JOIN 
      time_periods tp ON stp.time_period_id = tp.id
    LEFT JOIN 
      story_locations sl ON s.id = sl.story_id
    LEFT JOIN 
      locations l ON sl.location_id = l.id
    LEFT JOIN 
      story_reading_levels srl ON s.id = srl.story_id
    LEFT JOIN 
      reading_levels rl ON srl.reading_level_id = rl.id
    WHERE
      -- Apply text search if query provided
      (p_query IS NULL OR s.search_vector @@ to_tsquery('english', p_query)) AND
      -- Filter by themes if provided
      (p_themes IS NULL OR t.name = ANY(p_themes)) AND
      -- Filter by tags if provided
      (p_tags IS NULL OR tg.name = ANY(p_tags)) AND
      -- Filter by time periods if provided
      (p_time_periods IS NULL OR tp.name = ANY(p_time_periods)) AND
      -- Filter by regions if provided
      (p_regions IS NULL OR l.region = ANY(p_regions)) AND
      -- Filter by reading level if provided
      (p_reading_level IS NULL OR rl.name = p_reading_level) AND
      -- Filter by publication year range if provided
      (p_min_year IS NULL OR s.publication_year >= p_min_year) AND
      (p_max_year IS NULL OR s.publication_year <= p_max_year)
    GROUP BY 
      s.id, s.title, s.summary, s.search_vector, s.publication_year
  )
  SELECT 
    fs.id,
    fs.title,
    fs.summary,
    CASE 
      WHEN p_query IS NOT NULL THEN ts_rank(fs.search_vector, to_tsquery('english', p_query))
      ELSE 1.0
    END AS rank
  FROM 
    filtered_stories fs
  ORDER BY 
    rank DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- 8. Row Level Security policies for new tables

-- RLS for reading_levels
ALTER TABLE reading_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY reading_levels_select ON reading_levels FOR SELECT USING (true);
CREATE POLICY reading_levels_insert ON reading_levels FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY reading_levels_update ON reading_levels FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY reading_levels_delete ON reading_levels FOR DELETE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- RLS for time_periods
ALTER TABLE time_periods ENABLE ROW LEVEL SECURITY;
CREATE POLICY time_periods_select ON time_periods FOR SELECT USING (true);
CREATE POLICY time_periods_insert ON time_periods FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY time_periods_update ON time_periods FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY time_periods_delete ON time_periods FOR DELETE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- RLS for tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY tags_select ON tags FOR SELECT USING (true);
CREATE POLICY tags_insert ON tags FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY tags_update ON tags FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY tags_delete ON tags FOR DELETE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- RLS for relationship tables
ALTER TABLE story_reading_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY story_reading_levels_select ON story_reading_levels FOR SELECT USING (true);
CREATE POLICY story_reading_levels_insert ON story_reading_levels FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY story_reading_levels_update ON story_reading_levels FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY story_reading_levels_delete ON story_reading_levels FOR DELETE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

ALTER TABLE story_time_periods ENABLE ROW LEVEL SECURITY;
CREATE POLICY story_time_periods_select ON story_time_periods FOR SELECT USING (true);
CREATE POLICY story_time_periods_insert ON story_time_periods FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY story_time_periods_update ON story_time_periods FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY story_time_periods_delete ON story_time_periods FOR DELETE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

ALTER TABLE story_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY story_tags_select ON story_tags FOR SELECT USING (true);
CREATE POLICY story_tags_insert ON story_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY story_tags_update ON story_tags FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
CREATE POLICY story_tags_delete ON story_tags FOR DELETE USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');
