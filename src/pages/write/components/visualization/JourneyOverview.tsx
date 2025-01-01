import React from 'react';
import { Polyline } from 'react-leaflet';
import { MapContainer } from '../map/MapContainer';
import { WaypointMarker } from '../map/WaypointMarker';
import { CompassRose } from './CompassRose';
import { calculateTotalDistance } from '../../utils/navigation';
import { calculateMapBounds, DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../../lib/utils/mapConfig';
import type { Waypoint } from '../../hooks/useWaypoints';

type Props = {
  waypoints: Waypoint[];
};

export function JourneyOverview({ waypoints }: Props) {
  const mapConfig = React.useMemo(() => {
    const bounds = calculateMapBounds(waypoints);
    return bounds ? { bounds } : { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
  }, [waypoints]);

  const totalDistance = React.useMemo(() => 
    calculateTotalDistance(waypoints), [waypoints]
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl text-navy">Journey Overview</h2>
        <div className="text-navy">
          Total Distance: {totalDistance.toFixed(2)} nm
        </div>
      </div>

      <div className="h-[400px] border-2 border-navy/20 rounded-lg overflow-hidden">
        <MapContainer
          {...mapConfig}
          className="h-full w-full"
        >
          <CompassRose />
          
          {waypoints.map((waypoint, index) => (
            <WaypointMarker
              key={waypoint.id}
              waypoint={waypoint}
              index={index}
            />
          ))}

          <Polyline
            positions={waypoints.map(wp => [wp.lat, wp.lng])}
            color="#003366"
            weight={3}
            opacity={0.8}
            smoothFactor={1}
          />
        </MapContainer>
      </div>
    </div>
  );
}