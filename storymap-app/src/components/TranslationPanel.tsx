import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './TranslationPanel.css';

const supabase = createClient(
  'https://cvcjjwrorvgvptkckzml.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y2pqd3JvcnZndnB0a2Nrem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MDUyMTcsImV4cCI6MjA0ODQ4MTIxN30.Wq9v-WKa-p8b-a8QGNLY2YnD3mUB0fJe6kVCGK0T1dI'
);

interface Story {
  id: string;
  title: string;
  fullText: string;
}

interface TranslationPanelProps {
  story: Story;
}

interface TranslationResult {
  originalTitle: string;
  originalContent: string;
  translatedTitle: string;
  translatedContent: string;
  targetLanguage: string;
}

const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh-Hans', name: 'Chinese (Simplified)' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
];

const TranslationPanel: React.FC<TranslationPanelProps> = ({ story }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    setIsTranslating(true);
    setError(null);
    
    try {
      const { data, error: functionError } = await supabase.functions.invoke('translate-story', {
        body: {
          storyId: story.id,
          targetLanguage: selectedLanguage
        }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Translation failed');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setTranslation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const selectedLanguageName = SUPPORTED_LANGUAGES.find(
    lang => lang.code === selectedLanguage
  )?.name || selectedLanguage;

  return (
    <div className="translation-panel">
      <div className="translation-controls">
        <h3>🌐 Translate Story</h3>
        
        <div className="language-selector">
          <label htmlFor="language-select">Translate to:</label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isTranslating}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="translate-button"
        >
          {isTranslating ? '🔄 Translating...' : `🌐 Translate to ${selectedLanguageName}`}
        </button>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
      </div>

      {translation && (
        <div className="translation-result">
          <h4>📖 Translation Result</h4>
          
          <div className="translation-comparison">
            <div className="original-text">
              <h5>🇺🇸 Original (English)</h5>
              <div className="text-content">
                <h6>{translation.originalTitle}</h6>
                <p>{translation.originalContent.substring(0, 500)}...</p>
              </div>
            </div>
            
            <div className="translated-text">
              <h5>🌍 {selectedLanguageName}</h5>
              <div className="text-content">
                <h6>{translation.translatedTitle}</h6>
                <p>{translation.translatedContent.substring(0, 500)}...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationPanel; 