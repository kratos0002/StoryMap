import { useState, useEffect, useRef } from 'react';
import { Story } from '../lib/supabase';

interface TimelineViewProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
  isDarkMode?: boolean;
}

const TimelineView: React.FC<TimelineViewProps> = ({ stories, onStorySelect, isDarkMode = false }) => {
  const [timelineData, setTimelineData] = useState<{
    minYear: number;
    maxYear: number;
    storiesByYear: Record<number, Story[]>;
    decades: number[];
  }>({
    minYear: 1800,
    maxYear: 2025,
    storiesByYear: {},
    decades: []
  });
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeDecade, setActiveDecade] = useState<number | null>(null);
  
  // Process stories into timeline data
  useEffect(() => {
    if (!stories || stories.length === 0) return;
    
    // Extract years and group stories
    const years = stories
      .map(story => story.publication_year)
      .filter(year => year !== undefined && year !== null) as number[];
    
    if (years.length === 0) return;
    
    const minYear = Math.floor(Math.min(...years) / 10) * 10;
    const maxYear = Math.ceil(Math.max(...years) / 10) * 10;
    
    // Group stories by year
    const storiesByYear: Record<number, Story[]> = {};
    stories.forEach(story => {
      if (story.publication_year) {
        if (!storiesByYear[story.publication_year]) {
          storiesByYear[story.publication_year] = [];
        }
        storiesByYear[story.publication_year].push(story);
      }
    });
    
    // Generate decades
    const decades: number[] = [];
    for (let decade = minYear; decade <= maxYear; decade += 10) {
      decades.push(decade);
    }
    
    setTimelineData({
      minYear,
      maxYear,
      storiesByYear,
      decades
    });
    
    // Set active decade to the one with most stories
    const decadeCounts = decades.map(decade => {
      let count = 0;
      for (let year = decade; year < decade + 10; year++) {
        if (storiesByYear[year]) {
          count += storiesByYear[year].length;
        }
      }
      return { decade, count };
    });
    
    const mostPopulatedDecade = decadeCounts.reduce((max, current) => 
      current.count > max.count ? current : max, { decade: decades[0], count: 0 });
    
    setActiveDecade(mostPopulatedDecade.decade);
    
  }, [stories]);
  
  // Scroll to active decade when it changes
  useEffect(() => {
    if (activeDecade && timelineRef.current) {
      const decadeElement = document.getElementById(`decade-${activeDecade}`);
      if (decadeElement) {
        timelineRef.current.scrollLeft = decadeElement.offsetLeft - 100;
      }
    }
  }, [activeDecade]);
  
  // Handle decade click
  const handleDecadeClick = (decade: number) => {
    setActiveDecade(decade);
  };
  
  // Get story count for a decade
  const getDecadeStoryCount = (decade: number): number => {
    let count = 0;
    for (let year = decade; year < decade + 10; year++) {
      if (timelineData.storiesByYear[year]) {
        count += timelineData.storiesByYear[year].length;
      }
    }
    return count;
  };
  
  // Get stories for active decade
  const getStoriesForActiveDecade = (): Story[] => {
    if (!activeDecade) return [];
    
    const stories: Story[] = [];
    for (let year = activeDecade; year < activeDecade + 10; year++) {
      if (timelineData.storiesByYear[year]) {
        stories.push(...timelineData.storiesByYear[year]);
      }
    }
    return stories;
  };
  
  return (
    <div className={`w-full flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Timeline header */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <h2 className="text-lg font-serif font-medium">Timeline View</h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Explore stories by publication year
        </p>
      </div>
      
      {/* Timeline scroll area */}
      <div 
        ref={timelineRef}
        className={`relative flex overflow-x-auto py-6 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        {/* Timeline line */}
        <div className={`absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
        
        {/* Decade markers */}
        {timelineData.decades.map(decade => {
          const storyCount = getDecadeStoryCount(decade);
          const isActive = activeDecade === decade;
          const hasStories = storyCount > 0;
          
          return (
            <div 
              id={`decade-${decade}`}
              key={decade}
              className={`relative flex flex-col items-center mx-8 cursor-pointer ${!hasStories && 'opacity-50'}`}
              onClick={() => hasStories && handleDecadeClick(decade)}
            >
              {/* Marker */}
              <div 
                className={`w-4 h-4 rounded-full z-10 mb-2 ${
                  isActive 
                    ? isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                    : hasStories
                      ? isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                      : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                }`}
              ></div>
              
              {/* Story count indicator */}
              {storyCount > 0 && (
                <div 
                  className={`absolute top-0 -mt-2 -mr-2 right-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isActive
                      ? 'bg-red-500 text-white'
                      : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {storyCount}
                </div>
              )}
              
              {/* Decade label */}
              <div className={`text-sm font-medium ${
                isActive
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-700'
                  : isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {decade}s
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Stories for selected decade */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeDecade && (
          <>
            <h3 className={`text-lg font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Stories from the {activeDecade}s
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStoriesForActiveDecade().map(story => (
                <div 
                  key={story.id}
                  onClick={() => onStorySelect(story)}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className={`text-md font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {story.title}
                    </h4>
                    <span className={`text-sm px-2 py-1 rounded ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {story.publication_year}
                    </span>
                  </div>
                  
                  <p className={`mt-2 text-sm line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {story.summary}
                  </p>
                  
                  {/* Author and themes */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {story.story_authors && story.story_authors[0] && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {story.story_authors[0].author.name}
                      </span>
                    )}
                    
                    {story.story_themes && story.story_themes.slice(0, 2).map(themeObj => (
                      <span 
                        key={`theme-${story.id}-${themeObj.theme.name}`}
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ 
                          backgroundColor: 
                            themeObj.theme.name === 'Mythical' ? '#8B5CF6' : 
                            themeObj.theme.name === 'Nature' ? '#10B981' : 
                            themeObj.theme.name === 'Urban' ? '#3B82F6' : 
                            themeObj.theme.name === 'Folklore' ? '#F59E0B' : 
                            themeObj.theme.name === 'Desert' ? '#F97316' : '#EF4444'
                        }}
                      >
                        {themeObj.theme.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimelineView;
