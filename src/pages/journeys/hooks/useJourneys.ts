import { useState, useEffect } from 'react';
import { getJourneys, deleteJourney as deleteJourneyApi, updateJourneyStatus } from '../../../lib/api/journeys';
import type { JourneyWithAuthor, JourneyStatus } from '../../../lib/types/journey';

export function useJourneys(status?: JourneyStatus) {
  const [journeys, setJourneys] = useState<JourneyWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJourneys();
  }, [status]);

  async function loadJourneys() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getJourneys(status);
      setJourneys(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load journeys');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteJourney(id: string) {
    try {
      await deleteJourneyApi(id);
      setJourneys(current => current.filter(j => j.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete journey');
      throw error;
    }
  }

  async function togglePublish(id: string, currentStatus: JourneyStatus) {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      const updatedJourney = await updateJourneyStatus(id, newStatus);
      
      setJourneys(current =>
        current.map(j => j.id === id ? { ...j, ...updatedJourney } : j)
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update journey status');
      throw error;
    }
  }

  return {
    journeys,
    isLoading,
    error,
    deleteJourney,
    togglePublish,
    refresh: loadJourneys
  };
}