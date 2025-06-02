#!/usr/bin/env node

/**
 * Story Content Cleanup Pipeline for StoryMap
 * 
 * This pipeline cleans story content by:
 * 1. Identifying stories with cluttered content (metadata, headers, TOCs, etc.)
 * 2. Using Perplexity Sonar API to extract clean story text
 * 3. Updating stories with cleaned content in Supabase
 * 4. Implementing batch processing with rate limiting
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
  BATCH_SIZE: 1, // Process 1 story at a time for testing
  MAX_RETRIES: 3,
  
  // Output
  OUTPUT_DIR: path.join(__dirname, '..', 'data', 'cleanup_logs'),
  
  // Perplexity API configuration
  PERPLEXITY_MODEL: 'llama-3.1-sonar-large-128k-online',
  
  // Content analysis thresholds
  MIN_STORY_LENGTH: 200, // Skip very short content
  MAX_CONTENT_LENGTH: 50000, // Chunk very long content
};

// Patterns that indicate cluttered content
const CLUTTER_PATTERNS = [
  // Project Gutenberg markers
  /\*\*\* START OF .*? \*\*\*/i,
  /\*\*\* END OF .*? \*\*\*/i,
  /produced by.*?distributed proofreading team/i,
  /this file was produced from images/i,
  
  // Publication info
  /entered according to act of congress/i,
  /copyright.*?\d{4}/i,
  /published by.*?\d{4}/i,
  /university press/i,
  /fields, osgood/i,
  
  // Table of contents
  /list of illustrations/i,
  /table of contents/i,
  /contents\s*page/i,
  /chapter.*?\d+/i,
  /engraved by/i,
  
  // Legal/metadata text
  /all rights reserved/i,
  /transcriber's note/i,
  /editor's note/i,
  /preface/i,
  /foreword/i,
  
  // Formatting artifacts
  /^\s*_+\s*$/m,
  /^\s*\*+\s*$/m,
  /^\s*-+\s*$/m,
  /^\s*=+\s*$/m,
];

class StoryContentCleanup {
  constructor() {
    this.supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    this.cleanupStats = {
      processed: 0,
      cleaned: 0,
      errors: 0,
      already_clean: 0,
      characters_removed: 0
    };
    this.errors = [];
  }

  async init() {
    await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
    console.log('🧹 Starting Story Content Cleanup Pipeline...');
    console.log(`📊 Batch size: ${CONFIG.BATCH_SIZE}`);
    console.log(`⏱️  Rate limit: ${CONFIG.PERPLEXITY_RATE_LIMIT_MS}ms between API calls`);
    
    // Validate API keys
    if (!CONFIG.PERPLEXITY_API_KEY) {
      throw new Error('PERPLEXITY_API_KEY is required in .env file');
    }
    
    console.log('✅ Configuration validated');
  }

  async analyzeStoriesForCleanup() {
    console.log('\n📋 Analyzing stories for content cleanup...');
    
    const { data: stories, error } = await this.supabase
      .from('stories')
      .select('id, title, original_text, word_count')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const analysisResults = {
      total_stories: stories.length,
      needs_cleanup: [],
      already_clean: [],
      too_short: [],
      errors: []
    };

    for (const story of stories) {
      if (!story.original_text) {
        analysisResults.errors.push({ id: story.id, title: story.title, issue: 'No content' });
        continue;
      }

      if (story.original_text.length < CONFIG.MIN_STORY_LENGTH) {
        analysisResults.too_short.push({ id: story.id, title: story.title, length: story.original_text.length });
        continue;
      }

      const clutterScore = this.calculateClutterScore(story.original_text);
      
      if (clutterScore > 3) { // High clutter score indicates need for cleanup
        analysisResults.needs_cleanup.push({
          id: story.id,
          title: story.title,
          content_length: story.original_text.length,
          clutter_score: clutterScore,
          preview: story.original_text.substring(0, 200) + '...'
        });
      } else {
        analysisResults.already_clean.push(story.id);
      }
    }

    console.log(`\n📊 Analysis Results:`);
    console.log(`   Total stories: ${analysisResults.total_stories}`);
    console.log(`   Need cleanup: ${analysisResults.needs_cleanup.length}`);
    console.log(`   Already clean: ${analysisResults.already_clean.length}`);
    console.log(`   Too short: ${analysisResults.too_short.length}`);
    console.log(`   Errors: ${analysisResults.errors.length}`);

    return analysisResults;
  }

  calculateClutterScore(content) {
    let score = 0;
    
    // Check for clutter patterns
    for (const pattern of CLUTTER_PATTERNS) {
      if (pattern.test(content)) {
        score += 1;
      }
    }
    
    // Additional heuristics
    const lines = content.split('\n');
    const totalLines = lines.length;
    
    // High ratio of short lines (likely metadata/TOC)
    const shortLines = lines.filter(line => line.trim().length < 50).length;
    if (shortLines / totalLines > 0.3) score += 2;
    
    // Multiple consecutive uppercase lines (likely headers)
    let consecutiveUppercase = 0;
    for (const line of lines) {
      if (line.trim().length > 5 && line.trim() === line.trim().toUpperCase()) {
        consecutiveUppercase++;
      } else {
        if (consecutiveUppercase >= 3) score += 2;
        consecutiveUppercase = 0;
      }
    }
    
    // Excessive whitespace/formatting
    const whitespaceRatio = (content.match(/\s/g) || []).length / content.length;
    if (whitespaceRatio > 0.2) score += 1;
    
    return score;
  }

  async cleanStoryWithPerplexity(story) {
    console.log(`🧹 Cleaning story: "${story.title}"`);
    
    try {
      const prompt = this.buildCleanupPrompt(story);
      
      const response = await axios.post('https://api.perplexity.ai/chat/completions', {
        model: CONFIG.PERPLEXITY_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an expert text editor specializing in cleaning up digitized stories and literature. Your task is to extract only the pure story content, removing all metadata, headers, table of contents, publication information, and formatting artifacts while preserving the complete narrative."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 10000,
        temperature: 0.1, // Low temperature for consistent output
        stream: false
      }, {
        headers: {
          'Authorization': `Bearer ${CONFIG.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const cleanedContent = response.data.choices[0].message.content;
      
      // Validate cleaned content
      if (cleanedContent.length < story.original_text.length * 0.5) {
        console.log(`⚠️  Warning: Cleaned content is less than 50% of original for "${story.title}"`);
        console.log(`   Original: ${story.original_text.length} chars, Cleaned: ${cleanedContent.length} chars`);
      }
      
      return {
        success: true,
        original_length: story.original_text.length,
        cleaned_length: cleanedContent.length,
        cleaned_content: cleanedContent,
        characters_removed: story.original_text.length - cleanedContent.length
      };
      
    } catch (error) {
      console.error(`❌ Error cleaning story "${story.title}":`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  buildCleanupPrompt(story) {
    return `Please clean up this story text by removing all clutter and metadata while preserving the complete narrative.

STORY TITLE: "${story.title}"

INSTRUCTIONS:
1. Remove ALL of the following:
   - Project Gutenberg headers and footers
   - Copyright notices and publication information
   - Table of contents and lists of illustrations
   - Author biographical information (unless it's part of the story)
   - Publisher information and printing details
   - Transcriber notes and editor comments
   - Chapter headings and section numbers
   - Excessive whitespace and formatting artifacts

2. PRESERVE:
   - The complete story narrative from beginning to end
   - Character dialogue and descriptions
   - All plot elements and story scenes
   - The original author's writing style and language
   - Paragraph breaks that are part of the narrative structure

3. OUTPUT:
   - Only the clean story text
   - Start directly with the story content
   - End when the story ends
   - No additional commentary or explanations

Here is the story content to clean:

---
${story.original_text.substring(0, 30000)}${story.original_text.length > 30000 ? '\n\n[CONTENT TRUNCATED - PROCESS FULL TEXT]' : ''}
---

Please provide only the cleaned story text:`;
  }

  async updateStoryContent(storyId, cleanedContent, originalLength, cleanedLength) {
    try {
      // Calculate actual word count for the cleaned content
      const wordCount = cleanedContent.split(/\s+/).filter(word => word.length > 0).length;
      
      const { error } = await this.supabase
        .from('stories')
        .update({
          original_text: cleanedContent,
          word_count: wordCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', storyId);

      if (error) throw error;

      console.log(`✅ Updated story content (${originalLength} → ${cleanedLength} chars, ${wordCount} words)`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to update story content:`, error.message);
      return false;
    }
  }

  async processCleanupBatch(stories) {
    console.log(`\n🔄 Processing batch of ${stories.length} stories...`);
    
    const results = [];
    
    for (let i = 0; i < stories.length; i++) {
      const storyMeta = stories[i];
      console.log(`\n[${i + 1}/${stories.length}] Processing: ${storyMeta.title}`);
      
      try {
        // Fetch the complete story data including original_text
        const { data: story, error } = await this.supabase
          .from('stories')
          .select('id, title, original_text')
          .eq('id', storyMeta.id)
          .single();

        if (error) throw error;

        if (!story.original_text) {
          console.log(`⚠️  Skipping "${story.title}" - no content found`);
          this.cleanupStats.errors++;
          this.errors.push({ story: story.title, error: 'No content found' });
          continue;
        }

        const cleanupResult = await this.cleanStoryWithPerplexity(story);
        
        if (cleanupResult.success) {
          const updateSuccess = await this.updateStoryContent(
            story.id,
            cleanupResult.cleaned_content,
            cleanupResult.original_length,
            cleanupResult.cleaned_length
          );
          
          if (updateSuccess) {
            this.cleanupStats.cleaned++;
            this.cleanupStats.characters_removed += cleanupResult.characters_removed;
          } else {
            this.cleanupStats.errors++;
            this.errors.push({ story: story.title, error: 'Failed to update database' });
          }
        } else {
          this.cleanupStats.errors++;
          this.errors.push({ story: story.title, error: cleanupResult.error });
        }
        
        this.cleanupStats.processed++;
        
        // Rate limiting
        if (i < stories.length - 1) {
          console.log(`⏱️  Waiting ${CONFIG.PERPLEXITY_RATE_LIMIT_MS}ms before next API call...`);
          await this.sleep(CONFIG.PERPLEXITY_RATE_LIMIT_MS);
        }
        
      } catch (error) {
        console.error(`❌ Error processing story "${storyMeta.title}":`, error.message);
        this.cleanupStats.errors++;
        this.errors.push({ story: storyMeta.title, error: error.message });
      }
      
      results.push({ story: storyMeta.title, processed: true });
    }
    
    return results;
  }

  async runCleanupPipeline() {
    console.log('\n🚀 Starting Content Cleanup Pipeline...');
    
    const analysis = await this.analyzeStoriesForCleanup();
    
    if (analysis.needs_cleanup.length === 0) {
      console.log('\n🎉 All stories are already clean! No cleanup needed.');
      return;
    }
    
    console.log(`\n📋 ${analysis.needs_cleanup.length} stories need cleanup`);
    
    // Process stories in batches
    const batches = this.chunkArray(analysis.needs_cleanup, CONFIG.BATCH_SIZE);
    
    for (let i = 0; i < batches.length; i++) {
      console.log(`\n📦 Processing batch ${i + 1}/${batches.length}`);
      await this.processCleanupBatch(batches[i]);
      
      // Brief pause between batches
      if (i < batches.length - 1) {
        console.log('⏸️  Brief pause between batches...');
        await this.sleep(1000);
      }
    }
    
    await this.generateCleanupReport();
  }

  async generateCleanupReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportPath = path.join(CONFIG.OUTPUT_DIR, `cleanup_report_${timestamp}.json`);
    
    const report = {
      timestamp: new Date().toISOString(),
      statistics: this.cleanupStats,
      errors: this.errors,
      config: {
        batch_size: CONFIG.BATCH_SIZE,
        rate_limit: CONFIG.PERPLEXITY_RATE_LIMIT_MS,
        model: CONFIG.PERPLEXITY_MODEL
      }
    };
    
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📊 CLEANUP PIPELINE COMPLETE');
    console.log('='.repeat(50));
    console.log(`📈 Stories processed: ${this.cleanupStats.processed}`);
    console.log(`✅ Stories cleaned: ${this.cleanupStats.cleaned}`);
    console.log(`❌ Errors: ${this.cleanupStats.errors}`);
    console.log(`🗑️  Characters removed: ${this.cleanupStats.characters_removed.toLocaleString()}`);
    console.log(`📁 Report saved: ${reportPath}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      this.errors.forEach(error => {
        console.log(`   - ${error.story}: ${error.error}`);
      });
    }
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

async function main() {
  try {
    const pipeline = new StoryContentCleanup();
    await pipeline.init();
    await pipeline.runCleanupPipeline();
  } catch (error) {
    console.error('❌ Pipeline failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 