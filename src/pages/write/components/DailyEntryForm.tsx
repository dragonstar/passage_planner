import React from 'react';
import { Calendar, Clock, Compass, Anchor, Sun, Home } from 'lucide-react';
import type { DailyEntry } from '../../../lib/types/journey';

type Props = {
  entry: DailyEntry;
  onChange: (entry: DailyEntry) => void;
  onRemove: () => void;
};

export function DailyEntryForm({ entry, onChange, onRemove }: Props) {
  return (
    <div className="border border-navy/20 rounded-lg p-4 space-y-4 bg-white/50">
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-lg text-navy">Daily Entry</h3>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Remove Day
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4" />
            Date
          </label>
          <input
            type="date"
            value={entry.date}
            onChange={(e) => onChange({ ...entry, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock className="h-4 w-4" />
            Estimated Time (hours)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={entry.estimated_time}
            onChange={(e) => onChange({ ...entry, estimated_time: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Compass className="h-4 w-4" />
            Distance (nautical miles)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={entry.estimated_distance}
            onChange={(e) => onChange({ ...entry, estimated_distance: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Sun className="h-4 w-4" />
            Weather Conditions
          </label>
          <input
            type="text"
            value={entry.weather_conditions || ''}
            onChange={(e) => onChange({ ...entry, weather_conditions: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
            placeholder="e.g., Calm seas, light winds"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Home className="h-4 w-4" />
            Accommodation
          </label>
          <input
            type="text"
            value={entry.accommodation || ''}
            onChange={(e) => onChange({ ...entry, accommodation: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
            placeholder="e.g., Marina, Anchorage"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Anchor className="h-4 w-4" />
            Points of Interest
          </label>
          <input
            type="text"
            value={entry.points_of_interest?.join(', ') || ''}
            onChange={(e) => onChange({ 
              ...entry, 
              points_of_interest: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
            placeholder="Enter points of interest, separated by commas"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={entry.description}
            onChange={(e) => onChange({ ...entry, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
            placeholder="Describe the day's activities and route..."
          />
        </div>
      </div>
    </div>
  );
}