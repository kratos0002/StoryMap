-- SQL Script to fix backend function and view errors for enhanced discovery features
-- This script addresses the issues found during validation testing

-- Fix 1: Drop and recreate the search_stories function to fix type mismatch
DROP FUNCTION IF EXISTS search_stories(text,text[],text[],text[],text[],text,integer,integer,integer);

CREATE OR REPLACE FUNCTION search_stories(
  p_query TEXT DEFAULT NULL,
  p_themes TEXT[] DEFAULT NULL,
  p_tags TEXT[] DEFAULT NULL,
  p_time_periods TEXT[] DEFAULT NULL,
  p_regions TEXT[] DEFAULT NULL,
  p_reading_level TEXT DEFAULT NULL,
  p_min_year INT DEFAULT NULL,
  p_max_year INT DEFAULT NULL,
  p_limit INT DEFAULT 50
) RETURNS SETOF stories AS $$
DECLARE
  query_filter TEXT := '';
  theme_filter TEXT := '';
  tag_filter TEXT := '';
  time_period_filter TEXT := '';
  region_filter TEXT := '';
  reading_level_filter TEXT := '';
  year_filter TEXT := '';
  final_query TEXT;
BEGIN
  -- Text search filter
  IF p_query IS NOT NULL AND p_query <> '' THEN
    query_filter := 'AND stories.search_vector @@ plainto_tsquery(''english'', ' || quote_literal(p_query) || ')';
  END IF;
  
  -- Theme filter
  IF p_themes IS NOT NULL AND array_length(p_themes, 1) > 0 THEN
    theme_filter := 'AND EXISTS (
      SELECT 1 FROM story_themes st
      JOIN themes t ON st.theme_id = t.id
      WHERE st.story_id = stories.id AND t.name = ANY(' || quote_literal(p_themes) || '::text[])
    )';
  END IF;
  
  -- Tag filter
  IF p_tags IS NOT NULL AND array_length(p_tags, 1) > 0 THEN
    tag_filter := 'AND EXISTS (
      SELECT 1 FROM story_tags st
      JOIN tags t ON st.tag_id = t.id
      WHERE st.story_id = stories.id AND t.name = ANY(' || quote_literal(p_tags) || '::text[])
    )';
  END IF;
  
  -- Time period filter
  IF p_time_periods IS NOT NULL AND array_length(p_time_periods, 1) > 0 THEN
    time_period_filter := 'AND EXISTS (
      SELECT 1 FROM story_time_periods stp
      JOIN time_periods tp ON stp.time_period_id = tp.id
      WHERE stp.story_id = stories.id AND tp.name = ANY(' || quote_literal(p_time_periods) || '::text[])
    )';
  END IF;
  
  -- Region filter
  IF p_regions IS NOT NULL AND array_length(p_regions, 1) > 0 THEN
    region_filter := 'AND EXISTS (
      SELECT 1 FROM story_locations sl
      JOIN locations l ON sl.location_id = l.id
      WHERE sl.story_id = stories.id AND l.region = ANY(' || quote_literal(p_regions) || '::text[])
    )';
  END IF;
  
  -- Reading level filter
  IF p_reading_level IS NOT NULL AND p_reading_level <> '' THEN
    reading_level_filter := 'AND EXISTS (
      SELECT 1 FROM story_reading_levels srl
      JOIN reading_levels rl ON srl.reading_level_id = rl.id
      WHERE srl.story_id = stories.id AND rl.name = ' || quote_literal(p_reading_level) || '
    )';
  END IF;
  
  -- Year range filter
  IF p_min_year IS NOT NULL OR p_max_year IS NOT NULL THEN
    year_filter := 'AND (';
    IF p_min_year IS NOT NULL THEN
      year_filter := year_filter || 'stories.publication_year >= ' || p_min_year;
    END IF;
    
    IF p_min_year IS NOT NULL AND p_max_year IS NOT NULL THEN
      year_filter := year_filter || ' AND ';
    END IF;
    
    IF p_max_year IS NOT NULL THEN
      year_filter := year_filter || 'stories.publication_year <= ' || p_max_year;
    END IF;
    
    year_filter := year_filter || ')';
  END IF;
  
  -- Construct the final query
  final_query := '
    SELECT stories.* FROM stories
    WHERE true ' ||
    query_filter || ' ' ||
    theme_filter || ' ' ||
    tag_filter || ' ' ||
    time_period_filter || ' ' ||
    region_filter || ' ' ||
    reading_level_filter || ' ' ||
    year_filter || '
    ORDER BY ' || 
    CASE WHEN p_query IS NOT NULL AND p_query <> '' 
      THEN 'ts_rank(stories.search_vector, plainto_tsquery(''english'', ' || quote_literal(p_query) || ')) DESC, '
      ELSE '' 
    END ||
    'stories.popularity_score DESC NULLS LAST, stories.title
    LIMIT ' || p_limit;
  
  -- Execute the query
  RETURN QUERY EXECUTE final_query;
END;
$$ LANGUAGE plpgsql;

-- Fix 2: Drop and recreate the find_similar_stories function to fix ambiguous column reference
DROP FUNCTION IF EXISTS find_similar_stories(uuid,integer);

CREATE OR REPLACE FUNCTION find_similar_stories(
  p_story_id UUID,
  p_limit INT DEFAULT 5
) RETURNS TABLE (
  story_id UUID,
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
  WHERE story_id = p_story_id;
  
  -- Get the tag IDs for the source story
  SELECT array_agg(tag_id) INTO tag_ids
  FROM story_tags
  WHERE story_id = p_story_id;
  
  -- Get the location IDs for the source story
  SELECT array_agg(location_id) INTO location_ids
  FROM story_locations
  WHERE story_id = p_story_id;
  
  -- Get the time period IDs for the source story
  SELECT array_agg(time_period_id) INTO time_period_ids
  FROM story_time_periods
  WHERE story_id = p_story_id;
  
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
    similar_story_id AS story_id,
    similarity_score
  FROM story_similarity
  WHERE similarity_score > 0
  ORDER BY similarity_score DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Fix 3: Create a function to update search vectors for all stories
DROP FUNCTION IF EXISTS update_all_search_vectors();

CREATE OR REPLACE FUNCTION update_all_search_vectors() RETURNS void AS $$
BEGIN
  UPDATE stories
  SET search_vector = 
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(original_text, '')), 'C');
END;
$$ LANGUAGE plpgsql;

-- Fix 4: Create a function to populate word counts for stories
DROP FUNCTION IF EXISTS update_story_word_counts();

CREATE OR REPLACE FUNCTION update_story_word_counts() RETURNS void AS $$
BEGIN
  UPDATE stories
  SET word_count = 
    CASE 
      WHEN original_text IS NOT NULL THEN 
        array_length(regexp_split_to_array(original_text, '\s+'), 1)
      ELSE NULL
    END
  WHERE original_text IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Fix 5: Create a helper view for multi-filter queries
DROP VIEW IF EXISTS view_stories_with_filters;

CREATE OR REPLACE VIEW view_stories_with_filters AS
SELECT 
  s.*,
  array_agg(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) AS themes,
  array_agg(DISTINCT tag.name) FILTER (WHERE tag.name IS NOT NULL) AS tags,
  array_agg(DISTINCT l.region) FILTER (WHERE l.region IS NOT NULL) AS regions,
  array_agg(DISTINCT tp.name) FILTER (WHERE tp.name IS NOT NULL) AS time_periods,
  array_agg(DISTINCT rl.name) FILTER (WHERE rl.name IS NOT NULL) AS reading_levels
FROM 
  stories s
LEFT JOIN story_themes st ON s.id = st.story_id
LEFT JOIN themes t ON st.theme_id = t.id
LEFT JOIN story_tags stag ON s.id = stag.story_id
LEFT JOIN tags tag ON stag.tag_id = tag.id
LEFT JOIN story_locations sl ON s.id = sl.story_id
LEFT JOIN locations l ON sl.location_id = l.id
LEFT JOIN story_time_periods stp ON s.id = stp.story_id
LEFT JOIN time_periods tp ON stp.time_period_id = tp.id
LEFT JOIN story_reading_levels srl ON s.id = srl.story_id
LEFT JOIN reading_levels rl ON srl.reading_level_id = rl.id
GROUP BY s.id;

-- Execute the functions to update search vectors and word counts
SELECT update_all_search_vectors();
SELECT update_story_word_counts();
