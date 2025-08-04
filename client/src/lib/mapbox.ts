const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibmVvbnZveWFnZXIiLCJhIjoiY2t0ZXh0ZXhxMHhjZjJ2bGR6bjFqOXpoeSJ9.example';

export interface MapboxConfig {
  accessToken: string;
  style: string;
  center: [number, number];
  zoom: number;
}

export const mapboxConfig: MapboxConfig = {
  accessToken: MAPBOX_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [139.6503, 35.6762], // Tokyo default
  zoom: 10
};

export interface MapMarker {
  id: string;
  coordinates: [number, number];
  type: 'hotel' | 'restaurant' | 'attraction';
  color: string;
  popup?: {
    title: string;
    description: string;
  };
}

export const markerColors = {
  hotel: '#00FFFF',     // neon-cyan
  restaurant: '#FF00FF', // neon-pink
  attraction: '#8B5CF6'  // neon-purple
};

export const createMarkerElement = (marker: MapMarker): HTMLElement => {
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.cssText = `
    background-color: ${marker.color};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 10px ${marker.color};
    cursor: pointer;
  `;
  return el;
};
