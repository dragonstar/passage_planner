import { useState, useEffect, useCallback, useRef } from 'react';
import type { Waypoint } from './useWaypoints';

export function useJourneyWaypoints(
  dates: string[],
  onWaypointsChange: (waypoints: Waypoint[]) => void,
  initialWaypoints: Waypoint[] = []
) {
  const [dailyWaypoints, setDailyWaypoints] = useState<Map<string, Waypoint[]>>(() => {
    const map = new Map();
    dates.forEach(date => map.set(date, []));
    
    // Group initial waypoints by day
    if (initialWaypoints.length > 0) {
      initialWaypoints.forEach(waypoint => {
        if (!waypoint.day) return; // Skip waypoints without day
        const dayWaypoints = map.get(waypoint.day) || [];
        dayWaypoints.push(waypoint);
        map.set(waypoint.day, dayWaypoints);
      });
    }
    
    return map;
  });

  // Update when dates or initial waypoints change
  useEffect(() => {
    const map = new Map();
    dates.forEach(date => map.set(date, []));

    if (initialWaypoints.length > 0) {
      initialWaypoints.forEach(waypoint => {
        if (!waypoint.day) return;
        const dayWaypoints = map.get(waypoint.day) || [];
        dayWaypoints.push(waypoint);
        map.set(waypoint.day, dayWaypoints);
      });
    }

    setDailyWaypoints(map);
  }, [dates, initialWaypoints]);

  const addWaypoint = useCallback((date: string, waypoint: Omit<Waypoint, 'id'>) => {
    setDailyWaypoints(current => {
      const newMap = new Map(current);
      const dayWaypoints = [...(newMap.get(date) || [])];
      dayWaypoints.push({ 
        ...waypoint, 
        id: crypto.randomUUID(),
        day: date // Ensure day is set when adding
      });
      newMap.set(date, dayWaypoints);
      return newMap;
    });
  }, []);

  const updateWaypoint = useCallback((date: string, id: string, updates: Partial<Waypoint>) => {
    setDailyWaypoints(current => {
      const newMap = new Map(current);
      const dayWaypoints = newMap.get(date) || [];
      newMap.set(date, dayWaypoints.map(wp => 
        wp.id === id ? { ...wp, ...updates, day: date } : wp // Ensure day is preserved
      ));
      return newMap;
    });
  }, []);

  const removeWaypoint = useCallback((date: string, id: string) => {
    setDailyWaypoints(current => {
      const newMap = new Map(current);
      const dayWaypoints = newMap.get(date) || [];
      newMap.set(date, dayWaypoints.filter(wp => wp.id !== id));
      return newMap;
    });
  }, []);

  const reorderWaypoints = useCallback((date: string, startIndex: number, endIndex: number) => {
    setDailyWaypoints(current => {
      const newMap = new Map(current);
      const dayWaypoints = [...(newMap.get(date) || [])];
      const [removed] = dayWaypoints.splice(startIndex, 1);
      dayWaypoints.splice(endIndex, 0, removed);
      newMap.set(date, dayWaypoints);
      return newMap;
    });
  }, []);

  // Notify parent of waypoint changes with proper day association
  useEffect(() => {
    const allWaypoints = Array.from(dailyWaypoints.entries()).flatMap(([date, waypoints]) =>
      waypoints.map((wp, index) => ({
        ...wp,
        day: date, // Ensure day is set
        order: index,
      }))
    );

    onWaypointsChange(allWaypoints);
  }, [dailyWaypoints, onWaypointsChange]);

  return {
    dailyWaypoints,
    addWaypoint,
    updateWaypoint,
    removeWaypoint,
    reorderWaypoints,
  };
}