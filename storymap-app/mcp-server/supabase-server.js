#!/usr/bin/env node

/**
 * Supabase MCP Server for StoryMap
 * 
 * This server provides Model Context Protocol integration between Cursor IDE
 * and the StoryMap Supabase database, enabling real-time database access,
 * schema inspection, and query execution.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const isServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(`🔑 Using ${isServiceRole ? 'Service Role' : 'Anon'} key for database access`);

const server = new Server(
  {
    name: 'storymap-supabase',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler('tools/list', async () => {
  const tools = [
    {
      name: 'get_curated_stories',
      description: 'Get all curated stories from the curated_stories table',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    },
    {
      name: 'populate_curated_stories',
      description: 'Populate curated_stories table with stories from Gutenberg API',
      inputSchema: {
        type: 'object',
        properties: {
          force_refresh: {
            type: 'boolean',
            description: 'Force refresh even if stories already exist'
          }
        }
      }
    },
    {
      name: 'get_stories',
      description: 'Get stories from the database with optional filters',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: 'Number of stories to return (default: 10)'
          },
          search: {
            type: 'string',
            description: 'Search term for title or author'
          },
          location: {
            type: 'string',
            description: 'Filter by location'
          }
        }
      }
    },
    {
      name: 'get_story_details',
      description: 'Get detailed information about a specific story',
      inputSchema: {
        type: 'object',
        properties: {
          story_id: {
            type: 'string',
            description: 'Story ID to get details for'
          }
        },
        required: ['story_id']
      }
    },
    {
      name: 'get_database_stats',
      description: 'Get statistics about the StoryMap database',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    }
  ];

  // Add schema tool only if using service role
  if (isServiceRole) {
    tools.push({
      name: 'query_database',
      description: 'Execute SQL queries on the StoryMap database',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'SQL query to execute (SELECT statements only for safety)'
          }
        },
        required: ['query']
      }
    });
  }

  return { tools };
});

// Handle tool execution
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'get_curated_stories':
        return await handleGetCuratedStories();
        
      case 'populate_curated_stories':
        return await handlePopulateCuratedStories(args?.force_refresh);
        
      case 'query_database':
        if (!isServiceRole) throw new Error('Schema queries require service role key');
        return await handleQuery(args.query);
        
      case 'get_stories':
        return await handleGetStories(args || {});
        
      case 'get_story_details':
        return await handleGetStoryDetails(args.story_id);
        
      case 'get_database_stats':
        return await handleGetDatabaseStats();
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing ${name}: ${error.message}`
        }
      ]
    };
  }
});

// Tool handlers
async function handleGetCuratedStories() {
  const { data, error } = await supabase
    .from('curated_stories')
    .select('*');
  
  if (error) throw error;
  
  return {
    content: [
      {
        type: 'text',
        text: `Curated Stories (${data.length} found):\n${JSON.stringify(data, null, 2)}`
      }
    ]
  };
}

async function handlePopulateCuratedStories(force_refresh) {
  try {
    // Check if curated stories already exist
    const { data: existing, error: checkError } = await supabase
      .from('curated_stories')
      .select('id')
      .limit(1);
    
    if (checkError) throw checkError;
    
    if (existing.length > 0 && !force_refresh) {
      return {
        content: [
          {
            type: 'text',
            text: 'Curated stories already exist. Use force_refresh=true to repopulate.'
          }
        ]
      };
    }
    
    // Curated list of classic stories from Project Gutenberg
    const curatedStories = [
      {
        title: "The Tell-Tale Heart",
        author: "Edgar Allan Poe",
        gutenberg_id: 2148,
        year: 1843,
        country: "United States",
        city: "Baltimore",
        themes: ["psychological horror", "guilt", "madness"],
        genres: ["horror", "psychological fiction"],
        cultural_significance: "high"
      },
      {
        title: "The Gift of the Magi",
        author: "O. Henry",
        gutenberg_id: 7256,
        year: 1905,
        country: "United States", 
        city: "New York",
        themes: ["love", "sacrifice", "irony"],
        genres: ["short story", "Christmas story"],
        cultural_significance: "high"
      },
      {
        title: "The Yellow Wallpaper",
        author: "Charlotte Perkins Gilman",
        gutenberg_id: 1952,
        year: 1892,
        country: "United States",
        city: "New England",
        themes: ["mental health", "feminism", "oppression"],
        genres: ["psychological fiction", "feminist literature"],
        cultural_significance: "high"
      },
      {
        title: "The Metamorphosis",
        author: "Franz Kafka",
        gutenberg_id: 5200,
        year: 1915,
        country: "Austria-Hungary",
        city: "Prague",
        themes: ["alienation", "transformation", "family"],
        genres: ["modernist fiction", "existential literature"],
        cultural_significance: "high"
      },
      {
        title: "The Strange Case of Dr. Jekyll and Mr. Hyde",
        author: "Robert Louis Stevenson",
        gutenberg_id: 43,
        year: 1886,
        country: "Scotland",
        city: "Edinburgh",
        themes: ["duality", "good vs evil", "Victorian society"],
        genres: ["gothic fiction", "psychological thriller"],
        cultural_significance: "high"
      }
    ];
    
    // Clear existing if force refresh
    if (force_refresh) {
      const { error: deleteError } = await supabase
        .from('curated_stories')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (deleteError) throw deleteError;
    }
    
    // Insert curated stories
    const { data: inserted, error: insertError } = await supabase
      .from('curated_stories')
      .insert(curatedStories)
      .select();
    
    if (insertError) throw insertError;
    
    return {
      content: [
        {
          type: 'text',
          text: `Successfully populated ${inserted.length} curated stories:\n${JSON.stringify(inserted, null, 2)}`
        }
      ]
    };
    
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error populating curated stories: ${error.message}`
        }
      ]
    };
  }
}

async function handleQuery(query) {
  // Only allow SELECT queries for safety
  if (!query.trim().toLowerCase().startsWith('select')) {
    throw new Error('Only SELECT queries are allowed for safety');
  }
  
  const { data, error } = await supabase.rpc('execute_sql', { sql: query });
  
  if (error) throw error;
  
  return {
    content: [
      {
        type: 'text',
        text: `Query Results:\n${JSON.stringify(data, null, 2)}`
      }
    ]
  };
}

async function handleGetStories(args) {
  const { limit = 10, search, location } = args;
  
  let query = supabase
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
      created_at
    `)
    .limit(limit);
  
  if (search) {
    query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return {
    content: [
      {
        type: 'text',
        text: `Stories (${data.length} results):\n${JSON.stringify(data, null, 2)}`
      }
    ]
  };
}

async function handleGetStoryDetails(storyId) {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', storyId)
    .single();
  
  if (error) throw error;
  
  return {
    content: [
      {
        type: 'text',
        text: `Story Details:\n${JSON.stringify(data, null, 2)}`
      }
    ]
  };
}

async function handleGetDatabaseStats() {
  try {
    // Use simple queries that work with anon key
    const [
      { data: stories },
      { data: authors },
      { data: locations },
      { data: themes },
      { data: curatedStories }
    ] = await Promise.all([
      supabase.from('stories').select('id, word_count, publication_year'),
      supabase.from('authors').select('id, name'),
      supabase.from('locations').select('id, name'),
      supabase.from('themes').select('id, name'),
      supabase.from('curated_stories').select('id, title, author')
    ]);
    
    const stats = {
      stories: stories?.length || 0,
      authors: authors?.length || 0,
      locations: locations?.length || 0,
      themes: themes?.length || 0,
      curated_stories: curatedStories?.length || 0,
      total_words: stories?.reduce((sum, story) => sum + (story.word_count || 0), 0) || 0,
      avg_words: stories?.length > 0 ? Math.round(stories.reduce((sum, story) => sum + (story.word_count || 0), 0) / stories.length) : 0,
      year_range: stories?.length > 0 ? {
        earliest: Math.min(...stories.filter(s => s.publication_year).map(s => s.publication_year)),
        latest: Math.max(...stories.filter(s => s.publication_year).map(s => s.publication_year))
      } : null,
      timestamp: new Date().toISOString(),
      access_level: isServiceRole ? 'service_role' : 'anon'
    };
    
    return {
      content: [
        {
          type: 'text',
          text: `Database Statistics:\n${JSON.stringify(stats, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Statistics calculation failed: ${error.message}`);
  }
}

// Start the MCP server
async function main() {
  console.log('🚀 Starting StoryMap Supabase MCP Server...');
  console.log(`🔑 Access Level: ${isServiceRole ? 'Service Role (Full Access)' : 'Anon Key (Limited Access)'}`);
  
  // Test connection with a simple query that works with anon key
  try {
    const { data, error } = await supabase.from('stories').select('id').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection successful');
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    process.exit(1);
  }
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('🔗 MCP Server connected and ready');
}

main().catch((error) => {
  console.error('💥 MCP Server failed to start:', error);
  process.exit(1);
}); 