/* Custom Mapbox style for StoryMap - Enhanced Vintage Explorer Theme */

// Light mode (day) map style
export const lightModeMapStyle = {
  "version": 8,
  "name": "StoryMap Vintage Explorer - Light",
  "sources": {
    "mapbox": {
      "type": "vector",
      "url": "mapbox://mapbox.mapbox-streets-v8"
    }
  },
  "sprite": "mapbox://sprites/mapbox/light-v10",
  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#f8f4e9"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "water",
      "paint": {
        "fill-color": "#d1e3f5",
        "fill-opacity": 0.8
      }
    },
    {
      "id": "water-pattern",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "water",
      "paint": {
        "fill-pattern": "wave",
        "fill-opacity": 0.05
      }
    },
    {
      "id": "land",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landcover",
      "paint": {
        "fill-color": "#f0ebe1",
        "fill-opacity": 0.7
      }
    },
    {
      "id": "landcover-texture",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landcover",
      "paint": {
        "fill-pattern": "paper",
        "fill-opacity": 0.03
      }
    },
    {
      "id": "admin-boundaries",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "paint": {
        "line-color": "#d2c4a5",
        "line-width": 0.5,
        "line-opacity": 0.6,
        "line-dasharray": [3, 1]
      }
    },
    {
      "id": "country-boundaries",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "filter": ["==", "admin_level", 0],
      "paint": {
        "line-color": "#b0a48c",
        "line-width": 1,
        "line-opacity": 0.8
      }
    },
    {
      "id": "country-labels",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "filter": ["==", "class", "country"],
      "layout": {
        "text-field": "{name_en}",
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
        "text-size": 14,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-max-width": 8
      },
      "paint": {
        "text-color": "#78624e",
        "text-halo-color": "rgba(248, 244, 233, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "city-labels",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "filter": ["==", "class", "city"],
      "layout": {
        "text-field": "{name_en}",
        "text-font": ["DIN Pro Regular", "Arial Unicode MS Regular"],
        "text-size": 12,
        "text-max-width": 8,
        "text-variable-anchor": ["center", "top", "bottom", "left", "right"],
        "text-radial-offset": 0.5
      },
      "paint": {
        "text-color": "#78624e",
        "text-halo-color": "rgba(248, 244, 233, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "compass-rose",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "water",
      "filter": ["==", "$type", "Polygon"],
      "layout": {
        "icon-image": "compass",
        "icon-size": 0.5,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "bottom-right",
        "icon-offset": [-20, -20]
      },
      "paint": {
        "icon-opacity": 0.7
      }
    }
  ]
};

// Dark mode (night) map style
export const darkModeMapStyle = {
  "version": 8,
  "name": "StoryMap Vintage Explorer - Dark",
  "sources": {
    "mapbox": {
      "type": "vector",
      "url": "mapbox://mapbox.mapbox-streets-v8"
    }
  },
  "sprite": "mapbox://sprites/mapbox/dark-v10",
  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#111827"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "water",
      "paint": {
        "fill-color": "#1e3a5f",
        "fill-opacity": 0.8
      }
    },
    {
      "id": "water-pattern",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "water",
      "paint": {
        "fill-pattern": "wave",
        "fill-opacity": 0.05
      }
    },
    {
      "id": "land",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landcover",
      "paint": {
        "fill-color": "#1f2937",
        "fill-opacity": 0.7
      }
    },
    {
      "id": "landcover-texture",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landcover",
      "paint": {
        "fill-pattern": "paper",
        "fill-opacity": 0.02
      }
    },
    {
      "id": "admin-boundaries",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "paint": {
        "line-color": "#4b5563",
        "line-width": 0.5,
        "line-opacity": 0.6,
        "line-dasharray": [3, 1]
      }
    },
    {
      "id": "country-boundaries",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "filter": ["==", "admin_level", 0],
      "paint": {
        "line-color": "#6b7280",
        "line-width": 1,
        "line-opacity": 0.8
      }
    },
    {
      "id": "country-labels",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "filter": ["==", "class", "country"],
      "layout": {
        "text-field": "{name_en}",
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
        "text-size": 14,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-max-width": 8
      },
      "paint": {
        "text-color": "#9ca3af",
        "text-halo-color": "rgba(17, 24, 39, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "city-labels",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "filter": ["==", "class", "city"],
      "layout": {
        "text-field": "{name_en}",
        "text-font": ["DIN Pro Regular", "Arial Unicode MS Regular"],
        "text-size": 12,
        "text-max-width": 8,
        "text-variable-anchor": ["center", "top", "bottom", "left", "right"],
        "text-radial-offset": 0.5
      },
      "paint": {
        "text-color": "#9ca3af",
        "text-halo-color": "rgba(17, 24, 39, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "stars",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "water",
      "filter": ["==", "$type", "Polygon"],
      "layout": {
        "icon-image": "star",
        "icon-size": 0.1,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "symbol-placement": "point",
        "symbol-spacing": 200
      },
      "paint": {
        "icon-opacity": 0.5
      }
    },
    {
      "id": "compass-rose",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "water",
      "filter": ["==", "$type", "Polygon"],
      "layout": {
        "icon-image": "compass",
        "icon-size": 0.5,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-anchor": "bottom-right",
        "icon-offset": [-20, -20]
      },
      "paint": {
        "icon-opacity": 0.7
      }
    }
  ]
};

// Default export for backward compatibility
export default 'mapbox://styles/mapbox/light-v11';
