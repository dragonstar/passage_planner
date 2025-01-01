import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, X } from 'lucide-react';
import type { Waypoint } from '../hooks/useWaypoints';
import { calculateDistance } from '../utils/navigation';

type Props = {
  waypoints: Waypoint[];
  onUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onRemove: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
};

export function DailyWaypointList({ waypoints, onUpdate, onRemove, onReorder }: Props) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <div className="bg-white/50 rounded-lg border-2 border-navy/20 overflow-hidden">
      <div className="p-3 border-b-2 border-navy/20 font-serif text-lg text-navy flex justify-between items-center">
        <span>Waypoints</span>
        {waypoints.length > 1 && (
          <span className="text-sm">
            Total: {calculateDistance(waypoints[0].lat, waypoints[0].lng, waypoints[waypoints.length - 1].lat, waypoints[waypoints.length - 1].lng).toFixed(1)} nm
          </span>
        )}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="waypoint-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {waypoints.map((waypoint, index) => (
                <Draggable
                  key={waypoint.id}
                  draggableId={waypoint.id}
                  index={index}
                >
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
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}