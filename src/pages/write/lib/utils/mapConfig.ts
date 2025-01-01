// Common map configuration constants and utilities
export const MAP_BOUNDS: [[number, number], [number, number]] = [[-90, -180], [90, 180]];
export const DEFAULT_CENTER: [number, number] = [20, 0];
export const DEFAULT_ZOOM = 2;
export const MIN_ZOOM = 2;

export const BASE_MAP_CONFIG = {
  worldCopyJump: true,
  minZoom: MIN_ZOOM,
  maxBounds: MAP_BOUNDS,
  zoomControl: false,
  // Enable continuous world wrapping
  continuousWorld: true,
  // Ensure the map wraps around the antimeridian
  wrap: true
};

export const TILE_LAYER_CONFIG = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // Allow tiles to wrap around the world
  noWrap: false,
  // Remove bounds constraint to allow wrapping
  bounds: undefined,
  // Enable continuous world for tiles
  continuousWorld: true
};

export function calculateMapBounds(waypoints: Array<{ lat: number; lng: number }>) {
  if (waypoints.length === 0) {
    return undefined;
  }

  const lats = waypoints.map(w => w.lat);
  const lngs = waypoints.map(w => w.lng);

  // Handle longitude wrapping around the antimeridian
  const wrappedLngs = lngs.map(lng => {
    while (lng < -180) lng += 360;
    while (lng > 180) lng -= 360;
    return lng;
  });

  // Calculate bounds with padding
  const latPadding = Math.max(0.1, (Math.max(...lats) - Math.min(...lats)) * 0.1);
  const lngPadding = Math.max(0.1, (Math.max(...wrappedLngs) - Math.min(...wrappedLngs)) * 0.1);
  
  return [
    [Math.min(...lats) - latPadding, Math.min(...wrappedLngs) - lngPadding],
    [Math.max(...lats) + latPadding, Math.max(...wrappedLngs) + lngPadding]
  ] as [[number, number], [number, number]];
}