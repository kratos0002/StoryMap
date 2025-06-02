# 🌍 StoryMap Translation Setup Guide

## Overview

This guide walks you through setting up the translation features for StoryMap using [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate), a free and open-source machine translation API.

## 🚀 Quick Start

### 1. Install LibreTranslate

#### Option A: Docker (Recommended)
```bash
# Pull and run LibreTranslate
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate

# Or with persistent data
docker run -ti --rm -p 5000:5000 -v $(pwd)/ltdata:/app/db libretranslate/libretranslate
```

#### Option B: Direct Installation
```bash
pip install libretranslate
libretranslate
```

### 2. Set Up Database Schema

Run this SQL in your Supabase dashboard:

```sql
-- Create story translations table
CREATE TABLE story_translations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    title TEXT,
    summary TEXT,
    translated_text TEXT,
    translation_quality FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(story_id, language_code)
);

-- Add indexes for performance
CREATE INDEX idx_story_translations_story_lang ON story_translations(story_id, language_code);
CREATE INDEX idx_story_translations_language ON story_translations(language_code);

-- Add RLS policies (adjust as needed)
ALTER TABLE story_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to read translations" ON story_translations
FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Allow service role to manage translations" ON story_translations
FOR ALL TO service_role USING (true);
```

### 3. Update Environment Variables

Add to your `.env` file:

```bash
# Translation settings
LIBRETRANSLATE_URL=http://localhost:5000
LIBRETRANSLATE_API_KEY=your_api_key_if_required
TRANSLATION_ENABLED=true
```

### 4. Install Frontend Dependencies

```bash
npm install lucide-react  # For icons (if not already installed)
```

## 📝 Implementation Steps

### Step 1: Test LibreTranslate Connection

First, verify LibreTranslate is working:

```bash
curl -X POST "http://localhost:5000/translate" \
     -H "Content-Type: application/json" \
     -d '{
       "q": "Hello, world!",
       "source": "en",
       "target": "es"
     }'
```

Expected response:
```json
{
  "translatedText": "¡Hola, mundo!"
}
```

### Step 2: Add Translation Scripts to package.json

```json
{
  "scripts": {
    "translate:batch": "node scripts/translate-stories.js batch",
    "translate:story": "node scripts/translate-stories.js story"
  }
}
```

### Step 3: Integrate Language Selector

Update your main App component or HomePage:

```tsx
import { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const { currentLanguage, setLanguage } = useTranslation();

  return (
    <div className="app">
      <header className="flex justify-between items-center p-4">
        <h1>StoryMap</h1>
        <LanguageSelector 
          currentLanguage={currentLanguage}
          onLanguageChange={setLanguage}
        />
      </header>
      {/* Rest of your app */}
    </div>
  );
}
```

### Step 4: Create API Endpoint

Create `/api/stories/[id]/translate` endpoint:

```typescript
// pages/api/stories/[id]/translate.ts (Next.js) or equivalent
import TranslationService from '../../../lib/translation-service';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { targetLanguage } = req.body;

  try {
    const translationService = new TranslationService();
    const result = await translationService.getStoryInLanguage(id, targetLanguage);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## 🔧 Usage Examples

### Translate Individual Stories

```bash
# Translate "The Gift of the Magi" into Spanish and French
npm run translate:story c3bb7b19-76ce-4786-84c2-93c8b04b6589 es,fr
```

### Batch Translate Stories

```bash
# Translate 5 shortest stories into Spanish, French, and German
npm run translate:batch es,fr,de 5
```

### Frontend Usage

```tsx
import { useTranslation } from './hooks/useTranslation';

function StoryViewer({ story }) {
  const { 
    currentLanguage, 
    getStoryInLanguage, 
    isLoading, 
    getError 
  } = useTranslation();

  const [translatedStory, setTranslatedStory] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      const translated = await getStoryInLanguage(story.id);
      setTranslatedStory(translated);
    };
    
    loadStory();
  }, [story.id, currentLanguage]);

  if (isLoading(story.id)) {
    return <div>Translating story...</div>;
  }

  const error = getError(story.id);
  if (error) {
    return <div>Translation error: {error}</div>;
  }

  const displayStory = translatedStory || story;

  return (
    <div>
      <h1>{displayStory.title}</h1>
      <p>{displayStory.summary}</p>
      <div>{displayStory.original_text}</div>
      
      {translatedStory?.isTranslation && (
        <div className="translation-notice">
          Translated with {Math.round(translatedStory.translationQuality * 100)}% confidence
        </div>
      )}
    </div>
  );
}
```

## 🎯 Performance Optimization

### 1. Pre-translate Popular Stories

```bash
# Translate most popular/shortest stories first
npm run translate:batch es,fr,de 20
```

### 2. Implement Caching Strategy

- Use React Query or SWR for client-side caching
- Implement Redis caching for server-side
- Store translations permanently in database

### 3. Lazy Loading

```tsx
// Only translate when user actually requests that language
const handleLanguageChange = async (newLanguage) => {
  if (newLanguage !== story.original_language) {
    // Show loading state while translating
    await getStoryInLanguage(story.id, newLanguage);
  }
};
```

## 🌐 Production Deployment

### Docker Compose Setup

```yaml
version: '3.8'
services:
  storymap:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - libretranslate
    environment:
      - LIBRETRANSLATE_URL=http://libretranslate:5000
  
  libretranslate:
    image: libretranslate/libretranslate
    ports:
      - "5000:5000"
    volumes:
      - ./ltdata:/app/db
    environment:
      - LT_LOAD_ONLY=en,es,fr,de,it,pt,ru,ja,ko,zh,ar,hi
```

### Scaling Considerations

1. **Multiple LibreTranslate Instances**: Use load balancer
2. **Queue System**: Implement Redis queue for translations
3. **Background Processing**: Move translation to background workers
4. **CDN Caching**: Cache translated content globally

## 🛡️ Security & Rate Limiting

### API Rate Limiting

```typescript
// Add rate limiting to translation endpoints
import rateLimit from 'express-rate-limit';

const translateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 translation requests per window
  message: 'Too many translation requests, please try again later.'
});
```

### Input Validation

```typescript
const validateTranslationRequest = (req, res, next) => {
  const { targetLanguage } = req.body;
  
  if (!targetLanguage || !/^[a-z]{2}$/.test(targetLanguage)) {
    return res.status(400).json({ error: 'Invalid language code' });
  }
  
  next();
};
```

## 📊 Monitoring & Analytics

### Track Translation Usage

```sql
-- Add usage tracking
CREATE TABLE translation_usage (
    id SERIAL PRIMARY KEY,
    story_id UUID,
    source_language VARCHAR(10),
    target_language VARCHAR(10),
    user_ip INET,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Translation Quality Feedback

```tsx
function TranslationFeedback({ translationId, quality }) {
  const [rating, setRating] = useState(quality);
  
  const submitFeedback = async (newRating) => {
    await fetch(`/api/translations/${translationId}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ rating: newRating })
    });
  };
  
  return (
    <div className="translation-feedback">
      <span>Translation quality: </span>
      {[1, 2, 3, 4, 5].map(star => (
        <button 
          key={star}
          onClick={() => submitFeedback(star)}
          className={star <= rating ? 'star-filled' : 'star-empty'}
        >
          ⭐
        </button>
      ))}
    </div>
  );
}
```

## 🐛 Troubleshooting

### Common Issues

1. **LibreTranslate not starting**: Check port 5000 availability
2. **Translation fails**: Verify LibreTranslate connection and logs
3. **Database errors**: Ensure translation tables exist and RLS is configured
4. **Performance issues**: Consider text chunking and rate limiting

### Debug Commands

```bash
# Check LibreTranslate status
curl http://localhost:5000/languages

# Test specific translation
curl -X POST "http://localhost:5000/translate" \
     -H "Content-Type: application/json" \
     -d '{"q": "Test", "source": "en", "target": "es"}'

# Check database connections
npm run check-db
```

## 🚀 Next Steps

1. Start with LibreTranslate setup and basic translations
2. Implement the LanguageSelector component
3. Add translation capabilities to your story viewer
4. Set up batch translation for popular stories
5. Add user feedback and analytics
6. Optimize for production deployment

## 📚 Additional Resources

- [LibreTranslate Documentation](https://github.com/LibreTranslate/LibreTranslate)
- [LibreTranslate API Reference](https://libretranslate.com/docs)
- [React Internationalization Guide](https://react.i18next.com/)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 