import React from 'react';
import { calculateSegmentDistances } from '../../utils/navigation';
import type { Waypoint } from '../../hooks/useWaypoints';

type Props = {
  waypoints: Waypoint[];
};

export function DistanceMetrics({ waypoints }: Props) {
  const segments = React.useMemo(() => 
    calculateSegmentDistances(waypoints), [waypoints]
  );

  if (waypoints.length < 2) return null;

  return (
    <div className="bg-white/50 rounded-lg border-2 border-navy/20 overflow-hidden">
      <div className="p-3 border-b-2 border-navy/20 font-serif text-lg text-navy">
        Distance Metrics
      </div>
      <div className="divide-y divide-navy/10">
        {segments.map((segment, index) => (
          <div key={index} className="p-3 flex justify-between items-center">
            <div>
              <div className="font-medium">
                {segment.from} → {segment.to}
              </div>
              <div className="text-sm text-gray-600">
                Segment {index + 1} of {segments.length}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div>{segment.distance.toFixed(2)} nm</div>
              <div className="text-sm text-gray-600">
                Total: {segment.cumulative.toFixed(2)} nm
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}