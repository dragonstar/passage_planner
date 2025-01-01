import 'leaflet/dist/leaflet.css';

export const MAP_BOUNDS: [[number, number], [number, number]] = [[-90, -180], [90, 180]];
export const DEFAULT_CENTER: [number, number] = [20, 0];
export const DEFAULT_ZOOM = 2;
export const MIN_ZOOM = 2;
export const MAX_ZOOM = 18;

export const BASE_MAP_CONFIG = {
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  worldCopyJump: true,
  zoomControl: true,
  scrollWheelZoom: true
};

export const TILE_LAYER_CONFIG = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM
};

export function calculateMapBounds(waypoints: Array<{ lat: number; lng: number }>) {
  if (waypoints.length === 0) {
    return undefined;
  }

  const lats = waypoints.map(w => w.lat);
  const lngs = waypoints.map(w => w.lng);

  // Calculate bounds with padding
  const latPadding = Math.max(0.1, (Math.max(...lats) - Math.min(...lats)) * 0.1);
  const lngPadding = Math.max(0.1, (Math.max(...lngs) - Math.min(...lngs)) * 0.1);
  
  return [
    [Math.max(-90, Math.min(...lats) - latPadding), Math.min(...lngs) - lngPadding],
    [Math.min(90, Math.max(...lats) + latPadding), Math.max(...lngs) + lngPadding]
  ] as [[number, number], [number, number]];
}