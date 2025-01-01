import React from 'react';
import { SeaChart } from './SeaChart';
import { WaypointList } from './WaypointList';
import { JourneyOverview } from './visualization/JourneyOverview';
import { DistanceMetrics } from './visualization/DistanceMetrics';
import type { Waypoint } from '../hooks/useWaypoints';

type Props = {
  waypoints: Waypoint[];
  onWaypointAdd: (waypoint: Omit<Waypoint, 'id'>, position?: number) => void;
  onWaypointUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onWaypointRemove: (id: string) => void;
  onWaypointReorder: (startIndex: number, endIndex: number) => void;
};

export function RouteMap({
  waypoints,
  onWaypointAdd,
  onWaypointUpdate,
  onWaypointRemove,
  onWaypointReorder,
}: Props) {
  return (
    <div className="space-y-6">
      <JourneyOverview waypoints={waypoints} />
      
      <div className="space-y-4">
        <h2 className="font-serif text-xl text-navy">Route Planning</h2>
        <SeaChart
          waypoints={waypoints}
          onWaypointAdd={onWaypointAdd}
          onWaypointUpdate={onWaypointUpdate}
        />
        <WaypointList
          waypoints={waypoints}
          onUpdate={onWaypointUpdate}
          onRemove={onWaypointRemove}
          onReorder={onWaypointReorder}
        />
        <DistanceMetrics waypoints={waypoints} />
      </div>
    </div>
  );
}