import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Story } from '../lib/supabase';

// Mapbox configuration
mapboxgl.accessToken = 'pk.eyJ1Ijoic3Rvcnltb3VudGFpbiIsImEiOiJjbG9lMXVrZWgwMGNsMmptbGw1cXRxNnJ1In0.VmGQrUPxIJxigT0GIY1UCQ';

interface EnhancedMapViewProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
  isDarkMode?: boolean;
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({ stories, onStorySelect, isDarkMode = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const popup = useRef<mapboxgl.Popup | null>(null);
  
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyRadius, setNearbyRadius] = useState<number>(500); // km
  const [showNearbyCircle, setShowNearbyCircle] = useState<boolean>(false);
  const [nearbyCircleId, setNearbyCircleId] = useState<string | null>(null);
  
  // Initialize map
  useEffect(() => {
    if (map.current) return; // Map already initialized
    
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: isDarkMode 
          ? 'mapbox://styles/mapbox/dark-v11' 
          : 'mapbox://styles/mapbox/light-v11',
        center: [0, 20], // Center on world
        zoom: 1.5
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Create popup but don't add to map yet
      popup.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px',
        className: isDarkMode ? 'dark-popup' : 'light-popup'
      });
      
      // Add event listeners
      map.current.on('load', () => {
        // Add source for nearby circle
        if (map.current) {
          map.current.addSource('nearby-circle', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [0, 0]
              },
              properties: {
                radius: 0
              }
            }
          });
          
          // Add circle layer
          map.current.addLayer({
            id: 'nearby-circle-layer',
            type: 'circle',
            source: 'nearby-circle',
            paint: {
              'circle-radius': ['get', 'radius'],
              'circle-color': isDarkMode ? '#3B82F6' : '#60A5FA',
              'circle-opacity': 0.2,
              'circle-stroke-width': 2,
              'circle-stroke-color': isDarkMode ? '#2563EB' : '#3B82F6',
              'circle-stroke-opacity': 0.8
            }
          });
          
          setNearbyCircleId('nearby-circle-layer');
        }
      });
    }
    
    return () => {
      // Cleanup markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      // Remove popup
      if (popup.current) popup.current.remove();
    };
  }, [isDarkMode]);
  
  // Update map style when dark mode changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(isDarkMode 
        ? 'mapbox://styles/mapbox/dark-v11' 
        : 'mapbox://styles/mapbox/light-v11'
      );
    }
  }, [isDarkMode]);
  
  // Add markers for stories
  useEffect(() => {
    if (!map.current || !stories.length) return;
    
    // Wait for map to be loaded
    if (!map.current.loaded()) {
      map.current.on('load', () => addMarkers());
      return;
    }
    
    addMarkers();
    
    function addMarkers() {
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      // Group stories by location to create clusters
      const locationGroups: Record<string, {
        stories: Story[];
        lat: number;
        lng: number;
      }> = {};
      
      stories.forEach(story => {
        if (story.story_locations && story.story_locations.length > 0) {
          story.story_locations.forEach(loc => {
            const { latitude, longitude } = loc.location;
            const key = `${latitude.toFixed(3)},${longitude.toFixed(3)}`;
            
            if (!locationGroups[key]) {
              locationGroups[key] = {
                stories: [],
                lat: latitude,
                lng: longitude
              };
            }
            
            locationGroups[key].stories.push(story);
          });
        }
      });
      
      // Create markers for each location group
      Object.values(locationGroups).forEach(group => {
        const { stories, lat, lng } = group;
        
        // Create marker element
        const el = document.createElement('div');
        el.className = 'story-marker';
        
        // Style based on story count
        if (stories.length > 1) {
          el.className += ' story-marker-cluster';
          el.innerHTML = `<span>${stories.length}</span>`;
          el.style.backgroundColor = isDarkMode ? '#3B82F6' : '#2563EB';
          el.style.color = 'white';
          el.style.width = `${Math.min(40, 30 + stories.length * 2)}px`;
          el.style.height = `${Math.min(40, 30 + stories.length * 2)}px`;
          el.style.borderRadius = '50%';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.fontWeight = 'bold';
          el.style.fontSize = '14px';
          el.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.3)';
        } else {
          // Single story marker
          const story = stories[0];
          const theme = story.story_themes && story.story_themes[0]?.theme.name;
          
          el.style.backgroundColor = 
            theme === 'Mythical' ? '#8B5CF6' : 
            theme === 'Nature' ? '#10B981' : 
            theme === 'Urban' ? '#3B82F6' : 
            theme === 'Folklore' ? '#F59E0B' : 
            theme === 'Desert' ? '#F97316' : '#EF4444';
          
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.boxShadow = '0 0 0 4px rgba(255, 255, 255, 0.3)';
        }
        
        // Create marker
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat([lng, lat])
          .addTo(map.current!);
        
        // Add event listeners
        el.addEventListener('mouseenter', () => {
          if (popup.current && map.current) {
            // Create popup content
            let content = '';
            
            if (stories.length === 1) {
              const story = stories[0];
              content = `
                <div class="${isDarkMode ? 'text-gray-200' : 'text-gray-800'}">
                  <h3 class="font-medium">${story.title}</h3>
                  <p class="text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1">
                    ${story.story_authors && story.story_authors[0] 
                      ? story.story_authors[0].author.name 
                      : 'Unknown author'}
                  </p>
                </div>
              `;
            } else {
              content = `
                <div class="${isDarkMode ? 'text-gray-200' : 'text-gray-800'}">
                  <h3 class="font-medium">${stories.length} Stories</h3>
                  <ul class="text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1">
                    ${stories.slice(0, 3).map(story => `<li>${story.title}</li>`).join('')}
                    ${stories.length > 3 ? `<li>and ${stories.length - 3} more...</li>` : ''}
                  </ul>
                </div>
              `;
            }
            
            popup.current
              .setLngLat([lng, lat])
              .setHTML(content)
              .addTo(map.current);
          }
        });
        
        el.addEventListener('mouseleave', () => {
          if (popup.current) popup.current.remove();
        });
        
        el.addEventListener('click', () => {
          if (stories.length === 1) {
            // Select the single story
            onStorySelect(stories[0]);
          } else {
            // Set selected location for nearby stories
            setSelectedLocation({ lat, lng });
            setShowNearbyCircle(true);
            
            // Update nearby circle
            updateNearbyCircle(lng, lat);
          }
        });
        
        markers.current.push(marker);
      });
      
      // Fit map to markers if we have any
      if (markers.current.length > 0 && map.current) {
        const bounds = new mapboxgl.LngLatBounds();
        
        Object.values(locationGroups).forEach(group => {
          bounds.extend([group.lng, group.lat]);
        });
        
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 10
        });
      }
    }
  }, [stories, isDarkMode, onStorySelect]);
  
  // Update nearby circle when selected location or radius changes
  useEffect(() => {
    if (selectedLocation && showNearbyCircle) {
      updateNearbyCircle(selectedLocation.lng, selectedLocation.lat);
    }
  }, [selectedLocation, nearbyRadius, showNearbyCircle]);
  
  // Function to update the nearby circle
  const updateNearbyCircle = (lng: number, lat: number) => {
    if (!map.current || !nearbyCircleId) return;
    
    // Convert radius from km to pixels at the current zoom level
    const radiusInPixels = calculateRadiusInPixels(lat, lng, nearbyRadius);
    
    // Update the circle source
    const source = map.current.getSource('nearby-circle') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: {
          radius: radiusInPixels
        }
      });
    }
  };
  
  // Calculate radius in pixels based on km
  const calculateRadiusInPixels = (lat: number, lng: number, radiusKm: number): number => {
    if (!map.current) return 0;
    
    // Get the map's current zoom level
    const zoom = map.current.getZoom();
    
    // At zoom level 0, 1 degree is approximately 111 km at the equator
    // The pixel radius needs to account for the zoom level and latitude
    const metersPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom);
    
    // Convert km to meters and then to pixels
    return (radiusKm * 1000) / metersPerPixel;
  };
  
  // Get stories near the selected location
  const getNearbyStories = (): Story[] => {
    if (!selectedLocation) return [];
    
    return stories.filter(story => {
      if (!story.story_locations) return false;
      
      return story.story_locations.some(loc => {
        const { latitude, longitude } = loc.location;
        const distance = calculateDistance(
          selectedLocation.lat, 
          selectedLocation.lng, 
          latitude, 
          longitude
        );
        return distance <= nearbyRadius;
      });
    });
  };
  
  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  // Handle radius change
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNearbyRadius(parseInt(e.target.value));
  };
  
  // Close nearby stories panel
  const closeNearbyPanel = () => {
    setShowNearbyCircle(false);
    setSelectedLocation(null);
  };
  
  // Get nearby stories
  const nearbyStories = selectedLocation ? getNearbyStories() : [];
  
  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map overlay controls */}
      <div className={`absolute top-4 left-4 p-3 rounded-lg shadow-md ${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
      }`}>
        <h3 className="text-sm font-medium mb-2">Map View</h3>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Click on markers to explore stories
        </p>
      </div>
      
      {/* Nearby stories panel */}
      {selectedLocation && showNearbyCircle && (
        <div className={`absolute bottom-4 left-4 right-4 max-h-[50vh] overflow-y-auto rounded-lg shadow-lg ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`}>
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-medium">Stories Nearby</h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {nearbyStories.length} stories within {nearbyRadius} km
              </p>
            </div>
            <button 
              onClick={closeNearbyPanel}
              className={`p-1 rounded-full ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Radius control */}
          <div className="px-4 py-3 border-b">
            <label className="block text-sm font-medium mb-1">Radius: {nearbyRadius} km</label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={nearbyRadius}
              onChange={handleRadiusChange}
              className="w-full"
            />
          </div>
          
          {/* Story list */}
          <div className="p-4">
            {nearbyStories.length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No stories found in this area. Try increasing the radius.
              </p>
            ) : (
              <div className="space-y-3">
                {nearbyStories.map(story => (
                  <div 
                    key={story.id}
                    onClick={() => onStorySelect(story)}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <h4 className="font-medium">{story.title}</h4>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {story.story_authors && story.story_authors[0] 
                        ? story.story_authors[0].author.name 
                        : 'Unknown author'}
                    </p>
                    
                    {/* Distance */}
                    {story.story_locations && story.story_locations[0] && (
                      <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {calculateDistance(
                          selectedLocation.lat,
                          selectedLocation.lng,
                          story.story_locations[0].location.latitude,
                          story.story_locations[0].location.longitude
                        ).toFixed(1)} km away
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Custom styles for markers and popups */}
      <style jsx global>{`
        .story-marker {
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .story-marker:hover {
          transform: scale(1.2);
        }
        
        .mapboxgl-popup {
          z-index: 10;
        }
        
        .dark-popup .mapboxgl-popup-content {
          background-color: #1F2937;
          color: #E5E7EB;
          border-radius: 0.5rem;
        }
        
        .dark-popup .mapboxgl-popup-tip {
          border-top-color: #1F2937;
          border-bottom-color: #1F2937;
        }
        
        .light-popup .mapboxgl-popup-content {
          background-color: white;
          color: #1F2937;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default EnhancedMapView;
