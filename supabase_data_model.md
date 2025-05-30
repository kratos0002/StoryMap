# Supabase Data Model for StoryMap

This document outlines the comprehensive data model for the StoryMap application using Supabase as the backend database.

## Overview

The StoryMap application requires a flexible and scalable data model to handle:
- Stories from various sources and in multiple languages
- Geographic information for map placement
- Cultural context and metadata
- User interactions and preferences
- Translation management

## Database Tables

### 1. stories

Primary table for story content and metadata.

```sql
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  original_language VARCHAR(50) NOT NULL,
  original_text TEXT NOT NULL,
  summary TEXT NOT NULL,
  reading_time_minutes INTEGER NOT NULL,
  publication_year INTEGER,
  is_public_domain BOOLEAN NOT NULL DEFAULT true,
  source_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full text search index
CREATE INDEX stories_fts ON stories USING GIN (to_tsvector('english', title || ' ' || summary || ' ' || original_text));
```

### 2. authors

Information about story authors.

```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  nationality VARCHAR(100),
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. story_authors

Many-to-many relationship between stories and authors (for co-authored works).

```sql
CREATE TABLE story_authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, author_id)
);
```

### 4. locations

Geographic locations associated with stories.

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  latitude NUMERIC(10, 6) NOT NULL,
  longitude NUMERIC(10, 6) NOT NULL,
  location_type VARCHAR(50) NOT NULL, -- 'real', 'fictional', 'approximate'
  country_code VARCHAR(2),
  region VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. story_locations

Many-to-many relationship between stories and locations (stories can have multiple locations).

```sql
CREATE TABLE story_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  location_role VARCHAR(50) NOT NULL, -- 'setting', 'origin', 'mentioned'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, location_id, location_role)
);
```

### 6. translations

Translations of stories into different languages.

```sql
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  language_code VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  translated_text TEXT NOT NULL,
  translator VARCHAR(255),
  is_machine_translation BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, language_code)
);
```

### 7. themes

Story themes and categories.

```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 8. story_themes

Many-to-many relationship between stories and themes.

```sql
CREATE TABLE story_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, theme_id)
);
```

### 9. cultural_contexts

Cultural and historical context for stories.

```sql
CREATE TABLE cultural_contexts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  context_text TEXT NOT NULL,
  language_code VARCHAR(10) NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, language_code)
);
```

### 10. images

Images associated with stories (cover images, illustrations).

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type VARCHAR(50) NOT NULL, -- 'cover', 'illustration', 'author_portrait'
  alt_text VARCHAR(255) NOT NULL,
  attribution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, image_type)
);
```

### 11. users (if user accounts are needed)

```sql
-- This table is automatically created by Supabase Auth
-- Additional user profile information can be stored here
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 12. user_interactions (for future features)

```sql
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL, -- 'view', 'favorite', 'share', 'complete'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, story_id, interaction_type)
);
```

## Row Level Security Policies

For secure access control:

```sql
-- Public read access to stories
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public stories are viewable by everyone" ON stories
  FOR SELECT USING (true);

-- Only authenticated users can interact
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only manage their own interactions" ON user_interactions
  USING (auth.uid() = user_id);
```

## Database Functions and Triggers

```sql
-- Update the updated_at timestamp
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
```

## Indexes for Performance

```sql
-- Geographic search index
CREATE INDEX locations_geo_idx ON locations USING GIST (
  ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
);

-- Theme search
CREATE INDEX story_themes_theme_idx ON story_themes(theme_id);

-- Language search
CREATE INDEX translations_language_idx ON translations(language_code);
```

## Migration Strategy

1. Create all tables in Supabase
2. Migrate existing story data from the current JSON/TypeScript files
3. Generate appropriate relationships between entities
4. Set up RLS policies for security
5. Create indexes for performance optimization
6. Update the application to use Supabase client for data access
