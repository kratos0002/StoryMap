import { useState, useEffect } from 'react';
import { supabase, searchStories, Story as SupabaseStory, FilterOptions } from '../lib/supabase';
import StoryCard from './StoryCard';
import EnhancedFilters from './EnhancedFilters';

interface EnhancedStoryListProps {
  onStorySelect: (story: SupabaseStory) => void;
  isDarkMode?: boolean;
}

const EnhancedStoryList: React.FC<EnhancedStoryListProps> = ({ onStorySelect, isDarkMode = false }) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [stories, setStories] = useState<SupabaseStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch stories based on filter options
  useEffect(() => {
    const fetchFilteredStories = async () => {
      try {
        setLoading(true);
        const storiesData = await searchStories(filterOptions);
        setStories(storiesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to load stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilteredStories();
  }, [filterOptions]);
  
  // Handle filter changes
  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className={`h-[calc(100vh-4rem)] w-full flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <div className={`inline-block w-12 h-12 border-4 ${
            isDarkMode ? 'border-blue-400' : 'border-blue-600'
          } border-t-transparent rounded-full animate-spin`}></div>
          <p className="mt-4 text-lg font-serif">Loading stories...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className={`h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <svg className="h-16 w-16 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-xl font-serif">{error}</h2>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Enhanced filters component */}
      <EnhancedFilters onFilterChange={handleFilterChange} isDarkMode={isDarkMode} />
      
      {/* Story list with staggered animation */}
      <div className={`flex-1 overflow-y-auto p-4 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {stories.length === 0 ? (
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
                onClick={() => setFilterOptions({})}
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
          stories.map((story, index) => (
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

export default EnhancedStoryList;
