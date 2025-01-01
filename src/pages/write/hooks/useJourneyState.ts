import { useState, useCallback } from 'react';
import type { DailyEntry } from '../../../lib/types/journey';
import type { Waypoint } from './useWaypoints';

export function useJourneyState(initialWaypoints: Waypoint[] = []) {
  const [allWaypoints, setAllWaypoints] = useState<Waypoint[]>(initialWaypoints);
  const [entries, setEntries] = useState<DailyEntry[]>([]);

  const updateWaypoints = useCallback((newWaypoints: Waypoint[]) => {
    // Only update if the waypoints have actually changed
    if (JSON.stringify(newWaypoints) !== JSON.stringify(allWaypoints)) {
      setAllWaypoints(newWaypoints);
    }
  }, [allWaypoints]);

  const updateEntries = useCallback((newEntries: DailyEntry[]) => {
    setEntries(newEntries);
  }, []);

  return {
    allWaypoints,
    entries,
    updateWaypoints,
    updateEntries,
  };
}