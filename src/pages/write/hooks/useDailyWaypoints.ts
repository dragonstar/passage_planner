import { useState } from 'react';
import type { Waypoint } from './useWaypoints';

export function useDailyWaypoints(date: string) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  const addWaypoint = (waypoint: Omit<Waypoint, 'id'>) => {
    const newWaypoint = { ...waypoint, id: crypto.randomUUID() };
    setWaypoints(current => [...current, newWaypoint]);
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
    addWaypoint,
    updateWaypoint,
    removeWaypoint,
    reorderWaypoints,
  };
}