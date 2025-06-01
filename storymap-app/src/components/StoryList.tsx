import { useState, useEffect } from 'react';
import { fetchStories, Story as SupabaseStory } from '../lib/supabase';
import StoryCard from './StoryCard';

// Legacy Story interface for list compatibility
interface LegacyStory {
  id: string;
  title: string;
  author: string;
  country: string;
  countryCode: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  readingTimeMinutes: number;
  themes: string[];
  mood: string;
  previewText: string;
  fullText: string;
  culturalContext: string;
  imageUrl?: string;
}

interface StoryListProps {
  onStorySelect: (story: LegacyStory) => void;
  isDarkMode?: boolean;
}

// Helper function to transform Supabase story to legacy format
const transformStoryForList = (supabaseStory: SupabaseStory): LegacyStory | null => {
  // Get the first location (primary location)
  const primaryLocation = supabaseStory.story_locations?.[0]?.location;
  if (!primaryLocation) {
    console.warn(`Story "${supabaseStory.title}" has no location data`);
    return null;
  }

  // Get the first author
  const primaryAuthor = supabaseStory.story_authors?.[0]?.author?.name || 'Unknown Author';

  // Extract themes
  const themes = supabaseStory.story_themes?.map(st => st.theme.name) || [];

  // Get the first image
  const imageUrl = supabaseStory.images?.[0]?.image_url;

  // Get cultural context
  const culturalContext = supabaseStory.cultural_contexts?.[0]?.context_text || 'No cultural context available';

  // Extract mood from tags (assuming mood is stored as a tag)
  const moodTag = supabaseStory.story_tags?.find(st => st.tag.category === 'mood');
  const mood = moodTag?.tag.name || 'Unknown';

  return {
    id: supabaseStory.id,
    title: supabaseStory.title,
    author: primaryAuthor,
    country: primaryLocation.name,
    countryCode: primaryLocation.country_code,
    region: primaryLocation.region,
    coordinates: {
      lat: primaryLocation.latitude,
      lng: primaryLocation.longitude
    },
    readingTimeMinutes: supabaseStory.reading_time_minutes,
    themes: themes,
    mood: mood,
    previewText: supabaseStory.summary || 'No preview available',
    fullText: supabaseStory.original_text || 'Full text not available',
    culturalContext: culturalContext,
    imageUrl: imageUrl
  };
};

const StoryList: React.FC<StoryListProps> = ({ onStorySelect, isDarkMode = false }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  const [stories, setStories] = useState<LegacyStory[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState<boolean>(true);
  const [storiesError, setStoriesError] = useState<string | null>(null);
  
  // Load stories from Supabase
  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoadingStories(true);
        setStoriesError(null);
        const supabaseStories = await fetchStories();
        
        // Transform stories and filter out any that don't have location data
        const transformedStories = supabaseStories
          .map(transformStoryForList)
          .filter((story): story is LegacyStory => story !== null);
        
        setStories(transformedStories);
        console.log(`Loaded ${transformedStories.length} stories for list view`);
      } catch (error) {
        console.error('Error loading stories:', error);
        setStoriesError('Failed to load stories from database');
      } finally {
        setIsLoadingStories(false);
      }
    };

    loadStories();
  }, []);
  
  // Extract all unique themes and regions
  const allThemes = Array.from(new Set(stories.flatMap(story => story.themes)));
  const allRegions = Array.from(new Set(stories.map(story => story.region)));
  
  // Filter stories based on active filters and search query
  const filteredStories = stories.filter(story => {
    // Filter by theme if active
    if (activeFilter && !story.themes.includes(activeFilter)) {
      return false;
    }
    
    // Filter by region if active
    if (activeRegion && story.region !== activeRegion) {
      return false;
    }
    
    // Filter by search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        story.title.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query) ||
        story.country.toLowerCase().includes(query) ||
        story.themes.some(theme => theme.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const toggleFilter = (theme: string) => {
    if (activeFilter === theme) {
      setActiveFilter(null);
    } else {
      setActiveFilter(theme);
    }
  };
  
  const toggleRegion = (region: string) => {
    if (activeRegion === region) {
      setActiveRegion(null);
    } else {
      setActiveRegion(region);
    }
  };
  
  const clearFilters = () => {
    setActiveFilter(null);
    setActiveRegion(null);
    setSearchQuery('');
  };
  
  const toggleFilterPanel = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };
  
  // Get theme color for visual styling
  const getThemeColor = (theme: string): string => {
    if (theme === 'Mythical') return '#8B5CF6'; // Purple
    if (theme === 'Nature') return '#10B981'; // Green
    if (theme === 'Urban') return '#3B82F6'; // Blue
    if (theme === 'Folklore') return '#F59E0B'; // Amber
    if (theme === 'Desert') return '#F97316'; // Orange
    return '#EF4444'; // Red (default)
  };
  
  return (
    <div className={`h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Search and filter header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
          <svg 
            className={`absolute left-3 top-3 h-4 w-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <button 
            onClick={toggleFilterPanel}
            className={`flex items-center text-sm transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg 
              className="h-4 w-4 mr-1" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {(activeFilter || activeRegion || searchQuery) && (
            <button 
              onClick={clearFilters}
              className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              Clear All
            </button>
          )}
        </div>
        
        {/* Expandable filter panel */}
        {isFilterExpanded && (
          <div className={`mt-3 pt-3 border-t animate-slide-up ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="mb-3">
              <h3 className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Themes
              </h3>
              <div className="flex flex-wrap gap-2">
                {allThemes.map(theme => (
                  <button
                    key={theme}
                    onClick={() => toggleFilter(theme)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      activeFilter === theme 
                        ? 'text-white' 
                        : isDarkMode
                          ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={activeFilter === theme ? { backgroundColor: getThemeColor(theme) } : {}}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Regions
              </h3>
              <div className="flex flex-wrap gap-2">
                {allRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      activeRegion === region 
                        ? isDarkMode
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-600 text-white'
                        : isDarkMode
                          ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Story list with staggered animation */}
      <div className={`flex-1 overflow-y-auto p-4 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {filteredStories.length === 0 ? (
          <div className="text-center py-8">
            <svg 
              className={`mx-auto h-12 w-12 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className={`mt-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              No stories found
            </h3>
            <p className={`mt-1 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Try adjusting your search or filter criteria
            </p>
            <div className="mt-6">
              <button
                onClick={clearFilters}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          filteredStories.map((story, index) => (
            <div 
              key={story.id} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StoryCard story={story} onSelect={onStorySelect} isDarkMode={isDarkMode} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoryList;
