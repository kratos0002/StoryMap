import { useState } from 'react';
import { stories, Story } from '../data/stories';
import StoryCard from './StoryCard';

interface StoryListProps {
  onStorySelect: (story: Story) => void;
  isDarkMode?: boolean; // Added isDarkMode as optional prop
}

const StoryList: React.FC<StoryListProps> = ({ onStorySelect, isDarkMode = false }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  
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
