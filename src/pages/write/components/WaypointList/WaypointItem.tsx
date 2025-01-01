import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical, X } from 'lucide-react';
import type { Waypoint } from '../../hooks/useWaypoints';

type Props = {
  waypoint: Waypoint;
  index: number;
  onUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onRemove: (id: string) => void;
};

export function WaypointItem({ waypoint, index, onUpdate, onRemove }: Props) {
  return (
    <Draggable draggableId={waypoint.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="border-b border-navy/10 last:border-b-0"
        >
          <div className="flex items-center p-3 group hover:bg-navy/5">
            <div
              {...provided.dragHandleProps}
              className="mr-3 text-navy/50 group-hover:text-navy"
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={waypoint.name}
                onChange={(e) => onUpdate(waypoint.id, { name: e.target.value })}
                className="w-full bg-transparent px-2 py-1 focus:outline-none focus:bg-white/50 rounded"
              />
              <div className="text-sm text-gray-600 px-2">
                {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
              </div>
            </div>
            <button
              onClick={() => onRemove(waypoint.id)}
              className="p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}