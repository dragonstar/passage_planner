import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Ship } from 'lucide-react';
import { JourneyHeader } from './JourneyHeader';
import { JourneyDates } from './JourneyDates';
import { DailyEntriesList } from './DailyEntriesList';
import { JourneyOverview } from './visualization/JourneyOverview';
import { useJourneyForm } from '../hooks/useJourneyForm';
import { useDailyEntries } from '../hooks/useDailyEntries';
import { useJourneyWaypoints } from '../hooks/useJourneyWaypoints';
import { useJourneyState } from '../hooks/useJourneyState';

export function BlogPostForm() {
  const { id } = useParams();
  const {
    title,
    setTitle,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    waypoints: initialWaypoints,
    isSaving,
    isLoading,
    error,
    handleSave,
  } = useJourneyForm(id);

  const { entries, updateEntry, removeEntry } = useDailyEntries(startDate, endDate);
  const { allWaypoints, updateWaypoints } = useJourneyState(initialWaypoints);

  const entryDates = useMemo(() => entries.map(e => e.date), [entries]);

  const {
    dailyWaypoints,
    addWaypoint,
    updateWaypoint,
    removeWaypoint,
    reorderWaypoints,
  } = useJourneyWaypoints(entryDates, updateWaypoints, initialWaypoints);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const waypoints = Array.from(dailyWaypoints.values()).flat();
    try {
      await handleSave(waypoints, entries, 'published');
    } catch (err) {
      console.error('Error saving journey:', err);
    }
  }, [handleSave, dailyWaypoints, entries]);

  const handleSaveDraft = useCallback(async () => {
    const waypoints = Array.from(dailyWaypoints.values()).flat();
    try {
      await handleSave(waypoints, entries, 'draft');
    } catch (err) {
      console.error('Error saving draft:', err);
    }
  }, [handleSave, dailyWaypoints, entries]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-navy">Loading journey...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <JourneyHeader title={title} onTitleChange={setTitle} />
      
      <JourneyDates
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <JourneyOverview waypoints={allWaypoints} />

      <div className="space-y-8">
        <h2 className="font-serif text-2xl text-navy border-b-2 border-navy/20 pb-2">
          Daily Itinerary
        </h2>
        <DailyEntriesList
          entries={entries}
          dailyWaypoints={dailyWaypoints}
          onUpdateEntry={updateEntry}
          onRemoveEntry={removeEntry}
          onAddWaypoint={addWaypoint}
          onUpdateWaypoint={updateWaypoint}
          onRemoveWaypoint={removeWaypoint}
          onReorderWaypoints={reorderWaypoints}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={isSaving}
          className="flex items-center px-4 py-2 space-x-2 text-navy hover:bg-navy/5 rounded-md transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>Save Draft</span>
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center px-4 py-2 space-x-2 bg-navy text-parchment rounded-md hover:bg-navy/90 transition-colors disabled:opacity-50"
        >
          <Ship className="h-4 w-4" />
          <span>Publish Journey</span>
        </button>
      </div>
    </form>
  );
}