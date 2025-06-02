import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStories, Story as SupabaseStory } from '../lib/supabase';
import StoryCard from './StoryCard';

// Hero section background image
// Note: This is a placeholder, will need to be replaced with an actual image
import heroBackground from '../assets/hero-background.jpg';

// Helper function to transform Supabase story to the format needed for display
const transformStoryForDisplay = (supabaseStory: SupabaseStory) => {
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
    previewText: supabaseStory.summary || 'No preview available',
    fullText: supabaseStory.original_text || 'Full text not available',
    imageUrl: imageUrl
  };
};

// Define thematic collections
const thematicCollections = [
  {
    id: 'transformation',
    title: 'Tales of Transformation',
    description: 'Stories about change, metamorphosis, and personal growth',
    color: '#8B5CF6', // Purple
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    themes: ['Mythical', 'Transformation']
  },
  {
    id: 'journeys',
    title: 'Journeys & Adventures',
    description: 'Epic quests, travels, and explorations across the world',
    color: '#3B82F6', // Blue
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    themes: ['Nature', 'Urban']
  },
  {
    id: 'mythical',
    title: 'Mythical Creatures',
    description: 'Legends of dragons, spirits, and supernatural beings',
    color: '#F59E0B', // Amber
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    themes: ['Mythical', 'Folklore']
  },
  {
    id: 'love',
    title: 'Love & Loss',
    description: 'Emotional tales of romance, heartbreak, and human connection',
    color: '#EF4444', // Red
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    themes: ['Urban']
  },
  {
    id: 'moral',
    title: 'Moral Lessons',
    description: 'Stories with ethical dilemmas and valuable life lessons',
    color: '#10B981', // Green
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    themes: ['Folklore']
  },
  {
    id: 'historical',
    title: 'Historical Moments',
    description: 'Tales set against the backdrop of significant historical events',
    color: '#6B7280', // Gray
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    themes: ['Urban', 'Desert']
  }
];

// Featured story card component
const FeaturedStoryCard = ({ story, isDarkMode }) => {
  return (
    <div className="flex-shrink-0 w-72 overflow-hidden rounded-lg shadow-lg group">
      <div className="relative h-96">
        {/* Story image or fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ 
            backgroundImage: story.imageUrl ? `url(${story.imageUrl})` : 'linear-gradient(to bottom right, #3B82F6, #8B5CF6)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          {/* Theme tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {story.themes.slice(0, 2).map(theme => (
              <span 
                key={theme} 
                className="px-2 py-1 text-xs rounded-full bg-blue-600/70"
              >
                {theme}
              </span>
            ))}
          </div>
          
          {/* Title and author */}
          <h3 className="text-xl font-serif font-bold mb-1 group-hover:text-blue-300 transition-colors">
            {story.title}
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            by {story.author}
          </p>
          
          {/* Region and reading time */}
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {story.region}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {story.readingTimeMinutes} min read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Collection card component
const CollectionCard = ({ collection, isDarkMode }) => {
  return (
    <div 
      className={`h-64 rounded-lg overflow-hidden shadow-lg relative group ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      {/* Colored accent */}
      <div 
        className="absolute top-0 left-0 w-full h-2"
        style={{ backgroundColor: collection.color }}
      ></div>
      
      {/* Content */}
      <div className="p-6 h-full flex flex-col">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
          style={{ 
            backgroundColor: `${collection.color}20`,
            color: collection.color
          }}
        >
          {collection.icon}
        </div>
        
        {/* Title and description */}
        <h3 className={`text-xl font-serif font-bold mb-2 group-hover:text-blue-600 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {collection.title}
        </h3>
        <p className={`text-sm mb-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {collection.description}
        </p>
        
        {/* Explore link */}
        <div className="mt-auto">
          <Link 
            to={`/collections/${collection.id}`}
            className={`inline-flex items-center text-sm font-medium ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Explore Collection
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Story of the day component
const StoryOfTheDay = ({ story, isDarkMode }) => {
  if (!story) return null;
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: story.imageUrl ? `url(${story.imageUrl})` : 'linear-gradient(to bottom right, #3B82F6, #8B5CF6)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-600'
          }`}>
            Story of the Day
          </div>
        </div>
        
        {/* Content */}
        <div className="md:w-2/3 p-6">
          <h3 className={`text-xl font-serif font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {story.title}
          </h3>
          <p className={`text-sm mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            by {story.author}
          </p>
          <p className={`text-sm mb-4 line-clamp-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {story.previewText}
          </p>
          <Link 
            to={`/stories/${story.id}`}
            className={`inline-flex items-center text-sm font-medium ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Read Story
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Timeline component
const Timeline = ({ isDarkMode }) => {
  const timelinePeriods = [
    { id: 'ancient', name: 'Ancient', year: '3000 BCE - 500 CE', active: false },
    { id: 'medieval', name: 'Medieval', year: '500 - 1500', active: false },
    { id: 'renaissance', name: 'Renaissance', year: '1400 - 1600', active: false },
    { id: 'enlightenment', name: 'Enlightenment', year: '1700s', active: true },
    { id: 'victorian', name: 'Victorian', year: '1837 - 1901', active: false },
    { id: 'modern', name: 'Modern', year: '1900 - 2000', active: false },
    { id: 'contemporary', name: 'Contemporary', year: '2000 - Present', active: false },
  ];
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="p-6">
        <h3 className={`text-xl font-serif font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Literary Timeline
        </h3>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute top-5 left-0 w-full h-1 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
          
          {/* Timeline points */}
          <div className="flex justify-between relative">
            {timelinePeriods.map((period) => (
              <div key={period.id} className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full z-10 mb-2 ${
                  period.active 
                    ? 'bg-blue-600' 
                    : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                <p className={`text-xs font-medium ${
                  period.active 
                    ? isDarkMode ? 'text-blue-400' : 'text-blue-600' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {period.name}
                </p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {period.year}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured period content */}
        <div className="mt-8 p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
          <h4 className={`text-lg font-medium mb-2 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-700'
          }`}>
            The Enlightenment
          </h4>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A period of intellectual and philosophical movement that dominated Europe in the 18th century, characterized by its emphasis on reason, analysis, and individualism rather than traditional lines of authority.
          </p>
        </div>
      </div>
    </div>
  );
};

// World map preview component
const WorldMapPreview = ({ isDarkMode }) => {
  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="p-6">
        <h3 className={`text-xl font-serif font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Stories Around the World
        </h3>
        
        {/* Simplified map preview */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Map markers */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-blue-600 rounded-full"></div>
          
          {/* Premium overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70">
            <div className="text-center">
              <p className="text-white font-medium mb-2">Explore the full map in Premium</p>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
        
        <p className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover stories from every corner of the globe with our interactive map feature, available exclusively to premium members.
        </p>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  // State for dark mode (will be passed from parent component)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [stories, setStories] = useState<any[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Check system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Add listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load stories from Supabase
  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoadingStories(true);
        const supabaseStories = await fetchStories();
        
        // Transform stories and filter out any that don't have location data
        const transformedStories = supabaseStories
          .map(transformStoryForDisplay)
          .filter((story): story is any => story !== null);
        
        setStories(transformedStories);
        console.log(`Loaded ${transformedStories.length} stories for home page`);
      } catch (error) {
        console.error('Error loading stories:', error);
      } finally {
        setIsLoadingStories(false);
      }
    };

    loadStories();
  }, []);

  // Get featured stories (for now, just take the first 5)
  const featuredStories = stories.slice(0, 5);
  
  // Get story of the day (for now, just take the first one)
  const storyOfTheDay = stories[0];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header - reused from existing app */}
      <header className={`py-3 px-4 flex items-center justify-between border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-500`}>
        <div className="flex items-center">
          <h1 className="text-xl font-serif font-bold">
            <span className="text-blue-600">Story</span>
            <span>Map</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-6 mr-4">
            <Link to="/" className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Home</Link>
            <Link to="/stories" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Stories</Link>
            <Link to="/collections" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Collections</Link>
            <Link to="/about" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About</Link>
          </nav>
          
          {/* Dark mode toggle button */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors duration-300`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* 1. Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/70' : 'bg-gray-800/50'}`}></div>
          </div>
          
          {/* Floating book/page elements (decorative) */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/5 w-16 h-20 bg-white/10 rounded transform rotate-12 animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-24 bg-white/10 rounded transform -rotate-6 animate-float-delayed"></div>
            <div className="absolute bottom-1/4 left-1/3 w-12 h-16 bg-white/10 rounded transform rotate-3 animate-float-slow"></div>
          </div>
          
          {/* Hero content */}
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 animate-fade-in">
              Explore Stories from Around the World
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-delayed">
              Discover timeless tales from diverse cultures and traditions
            </p>
            <Link 
              to="/stories" 
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors duration-300 animate-fade-in-delayed-more"
            >
              Start Reading
            </Link>
          </div>
        </section>

        {/* 2. Featured Stories Carousel */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-serif font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Stories
            </h2>
            <div className="flex overflow-x-auto pb-8 space-x-6 hide-scrollbar">
              {isLoadingStories ? (
                // Loading placeholders
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-72 h-96 bg-gray-300 rounded-lg animate-pulse"></div>
                ))
              ) : featuredStories.length > 0 ? (
                // Actual featured stories
                featuredStories.map(story => (
                  <FeaturedStoryCard key={story.id} story={story} isDarkMode={isDarkMode} />
                ))
              ) : (
                // No stories found
                <div className="flex-1 flex items-center justify-center h-96">
                  <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No featured stories available
                  </p>
                </div>
              )}
              
              {/* View all stories button */}
              {!isLoadingStories && featuredStories.length > 0 && (
                <div className="flex-shrink-0 w-72 flex items-center justify-center">
                  <Link 
                    to="/stories" 
                    className={`inline-flex items-center px-6 py-3 border-2 rounded-lg font-medium ${
                      isDarkMode 
                        ? 'border-gray-700 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                    } transition-colors duration-300`}
                  >
                    View All Stories
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. Thematic Collections */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-serif font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Thematic Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thematicCollections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} isDarkMode={isDarkMode} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Story Discovery Tools */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-serif font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Discover Stories
            </h2>
            <div className="max-w-4xl mx-auto">
              {/* Search bar */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search for stories, themes, or regions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <svg 
                  className={`absolute left-4 top-3.5 h-5 w-5 ${
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
              
              {/* Filter buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  Mythical
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  Nature
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  Urban
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Folklore
                </button>
              </div>
              
              {/* Story of the day */}
              {storyOfTheDay && (
                <StoryOfTheDay story={storyOfTheDay} isDarkMode={isDarkMode} />
              )}
            </div>
          </div>
        </section>

        {/* 5. Cultural Context Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-serif font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Cultural Context
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Timeline isDarkMode={isDarkMode} />
              </div>
              <div className="flex-1">
                <WorldMapPreview isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </section>

        {/* 6. User Engagement Elements */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-serif font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Continue Reading */}
              <div className={`rounded-lg overflow-hidden shadow-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="p-6">
                  <h3 className={`text-xl font-serif font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Continue Reading
                  </h3>
                  <div className={`p-8 text-center ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p>Sign in to track your reading progress</p>
                  </div>
                </div>
              </div>
              
              {/* Popular This Week */}
              <div className={`rounded-lg overflow-hidden shadow-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="p-6">
                  <h3 className={`text-xl font-serif font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Popular This Week
                  </h3>
                  {isLoadingStories ? (
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  ) : featuredStories.length > 0 ? (
                    <ul className="space-y-3">
                      {featuredStories.slice(0, 3).map((story, index) => (
                        <li key={story.id}>
                          <Link 
                            to={`/stories/${story.id}`}
                            className={`flex items-center ${
                              isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                            }`}
                          >
                            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}>
                              {index + 1}
                            </span>
                            <span className={`${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {story.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No popular stories available
                    </p>
                  )}
                </div>
              </div>
              
              {/* Community Highlights */}
              <div className={`rounded-lg overflow-hidden shadow-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="p-6">
                  <h3 className={`text-xl font-serif font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Community Highlights
                  </h3>
                  <div className={`p-8 text-center ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p>Join the community to see reader highlights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Premium Features Preview */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden">
              <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h2 className="text-3xl font-serif font-bold text-white mb-4">
                    Explore Stories on the Map
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Upgrade to premium and discover stories through our interactive world map. See how tales connect across cultures and regions.
                  </p>
                  <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    Upgrade to Premium
                  </button>
                </div>
                <div className="md:w-1/2">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    
                    {/* Map markers */}
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-purple-500 rounded-full animate-ping animation-delay-300"></div>
                    <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-600"></div>
                    <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-amber-500 rounded-full animate-ping animation-delay-900"></div>
                    
                    {/* Premium overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About StoryMap</h3>
              <p className="text-sm">
                StoryMap is a platform that connects readers with short stories from around the world, making global narratives accessible and enjoyable.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
                <li><Link to="/stories" className="text-sm hover:underline">Stories</Link></li>
                <li><Link to="/collections" className="text-sm hover:underline">Collections</Link></li>
                <li><Link to="/about" className="text-sm hover:underline">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm hover:underline">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
                <li><Link to="/copyright" className="text-sm hover:underline">Copyright Information</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} StoryMap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
