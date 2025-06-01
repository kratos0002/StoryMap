import { useState, useEffect } from 'react';
import { fetchFilterMetadata, FilterOptions } from '../lib/supabase';

interface EnhancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  isDarkMode?: boolean;
}

const EnhancedFilters: React.FC<EnhancedFiltersProps> = ({ onFilterChange, isDarkMode = false }) => {
  // Filter state
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTimePeriods, setSelectedTimePeriods] = useState<string[]>([]);
  const [selectedReadingLevel, setSelectedReadingLevel] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number | null, number | null]>([null, null]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterLogic, setFilterLogic] = useState<'AND' | 'OR'>('AND');
  
  // UI state
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  const [activeFilterPanel, setActiveFilterPanel] = useState<string | null>('themes');
  
  // Metadata for filters
  const [filterMetadata, setFilterMetadata] = useState<{
    themes: Array<{ id: string, name: string }>;
    tags: Array<{ id: string, name: string, category: string }>;
    timePeriods: Array<{ id: string, name: string, start_year: number, end_year?: number }>;
    readingLevels: Array<{ id: string, name: string }>;
    regions: string[];
  }>({
    themes: [],
    tags: [],
    timePeriods: [],
    readingLevels: [],
    regions: []
  });
  
  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch filter metadata on component mount
  useEffect(() => {
    const loadFilterMetadata = async () => {
      try {
        setLoading(true);
        const metadata = await fetchFilterMetadata();
        setFilterMetadata(metadata);
      } catch (error) {
        console.error('Error loading filter metadata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFilterMetadata();
  }, []);
  
  // Update filters when selections change
  useEffect(() => {
    const filters: FilterOptions = {
      themes: selectedThemes.length > 0 ? selectedThemes : undefined,
      regions: selectedRegions.length > 0 ? selectedRegions : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      timePeriods: selectedTimePeriods.length > 0 ? selectedTimePeriods : undefined,
      readingLevel: selectedReadingLevel || undefined,
      minYear: yearRange[0] || undefined,
      maxYear: yearRange[1] || undefined,
      searchQuery: searchQuery || undefined,
      filterLogic: filterLogic
    };
    
    onFilterChange(filters);
  }, [
    selectedThemes, 
    selectedRegions, 
    selectedTags, 
    selectedTimePeriods, 
    selectedReadingLevel, 
    yearRange, 
    searchQuery, 
    filterLogic,
    onFilterChange
  ]);
  
  // Toggle theme selection
  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme) 
        : [...prev, theme]
    );
  };
  
  // Toggle region selection
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Toggle time period selection
  const toggleTimePeriod = (period: string) => {
    setSelectedTimePeriods(prev => 
      prev.includes(period) 
        ? prev.filter(p => p !== period) 
        : [...prev, period]
    );
  };
  
  // Set reading level
  const setReadingLevel = (level: string) => {
    setSelectedReadingLevel(prev => prev === level ? null : level);
  };
  
  // Toggle filter panel expansion
  const toggleFilterPanel = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };
  
  // Set active filter panel
  const setFilterPanel = (panel: string) => {
    setActiveFilterPanel(prev => prev === panel ? null : panel);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedThemes([]);
    setSelectedRegions([]);
    setSelectedTags([]);
    setSelectedTimePeriods([]);
    setSelectedReadingLevel(null);
    setYearRange([null, null]);
    setSearchQuery('');
    setFilterLogic('AND');
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
  
  // Get tag color based on category
  const getTagColor = (category: string): string => {
    if (category === 'literary_device') return '#8B5CF6'; // Purple
    if (category === 'mood') return '#10B981'; // Green
    if (category === 'subject') return '#3B82F6'; // Blue
    return '#F59E0B'; // Amber (default)
  };
  
  // Group tags by category
  const tagsByCategory = filterMetadata.tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, typeof filterMetadata.tags>);
  
  // Show loading state
  if (loading) {
    return (
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded-full animate-pulse ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading filters...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      {/* Search input */}
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
          className={`absolute left-3 top-3 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {/* Filter toggle and clear buttons */}
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
        
        {/* Show active filter count */}
        {(selectedThemes.length > 0 || selectedRegions.length > 0 || selectedTags.length > 0 || 
          selectedTimePeriods.length > 0 || selectedReadingLevel || yearRange[0] || yearRange[1] || searchQuery) && (
          <div className="flex items-center">
            <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}>
              {selectedThemes.length + selectedRegions.length + selectedTags.length + 
               selectedTimePeriods.length + (selectedReadingLevel ? 1 : 0) + 
               ((yearRange[0] || yearRange[1]) ? 1 : 0) + (searchQuery ? 1 : 0)} active
            </span>
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
          </div>
        )}
      </div>
      
      {/* Expandable filter panel */}
      {isFilterExpanded && (
        <div className={`mt-3 pt-3 border-t animate-slide-up ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Filter logic toggle */}
          <div className="mb-4">
            <div className={`text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Filter Logic
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterLogic('AND')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  filterLogic === 'AND'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                AND (Match All)
              </button>
              <button
                onClick={() => setFilterLogic('OR')}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  filterLogic === 'OR'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                OR (Match Any)
              </button>
            </div>
          </div>
          
          {/* Filter category tabs */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterPanel('themes')}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeFilterPanel === 'themes'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Themes {selectedThemes.length > 0 && `(${selectedThemes.length})`}
            </button>
            <button
              onClick={() => setFilterPanel('regions')}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeFilterPanel === 'regions'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Regions {selectedRegions.length > 0 && `(${selectedRegions.length})`}
            </button>
            <button
              onClick={() => setFilterPanel('tags')}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeFilterPanel === 'tags'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
            </button>
            <button
              onClick={() => setFilterPanel('time-periods')}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeFilterPanel === 'time-periods'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Time Periods {selectedTimePeriods.length > 0 && `(${selectedTimePeriods.length})`}
            </button>
            <button
              onClick={() => setFilterPanel('reading-level')}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeFilterPanel === 'reading-level'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Reading Level {selectedReadingLevel && '(1)'}
            </button>
            <button
              onClick={() => setFilterPanel('year-range')}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeFilterPanel === 'year-range'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Year Range {(yearRange[0] || yearRange[1]) && '(1)'}
            </button>
          </div>
          
          {/* Active filter panel content */}
          <div className={`p-3 rounded-md ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            {/* Themes panel */}
            {activeFilterPanel === 'themes' && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Select Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterMetadata.themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => toggleTheme(theme.name)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedThemes.includes(theme.name) 
                          ? 'text-white' 
                          : isDarkMode
                            ? 'text-gray-300 bg-gray-600 hover:bg-gray-500'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                      style={selectedThemes.includes(theme.name) ? { backgroundColor: getThemeColor(theme.name) } : {}}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Regions panel */}
            {activeFilterPanel === 'regions' && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Select Regions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterMetadata.regions.map(region => (
                    <button
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedRegions.includes(region) 
                          ? isDarkMode
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-600 text-white'
                          : isDarkMode
                            ? 'text-gray-300 bg-gray-600 hover:bg-gray-500'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags panel */}
            {activeFilterPanel === 'tags' && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Select Tags
                </h3>
                
                {Object.entries(tagsByCategory).map(([category, tags]) => (
                  <div key={category} className="mb-3">
                    <h4 className={`text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <button
                          key={tag.id}
                          onClick={() => toggleTag(tag.name)}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            selectedTags.includes(tag.name) 
                              ? 'text-white' 
                              : isDarkMode
                                ? 'text-gray-300 bg-gray-600 hover:bg-gray-500'
                                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                          }`}
                          style={selectedTags.includes(tag.name) ? { backgroundColor: getTagColor(tag.category) } : {}}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Time Periods panel */}
            {activeFilterPanel === 'time-periods' && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Select Time Periods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterMetadata.timePeriods.map(period => (
                    <button
                      key={period.id}
                      onClick={() => toggleTimePeriod(period.name)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedTimePeriods.includes(period.name) 
                          ? isDarkMode
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-600 text-white'
                          : isDarkMode
                            ? 'text-gray-300 bg-gray-600 hover:bg-gray-500'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {period.name} ({period.start_year} - {period.end_year || 'present'})
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reading Level panel */}
            {activeFilterPanel === 'reading-level' && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Select Reading Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {filterMetadata.readingLevels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setReadingLevel(level.name)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedReadingLevel === level.name 
                          ? isDarkMode
                            ? 'bg-green-500 text-white'
                            : 'bg-green-600 text-white'
                          : isDarkMode
                            ? 'text-gray-300 bg-gray-600 hover:bg-gray-500'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Year Range panel */}
            {activeFilterPanel === 'year-range' && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Publication Year Range
                </h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="From"
                    value={yearRange[0] || ''}
                    onChange={(e) => setYearRange([e.target.value ? parseInt(e.target.value) : null, yearRange[1]])}
                    className={`w-24 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    min="1"
                    max="2023"
                  />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>to</span>
                  <input
                    type="number"
                    placeholder="To"
                    value={yearRange[1] || ''}
                    onChange={(e) => setYearRange([yearRange[0], e.target.value ? parseInt(e.target.value) : null])}
                    className={`w-24 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    min="1"
                    max="2023"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Active filters display */}
          {(selectedThemes.length > 0 || selectedRegions.length > 0 || selectedTags.length > 0 || 
            selectedTimePeriods.length > 0 || selectedReadingLevel || yearRange[0] || yearRange[1]) && (
            <div className={`mt-4 p-3 rounded-md ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h3 className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Active Filters
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedThemes.map(theme => (
                  <div 
                    key={`theme-${theme}`}
                    className="px-2 py-1 text-xs rounded-full flex items-center text-white"
                    style={{ backgroundColor: getThemeColor(theme) }}
                  >
                    <span className="mr-1">{theme}</span>
                    <button 
                      onClick={() => toggleTheme(theme)}
                      className="w-4 h-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
                
                {selectedRegions.map(region => (
                  <div 
                    key={`region-${region}`}
                    className={`px-2 py-1 text-xs rounded-full flex items-center text-white ${
                      isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                    }`}
                  >
                    <span className="mr-1">{region}</span>
                    <button 
                      onClick={() => toggleRegion(region)}
                      className="w-4 h-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
                
                {selectedTags.map(tag => {
                  const tagObj = filterMetadata.tags.find(t => t.name === tag);
                  return (
                    <div 
                      key={`tag-${tag}`}
                      className="px-2 py-1 text-xs rounded-full flex items-center text-white"
                      style={{ backgroundColor: getTagColor(tagObj?.category || 'subject') }}
                    >
                      <span className="mr-1">{tag}</span>
                      <button 
                        onClick={() => toggleTag(tag)}
                        className="w-4 h-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50"
                      >
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  );
                })}
                
                {selectedTimePeriods.map(period => (
                  <div 
                    key={`period-${period}`}
                    className={`px-2 py-1 text-xs rounded-full flex items-center text-white ${
                      isDarkMode ? 'bg-purple-500' : 'bg-purple-600'
                    }`}
                  >
                    <span className="mr-1">{period}</span>
                    <button 
                      onClick={() => toggleTimePeriod(period)}
                      className="w-4 h-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
                
                {selectedReadingLevel && (
                  <div 
                    className={`px-2 py-1 text-xs rounded-full flex items-center text-white ${
                      isDarkMode ? 'bg-green-500' : 'bg-green-600'
                    }`}
                  >
                    <span className="mr-1">{selectedReadingLevel}</span>
                    <button 
                      onClick={() => setSelectedReadingLevel(null)}
                      className="w-4 h-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
                
                {(yearRange[0] || yearRange[1]) && (
                  <div 
                    className={`px-2 py-1 text-xs rounded-full flex items-center text-white ${
                      isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600'
                    }`}
                  >
                    <span className="mr-1">
                      {yearRange[0] ? yearRange[0] : 'Any'} - {yearRange[1] ? yearRange[1] : 'Present'}
                    </span>
                    <button 
                      onClick={() => setYearRange([null, null])}
                      className="w-4 h-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center hover:bg-opacity-50"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedFilters;
