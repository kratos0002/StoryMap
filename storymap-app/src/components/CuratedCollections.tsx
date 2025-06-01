import { useState, useEffect } from 'react';
import { Story, fetchFilterMetadata } from '../lib/supabase';

interface CuratedCollectionsProps {
  onStorySelect: (story: Story) => void;
  stories: Story[];
  isDarkMode?: boolean;
}

const CuratedCollections: React.FC<CuratedCollectionsProps> = ({ onStorySelect, stories, isDarkMode = false }) => {
  const [collections, setCollections] = useState<{
    name: string;
    description: string;
    stories: Story[];
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCollection, setActiveCollection] = useState<number>(0);
  
  // Generate curated collections based on metadata
  useEffect(() => {
    const generateCollections = async () => {
      try {
        setLoading(true);
        
        // Fetch metadata for organizing collections
        const metadata = await fetchFilterMetadata();
        
        // Create collections based on themes, time periods, and regions
        const generatedCollections = [];
        
        // Theme-based collections
        metadata.themes.forEach(theme => {
          const themeStories = stories.filter(story => 
            story.story_themes && 
            story.story_themes.some(t => t.theme.name === theme.name)
          );
          
          if (themeStories.length >= 3) {
            generatedCollections.push({
              name: `${theme.name} Stories`,
              description: `Explore stories with ${theme.name.toLowerCase()} themes and elements`,
              stories: themeStories
            });
          }
        });
        
        // Time period collections
        metadata.timePeriods.forEach(period => {
          const periodStories = stories.filter(story => 
            story.story_time_periods && 
            story.story_time_periods.some(tp => tp.time_period.name === period.name)
          );
          
          if (periodStories.length >= 3) {
            generatedCollections.push({
              name: `${period.name} Literature`,
              description: `Stories from the ${period.name.toLowerCase()} era (${period.start_year}-${period.end_year || 'present'})`,
              stories: periodStories
            });
          }
        });
        
        // Region-based collections
        metadata.regions.forEach(region => {
          const regionStories = stories.filter(story => 
            story.story_locations && 
            story.story_locations.some(loc => loc.location.region === region)
          );
          
          if (regionStories.length >= 3) {
            generatedCollections.push({
              name: `Stories from ${region}`,
              description: `Explore literature set in or inspired by ${region}`,
              stories: regionStories
            });
          }
        });
        
        // Tag-based collections (by category)
        const tagCategories = {
          literary_device: 'Literary Devices',
          mood: 'Mood & Atmosphere',
          subject: 'Subjects & Themes'
        };
        
        Object.entries(tagCategories).forEach(([category, title]) => {
          const categoryTags = metadata.tags.filter(tag => tag.category === category);
          
          categoryTags.forEach(tag => {
            const tagStories = stories.filter(story => 
              story.story_tags && 
              story.story_tags.some(t => t.tag.name === tag.name)
            );
            
            if (tagStories.length >= 3) {
              generatedCollections.push({
                name: `${tag.name} in Literature`,
                description: `Stories featuring ${tag.name.toLowerCase()} as a prominent ${category.replace('_', ' ')}`,
                stories: tagStories
              });
            }
          });
        });
        
        // Special curated collections
        
        // Short reads
        const shortReads = stories
          .filter(story => story.reading_time_minutes && story.reading_time_minutes <= 15)
          .sort((a, b) => (a.reading_time_minutes || 0) - (b.reading_time_minutes || 0));
        
        if (shortReads.length >= 3) {
          generatedCollections.push({
            name: 'Quick Reads',
            description: 'Stories you can finish in 15 minutes or less',
            stories: shortReads
          });
        }
        
        // Popular stories
        const popularStories = [...stories]
          .filter(story => story.popularity_score)
          .sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0))
          .slice(0, 10);
        
        if (popularStories.length >= 3) {
          generatedCollections.push({
            name: 'Most Popular',
            description: 'Our most-read stories',
            stories: popularStories
          });
        }
        
        // Limit to 10 collections maximum and ensure each has at least 3 stories
        const finalCollections = generatedCollections
          .filter(collection => collection.stories.length >= 3)
          .slice(0, 10);
        
        setCollections(finalCollections);
      } catch (error) {
        console.error('Error generating collections:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (stories.length > 0) {
      generateCollections();
    }
  }, [stories]);
  
  // Get theme color for visual styling
  const getThemeColor = (theme: string): string => {
    if (theme === 'Mythical') return '#8B5CF6'; // Purple
    if (theme === 'Nature') return '#10B981'; // Green
    if (theme === 'Urban') return '#3B82F6'; // Blue
    if (theme === 'Folklore') return '#F59E0B'; // Amber
    if (theme === 'Desert') return '#F97316'; // Orange
    return '#EF4444'; // Red (default)
  };
  
  // Handle collection change
  const handleCollectionChange = (index: number) => {
    setActiveCollection(index);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Curated Collections
        </h2>
        <div className="animate-pulse">
          <div className={`h-8 w-64 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-4`}></div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className={`flex-shrink-0 w-48 h-64 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Show empty state
  if (collections.length === 0) {
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Curated Collections
        </h2>
        <div className={`p-8 rounded-lg text-center ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          <p>No collections available yet</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-xl font-serif mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Curated Collections
      </h2>
      
      {/* Collection selector */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-4">
        {collections.map((collection, index) => (
          <button
            key={index}
            onClick={() => handleCollectionChange(index)}
            className={`px-3 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
              activeCollection === index
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {collection.name}
          </button>
        ))}
      </div>
      
      {/* Active collection */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {collections[activeCollection].name}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {collections[activeCollection].description}
            </p>
          </div>
        </div>
        
        {/* Stories in collection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {collections[activeCollection].stories.slice(0, 8).map(story => (
            <div 
              key={story.id}
              onClick={() => onStorySelect(story)}
              className={`rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } shadow-md`}
            >
              {/* Card image or theme color */}
              {story.images && story.images[0] ? (
                <div 
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${story.images[0].image_url})` }}
                ></div>
              ) : (
                <div 
                  className="h-32"
                  style={{ 
                    backgroundColor: story.story_themes && story.story_themes[0]
                      ? getThemeColor(story.story_themes[0].theme.name)
                      : '#3B82F6'
                  }}
                ></div>
              )}
              
              {/* Card content */}
              <div className="p-3">
                <h4 className={`font-medium line-clamp-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {story.title}
                </h4>
                
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {story.story_authors && story.story_authors[0]
                    ? story.story_authors[0].author.name
                    : 'Unknown author'}
                </p>
                
                {/* Reading time */}
                {story.reading_time_minutes && (
                  <div className={`text-xs mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {story.reading_time_minutes} min read
                  </div>
                )}
                
                {/* Theme badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {story.story_themes && story.story_themes.slice(0, 2).map(themeObj => (
                    <span 
                      key={`theme-${story.id}-${themeObj.theme.name}`}
                      className="text-xs px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: getThemeColor(themeObj.theme.name) }}
                    >
                      {themeObj.theme.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuratedCollections;
