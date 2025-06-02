#!/usr/bin/env node

import TranslationService from '../lib/translation-service.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class StoryTranslationBatch {
  constructor() {
    this.translationService = new TranslationService();
    this.stats = {
      processed: 0,
      successful: 0,
      failed: 0,
      skipped: 0
    };
  }

  async translateStoriesIntoLanguages(targetLanguages = ['es', 'fr', 'de'], limit = 10) {
    console.log('🌍 Starting batch story translation...');
    console.log(`📋 Target languages: ${targetLanguages.join(', ')}`);
    console.log(`📊 Story limit: ${limit}\n`);

    // Get stories to translate (prioritize popular/short ones first)
    const { data: stories, error } = await supabase
      .from('stories')
      .select('id, title, word_count')
      .order('word_count', { ascending: true }) // Start with shorter stories
      .limit(limit);

    if (error) {
      console.error('❌ Failed to fetch stories:', error);
      return;
    }

    console.log(`📚 Found ${stories.length} stories to process\n`);

    for (const story of stories) {
      console.log(`\n📖 Processing: "${story.title}" (${story.word_count} words)`);
      
      for (const targetLang of targetLanguages) {
        try {
          this.stats.processed++;
          
          // Check if translation already exists
          const { data: existingTranslation } = await supabase
            .from('story_translations')
            .select('id')
            .eq('story_id', story.id)
            .eq('language_code', targetLang)
            .single();

          if (existingTranslation) {
            console.log(`   ⏭️  ${targetLang.toUpperCase()}: Already translated, skipping`);
            this.stats.skipped++;
            continue;
          }

          console.log(`   🔄 ${targetLang.toUpperCase()}: Translating...`);
          
          await this.translationService.translateStory(story.id, targetLang);
          
          console.log(`   ✅ ${targetLang.toUpperCase()}: Translation completed`);
          this.stats.successful++;

          // Rate limiting between translations
          await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
          console.error(`   ❌ ${targetLang.toUpperCase()}: Translation failed:`, error.message);
          this.stats.failed++;
        }
      }

      // Longer pause between stories
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    this.printSummary();
  }

  async translateSpecificStory(storyId, targetLanguages) {
    console.log(`🎯 Translating specific story: ${storyId}`);
    
    for (const targetLang of targetLanguages) {
      try {
        console.log(`\n🔄 Translating to ${targetLang.toUpperCase()}...`);
        const translation = await this.translationService.translateStory(storyId, targetLang);
        console.log(`✅ Translation completed: ${translation.title}`);
      } catch (error) {
        console.error(`❌ Translation to ${targetLang} failed:`, error.message);
      }
    }
  }

  printSummary() {
    console.log('\n📊 TRANSLATION SUMMARY');
    console.log('=====================================');
    console.log(`Stories processed: ${this.stats.processed}`);
    console.log(`Translations successful: ${this.stats.successful}`);
    console.log(`Translations skipped: ${this.stats.skipped}`);
    console.log(`Translations failed: ${this.stats.failed}`);
    
    if (this.stats.successful > 0) {
      console.log(`\n🎉 Successfully created ${this.stats.successful} translations!`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const batchTranslator = new StoryTranslationBatch();

  switch (command) {
    case 'batch':
      const languages = args[1] ? args[1].split(',') : ['es', 'fr', 'de'];
      const limit = parseInt(args[2]) || 10;
      await batchTranslator.translateStoriesIntoLanguages(languages, limit);
      break;
      
    case 'story':
      const storyId = args[1];
      const storyLanguages = args[2] ? args[2].split(',') : ['es', 'fr'];
      if (!storyId) {
        console.error('❌ Please provide a story ID');
        process.exit(1);
      }
      await batchTranslator.translateSpecificStory(storyId, storyLanguages);
      break;
      
    default:
      console.log('🌍 Story Translation Tool');
      console.log('=========================');
      console.log('');
      console.log('Usage:');
      console.log('  npm run translate batch [languages] [limit]');
      console.log('  npm run translate story <story-id> [languages]');
      console.log('');
      console.log('Examples:');
      console.log('  npm run translate batch es,fr,de 5');
      console.log('  npm run translate story abc-123 es,fr');
      console.log('');
      console.log('Default languages: es,fr,de');
      console.log('Default limit: 10');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
} 