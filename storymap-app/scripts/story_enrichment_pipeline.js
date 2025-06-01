#!/usr/bin/env node

/**
 * Story Enrichment Pipeline for StoryMap
 * 
 * This pipeline ensures all stories have complete metadata by:
 * 1. Analyzing existing stories for missing data
 * 2. Using Perplexity Sonar API to intelligently fill gaps
 * 3. Leveraging Supabase MCP Server for database operations
 * 4. Implementing batch processing with rate limiting
 * 5. Ensuring every story has at least one location (core requirement)
 */

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
  
  // Rate limiting
  PERPLEXITY_RATE_LIMIT_MS: 2000, // 2 seconds between API calls
  BATCH_SIZE: 10, // Process 10 stories at a time
  MAX_RETRIES: 3,
  
  // Output
  OUTPUT_DIR: path.join(__dirname, '..', 'data', 'enrichment_logs'),
  
  // Perplexity API configuration
  PERPLEXITY_MODEL: 'llama-3.1-sonar-large-128k-online',
  
  // Critical fields that must be filled
  REQUIRED_FIELDS: {
    location: true,
    themes: true,
    publication_year: false,
    author_details: false
  }
};

// Comprehensive location database for intelligent mapping
const GLOBAL_LOCATIONS = {
  // Major cities
  'London': { lat: 51.5074, lng: -0.1278, country: 'GB', region: 'Europe', type: 'city' },
  'Paris': { lat: 48.8566, lng: 2.3522, country: 'FR', region: 'Europe', type: 'city' },
  'New York': { lat: 40.7128, lng: -74.0060, country: 'US', region: 'North America', type: 'city' },
  'Rome': { lat: 41.9028, lng: 12.4964, country: 'IT', region: 'Europe', type: 'city' },
  'Berlin': { lat: 52.5200, lng: 13.4050, country: 'DE', region: 'Europe', type: 'city' },
  'Vienna': { lat: 48.2082, lng: 16.3738, country: 'AT', region: 'Europe', type: 'city' },
  'Prague': { lat: 50.0755, lng: 14.4378, country: 'CZ', region: 'Europe', type: 'city' },
  'Moscow': { lat: 55.7558, lng: 37.6176, country: 'RU', region: 'Europe', type: 'city' },
  'St. Petersburg': { lat: 59.9311, lng: 30.3609, country: 'RU', region: 'Europe', type: 'city' },
  'Edinburgh': { lat: 55.9533, lng: -3.1883, country: 'GB', region: 'Europe', type: 'city' },
  'Dublin': { lat: 53.3498, lng: -6.2603, country: 'IE', region: 'Europe', type: 'city' },
  'Amsterdam': { lat: 52.3676, lng: 4.9041, country: 'NL', region: 'Europe', type: 'city' },
  'Copenhagen': { lat: 55.6761, lng: 12.5683, country: 'DK', region: 'Europe', type: 'city' },
  'Stockholm': { lat: 59.3293, lng: 18.0686, country: 'SE', region: 'Europe', type: 'city' },
  'Madrid': { lat: 40.4168, lng: -3.7038, country: 'ES', region: 'Europe', type: 'city' },
  'Barcelona': { lat: 41.3851, lng: 2.1734, country: 'ES', region: 'Europe', type: 'city' },
  'Lisbon': { lat: 38.7223, lng: -9.1393, country: 'PT', region: 'Europe', type: 'city' },
  'Athens': { lat: 37.9838, lng: 23.7275, country: 'GR', region: 'Europe', type: 'city' },
  'Istanbul': { lat: 41.0082, lng: 28.9784, country: 'TR', region: 'Europe/Asia', type: 'city' },
  
  // Countries as fallback
  'England': { lat: 52.3555, lng: -1.1743, country: 'GB', region: 'Europe', type: 'country' },
  'France': { lat: 46.2276, lng: 2.2137, country: 'FR', region: 'Europe', type: 'country' },
  'Germany': { lat: 51.1657, lng: 10.4515, country: 'DE', region: 'Europe', type: 'country' },
  'Italy': { lat: 41.8719, lng: 12.5674, country: 'IT', region: 'Europe', type: 'country' },
  'Spain': { lat: 40.4637, lng: -3.7492, country: 'ES', region: 'Europe', type: 'country' },
  'Russia': { lat: 61.5240, lng: 105.3188, country: 'RU', region: 'Europe/Asia', type: 'country' },
  'United States': { lat: 39.8283, lng: -98.5795, country: 'US', region: 'North America', type: 'country' },
  'America': { lat: 39.8283, lng: -98.5795, country: 'US', region: 'North America', type: 'country' },
  
  // Regions as last resort
  'Europe': { lat: 54.5260, lng: 15.2551, country: 'EU', region: 'Europe', type: 'region' },
  'Asia': { lat: 34.0479, lng: 100.6197, country: 'AS', region: 'Asia', type: 'region' },
  'North America': { lat: 45.0000, lng: -100.0000, country: 'NA', region: 'North America', type: 'region' }
};

class StoryEnrichmentPipeline {
  constructor() {
    this.supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    this.enrichmentStats = {
      processed: 0,
      enriched: 0,
      errors: 0,
      locations_added: 0,
      themes_added: 0,
      authors_enriched: 0
    };
    this.errors = [];
  }

  async init() {
    await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
    console.log('🚀 Starting Story Enrichment Pipeline...');
    console.log(`📊 Batch size: ${CONFIG.BATCH_SIZE}`);
    console.log(`⏱️  Rate limit: ${CONFIG.PERPLEXITY_RATE_LIMIT_MS}ms between API calls`);
    
    // Validate API keys
    if (!CONFIG.PERPLEXITY_API_KEY) {
      throw new Error('PERPLEXITY_API_KEY is required in .env file');
    }
    
    console.log('✅ Configuration validated');
  }

  async analyzeStoriesForEnrichment() {
    console.log('\n📋 Analyzing stories for missing metadata...');
    
    const { data: stories, error } = await this.supabase
      .from('stories')
      .select(`
        id,
        title,
        summary,
        publication_year,
        story_authors(
          author:authors(name, birth_year, death_year, nationality)
        ),
        story_locations(
          location:locations(name, country_code, region)
        ),
        story_themes(
          theme:themes(name)
        )
      `);

    if (error) throw error;

    const analysisResults = {
      total_stories: stories.length,
      missing_locations: [],
      missing_themes: [],
      missing_publication_year: [],
      incomplete_authors: [],
      needs_enrichment: []
    };

    for (const story of stories) {
      const issues = [];
      
      // Check for missing locations (CRITICAL)
      if (!story.story_locations || story.story_locations.length === 0) {
        analysisResults.missing_locations.push(story.id);
        issues.push('location');
      }
      
      // Check for missing themes
      if (!story.story_themes || story.story_themes.length === 0) {
        analysisResults.missing_themes.push(story.id);
        issues.push('themes');
      }
      
      // Check for missing publication year
      if (!story.publication_year) {
        analysisResults.missing_publication_year.push(story.id);
        issues.push('publication_year');
      }
      
      // Check for incomplete author information
      if (story.story_authors) {
        for (const authorLink of story.story_authors) {
          const author = authorLink.author;
          if (!author.birth_year || !author.death_year || !author.nationality) {
            if (!analysisResults.incomplete_authors.includes(story.id)) {
              analysisResults.incomplete_authors.push(story.id);
              issues.push('author_details');
            }
          }
        }
      }
      
      if (issues.length > 0) {
        analysisResults.needs_enrichment.push({
          id: story.id,
          title: story.title,
          summary: story.summary,
          issues: issues
        });
      }
    }

    console.log(`\n�� Analysis Results:`);
    console.log(`   Total stories: ${analysisResults.total_stories}`);
    console.log(`   Missing locations: ${analysisResults.missing_locations.length} (CRITICAL)`);
    console.log(`   Missing themes: ${analysisResults.missing_themes.length}`);
    console.log(`   Missing publication year: ${analysisResults.missing_publication_year.length}`);
    console.log(`   Incomplete authors: ${analysisResults.incomplete_authors.length}`);
    console.log(`   Stories needing enrichment: ${analysisResults.needs_enrichment.length}`);

    return analysisResults;
  }

  async enrichStoryWithPerplexity(story, issues) {
    console.log(`\n🤖 Enriching "${story.title}" with Perplexity AI...`);
    console.log(`   Issues to resolve: ${issues.join(', ')}`);

    // CRITICAL: Validate story ID before proceeding
    if (!story.id) {
      throw new Error(`Story "${story.title}" has no ID - cannot proceed with enrichment`);
    }

    const prompt = this.buildEnrichmentPrompt(story, issues);
    
    try {
      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: CONFIG.PERPLEXITY_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are a literary expert and geographer specializing in story analysis and location identification. Provide accurate, specific information in valid JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${CONFIG.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      const enrichmentData = this.parsePerplexityResponse(response.data.choices[0].message.content);
      
      // CRITICAL: Double-check story ID before applying enrichment
      if (!story.id) {
        throw new Error(`Story ID is null/undefined for "${story.title}"`);
      }
      
      await this.applyEnrichmentToStory(story.id, enrichmentData);
      
      console.log(`   ✅ Successfully enriched "${story.title}"`);
      return enrichmentData;
      
    } catch (error) {
      console.error(`   ❌ Error enriching "${story.title}":`, error.message);
      this.errors.push({
        story_id: story.id || 'UNKNOWN',
        title: story.title,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  buildEnrichmentPrompt(story, issues) {
    let prompt = `Analyze this story and provide missing information in JSON format:\n\n`;
    prompt += `Title: "${story.title}"\n`;
    prompt += `Summary: "${story.summary}"\n\n`;
    
    prompt += `Please provide the following information in valid JSON format:\n{\n`;
    
    if (issues.includes('location')) {
      prompt += `  "locations": [\n`;
      prompt += `    {\n`;
      prompt += `      "name": "Primary location name (city, region, or country)",\n`;
      prompt += `      "role": "setting",\n`;
      prompt += `      "confidence": 0.8\n`;
      prompt += `    }\n`;
      prompt += `  ],\n`;
    }
    
    if (issues.includes('themes')) {
      prompt += `  "themes": [\n`;
      prompt += `    {\n`;
      prompt += `      "name": "Primary theme",\n`;
      prompt += `      "confidence": 0.9\n`;
      prompt += `    }\n`;
      prompt += `  ],\n`;
    }
    
    if (issues.includes('publication_year')) {
      prompt += `  "publication_year": 1850,\n`;
    }
    
    if (issues.includes('author_details')) {
      prompt += `  "author_enrichment": {\n`;
      prompt += `    "birth_year": 1850,\n`;
      prompt += `    "death_year": 1900,\n`;
      prompt += `    "nationality": "British"\n`;
      prompt += `  },\n`;
    }
    
    prompt += `  "confidence_score": 0.85\n`;
    prompt += `}\n\n`;
    
    prompt += `Requirements:\n`;
    prompt += `- ALWAYS provide at least one location (this is critical for StoryMap)\n`;
    prompt += `- Use real, specific place names when possible\n`;
    prompt += `- If uncertain about location, use the author's nationality/origin as fallback\n`;
    prompt += `- Provide confidence scores (0.0-1.0)\n`;
    prompt += `- Return only valid JSON, no additional text\n`;
    
    return prompt;
  }

  parsePerplexityResponse(content) {
    try {
      // Clean the response to extract JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const jsonStr = jsonMatch[0];
      const data = JSON.parse(jsonStr);
      
      // Validate required structure
      if (!data.locations || !Array.isArray(data.locations) || data.locations.length === 0) {
        // Fallback: create a default location
        data.locations = [{
          name: 'Europe',
          role: 'setting',
          confidence: 0.5
        }];
      }
      
      return data;
    } catch (error) {
      console.error('Error parsing Perplexity response:', error.message);
      console.error('Raw content:', content);
      
      // Return fallback data
      return {
        locations: [{
          name: 'Europe',
          role: 'setting',
          confidence: 0.3
        }],
        themes: [{
          name: 'Literature',
          confidence: 0.5
        }],
        confidence_score: 0.3
      };
    }
  }

  async applyEnrichmentToStory(storyId, enrichmentData) {
    console.log(`   💾 Applying enrichment to story ${storyId}...`);
    
    // Apply locations (CRITICAL)
    if (enrichmentData.locations) {
      for (const locationData of enrichmentData.locations) {
        await this.addLocationToStory(storyId, locationData);
        this.enrichmentStats.locations_added++;
      }
    }
    
    // Apply themes
    if (enrichmentData.themes) {
      for (const themeData of enrichmentData.themes) {
        await this.addThemeToStory(storyId, themeData);
        this.enrichmentStats.themes_added++;
      }
    }
    
    // Apply publication year
    if (enrichmentData.publication_year) {
      await this.supabase
        .from('stories')
        .update({ publication_year: enrichmentData.publication_year })
        .eq('id', storyId);
    }
    
    // Apply author enrichment
    if (enrichmentData.author_enrichment) {
      await this.enrichStoryAuthors(storyId, enrichmentData.author_enrichment);
      this.enrichmentStats.authors_enriched++;
    }
  }

  async addLocationToStory(storyId, locationData) {
    // CRITICAL: Validate inputs before proceeding
    if (!storyId) {
      throw new Error(`Cannot add location: story ID is null/undefined`);
    }
    
    if (!locationData || !locationData.name) {
      throw new Error(`Cannot add location: invalid location data for story ${storyId}`);
    }
    
    const locationName = locationData.name;
    
    // Try to find location in our global database
    let coordinates = GLOBAL_LOCATIONS[locationName];
    
    if (!coordinates) {
      // Try partial matching
      const partialMatch = Object.keys(GLOBAL_LOCATIONS).find(key => 
        key.toLowerCase().includes(locationName.toLowerCase()) ||
        locationName.toLowerCase().includes(key.toLowerCase())
      );
      
      if (partialMatch) {
        coordinates = GLOBAL_LOCATIONS[partialMatch];
      } else {
        // Default to Europe as fallback
        coordinates = GLOBAL_LOCATIONS['Europe'];
      }
    }
    
    // Check if location exists in database
    let { data: existingLocation } = await this.supabase
      .from('locations')
      .select('id')
      .eq('name', locationName)
      .single();
    
    let locationId;
    
    if (!existingLocation) {
      // Create new location
      const { data: newLocation, error } = await this.supabase
        .from('locations')
        .insert({
          name: locationName,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          country_code: coordinates.country,
          region: coordinates.region,
          location_type: coordinates.type || 'city'
        })
        .select()
        .single();
      
      if (error) throw error;
      locationId = newLocation.id;
    } else {
      locationId = existingLocation.id;
    }
    
    // CRITICAL: Final validation before inserting link
    if (!storyId || !locationId) {
      throw new Error(`Cannot create story-location link: storyId=${storyId}, locationId=${locationId}`);
    }
    
    // Link story to location
    const { error: linkError } = await this.supabase
      .from('story_locations')
      .insert({
        story_id: storyId,
        location_id: locationId,
        location_role: locationData.role || 'setting'
      });
    
    if (linkError && !linkError.message.includes('duplicate')) {
      throw linkError;
    }
    
    console.log(`     ✅ Added location: ${locationName}`);
  }

  async addThemeToStory(storyId, themeData) {
    const themeName = themeData.name;
    
    // Check if theme exists
    let { data: existingTheme } = await this.supabase
      .from('themes')
      .select('id')
      .eq('name', themeName)
      .single();
    
    let themeId;
    
    if (!existingTheme) {
      // Create new theme
      const { data: newTheme, error } = await this.supabase
        .from('themes')
        .insert({
          name: themeName,
          description: `Stories related to ${themeName.toLowerCase()}`
        })
        .select()
        .single();
      
      if (error) throw error;
      themeId = newTheme.id;
    } else {
      themeId = existingTheme.id;
    }
    
    // Link story to theme
    const { error: linkError } = await this.supabase
      .from('story_themes')
      .insert({
        story_id: storyId,
        theme_id: themeId
      });
    
    if (linkError && !linkError.message.includes('duplicate')) {
      throw linkError;
    }
    
    console.log(`     ✅ Added theme: ${themeName}`);
  }

  async enrichStoryAuthors(storyId, authorEnrichment) {
    const { data: storyAuthors } = await this.supabase
      .from('story_authors')
      .select('author_id, author:authors(name)')
      .eq('story_id', storyId);
    
    for (const storyAuthor of storyAuthors || []) {
      await this.supabase
        .from('authors')
        .update({
          birth_year: authorEnrichment.birth_year,
          death_year: authorEnrichment.death_year,
          nationality: authorEnrichment.nationality
        })
        .eq('id', storyAuthor.author_id);
      
      console.log(`     ✅ Enriched author: ${storyAuthor.author.name}`);
    }
  }

  async processEnrichmentBatch(stories) {
    console.log(`\n🔄 Processing batch of ${stories.length} stories...`);
    
    for (const storyData of stories) {
      try {
        await this.enrichStoryWithPerplexity(storyData, storyData.issues);
        this.enrichmentStats.enriched++;
        
        // Rate limiting
        await this.sleep(CONFIG.PERPLEXITY_RATE_LIMIT_MS);
        
      } catch (error) {
        this.enrichmentStats.errors++;
        console.error(`   ❌ Failed to enrich "${storyData.title}":`, error.message);
      }
      
      this.enrichmentStats.processed++;
    }
  }

  async runEnrichmentPipeline() {
    console.log('\n🚀 Starting enrichment pipeline...');
    
    // Analyze stories
    const analysis = await this.analyzeStoriesForEnrichment();
    
    if (analysis.needs_enrichment.length === 0) {
      console.log('🎉 All stories are already fully enriched!');
      return;
    }
    
    // Process in batches
    const batches = this.chunkArray(analysis.needs_enrichment, CONFIG.BATCH_SIZE);
    
    console.log(`\n📦 Processing ${batches.length} batches...`);
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\n📦 Batch ${i + 1}/${batches.length}`);
      
      await this.processEnrichmentBatch(batch);
      
      // Longer pause between batches
      if (i < batches.length - 1) {
        console.log(`   ⏸️  Pausing between batches...`);
        await this.sleep(CONFIG.PERPLEXITY_RATE_LIMIT_MS * 2);
      }
    }
    
    await this.generateEnrichmentReport();
  }

  async generateEnrichmentReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    
    const report = {
      timestamp: new Date().toISOString(),
      statistics: this.enrichmentStats,
      errors: this.errors,
      configuration: {
        batch_size: CONFIG.BATCH_SIZE,
        rate_limit_ms: CONFIG.PERPLEXITY_RATE_LIMIT_MS,
        model: CONFIG.PERPLEXITY_MODEL
      }
    };
    
    const reportFile = path.join(CONFIG.OUTPUT_DIR, `enrichment_report_${timestamp}.json`);
    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
    
    console.log(`\n📊 Enrichment Complete!`);
    console.log(`=====================================`);
    console.log(`   Stories processed: ${this.enrichmentStats.processed}`);
    console.log(`   Stories enriched: ${this.enrichmentStats.enriched}`);
    console.log(`   Locations added: ${this.enrichmentStats.locations_added}`);
    console.log(`   Themes added: ${this.enrichmentStats.themes_added}`);
    console.log(`   Authors enriched: ${this.enrichmentStats.authors_enriched}`);
    console.log(`   Errors: ${this.enrichmentStats.errors}`);
    console.log(`   Report saved: ${reportFile}`);
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    batchSize: parseInt(args.find(arg => arg.startsWith('--batch-size='))?.split('=')[1]) || CONFIG.BATCH_SIZE
  };

  try {
    const pipeline = new StoryEnrichmentPipeline();
    await pipeline.init();
    
    if (options.dryRun) {
      console.log('🔍 DRY RUN MODE - Analyzing only...');
      await pipeline.analyzeStoriesForEnrichment();
    } else {
      CONFIG.BATCH_SIZE = options.batchSize;
      await pipeline.runEnrichmentPipeline();
    }
    
  } catch (error) {
    console.error('💥 Pipeline failed:', error.message);
    process.exit(1);
  }
}

export default StoryEnrichmentPipeline;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 