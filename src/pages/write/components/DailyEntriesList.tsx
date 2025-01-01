import React from 'react';
import { DailyEntryForm } from './DailyEntryForm';
import { DailyRouteMap } from './DailyRouteMap';
import { DailyWaypointList } from './DailyWaypointList';
import type { DailyEntry } from '../../../lib/types/journey';
import type { Waypoint } from '../hooks/useWaypoints';

type Props = {
  entries: DailyEntry[];
  dailyWaypoints: Map<string, Waypoint[]>;
  onUpdateEntry: (index: number, entry: DailyEntry) => void;
  onRemoveEntry: (index: number) => void;
  onAddWaypoint: (date: string, waypoint: Omit<Waypoint, 'id'>) => void;
  onUpdateWaypoint: (date: string, id: string, updates: Partial<Waypoint>) => void;
  onRemoveWaypoint: (date: string, id: string) => void;
  onReorderWaypoints: (date: string, startIndex: number, endIndex: number) => void;
};

export function DailyEntriesList({
  entries,
  dailyWaypoints,
  onUpdateEntry,
  onRemoveEntry,
  onAddWaypoint,
  onUpdateWaypoint,
  onRemoveWaypoint,
  onReorderWaypoints,
}: Props) {
  return (
    <div className="space-y-8">
      {entries.map((entry, index) => (
        <DailyEntrySection
          key={entry.date}
          entry={entry}
          waypoints={dailyWaypoints.get(entry.date) || []}
          index={index}
          onUpdate={onUpdateEntry}
          onRemove={onRemoveEntry}
          onAddWaypoint={(wp) => onAddWaypoint(entry.date, wp)}
          onUpdateWaypoint={(id, updates) => onUpdateWaypoint(entry.date, id, updates)}
          onRemoveWaypoint={(id) => onRemoveWaypoint(entry.date, id)}
          onReorderWaypoints={(start, end) => onReorderWaypoints(entry.date, start, end)}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
}

function DailyEntrySection({
  entry,
  waypoints,
  index,
  onUpdate,
  onRemove,
  onAddWaypoint,
  onUpdateWaypoint,
  onRemoveWaypoint,
  onReorderWaypoints,
  isLast,
}: {
  entry: DailyEntry;
  waypoints: Waypoint[];
  index: number;
  onUpdate: (index: number, entry: DailyEntry) => void;
  onRemove: (index: number) => void;
  onAddWaypoint: (waypoint: Omit<Waypoint, 'id'>) => void;
  onUpdateWaypoint: (id: string, updates: Partial<Waypoint>) => void;
  onRemoveWaypoint: (id: string) => void;
  onReorderWaypoints: (startIndex: number, endIndex: number) => void;
  isLast: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DailyEntryForm
            entry={entry}
            onChange={(updated) => onUpdate(index, updated)}
            onRemove={() => onRemove(index)}
          />
          <DailyWaypointList
            waypoints={waypoints}
            onUpdate={onUpdateWaypoint}
            onRemove={onRemoveWaypoint}
            onReorder={onReorderWaypoints}
          />
        </div>
        <DailyRouteMap
          date={entry.date}
          waypoints={waypoints}
          onWaypointAdd={onAddWaypoint}
          onWaypointUpdate={onUpdateWaypoint}
        />
      </div>
      {!isLast && <hr className="border-t-2 border-navy/10" />}
    </div>
  );
}