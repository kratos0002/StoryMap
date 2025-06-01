import { useState, useEffect } from 'react';
import { Story, fetchRelatedStories } from '../lib/supabase';

interface RecommendationPanelProps {
  story: Story;
  onStorySelect: (story: Story) => void;
  isDarkMode?: boolean;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ story, onStorySelect, isDarkMode = false }) => {
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch related stories when the current story changes
  useEffect(() => {
    const loadRelatedStories = async () => {
      try {
        setLoading(true);
        const stories = await fetchRelatedStories(story.id, 5);
        setRelatedStories(stories);
        setError(null);
      } catch (err) {
        console.error('Error fetching related stories:', err);
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };
    
    if (story && story.id) {
      loadRelatedStories();
    }
  }, [story]);
  
  // Get theme color for visual styling
  const getThemeColor = (theme: string): string => {
    if (theme === 'Mythical') return '#8B5CF6'; // Purple
    if (theme === 'Nature') return '#10B981'; // Green
    if (theme === 'Urban') return '#3B82F6'; // Blue
    if (theme === 'Folklore') return '#F59E0B'; // Amber
    if (theme === 'Desert') return '#F97316'; // Orange
    return '#EF4444'; // Red (default)
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Similar Stories
        </h3>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className={`flex-shrink-0 w-64 h-32 rounded-lg animate-pulse ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Similar Stories
        </h3>
        <div className={`p-4 rounded-lg text-center ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // Show empty state
  if (relatedStories.length === 0) {
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Similar Stories
        </h3>
        <div className={`p-4 rounded-lg text-center ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          <p>No similar stories found</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <h3 className={`text-lg font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Similar Stories
      </h3>
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {relatedStories.map(relatedStory => (
          <div 
            key={relatedStory.id}
            onClick={() => onStorySelect(relatedStory)}
            className={`flex-shrink-0 w-64 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            } shadow-md`}
          >
            {/* Card image or theme color */}
            {relatedStory.images && relatedStory.images[0] ? (
              <div 
                className="h-24 bg-cover bg-center"
                style={{ backgroundImage: `url(${relatedStory.images[0].image_url})` }}
              ></div>
            ) : (
              <div 
                className="h-24"
                style={{ 
                  backgroundColor: relatedStory.story_themes && relatedStory.story_themes[0]
                    ? getThemeColor(relatedStory.story_themes[0].theme.name)
                    : '#3B82F6'
                }}
              ></div>
            )}
            
            {/* Card content */}
            <div className="p-3">
              <h4 className={`font-medium line-clamp-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {relatedStory.title}
              </h4>
              
              <p className={`text-xs mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {relatedStory.story_authors && relatedStory.story_authors[0]
                  ? relatedStory.story_authors[0].author.name
                  : 'Unknown author'}
              </p>
              
              {/* Similarity badges */}
              <div className="flex flex-wrap gap-1 mt-2">
                {relatedStory.story_themes && relatedStory.story_themes.slice(0, 2).map(themeObj => (
                  <span 
                    key={`theme-${relatedStory.id}-${themeObj.theme.name}`}
                    className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: getThemeColor(themeObj.theme.name) }}
                  >
                    {themeObj.theme.name}
                  </span>
                ))}
                
                {relatedStory.story_tags && relatedStory.story_tags.slice(0, 1).map(tagObj => (
                  <span 
                    key={`tag-${relatedStory.id}-${tagObj.tag.name}`}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tagObj.tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationPanel;
