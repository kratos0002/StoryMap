#!/usr/bin/env node

/**
 * Populate Database from DataStories CSV Files
 * 
 * This script uses the existing datastories CSV files to populate the database:
 * - db_books.csv: Contains metadata (title, author, language)
 * - stories.csv: Contains full story content
 * 
 * This approach is much more reliable than fetching from Project Gutenberg.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class DataStoriesPopulator {
  constructor() {
    this.stats = {
      processed: 0,
      successful: 0,
      skipped: 0,
      failed: 0
    };
    
    this.booksMetadata = new Map(); // bookno -> {title, author, language}
    this.storiesContent = new Map(); // bookno -> content
  }

  async loadBooksMetadata(limit = 50, offset = 0) {
    console.log(`📚 Loading books metadata from db_books.csv (limit: ${limit}, offset: ${offset})...`);
    
    return new Promise((resolve, reject) => {
      let count = 0;
      let skipped = 0;
      createReadStream('datastories/db_books.csv')
        .pipe(csv())
        .on('data', (row) => {
          if (skipped < offset) {
            skipped++;
            return;
          }
          if (count >= limit) return; // Stop after limit
          
          const bookno = row.bookno;
          this.booksMetadata.set(bookno, {
            title: row.Title?.trim(),
            author: row.Author?.trim(),
            language: row.Language?.trim()
          });
          count++;
        })
        .on('end', () => {
          console.log(`   ✅ Loaded ${this.booksMetadata.size} book metadata entries (skipped ${offset})`);
          resolve();
        })
        .on('error', reject);
    });
  }

  async loadStoriesContent(limit = 50, offset = 0) {
    console.log(`📖 Loading story content from stories.csv (limit: ${limit}, offset: ${offset})...`);
    
    return new Promise((resolve, reject) => {
      let count = 0;
      let skipped = 0;
      let loaded = 0;
      createReadStream('datastories/stories.csv')
        .pipe(csv())
        .on('data', (row) => {
          if (skipped < offset) {
            skipped++;
            return;
          }
          if (count >= limit) return; // Stop after limit
          
          const bookno = row.bookno;
          const content = row.content?.trim();
          
          if (content && content.length > 1000) { // Only stories with substantial content
            this.storiesContent.set(bookno, content);
            loaded++;
          }
          count++;
        })
        .on('end', () => {
          console.log(`   ✅ Loaded ${loaded} story content entries (from ${count} rows, skipped ${offset})`);
          resolve();
        })
        .on('error', reject);
    });
  }

  cleanStoryText(rawText) {
    if (!rawText) return '';
    
    let cleaned = rawText;
    
    // Remove Project Gutenberg header and footer
    const startMatch = cleaned.match(/\*\*\* START OF .*? \*\*\*/);
    if (startMatch) {
      cleaned = cleaned.substring(cleaned.indexOf(startMatch[0]) + startMatch[0].length);
    }

    const endMatch = cleaned.match(/\*\*\* END OF .*? \*\*\*/);
    if (endMatch) {
      cleaned = cleaned.substring(0, cleaned.indexOf(endMatch[0]));
    }

    // Clean up formatting
    cleaned = cleaned
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^[\s\n]+|[\s\n]+$/g, '')
      .trim();

    return cleaned;
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async findOrCreateAuthor(authorName) {
    if (!authorName || authorName === 'Various') return null;
    
    // Check if author exists
    const { data: existingAuthor } = await supabase
      .from('authors')
      .select('id')
      .eq('name', authorName)
      .single();

    if (existingAuthor) {
      return existingAuthor.id;
    }

    // Create new author
    const { data: newAuthor, error } = await supabase
      .from('authors')
      .insert({ name: authorName })
      .select('id')
      .single();

    if (error) {
      console.error(`   ❌ Failed to create author "${authorName}":`, error.message);
      return null;
    }

    console.log(`   👤 Created new author: ${authorName}`);
    return newAuthor.id;
  }

  async storyExists(title, authorName) {
    const { data } = await supabase
      .from('stories')
      .select('id, title')
      .eq('title', title)
      .limit(1);

    if (data && data.length > 0) {
      console.log(`   ⏭️  Story "${title}" already exists, skipping...`);
      return true;
    }

    return false;
  }

  async storeStory(bookno, metadata, content) {
    const { title, author, language } = metadata;
    
    console.log(`\n📝 Processing: "${title}" by ${author}`);
    
    // Skip if not English for now
    if (language !== 'English') {
      console.log(`   ⏭️  Skipping non-English story (${language})`);
      this.stats.skipped++;
      return;
    }

    // Check if story already exists
    if (await this.storyExists(title, author)) {
      this.stats.skipped++;
      return;
    }

    // Clean the story text
    const cleanedContent = this.cleanStoryText(content);
    const wordCount = cleanedContent.split(/\s+/).length;
    
    console.log(`   📊 Word count: ${wordCount.toLocaleString()}`);
    
    // Skip very long texts (likely full books, not short stories)
    if (wordCount > 50000) {
      console.log(`   ⏭️  Skipping - too long (likely a full book)`);
      this.stats.skipped++;
      return;
    }

    // Skip very short texts
    if (wordCount < 500) {
      console.log(`   ⏭️  Skipping - too short`);
      this.stats.skipped++;
      return;
    }

    try {
      // Create author if needed
      const authorId = await this.findOrCreateAuthor(author);

      // Create story
      const storyData = {
        title: title,
        slug: this.generateSlug(title),
        summary: cleanedContent.substring(0, 500) + '...', // First 500 chars as summary
        original_text: cleanedContent,
        word_count: wordCount,
        original_language: language.toLowerCase(),
        source_url: `datastories/${bookno}`,
        is_public_domain: true
      };

      const { data: story, error: storyError } = await supabase
        .from('stories')
        .insert(storyData)
        .select('id')
        .single();

      if (storyError) throw storyError;

      console.log(`   ✅ Created story with ID: ${story.id}`);

      // Link author to story
      if (authorId) {
        const { error: linkError } = await supabase
          .from('story_authors')
          .insert({
            story_id: story.id,
            author_id: authorId
          });

        if (linkError) {
          console.error(`   ⚠️  Failed to link author:`, linkError.message);
        } else {
          console.log(`   🔗 Linked author: ${author}`);
        }
      }

      this.stats.successful++;

    } catch (error) {
      console.error(`   ❌ Failed to store story:`, error.message);
      this.stats.failed++;
    }
  }

  async processStories(limit = 20) {
    console.log(`\n🚀 Processing stories (limit: ${limit})...\n`);
    
    let processed = 0;
    
    for (const [bookno, content] of this.storiesContent) {
      if (processed >= limit) break;
      
      const metadata = this.booksMetadata.get(bookno);
      if (!metadata) {
        console.log(`⚠️  No metadata found for ${bookno}, skipping...`);
        continue;
      }

      this.stats.processed++;
      await this.storeStory(bookno, metadata, content);
      processed++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  printSummary() {
    console.log('\n📊 PROCESSING SUMMARY');
    console.log('=====================================');
    console.log(`Books metadata loaded: ${this.booksMetadata.size}`);
    console.log(`Stories content loaded: ${this.storiesContent.size}`);
    console.log(`Stories processed: ${this.stats.processed}`);
    console.log(`Stories added: ${this.stats.successful}`);
    console.log(`Stories skipped: ${this.stats.skipped}`);
    console.log(`Stories failed: ${this.stats.failed}`);
    
    if (this.stats.successful > 0) {
      console.log(`\n🎉 Successfully added ${this.stats.successful} stories to the database!`);
    }
  }
}

async function main() {
  try {
    console.log('🎯 DataStories Database Population (Batch 2: Stories 51-100)');
    console.log('===========================================================\n');
    
    const populator = new DataStoriesPopulator();
    
    // Load data from CSV files (stories 51-100)
    await populator.loadBooksMetadata(50, 50); // limit=50, offset=50
    await populator.loadStoriesContent(50, 50);
    
    // Process stories (up to 30 for this batch)
    await populator.processStories(30);
    
    populator.printSummary();
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 