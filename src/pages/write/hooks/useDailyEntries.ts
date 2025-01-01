import { useState, useEffect, useCallback } from 'react';
import type { DailyEntry } from '../../../lib/types/journey';

const createEmptyEntry = (date: string): DailyEntry => ({
  date,
  description: '',
  estimated_time: 0,
  estimated_distance: 0,
  weather_conditions: '',
  accommodation: '',
  points_of_interest: [],
});

export function useDailyEntries(startDate: string, endDate: string) {
  const [entries, setEntries] = useState<DailyEntry[]>([]);

  // Memoize the date range calculation
  const getDatesInRange = useCallback(() => {
    if (!startDate || !endDate) return [];
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  }, [startDate, endDate]);

  // Update entries when date range changes
  useEffect(() => {
    if (!startDate || !endDate) return;

    const dates = getDatesInRange();
    setEntries(current => {
      // Create a map of existing entries for quick lookup
      const existingEntries = new Map(
        current.map(entry => [entry.date, entry])
      );

      // Create or reuse entries for each date
      return dates.map(date => 
        existingEntries.get(date) || createEmptyEntry(date)
      );
    });
  }, [startDate, endDate, getDatesInRange]);

  const updateEntry = useCallback((index: number, entry: DailyEntry) => {
    setEntries(current => {
      const updated = [...current];
      updated[index] = entry;
      return updated;
    });
  }, []);

  const removeEntry = useCallback((index: number) => {
    setEntries(current => current.filter((_, i) => i !== index));
  }, []);

  return {
    entries,
    updateEntry,
    removeEntry,
  };
}