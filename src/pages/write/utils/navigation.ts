import type { Waypoint } from '../hooks/useWaypoints';

const EARTH_RADIUS = 3440.065; // Earth's radius in nautical miles

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => deg * (Math.PI / 180);
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return EARTH_RADIUS * c;
}

export function calculateTotalDistance(waypoints: Waypoint[]): number {
  if (waypoints.length < 2) return 0;
  
  return waypoints.reduce((total, waypoint, index) => {
    if (index === 0) return 0;
    const prev = waypoints[index - 1];
    return total + calculateDistance(prev.lat, prev.lng, waypoint.lat, waypoint.lng);
  }, 0);
}

export function calculateSegmentDistances(waypoints: Waypoint[]) {
  if (waypoints.length < 2) return [];

  let cumulative = 0;
  const segments = [];

  for (let i = 1; i < waypoints.length; i++) {
    const prev = waypoints[i - 1];
    const curr = waypoints[i];
    const distance = calculateDistance(prev.lat, prev.lng, curr.lat, curr.lng);
    cumulative += distance;

    segments.push({
      from: prev.name,
      to: curr.name,
      distance,
      cumulative,
    });
  }

  return segments;
}