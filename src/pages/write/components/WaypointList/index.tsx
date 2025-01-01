import React from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { DroppableList } from './DroppableList';
import type { Waypoint } from '../../hooks/useWaypoints';

type Props = {
  waypoints: Waypoint[];
  onUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onRemove: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
};

export function WaypointList({ waypoints, onUpdate, onRemove, onReorder }: Props) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <div className="bg-white/50 rounded-lg border-2 border-navy/20 overflow-hidden">
      <div className="p-3 border-b-2 border-navy/20 font-serif text-lg text-navy">
        Waypoints
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <DroppableList
          waypoints={waypoints}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      </DragDropContext>
    </div>
  );
}