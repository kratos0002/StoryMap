# Adding New Stories to Supabase

This guide explains the workflow for adding new stories directly to the Supabase database instead of using static files.

## Prerequisites

- Access to your Supabase project dashboard
- Basic understanding of SQL or the Supabase interface
- Story content and metadata ready for insertion

## Option 1: Using the Supabase Dashboard (Manual Entry)

### Adding a New Story

1. **Log in to your Supabase dashboard** and select your project
2. **Navigate to Table Editor** in the left sidebar
3. **Select the `stories` table**
4. **Click "Insert Row"** and fill in the following fields:
   - `id`: Generate a unique ID (can use UUID v4)
   - `title`: The story title
   - `slug`: URL-friendly version of the title (lowercase, hyphens instead of spaces)
   - `original_language`: Language code (e.g., "en" for English)
   - `original_text`: Full text of the story
   - `summary`: Brief summary or preview text
   - `reading_time_minutes`: Estimated reading time
   - `publication_year`: Year the story was published (if known)
   - `is_public_domain`: Set to true for public domain works
   - `source_url`: URL of the source (if applicable)

### Adding Related Data

After adding the story, you'll need to add related data:

1. **Add the author** in the `authors` table (if not already present)
2. **Link the story to the author** by adding a row in the `story_authors` table
3. **Add location information** in the `locations` table
4. **Link the story to the location** in the `story_locations` table
5. **Add themes** (if new) in the `themes` table
6. **Link themes to the story** in the `story_themes` table
7. **Add cultural context** in the `cultural_contexts` table
8. **Add image information** in the `images` table

## Option 2: Using SQL (Batch Entry)

For adding multiple stories or for more efficient data entry, you can use SQL:

```sql
-- Insert a new story
INSERT INTO stories (
  id, title, slug, original_language, original_text, 
  summary, reading_time_minutes, publication_year, is_public_domain
) VALUES (
  uuid_generate_v4(), 'New Story Title', 'new-story-title', 'en',
  'Full text of the story goes here...',
  'Brief summary of the story', 15, 1950, true
) RETURNING id;

-- Use the returned ID to add related data
-- (Replace 'story_id_here' with the actual ID returned from the previous query)

-- Link to author
INSERT INTO story_authors (id, story_id, author_id)
VALUES (uuid_generate_v4(), 'story_id_here', 'author_id_here');

-- Link to location
INSERT INTO story_locations (id, story_id, location_id, location_role)
VALUES (uuid_generate_v4(), 'story_id_here', 'location_id_here', 'setting');

-- Link to themes
INSERT INTO story_themes (id, story_id, theme_id)
VALUES (uuid_generate_v4(), 'story_id_here', 'theme_id_here');

-- Add cultural context
INSERT INTO cultural_contexts (id, story_id, context_text, language_code)
VALUES (uuid_generate_v4(), 'story_id_here', 'Cultural context information...', 'en');

-- Add image
INSERT INTO images (id, story_id, image_url, image_type, alt_text)
VALUES (uuid_generate_v4(), 'story_id_here', 'https://example.com/image.jpg', 'cover', 'Cover image description');
```

## Option 3: Using the Supabase JavaScript Client

You can also add stories programmatically using the Supabase client in your application:

```typescript
import { supabase } from '../lib/supabase';

async function addNewStory() {
  // Insert story
  const { data: story, error: storyError } = await supabase
    .from('stories')
    .insert({
      title: 'New Story Title',
      slug: 'new-story-title',
      original_language: 'en',
      original_text: 'Full text of the story goes here...',
      summary: 'Brief summary of the story',
      reading_time_minutes: 15,
      publication_year: 1950,
      is_public_domain: true
    })
    .select()
    .single();
  
  if (storyError) {
    console.error('Error adding story:', storyError);
    return;
  }
  
  // Insert author relationship
  const { error: authorError } = await supabase
    .from('story_authors')
    .insert({
      story_id: story.id,
      author_id: 'existing_author_id'
    });
  
  // Continue with other relationships...
}
```

## Best Practices

1. **Always check for existing entries** before adding new authors, locations, or themes
2. **Use meaningful slugs** for better URL readability
3. **Validate data** before insertion, especially for required fields
4. **Add complete metadata** for better searchability and user experience
5. **Include cultural context** whenever possible to enrich the reading experience
6. **Use high-quality images** with proper attribution
7. **Verify public domain status** before adding stories

## Data Validation Checklist

Before adding a new story, ensure you have:

- [ ] Verified the story is in the public domain or you have rights to use it
- [ ] Prepared the full text with proper formatting
- [ ] Created a concise summary
- [ ] Identified the author and their details
- [ ] Determined the geographic location(s) relevant to the story
- [ ] Identified relevant themes
- [ ] Researched cultural context information
- [ ] Found an appropriate image (if available)
- [ ] Calculated or estimated reading time

By following this workflow, you can efficiently add new stories directly to the Supabase database, ensuring all relationships and metadata are properly maintained.
