import { useState, useEffect, useCallback } from 'react';

interface Story {
  id: string;
  title: string;
  summary: string;
  original_text: string;
  language?: string;
  isTranslation?: boolean;
  translationQuality?: number;
}

interface TranslationState {
  stories: Map<string, Story>; // key: `${storyId}_${language}`
  currentLanguage: string;
  loading: Set<string>; // track which stories are being translated
  errors: Map<string, string>;
}

export const useTranslation = () => {
  const [state, setState] = useState<TranslationState>({
    stories: new Map(),
    currentLanguage: typeof window !== 'undefined' 
      ? localStorage.getItem('preferred_language') || 'en' 
      : 'en',
    loading: new Set(),
    errors: new Map()
  });

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_language', state.currentLanguage);
    }
  }, [state.currentLanguage]);

  const setLanguage = useCallback((languageCode: string) => {
    setState(prev => ({
      ...prev,
      currentLanguage: languageCode
    }));
  }, []);

  const getStoryInLanguage = useCallback(async (storyId: string, languageCode?: string): Promise<Story | null> => {
    const targetLanguage = languageCode || state.currentLanguage;
    const cacheKey = `${storyId}_${targetLanguage}`;
    
    // Return cached version if available
    if (state.stories.has(cacheKey)) {
      return state.stories.get(cacheKey)!;
    }

    // Don't fetch if already loading
    if (state.loading.has(cacheKey)) {
      return null;
    }

    try {
      // Mark as loading
      setState(prev => ({
        ...prev,
        loading: new Set([...prev.loading, cacheKey]),
        errors: new Map([...prev.errors.entries()].filter(([key]) => key !== cacheKey))
      }));

      const response = await fetch(`/api/stories/${storyId}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          targetLanguage,
          // Add any user preferences here
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const translatedStory: Story = await response.json();

      // Cache the result
      setState(prev => {
        const newStories = new Map(prev.stories);
        newStories.set(cacheKey, translatedStory);
        
        const newLoading = new Set(prev.loading);
        newLoading.delete(cacheKey);

        return {
          ...prev,
          stories: newStories,
          loading: newLoading
        };
      });

      return translatedStory;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Translation failed';
      
      setState(prev => {
        const newLoading = new Set(prev.loading);
        newLoading.delete(cacheKey);
        
        const newErrors = new Map(prev.errors);
        newErrors.set(cacheKey, errorMessage);

        return {
          ...prev,
          loading: newLoading,
          errors: newErrors
        };
      });

      console.error('Translation error:', error);
      return null;
    }
  }, [state.currentLanguage, state.stories, state.loading]);

  const isLoading = useCallback((storyId: string, languageCode?: string): boolean => {
    const targetLanguage = languageCode || state.currentLanguage;
    const cacheKey = `${storyId}_${targetLanguage}`;
    return state.loading.has(cacheKey);
  }, [state.currentLanguage, state.loading]);

  const getError = useCallback((storyId: string, languageCode?: string): string | null => {
    const targetLanguage = languageCode || state.currentLanguage;
    const cacheKey = `${storyId}_${targetLanguage}`;
    return state.errors.get(cacheKey) || null;
  }, [state.currentLanguage, state.errors]);

  const preloadTranslation = useCallback(async (storyId: string, languageCode: string): Promise<void> => {
    await getStoryInLanguage(storyId, languageCode);
  }, [getStoryInLanguage]);

  const clearCache = useCallback(() => {
    setState(prev => ({
      ...prev,
      stories: new Map(),
      loading: new Set(),
      errors: new Map()
    }));
  }, []);

  const getAvailableLanguages = useCallback((storyId: string): string[] => {
    const availableLanguages = new Set<string>();
    
    for (const [key] of state.stories) {
      if (key.startsWith(`${storyId}_`)) {
        const language = key.split('_')[1];
        availableLanguages.add(language);
      }
    }
    
    return Array.from(availableLanguages);
  }, [state.stories]);

  return {
    currentLanguage: state.currentLanguage,
    setLanguage,
    getStoryInLanguage,
    isLoading,
    getError,
    preloadTranslation,
    clearCache,
    getAvailableLanguages,
    
    // Helper methods
    isTranslationNeeded: (originalLanguage: string, targetLanguage?: string) => {
      const target = targetLanguage || state.currentLanguage;
      return originalLanguage !== target;
    }
  };
};

export default useTranslation; 