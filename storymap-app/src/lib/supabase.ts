import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cvcjjwrorvgvptkckzml.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTU5MDMsImV4cCI6MjA2NDE3MTkwM30.AG1a5N49igWn9tOznj7A7Gzhvf0AynYbf9Ozo-1ny2g';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions for database tables
export interface Story {
  id: string;
  title: string;
  original_text: string;
  summary: string;
  publication_year?: number;
  reading_time_minutes: number;
  word_count?: number;
  popularity_score?: number;
  writing_era?: string;
  slug: string;
  created_at: string;
  updated_at: string;
  story_authors?: Array<{
    author: {
      name: string;
      birth_year?: number;
      death_year?: number;
    }
  }>;
  story_locations?: Array<{
    location: {
      name: string;
      country_code: string;
      region: string;
      latitude: number;
      longitude: number;
    }
  }>;
  story_themes?: Array<{
    theme: {
      name: string;
    }
  }>;
  story_tags?: Array<{
    tag: {
      name: string;
      category: string;
    }
  }>;
  story_time_periods?: Array<{
    time_period: {
      name: string;
      start_year: number;
      end_year?: number;
    }
  }>;
  story_reading_levels?: Array<{
    reading_level: {
      name: string;
    }
  }>;
  cultural_contexts?: Array<{
    context_text: string;
  }>;
  images?: Array<{
    image_url: string;
  }>;
}

// Enhanced filter options interface
export interface FilterOptions {
  themes?: string[];
  regions?: string[];
  tags?: string[];
  timePeriods?: string[];
  readingLevel?: string;
  minYear?: number;
  maxYear?: number;
  searchQuery?: string;
  filterLogic?: 'AND' | 'OR';
}

// Fetch all stories with enhanced metadata
export const fetchStories = async (): Promise<Story[]> => {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_authors(
        author:authors(
          name,
          birth_year,
          death_year
        )
      ),
      story_locations(
        location:locations(
          name,
          country_code,
          region,
          latitude,
          longitude
        )
      ),
      story_themes(
        theme:themes(
          name
        )
      ),
      story_tags(
        tag:tags(
          name,
          category
        )
      ),
      story_time_periods(
        time_period:time_periods(
          name,
          start_year,
          end_year
        )
      ),
      story_reading_levels(
        reading_level:reading_levels(
          name
        )
      ),
      cultural_contexts(
        context_text
      ),
      images(
        image_url
      )
    `)
    .order('title');

  if (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }

  return data || [];
};

// Fetch a single story with all details
export const fetchStoryWithDetails = async (storyId: string): Promise<Story | null> => {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_authors(
        author:authors(
          name,
          birth_year,
          death_year
        )
      ),
      story_locations(
        location:locations(
          name,
          country_code,
          region,
          latitude,
          longitude
        )
      ),
      story_themes(
        theme:themes(
          name
        )
      ),
      story_tags(
        tag:tags(
          name,
          category
        )
      ),
      story_time_periods(
        time_period:time_periods(
          name,
          start_year,
          end_year
        )
      ),
      story_reading_levels(
        reading_level:reading_levels(
          name
        )
      ),
      cultural_contexts(
        context_text
      ),
      images(
        image_url
      )
    `)
    .eq('id', storyId)
    .single();

  if (error) {
    console.error('Error fetching story:', error);
    throw error;
  }

  return data;
};

// Advanced search with multiple filters
export const searchStories = async (options: FilterOptions): Promise<Story[]> => {
  try {
    // If we have a search query, use the search_stories function
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const { data, error } = await supabase.rpc('search_stories', {
        p_query: options.searchQuery,
        p_themes: options.themes,
        p_tags: options.tags,
        p_time_periods: options.timePeriods,
        p_regions: options.regions,
        p_reading_level: options.readingLevel,
        p_min_year: options.minYear,
        p_max_year: options.maxYear,
        p_limit: 50
      });
      
      if (error) throw error;
      return data || [];
    }
    
    // Otherwise, use a more direct query approach
    let query = supabase.from('stories').select(`
      *,
      story_authors(
        author:authors(
          name,
          birth_year,
          death_year
        )
      ),
      story_locations(
        location:locations(
          name,
          country_code,
          region,
          latitude,
          longitude
        )
      ),
      story_themes(
        theme:themes(
          name
        )
      ),
      story_tags(
        tag:tags(
          name,
          category
        )
      ),
      story_time_periods(
        time_period:time_periods(
          name,
          start_year,
          end_year
        )
      ),
      story_reading_levels(
        reading_level:reading_levels(
          name
        )
      ),
      cultural_contexts(
        context_text
      ),
      images(
        image_url
      )
    `);
    
    // Apply filters based on options
    if (options.themes && options.themes.length > 0) {
      // For OR logic, we need to use .or()
      if (options.filterLogic === 'OR') {
        const themeFilters = options.themes.map(theme => 
          `story_themes.theme.name.eq.${theme}`
        ).join(',');
        query = query.or(themeFilters);
      } else {
        // For AND logic (default), we need to join multiple conditions
        // This is more complex and might require multiple queries
        // For simplicity, we'll use the first theme only for now
        query = query
          .from('stories')
          .select(`
            *,
            story_themes!inner(
              theme:themes!inner(name)
            )
          `)
          .eq('story_themes.theme.name', options.themes[0]);
      }
    }
    
    if (options.regions && options.regions.length > 0) {
      // Similar approach for regions
      if (options.filterLogic === 'OR') {
        const regionFilters = options.regions.map(region => 
          `story_locations.location.region.eq.${region}`
        ).join(',');
        query = query.or(regionFilters);
      } else {
        query = query
          .from('stories')
          .select(`
            *,
            story_locations!inner(
              location:locations!inner(region)
            )
          `)
          .eq('story_locations.location.region', options.regions[0]);
      }
    }
    
    // Apply year range filters if provided
    if (options.minYear) {
      query = query.gte('publication_year', options.minYear);
    }
    
    if (options.maxYear) {
      query = query.lte('publication_year', options.maxYear);
    }
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching stories:', error);
    return [];
  }
};

// Fetch related stories based on enhanced metadata
export const fetchRelatedStories = async (storyId: string, limit: number = 3): Promise<Story[]> => {
  try {
    // Use the find_similar_stories function
    const { data: similarStories, error: similarError } = await supabase.rpc('find_similar_stories', {
      p_story_id: storyId,
      p_limit: limit
    });
    
    if (similarError) {
      console.error('Error finding similar stories:', similarError);
      // Fall back to the original method if the function fails
      return fetchRelatedStoriesFallback(storyId, limit);
    }
    
    if (!similarStories || similarStories.length === 0) {
      return [];
    }
    
    // Fetch full details for the similar stories
    const storyIds = similarStories.map(s => s.story_id);
    const { data, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_authors(
          author:authors(
            name
          )
        ),
        story_locations(
          location:locations(
            name,
            country_code
          )
        ),
        story_themes(
          theme:themes(
            name
          )
        ),
        images(
          image_url
        )
      `)
      .in('id', storyIds)
      .limit(limit);
    
    if (error) {
      console.error('Error fetching related stories details:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchRelatedStories:', error);
    return fetchRelatedStoriesFallback(storyId, limit);
  }
};

// Fallback method for related stories if the function approach fails
const fetchRelatedStoriesFallback = async (storyId: string, limit: number = 3): Promise<Story[]> => {
  // First, get the current story's themes and location
  const { data: currentStory } = await supabase
    .from('stories')
    .select(`
      id,
      story_themes(
        theme_id
      ),
      story_locations(
        location_id
      )
    `)
    .eq('id', storyId)
    .single();

  if (!currentStory) {
    return [];
  }

  // Extract theme IDs and location IDs
  const themeIds = currentStory.story_themes?.map(t => t.theme_id) || [];
  const locationIds = currentStory.story_locations?.map(l => l.location_id) || [];

  // Find stories with similar themes or locations, but not the current story
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_authors(
        author:authors(
          name
        )
      ),
      story_locations(
        location:locations(
          name,
          country_code
        )
      ),
      story_themes(
        theme:themes(
          name
        )
      ),
      images(
        image_url
      )
    `)
    .not('id', 'eq', storyId) // Exclude current story
    .or(
      themeIds.map(id => `story_themes.theme_id.eq.${id}`).join(',') + 
      (locationIds.length > 0 ? ',' + locationIds.map(id => `story_locations.location_id.eq.${id}`).join(',') : '')
    )
    .limit(limit);

  if (error) {
    console.error('Error fetching related stories:', error);
    return [];
  }

  return data || [];
};

// Fetch stories by theme
export const fetchStoriesByTheme = async (themeName: string, limit: number = 3): Promise<Story[]> => {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_authors(
        author:authors(
          name
        )
      ),
      story_locations(
        location:locations(
          name,
          country_code
        )
      ),
      story_themes!inner(
        theme:themes!inner(
          name
        )
      ),
      images(
        image_url
      )
    `)
    .eq('story_themes.theme.name', themeName)
    .limit(limit);

  if (error) {
    console.error('Error fetching stories by theme:', error);
    return [];
  }

  return data || [];
};

// Fetch all available metadata for filtering
export const fetchFilterMetadata = async () => {
  try {
    // Fetch themes
    const { data: themesData, error: themesError } = await supabase
      .from('themes')
      .select('id, name');
    
    if (themesError) throw themesError;
    
    // Fetch tags
    const { data: tagsData, error: tagsError } = await supabase
      .from('tags')
      .select('id, name, category');
    
    if (tagsError) throw tagsError;
    
    // Fetch time periods
    const { data: timePeriodsData, error: timePeriodsError } = await supabase
      .from('time_periods')
      .select('id, name, start_year, end_year');
    
    if (timePeriodsError) throw timePeriodsError;
    
    // Fetch reading levels
    const { data: readingLevelsData, error: readingLevelsError } = await supabase
      .from('reading_levels')
      .select('id, name');
    
    if (readingLevelsError) throw readingLevelsError;
    
    // Fetch regions
    const { data: locationsData, error: locationsError } = await supabase
      .from('locations')
      .select('region')
      .not('region', 'is', null);
    
    if (locationsError) throw locationsError;
    
    // Process regions to get unique values
    const regions = Array.from(new Set(locationsData.map(l => l.region).filter(Boolean)));
    
    return {
      themes: themesData || [],
      tags: tagsData || [],
      timePeriods: timePeriodsData || [],
      readingLevels: readingLevelsData || [],
      regions: regions
    };
  } catch (error) {
    console.error('Error fetching filter metadata:', error);
    return {
      themes: [],
      tags: [],
      timePeriods: [],
      readingLevels: [],
      regions: []
    };
  }
};
