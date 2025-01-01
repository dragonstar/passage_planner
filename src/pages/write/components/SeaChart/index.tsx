import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Polyline } from 'react-leaflet';
import { WaypointMarker } from './WaypointMarker';
import type { Waypoint } from '../../hooks/useWaypoints';
import 'leaflet/dist/leaflet.css';

type Props = {
  waypoints: Waypoint[];
  onWaypointAdd: (waypoint: Omit<Waypoint, 'id'>, position?: number) => void;
  onWaypointUpdate: (id: string, updates: Partial<Waypoint>) => void;
};

const DEFAULT_CENTER = [20, 0]; // Default center (near equator)
const DEFAULT_ZOOM = 2; // Default zoom level for empty map

export function SeaChart({ waypoints, onWaypointAdd, onWaypointUpdate }: Props) {
  const mapConfig = React.useMemo(() => {
    if (waypoints.length === 0) {
      return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
    }

    const lats = waypoints.map(w => w.lat);
    const lngs = waypoints.map(w => w.lng);
    const bounds = [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)]
    ] as [[number, number], [number, number]];

    return { bounds };
  }, [waypoints]);

  const handleAddBetween = (index: number) => {
    if (index >= waypoints.length - 1) return;
    
    const curr = waypoints[index];
    const next = waypoints[index + 1];
    
    onWaypointAdd({
      name: `Waypoint ${waypoints.length + 1}`,
      lat: (curr.lat + next.lat) / 2,
      lng: (curr.lng + next.lng) / 2,
    }, index + 1);
  };

  return (
    <div className="h-[400px] border-2 border-navy/20 rounded-lg overflow-hidden">
      <MapContainer
        {...mapConfig}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapClickHandler onWaypointAdd={onWaypointAdd} />
        
        {waypoints.map((waypoint, index) => (
          <WaypointMarker
            key={waypoint.id}
            waypoint={waypoint}
            index={index}
            onUpdate={(updates) => onWaypointUpdate(waypoint.id, updates)}
            onAddBetween={handleAddBetween}
          />
        ))}

        {waypoints.length > 1 && (
          <Polyline
            positions={waypoints.map(wp => [wp.lat, wp.lng])}
            color="#003366"
            weight={2}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}

function MapClickHandler({ onWaypointAdd }: { onWaypointAdd: Props['onWaypointAdd'] }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onWaypointAdd({
        name: `Waypoint ${Date.now()}`,
        lat,
        lng,
      });
    },
  });
  return null;
}