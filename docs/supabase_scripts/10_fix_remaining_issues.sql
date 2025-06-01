-- SQL Script to fix remaining backend function issues for enhanced discovery features
-- This script addresses the issues found during re-validation

-- Fix 1: Drop and recreate the find_similar_stories function to fix ambiguous column reference
DROP FUNCTION IF EXISTS find_similar_stories(uuid,integer);

CREATE OR REPLACE FUNCTION find_similar_stories(
  p_story_id UUID,
  p_limit INT DEFAULT 5
) RETURNS TABLE (
  similar_story_id UUID,
  similarity_score FLOAT
) AS $$
DECLARE
  theme_ids UUID[];
  tag_ids UUID[];
  location_ids UUID[];
  time_period_ids UUID[];
BEGIN
  -- Get the theme IDs for the source story
  SELECT array_agg(theme_id) INTO theme_ids
  FROM story_themes
  WHERE story_themes.story_id = p_story_id;
  
  -- Get the tag IDs for the source story
  SELECT array_agg(tag_id) INTO tag_ids
  FROM story_tags
  WHERE story_tags.story_id = p_story_id;
  
  -- Get the location IDs for the source story
  SELECT array_agg(location_id) INTO location_ids
  FROM story_locations
  WHERE story_locations.story_id = p_story_id;
  
  -- Get the time period IDs for the source story
  SELECT array_agg(time_period_id) INTO time_period_ids
  FROM story_time_periods
  WHERE story_time_periods.story_id = p_story_id;
  
  -- Return similar stories based on overlapping metadata
  RETURN QUERY
  WITH story_similarity AS (
    SELECT 
      s.id AS similar_story_id,
      (
        -- Theme similarity (weight: 0.4)
        (CASE WHEN theme_ids IS NOT NULL THEN
          (SELECT COUNT(*) FROM story_themes st WHERE st.story_id = s.id AND st.theme_id = ANY(theme_ids))::FLOAT / 
          GREATEST(array_length(theme_ids, 1), 1)
        ELSE 0 END) * 0.4 +
        
        -- Tag similarity (weight: 0.3)
        (CASE WHEN tag_ids IS NOT NULL THEN
          (SELECT COUNT(*) FROM story_tags st WHERE st.story_id = s.id AND st.tag_id = ANY(tag_ids))::FLOAT / 
          GREATEST(array_length(tag_ids, 1), 1)
        ELSE 0 END) * 0.3 +
        
        -- Location similarity (weight: 0.2)
        (CASE WHEN location_ids IS NOT NULL THEN
          (SELECT COUNT(*) FROM story_locations sl WHERE sl.story_id = s.id AND sl.location_id = ANY(location_ids))::FLOAT / 
          GREATEST(array_length(location_ids, 1), 1)
        ELSE 0 END) * 0.2 +
        
        -- Time period similarity (weight: 0.1)
        (CASE WHEN time_period_ids IS NOT NULL THEN
          (SELECT COUNT(*) FROM story_time_periods stp WHERE stp.story_id = s.id AND stp.time_period_id = ANY(time_period_ids))::FLOAT / 
          GREATEST(array_length(time_period_ids, 1), 1)
        ELSE 0 END) * 0.1
      ) AS similarity_score
    FROM stories s
    WHERE s.id <> p_story_id
  )
  SELECT 
    similar_story_id,
    similarity_score
  FROM story_similarity
  WHERE similarity_score > 0
  ORDER BY similarity_score DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Fix 2: Create sample data for testing filtered search
-- Insert sample theme data if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM themes WHERE name = 'Mythical') THEN
    INSERT INTO themes (name) VALUES ('Mythical');
  END IF;
  
  -- Insert sample tag data if not exists
  IF NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Mystery' AND category = 'mood') THEN
    INSERT INTO tags (name, category) VALUES ('Mystery', 'mood');
  END IF;
  
  -- Insert sample time period data if not exists
  IF NOT EXISTS (SELECT 1 FROM time_periods WHERE name = 'Victorian Era') THEN
    INSERT INTO time_periods (name, start_year, end_year, description) 
    VALUES ('Victorian Era', 1837, 1901, 'Literature from the reign of Queen Victoria of England');
  END IF;
  
  -- Insert sample reading level data if not exists
  IF NOT EXISTS (SELECT 1 FROM reading_levels WHERE name = 'Intermediate') THEN
    INSERT INTO reading_levels (name, description) 
    VALUES ('Intermediate', 'Content suitable for readers with moderate reading proficiency');
  END IF;
END;
$$;

-- Fix 3: Ensure search_vector column exists and is populated
DO $$
BEGIN
  -- Check if search_vector column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'stories' AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE stories ADD COLUMN search_vector tsvector;
    
    -- Create index on search_vector
    CREATE INDEX IF NOT EXISTS stories_search_idx ON stories USING gin(search_vector);
  END IF;
  
  -- Check if word_count column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'stories' AND column_name = 'word_count'
  ) THEN
    ALTER TABLE stories ADD COLUMN word_count integer;
  END IF;
  
  -- Check if popularity_score column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'stories' AND column_name = 'popularity_score'
  ) THEN
    ALTER TABLE stories ADD COLUMN popularity_score float;
    
    -- Set default popularity scores
    UPDATE stories SET popularity_score = 1.0;
  END IF;
  
  -- Check if writing_era column exists, if not add it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'stories' AND column_name = 'writing_era'
  ) THEN
    ALTER TABLE stories ADD COLUMN writing_era text;
  END IF;
END;
$$;

-- Execute the functions to update search vectors and word counts
SELECT update_all_search_vectors();
SELECT update_story_word_counts();
