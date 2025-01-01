import React from 'react';
import { Calendar } from 'lucide-react';

type Props = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
};

export function JourneyDates({ startDate, endDate, onStartDateChange, onEndDateChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4" />
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4" />
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
        />
      </div>
    </div>
  );
}