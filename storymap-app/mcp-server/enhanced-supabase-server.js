#!/usr/bin/env node

/**
 * Enhanced Supabase MCP Server for StoryMap
 * 
 * This server provides advanced Model Context Protocol integration with:
 * - Story enrichment using Perplexity AI
 * - Location management and validation
 * - Real-time analytics and monitoring
 * - Batch processing capabilities
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from '@supabase/supabase-js';
import StoryEnrichmentPipeline from '../scripts/story_enrichment_pipeline.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
let enrichmentPipeline = null;

console.log(`🔑 Using Service Role key for database access`);

const server = new Server(
  {
    name: 'storymap-enhanced-supabase',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Initialize enrichment pipeline when needed
async function getEnrichmentPipeline() {
  if (!enrichmentPipeline) {
    enrichmentPipeline = new StoryEnrichmentPipeline();
    await enrichmentPipeline.init();
  }
  return enrichmentPipeline;
}

// Define available tools for enhanced operations
server.setRequestHandler(
  {
    method: 'tools/list'
  },
  async () => {
    return {
      tools: [
        {
          name: 'analyze_stories_for_enrichment',
          description: 'Analyze all stories to identify missing metadata that needs enrichment',
          inputSchema: {
            type: 'object',
            properties: {
              include_complete: {
                type: 'boolean',
                description: 'Include stories that are already complete in analysis',
                default: false
              }
            }
          }
        },
        {
          name: 'enrich_story_with_ai',
          description: 'Use Perplexity AI to enrich a single story with missing metadata',
          inputSchema: {
            type: 'object',
            properties: {
              story_id: {
                type: 'string',
                description: 'ID of the story to enrich'
              },
              force_refresh: {
                type: 'boolean',
                description: 'Force re-enrichment even if story appears complete',
                default: false
              }
            },
            required: ['story_id']
          }
        },
        {
          name: 'batch_enrich_stories',
          description: 'Enrich multiple stories in batches with AI',
          inputSchema: {
            type: 'object',
            properties: {
              batch_size: {
                type: 'number',
                description: 'Number of stories to process in each batch',
                default: 5
              },
              max_stories: {
                type: 'number',
                description: 'Maximum number of stories to enrich (0 = no limit)',
                default: 0
              },
              dry_run: {
                type: 'boolean',
                description: 'Analyze only without making changes',
                default: false
              }
            }
          }
        },
        {
          name: 'get_enrichment_statistics',
          description: 'Get statistics about story enrichment status',
          inputSchema: {
            type: 'object',
            properties: {
              detailed: {
                type: 'boolean',
                description: 'Include detailed breakdown by category',
                default: true
              }
            }
          }
        },
        {
          name: 'add_location_to_story',
          description: 'Add a location to a story with coordinates',
          inputSchema: {
            type: 'object',
            properties: {
              story_id: { type: 'string' },
              location_name: { type: 'string' },
              latitude: { type: 'number' },
              longitude: { type: 'number' },
              country_code: { type: 'string' },
              region: { type: 'string' },
              location_role: { type: 'string', default: 'setting' }
            },
            required: ['story_id', 'location_name', 'latitude', 'longitude']
          }
        },
        {
          name: 'validate_story_completeness',
          description: 'Validate that all stories meet completeness requirements',
          inputSchema: {
            type: 'object',
            properties: {
              fix_issues: {
                type: 'boolean',
                description: 'Automatically fix issues where possible',
                default: false
              }
            }
          }
        },
        {
          name: 'get_location_coverage',
          description: 'Analyze geographic coverage of story locations',
          inputSchema: {
            type: 'object',
            properties: {
              group_by: {
                type: 'string',
                enum: ['country', 'region', 'city'],
                default: 'country'
              }
            }
          }
        },
        {
          name: 'search_stories_by_location',
          description: 'Find stories set in specific locations',
          inputSchema: {
            type: 'object',
            properties: {
              location_query: { type: 'string' },
              radius_km: { type: 'number', default: 100 },
              limit: { type: 'number', default: 20 }
            },
            required: ['location_query']
          }
        }
      ]
    };
  }
);

// Handle tool execution
server.setRequestHandler(
  {
    method: 'tools/call'
  },
  async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      switch (name) {
        case 'analyze_stories_for_enrichment':
          return await handleAnalyzeStoriesForEnrichment(args);
        
        case 'enrich_story_with_ai':
          return await handleEnrichStoryWithAI(args);
        
        case 'batch_enrich_stories':
          return await handleBatchEnrichStories(args);
        
        case 'get_enrichment_statistics':
          return await handleGetEnrichmentStatistics(args);
        
        case 'add_location_to_story':
          return await handleAddLocationToStory(args);
        
        case 'validate_story_completeness':
          return await handleValidateStoryCompleteness(args);
        
        case 'get_location_coverage':
          return await handleGetLocationCoverage(args);
        
        case 'search_stories_by_location':
          return await handleSearchStoriesByLocation(args);

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: error.message,
              tool: name
            }, null, 2)
          }
        ],
        isError: true
      };
    }
  }
);

// Tool handler implementations
async function handleAnalyzeStoriesForEnrichment(args = {}) {
  const pipeline = await getEnrichmentPipeline();
  const analysis = await pipeline.analyzeStoriesForEnrichment();
  
  const recommendations = [];
  if (analysis.missing_locations.length > 0) {
    recommendations.push(`🚨 CRITICAL: ${analysis.missing_locations.length} stories lack locations - run batch enrichment immediately`);
  }
  if (analysis.missing_themes.length > 0) {
    recommendations.push(`📚 ${analysis.missing_themes.length} stories need theme classification`);
  }
  if (analysis.incomplete_authors.length > 0) {
    recommendations.push(`👤 ${analysis.incomplete_authors.length} stories have incomplete author information`);
  }
  if (analysis.needs_enrichment.length === 0) {
    recommendations.push(`✅ All stories are fully enriched! Consider monitoring for new additions.`);
  }
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          analysis: analysis,
          recommendations: recommendations
        }, null, 2)
      }
    ]
  };
}

async function handleEnrichStoryWithAI(args) {
  const { story_id, force_refresh = false } = args;
  const pipeline = await getEnrichmentPipeline();
  
  // Get story details
  const { data: story, error } = await supabase
    .from('stories')
    .select(`
      id, title, summary,
      story_locations(location:locations(name)),
      story_themes(theme:themes(name))
    `)
    .eq('id', story_id)
    .single();
  
  if (error) throw error;
  if (!story) throw new Error(`Story not found: ${story_id}`);
  
  // Check if enrichment is needed
  const hasLocations = story.story_locations && story.story_locations.length > 0;
  const hasThemes = story.story_themes && story.story_themes.length > 0;
  
  if (!force_refresh && hasLocations && hasThemes) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            message: 'Story already appears complete',
            story: story,
            skipped: true
          }, null, 2)
        }
      ]
    };
  }
  
  // Determine what needs enrichment
  const issues = [];
  if (!hasLocations) issues.push('location');
  if (!hasThemes) issues.push('themes');
  
  // Enrich with AI
  const enrichmentData = await pipeline.enrichStoryWithPerplexity(
    { id: story_id, title: story.title, summary: story.summary },
    issues
  );
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          story_id: story_id,
          enrichment_data: enrichmentData,
          issues_resolved: issues
        }, null, 2)
      }
    ]
  };
}

async function handleBatchEnrichStories(args = {}) {
  const { batch_size = 5, max_stories = 0, dry_run = false } = args;
  const pipeline = await getEnrichmentPipeline();
  
  if (dry_run) {
    const analysis = await pipeline.analyzeStoriesForEnrichment();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            dry_run: true,
            analysis: analysis,
            would_process: Math.min(
              analysis.needs_enrichment.length,
              max_stories || analysis.needs_enrichment.length
            )
          }, null, 2)
        }
      ]
    };
  }
  
  // Set batch size for pipeline
  pipeline.CONFIG = { ...pipeline.CONFIG, BATCH_SIZE: batch_size };
  
  await pipeline.runEnrichmentPipeline();
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          message: 'Batch enrichment completed',
          statistics: pipeline.enrichmentStats
        }, null, 2)
      }
    ]
  };
}

async function handleGetEnrichmentStatistics(args = {}) {
  const { detailed = true } = args;
  
  // Get comprehensive statistics
  const { data: stories, error } = await supabase
    .from('stories')
    .select(`
      id,
      title,
      publication_year,
      story_locations(location:locations(name)),
      story_themes(theme:themes(name)),
      story_authors(author:authors(name, birth_year, death_year, nationality))
    `);
  
  if (error) throw error;
  
  const stats = {
    total_stories: stories.length,
    with_locations: 0,
    with_themes: 0,
    with_publication_year: 0,
    with_complete_authors: 0,
    fully_enriched: 0,
    location_coverage_percent: 0,
    theme_coverage_percent: 0
  };
  
  stories.forEach(story => {
    const hasLocations = story.story_locations && story.story_locations.length > 0;
    const hasThemes = story.story_themes && story.story_themes.length > 0;
    const hasYear = !!story.publication_year;
    const hasCompleteAuthors = story.story_authors && story.story_authors.every(sa => 
      sa.author.birth_year && sa.author.death_year && sa.author.nationality
    );
    
    if (hasLocations) stats.with_locations++;
    if (hasThemes) stats.with_themes++;
    if (hasYear) stats.with_publication_year++;
    if (hasCompleteAuthors) stats.with_complete_authors++;
    if (hasLocations && hasThemes) stats.fully_enriched++;
  });
  
  stats.location_coverage_percent = Math.round((stats.with_locations / stats.total_stories) * 100);
  stats.theme_coverage_percent = Math.round((stats.with_themes / stats.total_stories) * 100);
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          statistics: stats,
          detailed: detailed
        }, null, 2)
      }
    ]
  };
}

async function handleAddLocationToStory(args) {
  const { 
    story_id, 
    location_name, 
    latitude, 
    longitude, 
    country_code, 
    region, 
    location_role = 'setting' 
  } = args;
  
  const pipeline = await getEnrichmentPipeline();
  
  await pipeline.addLocationToStory(story_id, {
    name: location_name,
    role: location_role
  });
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          message: `Added location "${location_name}" to story`,
          story_id: story_id,
          location: {
            name: location_name,
            latitude,
            longitude,
            country_code,
            region,
            role: location_role
          }
        }, null, 2)
      }
    ]
  };
}

async function handleValidateStoryCompleteness(args = {}) {
  const { fix_issues = false } = args;
  
  const { data: stories, error } = await supabase
    .from('stories')
    .select(`
      id,
      title,
      story_locations(location:locations(name)),
      story_themes(theme:themes(name))
    `);
  
  if (error) throw error;
  
  const validation = {
    total_stories: stories.length,
    valid_stories: 0,
    invalid_stories: [],
    issues_found: {
      missing_locations: 0,
      missing_themes: 0
    }
  };
  
  for (const story of stories) {
    const issues = [];
    
    if (!story.story_locations || story.story_locations.length === 0) {
      issues.push('missing_location');
      validation.issues_found.missing_locations++;
    }
    
    if (!story.story_themes || story.story_themes.length === 0) {
      issues.push('missing_themes');
      validation.issues_found.missing_themes++;
    }
    
    if (issues.length === 0) {
      validation.valid_stories++;
    } else {
      validation.invalid_stories.push({
        id: story.id,
        title: story.title,
        issues: issues
      });
    }
  }
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          validation: validation,
          fix_issues: fix_issues
        }, null, 2)
      }
    ]
  };
}

async function handleGetLocationCoverage(args = {}) {
  const { group_by = 'country' } = args;
  
  const { data: locations, error } = await supabase
    .from('story_locations')
    .select(`
      location:locations(name, country_code, region, latitude, longitude),
      story:stories(title)
    `);
  
  if (error) throw error;
  
  const coverage = {};
  
  locations.forEach(sl => {
    const location = sl.location;
    let key;
    
    switch (group_by) {
      case 'country':
        key = location.country_code || 'Unknown';
        break;
      case 'region':
        key = location.region || 'Unknown';
        break;
      case 'city':
        key = location.name;
        break;
      default:
        key = location.country_code || 'Unknown';
    }
    
    if (!coverage[key]) {
      coverage[key] = {
        count: 0,
        stories: [],
        sample_location: location
      };
    }
    
    coverage[key].count++;
    coverage[key].stories.push(sl.story.title);
  });
  
  // Sort by count
  const sortedCoverage = Object.entries(coverage)
    .sort(([,a], [,b]) => b.count - a.count)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          group_by: group_by,
          total_locations: Object.keys(sortedCoverage).length,
          coverage: sortedCoverage
        }, null, 2)
      }
    ]
  };
}

async function handleSearchStoriesByLocation(args) {
  const { location_query, radius_km = 100, limit = 20 } = args;
  
  const { data: stories, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_locations(
        location:locations(*)
      )
    `)
    .limit(limit);
  
  if (error) throw error;
  
  // Filter by location query
  const filteredStories = stories.filter(story => 
    story.story_locations.some(sl => 
      sl.location.name.toLowerCase().includes(location_query.toLowerCase()) ||
      sl.location.region?.toLowerCase().includes(location_query.toLowerCase()) ||
      sl.location.country_code?.toLowerCase().includes(location_query.toLowerCase())
    )
  );
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          query: location_query,
          found: filteredStories.length,
          stories: filteredStories
        }, null, 2)
      }
    ]
  };
}

// Start the server
async function main() {
  console.log('🚀 Starting Enhanced Supabase MCP Server...');
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.log('✅ Enhanced Supabase MCP Server is running');
  console.log('📊 Available tools: story enrichment, location management, analytics');
  console.log('🤖 AI-powered enrichment with Perplexity Sonar model');
}

main().catch((error) => {
  console.error('💥 Server failed to start:', error);
  process.exit(1);
}); 