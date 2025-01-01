import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../lib/contexts/AuthContext';
import { createJourney, updateJourney } from '../../../lib/api/journeys';
import { createWaypoints, updateWaypoints } from '../../../lib/api/waypoints';
import { useLoadJourney } from '../../../lib/hooks/useLoadJourney';
import type { Waypoint } from '../../../lib/types/waypoint';
import type { DailyEntry } from '../../../lib/types/journey';

export function useJourneyForm(journeyId?: string) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { journey, isLoading, error: loadError } = useLoadJourney(journeyId);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(loadError);

  // Load journey data including waypoints
  useEffect(() => {
    if (!journey) return;
    setTitle(journey.title);
    setContent(journey.content || '');
    if (journey.start_date) setStartDate(journey.start_date);
    if (journey.end_date) setEndDate(journey.end_date);
    if (journey.waypoints) setWaypoints(journey.waypoints);
  }, [journey]);

  useEffect(() => {
    setError(loadError);
  }, [loadError]);

  const handleSave = useCallback(async (
    waypoints: Waypoint[],
    entries: DailyEntry[],
    status: 'draft' | 'published' = 'draft'
  ) => {
    if (!user) {
      setError('You must be logged in to save a journey');
      return;
    }

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const journeyData = {
        title: title.trim(),
        content: content || '',
        start_date: startDate,
        end_date: endDate,
        status,
        author_id: user.id,
      };

      if (journeyId) {
        // Update existing journey
        await updateJourney(journeyId, journeyData);
        await updateWaypoints(journeyId, waypoints);
      } else {
        // Create new journey
        const created = await createJourney(journeyData);
        if (waypoints.length > 0) {
          await createWaypoints(created.id, waypoints);
        }
      }

      navigate('/journeys');
    } catch (err) {
      console.error('Error saving journey:', err);
      setError(err instanceof Error ? err.message : 'Failed to save journey');
    } finally {
      setIsSaving(false);
    }
  }, [user, title, content, startDate, endDate, journeyId, navigate]);

  return {
    title,
    setTitle,
    content,
    setContent,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    waypoints,
    isSaving,
    isLoading,
    error,
    handleSave,
    journey,
  };
}