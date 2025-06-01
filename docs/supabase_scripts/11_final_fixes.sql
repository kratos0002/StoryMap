-- SQL Script to fix the final backend function issues for enhanced discovery features
-- This script addresses the remaining ambiguous column reference in the recommendation function

-- Fix 1: Drop and recreate the find_similar_stories function to fix ambiguous column reference
DROP FUNCTION IF EXISTS find_similar_stories(uuid,integer);

CREATE OR REPLACE FUNCTION find_similar_stories(
  p_story_id UUID,
  p_limit INT DEFAULT 5
) RETURNS TABLE (
  result_story_id UUID,
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
      s.id AS result_id,
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
      ) AS calc_similarity_score
    FROM stories s
    WHERE s.id <> p_story_id
  )
  SELECT 
    result_id AS result_story_id,
    calc_similarity_score AS similarity_score
  FROM story_similarity
  WHERE calc_similarity_score > 0
  ORDER BY calc_similarity_score DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Fix 2: Create a function to associate stories with sample metadata for testing
CREATE OR REPLACE FUNCTION associate_sample_metadata() RETURNS void AS $$
DECLARE
  mythical_theme_id UUID;
  mystery_tag_id UUID;
  victorian_era_id UUID;
  intermediate_level_id UUID;
  sample_story_id UUID;
BEGIN
  -- Get sample story ID
  SELECT id INTO sample_story_id FROM stories LIMIT 1;
  
  IF sample_story_id IS NULL THEN
    RAISE NOTICE 'No stories found in the database';
    RETURN;
  END IF;
  
  -- Get IDs for sample metadata
  SELECT id INTO mythical_theme_id FROM themes WHERE name = 'Mythical' LIMIT 1;
  SELECT id INTO mystery_tag_id FROM tags WHERE name = 'Mystery' AND category = 'mood' LIMIT 1;
  SELECT id INTO victorian_era_id FROM time_periods WHERE name = 'Victorian Era' LIMIT 1;
  SELECT id INTO intermediate_level_id FROM reading_levels WHERE name = 'Intermediate' LIMIT 1;
  
  -- Associate sample story with metadata if IDs exist
  IF mythical_theme_id IS NOT NULL THEN
    INSERT INTO story_themes (story_id, theme_id)
    VALUES (sample_story_id, mythical_theme_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
  IF mystery_tag_id IS NOT NULL THEN
    INSERT INTO story_tags (story_id, tag_id)
    VALUES (sample_story_id, mystery_tag_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
  IF victorian_era_id IS NOT NULL THEN
    INSERT INTO story_time_periods (story_id, time_period_id)
    VALUES (sample_story_id, victorian_era_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
  IF intermediate_level_id IS NOT NULL THEN
    INSERT INTO story_reading_levels (story_id, reading_level_id)
    VALUES (sample_story_id, intermediate_level_id)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- Update the story's publication year to match Victorian Era for filtered search testing
  UPDATE stories
  SET publication_year = 1850
  WHERE id = sample_story_id;
END;
$$ LANGUAGE plpgsql;

-- Execute the functions to update search vectors, word counts, and associate sample metadata
SELECT update_all_search_vectors();
SELECT update_story_word_counts();
SELECT associate_sample_metadata();
