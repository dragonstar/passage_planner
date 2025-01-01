import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJourney } from '../api/journeys';
import { getWaypoints } from '../api/waypoints';
import { useAuth } from '../contexts/AuthContext';
import type { Journey } from '../types/journey';
import type { Waypoint } from '../types/waypoint';

interface LoadedJourney extends Journey {
  waypoints: Waypoint[];
}

export function useLoadJourney(id: string | undefined) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [journey, setJourney] = useState<LoadedJourney | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadJourney() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load journey and waypoints in parallel
        const [journeyData, waypointsData] = await Promise.all([
          getJourney(id),
          getWaypoints(id)
        ]);
        
        // Check if user owns the journey
        if (journeyData.author_id !== user.id) {
          throw new Error('You do not have permission to view this journey');
        }
        
        if (isMounted) {
          // Ensure waypoints are properly sorted by day and order
          const sortedWaypoints = waypointsData.sort((a, b) => {
            if (a.day !== b.day) {
              return (a.day || '').localeCompare(b.day || '');
            }
            return (a.order || 0) - (b.order || 0);
          });

          setJourney({
            ...journeyData,
            waypoints: sortedWaypoints
          });
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to load journey';
          setError(message);
          setTimeout(() => navigate('/journeys'), 1500);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadJourney();

    return () => {
      isMounted = false;
    };
  }, [id, navigate, user]);

  return { journey, isLoading, error };
}