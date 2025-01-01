import { useState } from 'react';

export type Waypoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  notes?: string;
};

export function useWaypoints(initialWaypoints: Waypoint[] = []) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>(initialWaypoints);

  const addWaypoint = (waypoint: Omit<Waypoint, 'id'>, position?: number) => {
    const newWaypoint = { ...waypoint, id: crypto.randomUUID() };
    setWaypoints(current => {
      if (typeof position === 'number') {
        const newWaypoints = [...current];
        newWaypoints.splice(position, 0, newWaypoint);
        return newWaypoints;
      }
      return [...current, newWaypoint];
    });
  };

  const updateWaypoint = (id: string, updates: Partial<Waypoint>) => {
    setWaypoints(current => 
      current.map(wp => wp.id === id ? { ...wp, ...updates } : wp)
    );
  };

  const removeWaypoint = (id: string) => {
    setWaypoints(current => current.filter(wp => wp.id !== id));
  };

  const reorderWaypoints = (startIndex: number, endIndex: number) => {
    setWaypoints(current => {
      const result = Array.from(current);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return {
    waypoints,
    setWaypoints,
    addWaypoint,
    updateWaypoint,
    removeWaypoint,
    reorderWaypoints,
  };
}