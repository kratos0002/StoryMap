import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchStories, Story as SupabaseStory } from '../lib/supabase';

// Legacy Story interface for map compatibility
interface LegacyStory {
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

interface StoryMapProps {
  onStorySelect: (story: LegacyStory) => void;
  isDarkMode?: boolean;
}

// Helper function to transform Supabase story to legacy format
const transformStoryForMap = (supabaseStory: SupabaseStory): LegacyStory | null => {
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

  // Get cultural context
  const culturalContext = supabaseStory.cultural_contexts?.[0]?.context_text || 'No cultural context available';

  // Extract mood from tags (assuming mood is stored as a tag)
  const moodTag = supabaseStory.story_tags?.find(st => st.tag.category === 'mood');
  const mood = moodTag?.tag.name || 'Unknown';

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
    mood: mood,
    previewText: supabaseStory.summary || 'No preview available',
    fullText: supabaseStory.original_text || 'Full text not available',
    culturalContext: culturalContext,
    imageUrl: imageUrl
  };
};

const StoryMap: React.FC<StoryMapProps> = ({ onStorySelect, isDarkMode = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [stories, setStories] = useState<LegacyStory[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState<boolean>(true);
  const [storiesError, setStoriesError] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Get Mapbox API key from environment variables
  const mapboxToken = import.meta.env.VITE_MAPBOX_API_KEY;
  
  // Debug logging
  console.log('Mapbox token:', mapboxToken ? 'Present' : 'Missing');
  console.log('Is loading stories:', isLoadingStories);
  console.log('Stories count:', stories.length);
  console.log('Is map loaded:', isMapLoaded);
  
  // Load stories from Supabase
  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoadingStories(true);
        setStoriesError(null);
        const supabaseStories = await fetchStories();
        
        // Transform stories and filter out any that don't have location data
        const transformedStories = supabaseStories
          .map(transformStoryForMap)
          .filter((story): story is LegacyStory => story !== null);
        
        setStories(transformedStories);
        console.log(`Loaded ${transformedStories.length} stories with location data`);
      } catch (error) {
        console.error('Error loading stories:', error);
        setStoriesError('Failed to load stories from database');
      } finally {
        setIsLoadingStories(false);
      }
    };

    loadStories();
  }, []);
  
  // Group stories by theme to color-code pins
  const getThemeColor = (themes: string[]): string => {
    if (themes.includes('Mythical')) return '#ec4899'; // Pink
    if (themes.includes('Nature')) return '#10B981'; // Green
    if (themes.includes('Urban')) return '#6366f1'; // Indigo
    if (themes.includes('Folklore')) return '#8B5CF6'; // Purple
    if (themes.includes('Desert')) return '#f59e0b'; // Amber
    return '#3b82f6'; // Blue (default)
  };

  // Initialize map when component mounts and mapboxToken is available
  useEffect(() => {
    if (map.current || !mapboxToken || isLoadingStories) return; // Wait for stories to load
    
    // Check if Mapbox API key is configured
    if (!mapboxToken || mapboxToken === 'your_mapbox_api_key_here') {
      setMapError('Mapbox API key not configured. Please add VITE_MAPBOX_API_KEY to your .env file.');
      return;
    }
    
    console.log('Initializing map with custom styling...');
    
    // Set the access token for mapbox-gl
    mapboxgl.accessToken = mapboxToken;
    
    if (mapContainer.current) {
      try {
        // Use string-based style URL instead of object to avoid type issues
        const mapStyle = isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11';
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: mapStyle,
          center: [0, 20],
          zoom: 1.5,
          attributionControl: false,
          projection: { name: 'globe' }, // Use globe projection for a more immersive feel
          interactive: true, // Explicitly enable interactivity
          dragRotate: true, // Enable rotation
          touchZoomRotate: true // Enable touch zoom and rotation
        });
        
        // Add attribution control in bottom-left
        map.current.addControl(new mapboxgl.AttributionControl({
          compact: true
        }), 'bottom-left');
        
        // Add navigation controls with custom styling
        const nav = new mapboxgl.NavigationControl({
          visualizePitch: true,
          showCompass: true,
          showZoom: true
        });
        map.current.addControl(nav, 'top-right');
        
        // Add animated loading indicator
        const loadingEl = document.createElement('div');
        loadingEl.className = 'map-loading-indicator';
        loadingEl.innerHTML = `
          <div class="loading-spinner"></div>
          <p class="font-serif">Exploring the world of stories...</p>
        `;
        mapContainer.current.appendChild(loadingEl);
        
        // Add markers for each story when map loads
        map.current.on('load', () => {
          setIsMapLoaded(true);
          
          // Remove loading indicator with fade out
          loadingEl.classList.add('fade-out');
          setTimeout(() => {
            loadingEl.remove();
          }, 500);
          
          // Add a subtle fog effect to the map
          if (map.current) {
            try {
              map.current.setFog({
                'color': isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(220, 215, 200)',
                'high-color': isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(245, 243, 235)',
                'horizon-blend': 0.1,
                'space-color': isDarkMode ? 'rgb(10, 15, 30)' : 'rgb(245, 243, 235)',
                'star-intensity': isDarkMode ? 0.5 : 0.15
              });
            } catch (e) {
              console.log('Fog effect not supported in this version of Mapbox GL');
            }
          }
        });
        
        // Handle map errors
        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setMapError('Failed to load map. Please check your Mapbox API key.');
        });
        
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to initialize map. Please check your Mapbox API key.');
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        // Clean up all markers before removing map
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, isDarkMode]); // Removed stories and isLoadingStories from dependencies
  
  // Separate effect to handle adding markers when stories are loaded
  useEffect(() => {
    if (!map.current || !isMapLoaded || isLoadingStories || stories.length === 0) return;
    
    console.log(`Adding ${stories.length} story markers to map`);
    
    // Clear existing markers first
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Add stories with staggered animation
    stories.forEach((story, index) => {
      setTimeout(() => {
        addStoryMarker(story);
      }, index * 150); // Stagger marker appearance
    });
  }, [stories, isMapLoaded, isLoadingStories, isDarkMode]);
  
  // Effect to update map style when dark mode changes
  useEffect(() => {
    if (map.current && isMapLoaded) {
      // Use string-based style URL instead of object to avoid type issues
      const mapStyle = isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11';
      map.current.setStyle(mapStyle);
      
      // Re-add fog effect after style change
      map.current.once('styledata', () => {
        try {
          map.current?.setFog({
            'color': isDarkMode ? 'rgb(30, 41, 59)' : 'rgb(220, 215, 200)',
            'high-color': isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(245, 243, 235)',
            'horizon-blend': 0.1,
            'space-color': isDarkMode ? 'rgb(10, 15, 30)' : 'rgb(245, 243, 235)',
            'star-intensity': isDarkMode ? 0.5 : 0.15
          });
        } catch (e) {
          console.log('Fog effect not supported in this version of Mapbox GL');
        }
      });
    }
  }, [isDarkMode, isMapLoaded]);
  
  // Function to add a story marker to the map
  const addStoryMarker = (story: LegacyStory) => {
    if (!map.current) return;
    
    // Create a DOM element for the marker
    const markerEl = document.createElement('div');
    markerEl.className = 'story-marker';
    
    // Apply theme-based styling with absolute positioning fix
    const themeColor = getThemeColor(story.themes);
    
    // Set initial styles without conflicting transforms
    markerEl.style.width = '16px';
    markerEl.style.height = '16px';
    markerEl.style.borderRadius = '50%';
    markerEl.style.background = themeColor;
    markerEl.style.border = isDarkMode ? '2px solid rgba(30, 41, 59, 0.8)' : '2px solid white';
    markerEl.style.cursor = 'pointer';
    markerEl.style.boxShadow = isDarkMode 
      ? `0 0 0 2px rgba(0,0,0,0.2), 0 0 8px ${themeColor}` 
      : '0 0 0 2px rgba(0,0,0,0.1)';
    markerEl.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    markerEl.style.position = 'absolute';
    markerEl.style.top = '50%';
    markerEl.style.left = '50%';
    markerEl.style.transform = 'translate(-50%, -50%)';
    markerEl.style.zIndex = '1';
    
    // Create a wrapper div to handle the scaling without affecting positioning
    const wrapperEl = document.createElement('div');
    wrapperEl.style.position = 'relative';
    wrapperEl.style.width = '20px';
    wrapperEl.style.height = '20px';
    wrapperEl.style.display = 'flex';
    wrapperEl.style.alignItems = 'center';
    wrapperEl.style.justifyContent = 'center';
    
    // Append marker to wrapper
    wrapperEl.appendChild(markerEl);
    
    // Add hover effect that only scales the inner marker, not the wrapper
    wrapperEl.addEventListener('mouseenter', () => {
      markerEl.style.transform = 'translate(-50%, -50%) scale(1.1)';
      markerEl.style.zIndex = '10';
      markerEl.style.boxShadow = isDarkMode 
        ? `0 0 0 2px rgba(0,0,0,0.2), 0 0 12px ${themeColor}, 0 0 20px ${themeColor}40` 
        : `0 0 0 2px rgba(0,0,0,0.1), 0 0 8px ${themeColor}, 0 0 16px ${themeColor}40`;
    });
    
    wrapperEl.addEventListener('mouseleave', () => {
      markerEl.style.transform = 'translate(-50%, -50%) scale(1)';
      markerEl.style.zIndex = '1';
      markerEl.style.boxShadow = isDarkMode 
        ? `0 0 0 2px rgba(0,0,0,0.2), 0 0 8px ${themeColor}` 
        : '0 0 0 2px rgba(0,0,0,0.1)';
    });
    
    // Create the marker with the wrapper element
    const marker = new mapboxgl.Marker({
      element: wrapperEl,
      anchor: 'center'
    })
    .setLngLat([story.coordinates.lng, story.coordinates.lat])
    .addTo(map.current);
    
    // Store marker reference for later cleanup
    markersRef.current.push(marker);
    
    // Add click event to the wrapper (so it works for the whole marker area)
    wrapperEl.addEventListener('click', () => {
      // Remove existing popup if any
      if (popupRef.current) {
        popupRef.current.remove();
      }
      
      // Create popup content with enhanced styling
      const popupContent = document.createElement('div');
      popupContent.className = `story-popup max-w-xs p-3 animate-fade-in ${isDarkMode ? 'dark-mode' : ''}`;
      
      const imageContainer = document.createElement('div');
      imageContainer.className = 'relative h-32 mb-3 overflow-hidden rounded-t-lg';
      imageContainer.style.backgroundImage = `url(${story.imageUrl || 'https://source.unsplash.com/random/300x200/?${story.themes[0]},${story.country}'})`;
      imageContainer.style.backgroundSize = 'cover';
      imageContainer.style.backgroundPosition = 'center';
      
      // Add gradient overlay
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0';
      overlay.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))';
      imageContainer.appendChild(overlay);
      
      // Add country flag and name
      const countryBadge = document.createElement('div');
      countryBadge.className = 'absolute top-2 left-2 flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-md text-xs';
      countryBadge.innerHTML = `<span class="mr-1">🌍</span> ${story.country}`;
      imageContainer.appendChild(countryBadge);
      
      // Add reading time badge
      const readingTime = document.createElement('div');
      readingTime.className = 'absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs';
      readingTime.innerHTML = `${story.readingTimeMinutes} min read`;
      imageContainer.appendChild(readingTime);
      
      const title = document.createElement('h3');
      title.className = 'font-serif font-semibold text-lg mb-2';
      title.textContent = story.title;
      
      const themeContainer = document.createElement('div');
      themeContainer.className = 'flex flex-wrap gap-1 mb-3';
      
      story.themes.forEach(theme => {
        const themeTag = document.createElement('span');
        themeTag.className = 'text-xs px-2 py-1 rounded-full';
        themeTag.style.backgroundColor = `${getThemeColor([theme])}20`; // 20% opacity
        themeTag.style.color = getThemeColor([theme]);
        themeTag.textContent = theme;
        themeContainer.appendChild(themeTag);
      });
      
      const preview = document.createElement('p');
      preview.className = 'text-sm mb-3 line-clamp-3';
      preview.textContent = story.previewText;
      
      const button = document.createElement('button');
      button.className = 'w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center justify-center';
      button.innerHTML = '<span>Read Story</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>';
      button.onclick = () => {
        // Add click animation
        button.classList.add('animate-pulse');
        setTimeout(() => {
          onStorySelect(story);
        }, 300);
      };
      
      popupContent.appendChild(imageContainer);
      popupContent.appendChild(title);
      popupContent.appendChild(themeContainer);
      popupContent.appendChild(preview);
      popupContent.appendChild(button);
      
      // Create and show popup with enhanced styling
      popupRef.current = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px',
        className: isDarkMode ? 'custom-popup dark-mode' : 'custom-popup'
      })
      .setLngLat([story.coordinates.lng, story.coordinates.lat])
      .setDOMContent(popupContent)
      .addTo(map.current!);
      
      // Fly to the story location with animation
      map.current?.flyTo({
        center: [story.coordinates.lng, story.coordinates.lat],
        zoom: 4,
        speed: 0.8,
        curve: 1,
        essential: true
      });
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      <div 
        ref={mapContainer} 
        className={`h-full w-full ${isDarkMode ? 'dark-map' : 'light-map'}`}
        style={{ touchAction: 'none', pointerEvents: 'auto' }} // Ensure touch and pointer events work
      />
      
      {/* Loading states */}
      {(isLoadingStories || !isMapLoaded) && (
        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-80'} z-10`}>
          <div className="text-center">
            <div className={`inline-block w-12 h-12 border-4 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'} border-t-transparent rounded-full animate-spin`}></div>
            <p className={`mt-4 text-lg font-serif ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {isLoadingStories ? 'Loading stories from database...' : 'Discovering stories around the world...'}
            </p>
            {stories.length > 0 && !isLoadingStories && (
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Found {stories.length} stories with location data
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Error state */}
      {storiesError && (
        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-80'} z-10`}>
          <div className="text-center max-w-md mx-auto p-6">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>⚠️</div>
            <h3 className={`text-xl font-serif mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Unable to Load Stories
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {storiesError}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors`}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Map configuration error state */}
      {mapError && (
        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-80'} z-10`}>
          <div className="text-center max-w-md mx-auto p-6">
            <div className={`text-6xl mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>🗺️</div>
            <h3 className={`text-xl font-serif mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Map Configuration Required
            </h3>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {mapError}
            </p>
            <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono`}>
              <p className="mb-2">Create a <code>.env</code> file with:</p>
              <p>VITE_MAPBOX_API_KEY=your_actual_api_key</p>
            </div>
            <div className="mt-4">
              <a 
                href="https://account.mapbox.com/auth/signup/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-block px-4 py-2 rounded-md text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors`}
              >
                Get Mapbox API Key
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Map controls overlay - Ensure it doesn't block map interaction */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        <button 
          className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} shadow-lg hover:scale-110 transition-transform pointer-events-auto`}
          title="Reset map view"
          onClick={() => {
            map.current?.flyTo({
              center: [0, 20],
              zoom: 1.5,
              pitch: 0,
              bearing: 0,
              duration: 1500
            });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StoryMap;
