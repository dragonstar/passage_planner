import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { WaypointItem } from './WaypointItem';
import type { Waypoint } from '../../hooks/useWaypoints';

type Props = {
  waypoints: Waypoint[];
  onUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onRemove: (id: string) => void;
};

export function DroppableList({ waypoints, onUpdate, onRemove }: Props) {
  return (
    <Droppable droppableId="waypoint-list">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-1"
        >
          {waypoints.map((waypoint, index) => (
            <WaypointItem
              key={waypoint.id}
              waypoint={waypoint}
              index={index}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}