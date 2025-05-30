-- StoryMap Supabase Data Migration Script
-- This script provides a template for migrating existing story data to Supabase

-- Insert themes
INSERT INTO themes (name, description) VALUES
('Horror', 'Stories that evoke fear, dread, and the macabre'),
('Romance', 'Stories focused on romantic relationships and love'),
('Mystery', 'Stories involving puzzles, secrets, and investigations'),
('Adventure', 'Stories of exciting journeys and challenges'),
('Supernatural', 'Stories involving paranormal or otherworldly elements'),
('Social Commentary', 'Stories that examine social issues and human behavior'),
('Tragedy', 'Stories with unhappy endings or suffering protagonists'),
('Comedy', 'Humorous or lighthearted stories'),
('Folklore', 'Traditional stories passed down through generations'),
('Historical', 'Stories set in or about specific historical periods');

-- Example of inserting an author
INSERT INTO authors (name, birth_year, death_year, nationality, bio)
VALUES (
  'Edgar Allan Poe',
  1809,
  1849,
  'American',
  'Edgar Allan Poe was an American writer, poet, editor, and literary critic. Poe is best known for his poetry and short stories, particularly his tales of mystery and the macabre.'
);

-- Example of inserting a location
INSERT INTO locations (name, latitude, longitude, location_type, country_code, region, description)
VALUES (
  'Baltimore, Maryland',
  39.2904,
  -76.6122,
  'real',
  'US',
  'Maryland',
  'The city where Edgar Allan Poe died and is buried.'
);

-- Example of inserting a story
INSERT INTO stories (
  title,
  slug,
  original_language,
  original_text,
  summary,
  reading_time_minutes,
  publication_year,
  is_public_domain,
  source_url
)
VALUES (
  'The Tell-Tale Heart',
  'the-tell-tale-heart',
  'en',
  'TRUE! --nervous --very, very dreadfully nervous I had been and am; but why will you say that I am mad?...',
  'A narrator attempts to convince the reader of their sanity while describing a murder they committed.',
  15,
  1843,
  true,
  'https://www.gutenberg.org/files/2148/2148-h/2148-h.htm#link2H_4_0010'
);

-- Get the IDs for the inserted records
DO $$
DECLARE
  poe_id UUID;
  baltimore_id UUID;
  telltale_id UUID;
  horror_id UUID;
  supernatural_id UUID;
BEGIN
  -- Get author ID
  SELECT id INTO poe_id FROM authors WHERE name = 'Edgar Allan Poe';
  
  -- Get location ID
  SELECT id INTO baltimore_id FROM locations WHERE name = 'Baltimore, Maryland';
  
  -- Get story ID
  SELECT id INTO telltale_id FROM stories WHERE slug = 'the-tell-tale-heart';
  
  -- Get theme IDs
  SELECT id INTO horror_id FROM themes WHERE name = 'Horror';
  SELECT id INTO supernatural_id FROM themes WHERE name = 'Supernatural';
  
  -- Link author to story
  INSERT INTO story_authors (story_id, author_id)
  VALUES (telltale_id, poe_id);
  
  -- Link location to story
  INSERT INTO story_locations (story_id, location_id, location_role)
  VALUES (telltale_id, baltimore_id, 'origin');
  
  -- Link themes to story
  INSERT INTO story_themes (story_id, theme_id)
  VALUES 
    (telltale_id, horror_id),
    (telltale_id, supernatural_id);
    
  -- Add cultural context
  INSERT INTO cultural_contexts (story_id, context_text, language_code)
  VALUES (
    telltale_id,
    'Published in 1843, "The Tell-Tale Heart" reflects the psychological horror that was becoming popular in the American Gothic tradition. The story was written during a turbulent time in Poe''s life, when he was struggling with poverty and his wife''s illness.',
    'en'
  );
  
  -- Add image
  INSERT INTO images (story_id, image_url, image_type, alt_text, attribution)
  VALUES (
    telltale_id,
    'https://example.com/images/tell-tale-heart.jpg',
    'cover',
    'Illustration of a beating heart beneath floorboards',
    'Public domain illustration from 1919 edition'
  );
END $$;
