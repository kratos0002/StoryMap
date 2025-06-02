import { useState, useEffect } from 'react';
import TranslationPanel from './TranslationPanel';
import '../styles/typography.css';

// Story interface for the reader
interface Story {
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

interface StoryReaderProps {
  story: Story;
  onClose: () => void;
  isDarkMode?: boolean;
}

const StoryReader: React.FC<StoryReaderProps> = ({ story, onClose, isDarkMode: propsDarkMode }) => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(propsDarkMode || false);
  const [showCulturalContext, setShowCulturalContext] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  
  // Update internal dark mode state when prop changes
  useEffect(() => {
    if (propsDarkMode !== undefined) {
      setIsDarkMode(propsDarkMode);
    }
  }, [propsDarkMode]);
  
  // Reset animation state when story changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [story.id]);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Toggle cultural context
  const toggleCulturalContext = () => {
    setShowCulturalContext(!showCulturalContext);
  };
  
  return (
    <div 
      className={`reader-mode font-${fontSize} min-h-screen w-full flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      } transition-colors duration-300`}
    >
      {/* Reader header - Fixed at the top */}
      <header className={`py-4 px-6 flex items-center justify-between border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      } transition-colors duration-300 sticky top-0 z-10 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <button 
          onClick={onClose}
          className={`flex items-center ${
            isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          } transition-colors`}
        >
          <svg 
            className="h-5 w-5 mr-1" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-4">
          {/* Font size controls */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setFontSize('small')}
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                fontSize === 'small' 
                  ? isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white' 
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              <span className="text-xs">A</span>
            </button>
            
            <button 
              onClick={() => setFontSize('medium')}
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                fontSize === 'medium' 
                  ? isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white' 
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              <span className="text-sm">A</span>
            </button>
            
            <button 
              onClick={() => setFontSize('large')}
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                fontSize === 'large' 
                  ? isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white' 
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              } transition-colors`}
            >
              <span>A</span>
            </button>
          </div>
          
          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isDarkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } transition-colors`}
          >
            {isDarkMode ? (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>
      
      {/* Story content - Scrollable area */}
      <div 
        className={`flex-1 overflow-y-auto px-4 md:px-8 py-6 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        } transition-colors duration-300`}
        style={{ 
          WebkitOverflowScrolling: 'touch',
          maxHeight: 'calc(100vh - 4rem)',
          minHeight: 'calc(100vh - 4rem)'
        }}
      >
        <div className={`max-w-3xl mx-auto ${isAnimating ? 'animate-fade-in' : ''}`}>
          {/* Story header */}
          <div className={`mb-8 ${isAnimating ? 'animate-slide-up' : ''}`}>
            <h1 className="mb-2">{story.title}</h1>
            
            <div className={`flex flex-wrap items-center text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } mb-4`}>
              <span>By {story.author}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <img 
                  src={`https://flagcdn.com/24x18/${story.countryCode.toLowerCase()}.png`} 
                  alt={story.country} 
                  className="mr-1 h-3"
                />
                {story.country}
              </span>
              <span className="mx-2">•</span>
              <span>{story.readingTimeMinutes} min read</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {story.themes.map((theme) => (
                <span 
                  key={theme} 
                  className={`theme-tag px-3 py-1 rounded-full text-xs ${
                    isDarkMode 
                      ? 'bg-gray-800 text-blue-300' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {theme}
                </span>
              ))}
              <span 
                className={`theme-tag px-3 py-1 rounded-full text-xs ${
                  isDarkMode 
                    ? 'bg-gray-800 text-amber-300' 
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {story.mood}
              </span>
            </div>
          </div>
          
          {/* Story text */}
          <div className={`story-content prose prose-lg max-w-none ${
            isDarkMode ? 'prose-invert' : ''
          } ${isAnimating ? 'animate-fade-in animation-delay-300' : ''}`}>
            {story.fullText ? (
              story.fullText.split('\n').map((paragraph, index) => 
                paragraph.trim() ? (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              )
            ) : (
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p className="mb-4">Story content is being loaded...</p>
                <p className="text-sm">{story.previewText}</p>
              </div>
            )}
          </div>

          {/* Cultural context toggle */}
          <div className={`mt-12 ${isAnimating ? 'animate-fade-in animation-delay-600' : ''}`}>
            <button 
              onClick={toggleCulturalContext}
              className={`w-full p-4 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700' 
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Cultural Context</span>
                <svg 
                  className={`h-5 w-5 transition-transform ${showCulturalContext ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {showCulturalContext && (
              <div className={`mt-4 p-6 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
              } transition-all duration-300 animate-slide-down`}>
                <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                  {story.culturalContext ? (
                    story.culturalContext.split('\n').map((paragraph, index) => 
                      paragraph.trim() ? (
                        <p key={index} className="mb-3">
                          {paragraph}
                        </p>
                      ) : null
                    )
                  ) : (
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      No cultural context available for this story.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Translation panel */}
          <div className={`mt-8 ${isAnimating ? 'animate-fade-in animation-delay-900' : ''}`}>
            <TranslationPanel 
              story={story}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryReader;
