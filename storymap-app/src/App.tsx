import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoryMap from './components/StoryMap';
import StoryList from './components/StoryList';
import StoryReader from './components/StoryReader';
import HomePage from './components/HomePage';
import { Story } from './data/stories';
import './styles/enhanced.css';
import './styles/home-page.css'; // Import the new home page styles

function App() {
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
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
  
  // Handle story selection
  const handleStorySelect = (story: Story) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedStory(story);
      setIsTransitioning(false);
    }, 300);
  };
  
  // Handle closing story reader
  const handleCloseReader = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedStory(null);
      setIsTransitioning(false);
    }, 300);
  };
  
  // Toggle between map and list views
  const toggleView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(activeView === 'map' ? 'list' : 'map');
      setIsTransitioning(false);
    }, 300);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Main app with story map/list view
  const MainApp = () => (
    <div className={`app min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
      {/* App header */}
      <header className={`py-3 px-4 flex items-center justify-between border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-500`}>
        <div className="flex items-center">
          <h1 className="text-xl font-serif font-bold">
            <span className="text-blue-600">Story</span>
            <span>Map</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View toggle button */}
          <button 
            onClick={toggleView}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors duration-300`}
            aria-label={`Switch to ${activeView === 'map' ? 'list' : 'map'} view`}
          >
            {activeView === 'map' ? (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            )}
          </button>
          
          {/* Dark mode toggle button */}
          <button 
            onClick={toggleDarkMode}
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
      <main className="flex-1 relative overflow-hidden">
        {/* Story reader overlay */}
        {selectedStory && (
          <div className={`absolute inset-0 z-20 ${isTransitioning ? 'animate-fade-in' : ''}`}>
            <StoryReader 
              story={selectedStory} 
              onClose={handleCloseReader}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        
        {/* Map and list views */}
        <div className={`h-full transition-opacity duration-300 ${selectedStory ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          } ${activeView === 'map' ? 'translate-x-0' : '-translate-x-full'}`}>
            <StoryMap onStorySelect={handleStorySelect} isDarkMode={isDarkMode} />
          </div>
          
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          } ${activeView === 'list' ? 'translate-x-0' : 'translate-x-full'}`}>
            <StoryList onStorySelect={handleStorySelect} isDarkMode={isDarkMode} />
          </div>
        </div>
      </main>
    </div>
  );
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories" element={<MainApp />} />
        <Route path="/collections/:id" element={<MainApp />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/terms" element={<div>Terms of Service</div>} />
        <Route path="/privacy" element={<div>Privacy Policy</div>} />
        <Route path="/copyright" element={<div>Copyright Information</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
