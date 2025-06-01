#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCurrentStories() {
  console.log('📚 Checking current stories in database...');
  
  try {
    // Get all stories with their relationships
    const { data: stories, error } = await supabase
      .from('stories')
      .select(`
        id,
        title,
        slug,
        word_count,
        reading_time_minutes,
        publication_year,
        created_at,
        story_authors(
          author:authors(name)
        ),
        story_locations(
          location:locations(name, country_code)
        ),
        story_themes(
          theme:themes(name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log(`\n✅ Found ${stories.length} stories in database:\n`);

    stories.forEach((story, index) => {
      console.log(`${index + 1}. "${story.title}"`);
      console.log(`   ID: ${story.id}`);
      console.log(`   Slug: ${story.slug}`);
      console.log(`   Words: ${story.word_count?.toLocaleString() || 'N/A'}`);
      console.log(`   Reading time: ${story.reading_time_minutes || 'N/A'} min`);
      console.log(`   Publication year: ${story.publication_year || 'N/A'}`);
      
      const authors = story.story_authors?.map(sa => sa.author?.name).filter(Boolean) || [];
      console.log(`   Authors: ${authors.length > 0 ? authors.join(', ') : 'None'}`);
      
      const locations = story.story_locations?.map(sl => sl.location?.name).filter(Boolean) || [];
      console.log(`   Locations: ${locations.length > 0 ? locations.join(', ') : 'None'}`);
      
      const themes = story.story_themes?.map(st => st.theme?.name).filter(Boolean) || [];
      console.log(`   Themes: ${themes.length > 0 ? themes.join(', ') : 'None'}`);
      
      console.log(`   Created: ${new Date(story.created_at).toLocaleString()}`);
      console.log('');
    });

    // Summary
    const storiesWithLocations = stories.filter(s => s.story_locations?.length > 0);
    const storiesWithAuthors = stories.filter(s => s.story_authors?.length > 0);
    const storiesWithThemes = stories.filter(s => s.story_themes?.length > 0);

    console.log('📊 Summary:');
    console.log(`   Total stories: ${stories.length}`);
    console.log(`   With locations: ${storiesWithLocations.length}`);
    console.log(`   With authors: ${storiesWithAuthors.length}`);
    console.log(`   With themes: ${storiesWithThemes.length}`);
    console.log(`   Ready for map: ${storiesWithLocations.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkCurrentStories(); 