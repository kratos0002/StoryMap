-- StoryMap Supabase Functions and Triggers
-- This script creates database functions and triggers for data management

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to relevant tables
CREATE TRIGGER update_stories_modtime
  BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_authors_modtime
  BEFORE UPDATE ON authors
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_locations_modtime
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_translations_modtime
  BEFORE UPDATE ON translations
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_cultural_contexts_modtime
  BEFORE UPDATE ON cultural_contexts
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_user_profiles_modtime
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens, remove special characters
  slug := lower(title);
  slug := regexp_replace(slug, '[^a-z0-9\s]', '', 'g');
  slug := regexp_replace(slug, '\s+', '-', 'g');
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically generate slug on story insert if not provided
CREATE OR REPLACE FUNCTION set_story_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title);
    
    -- Ensure uniqueness by appending a number if needed
    WHILE EXISTS (SELECT 1 FROM stories WHERE slug = NEW.slug AND id != NEW.id) LOOP
      NEW.slug := NEW.slug || '-' || floor(random() * 1000)::text;
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_story_slug_trigger
  BEFORE INSERT OR UPDATE ON stories
  FOR EACH ROW EXECUTE PROCEDURE set_story_slug();

-- Function to calculate reading time based on word count
CREATE OR REPLACE FUNCTION calculate_reading_time(text_content TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
  reading_time INTEGER;
BEGIN
  -- Count words by splitting on whitespace
  word_count := array_length(regexp_split_to_array(text_content, '\s+'), 1);
  
  -- Average reading speed: 200-250 words per minute
  -- Using 225 words per minute as average
  reading_time := GREATEST(1, CEIL(word_count::float / 225));
  
  RETURN reading_time;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically set reading time if not provided
CREATE OR REPLACE FUNCTION set_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reading_time_minutes IS NULL OR NEW.reading_time_minutes = 0 THEN
    NEW.reading_time_minutes := calculate_reading_time(NEW.original_text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_reading_time_trigger
  BEFORE INSERT OR UPDATE ON stories
  FOR EACH ROW EXECUTE PROCEDURE set_reading_time();
