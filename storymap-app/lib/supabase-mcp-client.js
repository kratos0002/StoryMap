/**
 * Enhanced Supabase MCP Client for StoryMap
 * 
 * This client provides advanced database operations specifically designed
 * for Model Context Protocol integration with Cursor IDE.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export class SupabaseMCPClient {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );
  }

  /**
   * Get comprehensive database schema information
   */
  async getSchema(tableName = null) {
    try {
      if (tableName) {
        // Get detailed column information for specific table
        const { data, error } = await this.supabase
          .from('information_schema.columns')
          .select(`
            column_name,
            data_type,
            is_nullable,
            column_default,
            character_maximum_length,
            numeric_precision,
            numeric_scale
          `)
          .eq('table_schema', 'public')
          .eq('table_name', tableName)
          .order('ordinal_position');

        if (error) throw error;
        return data;
      } else {
        // Get all tables in public schema
        const { data, error } = await this.supabase
          .from('information_schema.tables')
          .select('table_name, table_type')
          .eq('table_schema', 'public')
          .order('table_name');

        if (error) throw error;
        return data;
      }
    } catch (error) {
      throw new Error(`Schema access failed: ${error.message}`);
    }
  }

  /**
   * Get comprehensive database statistics
   */
  async getDatabaseStats() {
    try {
      const [
        { count: storyCount },
        { count: authorCount },
        { count: locationCount },
        { count: themeCount },
        { count: storyAuthorCount },
        { count: storyLocationCount },
        { count: storyThemeCount }
      ] = await Promise.all([
        this.supabase.from('stories').select('*', { count: 'exact', head: true }),
        this.supabase.from('authors').select('*', { count: 'exact', head: true }),
        this.supabase.from('locations').select('*', { count: 'exact', head: true }),
        this.supabase.from('themes').select('*', { count: 'exact', head: true }),
        this.supabase.from('story_authors').select('*', { count: 'exact', head: true }),
        this.supabase.from('story_locations').select('*', { count: 'exact', head: true }),
        this.supabase.from('story_themes').select('*', { count: 'exact', head: true })
      ]);

      // Get additional statistics
      const { data: wordCountStats } = await this.supabase
        .from('stories')
        .select('word_count')
        .not('word_count', 'is', null);

      const totalWords = wordCountStats?.reduce((sum, story) => sum + (story.word_count || 0), 0) || 0;
      const avgWords = wordCountStats?.length > 0 ? Math.round(totalWords / wordCountStats.length) : 0;

      const { data: yearStats } = await this.supabase
        .from('stories')
        .select('publication_year')
        .not('publication_year', 'is', null)
        .order('publication_year');

      const earliestYear = yearStats?.[0]?.publication_year;
      const latestYear = yearStats?.[yearStats.length - 1]?.publication_year;

      return {
        tables: {
          stories: storyCount || 0,
          authors: authorCount || 0,
          locations: locationCount || 0,
          themes: themeCount || 0
        },
        relationships: {
          story_authors: storyAuthorCount || 0,
          story_locations: storyLocationCount || 0,
          story_themes: storyThemeCount || 0
        },
        content: {
          total_words: totalWords,
          average_words_per_story: avgWords,
          earliest_publication: earliestYear,
          latest_publication: latestYear,
          year_range: earliestYear && latestYear ? `${earliestYear}-${latestYear}` : 'Unknown'
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Statistics calculation failed: ${error.message}`);
    }
  }

  /**
   * Advanced story search with multiple filters
   */
  async searchStories(options = {}) {
    const {
      limit = 10,
      search = null,
      author = null,
      location = null,
      theme = null,
      yearFrom = null,
      yearTo = null,
      minWords = null,
      maxWords = null,
      language = null,
      publicDomain = null
    } = options;

    try {
      let query = this.supabase
        .from('stories')
        .select(`
          id,
          title,
          slug,
          summary,
          reading_time_minutes,
          word_count,
          publication_year,
          source_url,
          original_language,
          is_public_domain,
          created_at,
          story_authors(authors(name, nationality, bio)),
          story_locations(locations(name, country_code, region, latitude, longitude)),
          story_themes(themes(name, description))
        `)
        .limit(limit);

      // Apply filters
      if (search) {
        query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
      }

      if (yearFrom) {
        query = query.gte('publication_year', yearFrom);
      }

      if (yearTo) {
        query = query.lte('publication_year', yearTo);
      }

      if (minWords) {
        query = query.gte('word_count', minWords);
      }

      if (maxWords) {
        query = query.lte('word_count', maxWords);
      }

      if (language) {
        query = query.eq('original_language', language);
      }

      if (publicDomain !== null) {
        query = query.eq('is_public_domain', publicDomain);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Post-process for additional filters that require joins
      let filteredData = data;

      if (author) {
        filteredData = filteredData.filter(story =>
          story.story_authors?.some(sa =>
            sa.authors?.name?.toLowerCase().includes(author.toLowerCase())
          )
        );
      }

      if (location) {
        filteredData = filteredData.filter(story =>
          story.story_locations?.some(sl =>
            sl.locations?.name?.toLowerCase().includes(location.toLowerCase())
          )
        );
      }

      if (theme) {
        filteredData = filteredData.filter(story =>
          story.story_themes?.some(st =>
            st.themes?.name?.toLowerCase().includes(theme.toLowerCase())
          )
        );
      }

      return filteredData;
    } catch (error) {
      throw new Error(`Story search failed: ${error.message}`);
    }
  }

  /**
   * Insert story with all related data (authors, themes, locations)
   */
  async insertStoryWithRelations(storyData) {
    try {
      // Start a transaction-like operation
      const { data: story, error: storyError } = await this.supabase
        .from('stories')
        .insert(storyData.story)
        .select()
        .single();

      if (storyError) throw storyError;

      const results = { story, authors: [], themes: [], locations: [] };

      // Handle authors
      if (storyData.authors) {
        for (const authorData of storyData.authors) {
          const authorResult = await this.linkAuthor(story.id, authorData);
          results.authors.push(authorResult);
        }
      }

      // Handle themes
      if (storyData.themes) {
        for (const themeName of storyData.themes) {
          const themeResult = await this.linkTheme(story.id, themeName);
          results.themes.push(themeResult);
        }
      }

      // Handle locations
      if (storyData.locations) {
        for (const locationData of storyData.locations) {
          const locationResult = await this.linkLocation(story.id, locationData);
          results.locations.push(locationResult);
        }
      }

      return results;
    } catch (error) {
      throw new Error(`Story insertion failed: ${error.message}`);
    }
  }

  /**
   * Link author to story (with upsert)
   */
  async linkAuthor(storyId, authorData) {
    try {
      const { data: author, error: authorError } = await this.supabase
        .from('authors')
        .upsert(authorData, { onConflict: 'name' })
        .select()
        .single();

      if (authorError) throw authorError;

      const { data: link, error: linkError } = await this.supabase
        .from('story_authors')
        .insert({ story_id: storyId, author_id: author.id })
        .select()
        .single();

      if (linkError) throw linkError;

      return { author, link };
    } catch (error) {
      throw new Error(`Author linking failed: ${error.message}`);
    }
  }

  /**
   * Link theme to story (with upsert)
   */
  async linkTheme(storyId, themeName, themeDescription = null) {
    try {
      const { data: theme, error: themeError } = await this.supabase
        .from('themes')
        .upsert({ name: themeName, description: themeDescription }, { onConflict: 'name' })
        .select()
        .single();

      if (themeError) throw themeError;

      const { data: link, error: linkError } = await this.supabase
        .from('story_themes')
        .insert({ story_id: storyId, theme_id: theme.id })
        .select()
        .single();

      if (linkError) throw linkError;

      return { theme, link };
    } catch (error) {
      throw new Error(`Theme linking failed: ${error.message}`);
    }
  }

  /**
   * Link location to story (with upsert)
   */
  async linkLocation(storyId, locationData, role = 'setting') {
    try {
      const { data: location, error: locationError } = await this.supabase
        .from('locations')
        .upsert(locationData, { onConflict: 'name,country_code' })
        .select()
        .single();

      if (locationError) throw locationError;

      const { data: link, error: linkError } = await this.supabase
        .from('story_locations')
        .insert({ 
          story_id: storyId, 
          location_id: location.id,
          location_role: role 
        })
        .select()
        .single();

      if (linkError) throw linkError;

      return { location, link };
    } catch (error) {
      throw new Error(`Location linking failed: ${error.message}`);
    }
  }

  /**
   * Get popular locations with story counts
   */
  async getPopularLocations(limit = 20) {
    try {
      const { data, error } = await this.supabase
        .from('locations')
        .select(`
          *,
          story_locations(count)
        `)
        .order('story_locations(count)', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Popular locations query failed: ${error.message}`);
    }
  }

  /**
   * Get prolific authors with story counts
   */
  async getProlificAuthors(limit = 20) {
    try {
      const { data, error } = await this.supabase
        .from('authors')
        .select(`
          *,
          story_authors(count)
        `)
        .order('story_authors(count)', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Prolific authors query failed: ${error.message}`);
    }
  }

  /**
   * Get trending themes with story counts
   */
  async getTrendingThemes(limit = 20) {
    try {
      const { data, error } = await this.supabase
        .from('themes')
        .select(`
          *,
          story_themes(count)
        `)
        .order('story_themes(count)', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Trending themes query failed: ${error.message}`);
    }
  }

  /**
   * Execute safe SQL queries (SELECT only)
   */
  async executeSafeQuery(sql) {
    if (!sql.trim().toLowerCase().startsWith('select')) {
      throw new Error('Only SELECT queries are allowed for safety');
    }

    try {
      const { data, error } = await this.supabase.rpc('execute_sql', { sql });
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Query execution failed: ${error.message}`);
    }
  }

  /**
   * Test database connection
   */
  async testConnection() {
    try {
      const { data, error } = await this.supabase
        .from('stories')
        .select('count(*)', { head: true });

      if (error) throw error;
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default SupabaseMCPClient; 