import { useState } from 'react';
import EnhancedStoryList from './EnhancedStoryList';
import TimelineView from './TimelineView';
import EnhancedMapView from './EnhancedMapView';
import { Story } from '../lib/supabase';

interface DiscoveryTabsProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
  isDarkMode?: boolean;
}

const DiscoveryTabs: React.FC<DiscoveryTabsProps> = ({ stories, onStorySelect, isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'timeline' | 'map'>('list');
  
  return (
    <div className={`h-[calc(100vh-4rem)] w-full flex flex-col ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Tab navigation */}
      <div className={`flex border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'list'
              ? isDarkMode
                ? 'border-blue-500 text-blue-400'
                : 'border-blue-600 text-blue-700'
              : isDarkMode
                ? 'border-transparent text-gray-400 hover:text-gray-300'
                : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
            List View
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'timeline'
              ? isDarkMode
                ? 'border-blue-500 text-blue-400'
                : 'border-blue-600 text-blue-700'
              : isDarkMode
                ? 'border-transparent text-gray-400 hover:text-gray-300'
                : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Timeline
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'map'
              ? isDarkMode
                ? 'border-blue-500 text-blue-400'
                : 'border-blue-600 text-blue-700'
              : isDarkMode
                ? 'border-transparent text-gray-400 hover:text-gray-300'
                : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            Map
          </div>
        </button>
      </div>
      
      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'list' && (
          <EnhancedStoryList onStorySelect={onStorySelect} isDarkMode={isDarkMode} />
        )}
        
        {activeTab === 'timeline' && (
          <TimelineView stories={stories} onStorySelect={onStorySelect} isDarkMode={isDarkMode} />
        )}
        
        {activeTab === 'map' && (
          <EnhancedMapView stories={stories} onStorySelect={onStorySelect} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

export default DiscoveryTabs;
