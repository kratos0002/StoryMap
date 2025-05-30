import { Story } from '../data/stories';

interface StoryCardProps {
  story: Story;
  onSelect: (story: Story) => void;
  isDarkMode?: boolean; // Added isDarkMode as optional prop
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onSelect, isDarkMode = false }) => {
  // Get theme color for visual styling
  const getThemeColor = (theme: string): string => {
    if (theme === 'Mythical') return '#8B5CF6'; // Purple
    if (theme === 'Nature') return '#10B981'; // Green
    if (theme === 'Urban') return '#3B82F6'; // Blue
    if (theme === 'Folklore') return '#F59E0B'; // Amber
    if (theme === 'Desert') return '#F97316'; // Orange
    return '#EF4444'; // Red (default)
  };

  // Get country flag emoji
  const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div 
      className={`story-card rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      onClick={() => onSelect(story)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`story-card__title text-lg font-serif font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {story.title}
          </h3>
          {story.countryCode && (
            <span className="text-xl" title={story.country}>
              {getCountryFlag(story.countryCode)}
            </span>
          )}
        </div>
        
        <div className={`story-card__meta text-sm mb-2 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <span>{story.author}</span>
          <span className="mx-2">•</span>
          <span>{story.readingTimeMinutes} min read</span>
          <span className="mx-2">•</span>
          <span>{story.region}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {story.themes.map(theme => (
            <span 
              key={theme}
              className="theme-tag px-2 py-0.5 text-xs text-white rounded-full"
              style={{ backgroundColor: getThemeColor(theme) }}
            >
              {theme}
            </span>
          ))}
          <span className="theme-tag px-2 py-0.5 text-xs text-white rounded-full bg-gray-500">
            {story.mood}
          </span>
        </div>
        
        <p className={`story-card__preview text-sm line-clamp-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {story.previewText}
        </p>
        
        <div className="mt-3 flex justify-end">
          <button 
            className={`px-4 py-1 text-sm text-white rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(story);
            }}
          >
            Read Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
