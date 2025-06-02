import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class TranslationService {
  constructor(libreTranslateUrl = 'http://localhost:5000') {
    this.apiUrl = libreTranslateUrl;
    this.supportedLanguages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'ko', name: 'Korean' },
      { code: 'zh', name: 'Chinese' },
      { code: 'ar', name: 'Arabic' },
      { code: 'hi', name: 'Hindi' }
    ];
  }

  async detectLanguage(text) {
    try {
      const response = await fetch(`${this.apiUrl}/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text })
      });
      
      const result = await response.json();
      return result[0]?.language || 'en';
    } catch (error) {
      console.error('Language detection failed:', error);
      return 'en'; // Default to English
    }
  }

  async translateText(text, sourceLanguage, targetLanguage) {
    try {
      const response = await fetch(`${this.apiUrl}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage
        })
      });

      const result = await response.json();
      return {
        translatedText: result.translatedText,
        confidence: result.confidence || 0.8 // LibreTranslate doesn't always provide confidence
      };
    } catch (error) {
      console.error('Translation failed:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  async translateStory(storyId, targetLanguage) {
    try {
      // Get the original story
      const { data: story, error: storyError } = await supabase
        .from('stories')
        .select('id, title, summary, original_text, original_language')
        .eq('id', storyId)
        .single();

      if (storyError) throw storyError;

      // Check if translation already exists
      const { data: existingTranslation } = await supabase
        .from('story_translations')
        .select('*')
        .eq('story_id', storyId)
        .eq('language_code', targetLanguage)
        .single();

      if (existingTranslation) {
        return existingTranslation;
      }

      const sourceLanguage = story.original_language || 'en';
      
      // Skip if already in target language
      if (sourceLanguage === targetLanguage) {
        return story;
      }

      console.log(`🌍 Translating story "${story.title}" from ${sourceLanguage} to ${targetLanguage}`);

      // Translate in chunks to avoid API limits
      const titleTranslation = await this.translateText(story.title, sourceLanguage, targetLanguage);
      const summaryTranslation = await this.translateText(story.summary, sourceLanguage, targetLanguage);
      
      // Split long text into chunks for translation
      const textChunks = this.splitTextIntoChunks(story.original_text, 5000);
      const translatedChunks = [];
      
      for (let i = 0; i < textChunks.length; i++) {
        console.log(`   Translating chunk ${i + 1}/${textChunks.length}`);
        const chunkTranslation = await this.translateText(textChunks[i], sourceLanguage, targetLanguage);
        translatedChunks.push(chunkTranslation.translatedText);
        
        // Rate limiting - wait between chunks
        if (i < textChunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      const translatedText = translatedChunks.join('\n\n');
      const avgConfidence = (titleTranslation.confidence + summaryTranslation.confidence) / 2;

      // Store translation in database
      const { data: translation, error: translationError } = await supabase
        .from('story_translations')
        .insert({
          story_id: storyId,
          language_code: targetLanguage,
          title: titleTranslation.translatedText,
          summary: summaryTranslation.translatedText,
          translated_text: translatedText,
          translation_quality: avgConfidence
        })
        .select()
        .single();

      if (translationError) throw translationError;

      console.log(`   ✅ Translation completed with ${avgConfidence.toFixed(2)} confidence`);
      return translation;

    } catch (error) {
      console.error(`❌ Failed to translate story ${storyId}:`, error);
      throw error;
    }
  }

  splitTextIntoChunks(text, maxChunkSize = 5000) {
    const sentences = text.split(/[.!?]+\s+/);
    const chunks = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > maxChunkSize && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence + '. ';
      } else {
        currentChunk += sentence + '. ';
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  async getStoryInLanguage(storyId, languageCode) {
    try {
      // First try to get existing translation
      const { data: translation } = await supabase
        .from('story_translations')
        .select('*')
        .eq('story_id', storyId)
        .eq('language_code', languageCode)
        .single();

      if (translation) {
        return {
          id: storyId,
          title: translation.title,
          summary: translation.summary,
          original_text: translation.translated_text,
          language: languageCode,
          isTranslation: true,
          translationQuality: translation.translation_quality
        };
      }

      // If no translation exists, return original if it matches language
      const { data: originalStory } = await supabase
        .from('stories')
        .select('*')
        .eq('id', storyId)
        .single();

      if (originalStory?.original_language === languageCode) {
        return {
          ...originalStory,
          language: languageCode,
          isTranslation: false
        };
      }

      // Create translation on demand
      return await this.translateStory(storyId, languageCode);

    } catch (error) {
      console.error('Failed to get story in language:', error);
      throw error;
    }
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

export default TranslationService; 