# Enhanced Story Discovery Features - Design Document

## Current State Analysis

After analyzing the StoryMap application's current state, I've identified the following existing discovery capabilities:

### Current Features
- **Basic Theme Filtering**: Single theme selection only
- **Basic Region Filtering**: Single region selection only
- **Simple Text Search**: Searches title, summary, and slug
- **Related Stories**: Basic recommendation based on themes and locations
- **Map-Based Discovery**: Stories displayed on a map with markers

### Current Metadata Schema
The Supabase database already includes:
- Core story metadata (title, text, summary, publication year)
- Author information (name, birth/death years, nationality)
- Location data (coordinates, country, region)
- Theme associations (single-level categorization)
- Cultural context information
- Image associations

## Proposed Enhancements

### 1. Expanded Metadata Schema

#### New Tables
```sql
-- Reading difficulty levels
CREATE TABLE IF NOT EXISTS reading_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE, -- 'Easy', 'Moderate', 'Advanced'
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time periods for historical context
CREATE TABLE IF NOT EXISTS time_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE, -- 'Victorian Era', 'Renaissance', 'Modern'
  start_year INTEGER NOT NULL,
  end_year INTEGER,  -- NULL for ongoing periods
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Story tags for more granular categorization
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL, -- 'literary_device', 'mood', 'subject', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Relationship Tables
```sql
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
```

#### Modifications to Existing Tables
```sql
-- Add fields to stories table
ALTER TABLE stories
ADD COLUMN IF NOT EXISTS word_count INTEGER,
ADD COLUMN IF NOT EXISTS popularity_score NUMERIC(5,2) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS writing_era VARCHAR(100);
```

### 2. Advanced Filtering System

#### Multi-select Filtering
- Allow selection of multiple themes, regions, time periods, and tags
- Support for AND/OR logic between filter categories
- Filter combination rules (e.g., "Stories with themes A AND B, from region C OR D")

#### Filter UI Enhancements
- Collapsible filter panels by category
- Visual indicators for active filters
- Filter count badges
- Save and load filter presets (for logged-in users)

### 3. Search Functionality

#### Full-Text Search
- Implement PostgreSQL's full-text search capabilities
- Search across title, summary, original_text, and cultural context
- Support for phrase matching and fuzzy search

#### Search Result Ranking
- Relevance scoring based on match quality
- Boost factors for title matches
- Highlighting of matched terms in results

### 4. Timeline-Based Discovery

#### Timeline View Component
- Horizontal scrollable timeline of stories
- Grouping by writing era, publication year, or time period
- Visual indicators for story density in different time periods

#### Time-Based Filtering
- Filter stories by century, decade, or custom date range
- Compare stories from different time periods
- Historical context overlay

### 5. Map-Based Discovery Enhancements

#### Interactive Map Features
- Clustered markers for dense regions
- Heat map visualization of story concentration
- Region highlighting and selection
- "Stories near this location" feature with adjustable radius

#### Geographic Exploration
- Continental, regional, and country-level filtering
- Cultural region overlays (e.g., "Mediterranean stories", "Nordic tales")
- Path visualization for stories that span multiple locations

### 6. Recommendation Engine

#### Similar Stories Algorithm
- Weighted similarity based on themes, locations, time periods, and tags
- "More like this" functionality from any story
- Personalized recommendations based on reading history (for logged-in users)

#### Curated Collections
- Thematic journeys (e.g., "Evolution of Gothic Literature")
- Geographic explorations (e.g., "Stories Along the Silk Road")
- Author collections and influences

## Implementation Approach

### Phase 1: Schema Enhancement
- Create new tables and relationships
- Modify existing tables with new fields
- Develop data migration plan for existing stories

### Phase 2: Backend API Development
- Implement advanced query endpoints
- Develop full-text search functionality
- Create recommendation algorithms

### Phase 3: UI Component Development
- Design and implement multi-select filter UI
- Create timeline view component
- Enhance map interaction capabilities
- Build recommendation display components

### Phase 4: Testing and Optimization
- Performance testing for complex queries
- User testing for discovery flow
- Optimization of search and filter operations

## Technical Considerations

### Database Performance
- Proper indexing for text search columns
- Materialized views for complex aggregations
- Query optimization for multi-join filters

### UI/UX Design
- Progressive disclosure of advanced features
- Responsive design for all discovery components
- Clear visual feedback for filter operations

### Accessibility
- Keyboard navigation for all discovery components
- Screen reader support for interactive elements
- Alternative text-based discovery paths
