import React from 'react';
import type { Waypoint } from '../../hooks/useWaypoints';
import { Plus } from 'lucide-react';

type Props = {
  waypoint: Waypoint;
  index: number;
  onUpdate: (updates: Partial<Waypoint>) => void;
  onAddBetween: (index: number) => void;
};

export function WaypointPopup({ waypoint, index, onUpdate, onAddBetween }: Props) {
  return (
    <div className="p-2 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={waypoint.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="flex-1 px-2 py-1 border border-navy/20 rounded"
          placeholder="Waypoint name"
        />
        <button
          onClick={() => onAddBetween(index)}
          className="p-1 text-navy hover:bg-navy/10 rounded-full transition-colors"
          title="Add waypoint after this one"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="text-sm text-gray-600">
        {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
      </div>
    </div>
  );
}