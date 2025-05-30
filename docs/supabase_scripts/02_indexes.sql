-- StoryMap Supabase Database Indexes
-- This script creates all indexes for optimizing query performance

-- Full text search index for stories
CREATE INDEX IF NOT EXISTS stories_fts ON stories USING GIN (to_tsvector('english', title || ' ' || summary || ' ' || original_text));

-- Geographic search index for locations
CREATE EXTENSION IF NOT EXISTS postgis;

-- Convert lat/long to geography point for spatial queries
ALTER TABLE locations ADD COLUMN IF NOT EXISTS geo_point GEOGRAPHY;
UPDATE locations SET geo_point = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography WHERE geo_point IS NULL;

-- Create spatial index on the geography column
CREATE INDEX IF NOT EXISTS locations_geo_idx ON locations USING GIST (geo_point);

-- Add trigger to automatically update geo_point when lat/long changes
CREATE OR REPLACE FUNCTION update_geo_point()
RETURNS TRIGGER AS $$
BEGIN
  NEW.geo_point = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326)::geography;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_locations_geo_point
  BEFORE INSERT OR UPDATE OF latitude, longitude ON locations
  FOR EACH ROW EXECUTE PROCEDURE update_geo_point();

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS story_authors_story_idx ON story_authors(story_id);
CREATE INDEX IF NOT EXISTS story_authors_author_idx ON story_authors(author_id);
CREATE INDEX IF NOT EXISTS story_locations_story_idx ON story_locations(story_id);
CREATE INDEX IF NOT EXISTS story_locations_location_idx ON story_locations(location_id);
CREATE INDEX IF NOT EXISTS story_themes_story_idx ON story_themes(story_id);
CREATE INDEX IF NOT EXISTS story_themes_theme_idx ON story_themes(theme_id);
CREATE INDEX IF NOT EXISTS translations_story_idx ON translations(story_id);
CREATE INDEX IF NOT EXISTS translations_language_idx ON translations(language_code);
CREATE INDEX IF NOT EXISTS cultural_contexts_story_idx ON cultural_contexts(story_id);
CREATE INDEX IF NOT EXISTS cultural_contexts_language_idx ON cultural_contexts(language_code);
CREATE INDEX IF NOT EXISTS images_story_idx ON images(story_id);
CREATE INDEX IF NOT EXISTS user_interactions_user_idx ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS user_interactions_story_idx ON user_interactions(story_id);

-- Index for slug lookups (commonly used in URLs)
CREATE INDEX IF NOT EXISTS stories_slug_idx ON stories(slug);

-- Index for publication year (for filtering by time period)
CREATE INDEX IF NOT EXISTS stories_publication_year_idx ON stories(publication_year);

-- Index for author name searches
CREATE INDEX IF NOT EXISTS authors_name_idx ON authors USING GIN (to_tsvector('english', name));

-- Index for theme name searches
CREATE INDEX IF NOT EXISTS themes_name_idx ON themes USING GIN (to_tsvector('english', name));
