import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { stories, Story } from '../data/stories';
import MapboxConfig from './MapboxConfig';

interface StoryMapProps {
  onStorySelect: (story: Story) => void;
  isDarkMode?: boolean;
}

const StoryMap: React.FC<StoryMapProps> = ({ onStorySelect, isDarkMode = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isConfiguring, setIsConfiguring] = useState<boolean>(true);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  
  // Check for API key in local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('mapbox_api_key');
    if (storedToken) {
      setMapboxToken(storedToken);
      setIsConfiguring(false);
    }
  }, []);
  
  // Handle API key being set from the configuration screen
  const handleApiKeySet = (apiKey: string) => {
    setMapboxToken(apiKey);
    setIsConfiguring(false);
  };
  
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
    if (map.current || !mapboxToken || isConfiguring) return; // Initialize map only once and when token is available
    
    console.log('Initializing map with custom styling...');
    
    // Set the access token for mapbox-gl
    mapboxgl.accessToken = mapboxToken;
    
    if (mapContainer.current) {
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
        
        // Add stories with staggered animation
        stories.forEach((story, index) => {
          setTimeout(() => {
            addStoryMarker(story);
          }, index * 150); // Stagger marker appearance
        });
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onStorySelect, mapboxToken, isConfiguring, isDarkMode]);
  
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
        
        // Re-add markers after style change
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        
        stories.forEach((story, index) => {
          setTimeout(() => {
            addStoryMarker(story);
          }, index * 100);
        });
      });
    }
  }, [isDarkMode, isMapLoaded]);
  
  // Function to add a story marker to the map
  const addStoryMarker = (story: Story) => {
    if (!map.current) return;
    
    // Create a DOM element for the marker
    const markerEl = document.createElement('div');
    markerEl.className = 'story-marker animate-pulse';
    
    // Apply theme-based styling
    const themeColor = getThemeColor(story.themes);
    markerEl.style.width = '16px';
    markerEl.style.height = '16px';
    markerEl.style.borderRadius = '50%';
    markerEl.style.background = themeColor;
    markerEl.style.border = isDarkMode ? '2px solid rgba(30, 41, 59, 0.8)' : '2px solid white';
    markerEl.style.cursor = 'pointer';
    markerEl.style.boxShadow = isDarkMode 
      ? `0 0 0 2px rgba(0,0,0,0.2), 0 0 8px ${themeColor}` 
      : '0 0 0 2px rgba(0,0,0,0.1)';
    markerEl.style.transition = 'all 0.3s ease';
    
    // Add hover effect
    markerEl.addEventListener('mouseenter', () => {
      markerEl.style.transform = 'scale(1.5)';
      markerEl.style.boxShadow = isDarkMode 
        ? `0 0 0 2px rgba(0,0,0,0.2), 0 0 12px ${themeColor}` 
        : `0 0 0 2px rgba(0,0,0,0.1), 0 0 8px ${themeColor}`;
    });
    
    markerEl.addEventListener('mouseleave', () => {
      markerEl.style.transform = 'scale(1)';
      markerEl.style.boxShadow = isDarkMode 
        ? `0 0 0 2px rgba(0,0,0,0.2), 0 0 8px ${themeColor}` 
        : '0 0 0 2px rgba(0,0,0,0.1)';
    });
    
    // Create the marker directly with the marker element (no container)
    const marker = new mapboxgl.Marker({
      element: markerEl,
      anchor: 'center',
      offset: [0, 0]
    })
    .setLngLat([story.coordinates.lng, story.coordinates.lat])
    .addTo(map.current);
    
    // Store marker reference for later cleanup
    markersRef.current.push(marker);
    
    // Remove animation class after animation completes
    setTimeout(() => {
      markerEl.classList.remove('animate-pulse');
    }, 1000);
    
    // Add click event to marker
    markerEl.addEventListener('click', () => {
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

  // Show configuration screen if no API key is available
  if (isConfiguring) {
    return <MapboxConfig onApiKeySet={handleApiKeySet} />;
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      <div 
        ref={mapContainer} 
        className={`h-full w-full ${isDarkMode ? 'dark-map' : 'light-map'}`}
        style={{ touchAction: 'none', pointerEvents: 'auto' }} // Ensure touch and pointer events work
      />
      {!isMapLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-80'} z-10`}>
          <div className="text-center">
            <div className={`inline-block w-12 h-12 border-4 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'} border-t-transparent rounded-full animate-spin`}></div>
            <p className={`mt-4 text-lg font-serif ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Discovering stories around the world...</p>
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
