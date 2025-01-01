import React from 'react';
import { WaypointList } from './WaypointList';
import { calculateTotalDistance } from '../utils/navigation';
import type { Waypoint } from '../hooks/useWaypoints';

type Props = {
  date: string;
  waypoints: Waypoint[];
  onAdd: (waypoint: Omit<Waypoint, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onRemove: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
};

export function DailyWaypointManager({
  date,
  waypoints,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: Props) {
  const totalDistance = React.useMemo(() => 
    calculateTotalDistance(waypoints), [waypoints]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-lg text-navy">Waypoints</h3>
        {totalDistance > 0 && (
          <span className="text-sm text-navy">
            Distance: {totalDistance.toFixed(2)} nm
          </span>
        )}
      </div>

      <WaypointList
        waypoints={waypoints}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onReorder={onReorder}
      />
    </div>
  );
}