import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMapEvents } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Plus } from 'lucide-react';
import type { Waypoint } from '../hooks/useWaypoints';
import { calculateDistance } from '../utils/navigation';

type Props = {
  date: string;
  waypoints: Waypoint[];
  onWaypointAdd: (waypoint: Omit<Waypoint, 'id'>) => void;
  onWaypointUpdate: (id: string, updates: Partial<Waypoint>) => void;
};

export function DailyRouteMap({ date, waypoints, onWaypointAdd, onWaypointUpdate }: Props) {
  const mapConfig = React.useMemo(() => {
    if (waypoints.length === 0) {
      return { center: [20, 0] as [number, number], zoom: 2 };
    }

    const lats = waypoints.map(w => w.lat);
    const lngs = waypoints.map(w => w.lng);
    const center: [number, number] = [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2
    ];

    // Calculate bounds with padding
    const latPadding = (Math.max(...lats) - Math.min(...lats)) * 0.1;
    const lngPadding = (Math.max(...lngs) - Math.min(...lngs)) * 0.1;
    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lats) - latPadding, Math.min(...lngs) - lngPadding],
      [Math.max(...lats) + latPadding, Math.max(...lngs) + lngPadding]
    ];

    return {
      center,
      zoom: waypoints.length === 1 ? 8 : undefined,
      bounds: waypoints.length > 1 ? bounds : undefined
    };
  }, [waypoints]);

  // Calculate total distance
  const totalDistance = React.useMemo(() => {
    if (waypoints.length < 2) return 0;
    return waypoints.reduce((total, wp, i) => {
      if (i === 0) return 0;
      const prev = waypoints[i - 1];
      return total + calculateDistance(prev.lat, prev.lng, wp.lat, wp.lng);
    }, 0);
  }, [waypoints]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-lg text-navy">Route Planning</h3>
        {totalDistance > 0 && (
          <span className="text-sm text-navy">
            Total: {totalDistance.toFixed(2)} nm
          </span>
        )}
      </div>
      <div className="h-[300px] border border-navy/20 rounded-lg overflow-hidden">
        <MapContainer
          {...mapConfig}
          className="h-full w-full"
          minZoom={2}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            noWrap={false}
            bounds={[[-90, -180], [90, 180]]}
          />
          
          <MapClickHandler onWaypointAdd={onWaypointAdd} />

          {waypoints.map((waypoint, index) => (
            <Marker
              key={waypoint.id}
              position={[waypoint.lat, waypoint.lng]}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  onWaypointUpdate(waypoint.id, {
                    lat: position.lat,
                    lng: position.lng,
                  });
                },
              }}
              icon={divIcon({
                className: 'bg-transparent',
                html: `<div class="flex items-center justify-center w-6 h-6 bg-navy text-parchment rounded-full">${index + 1}</div>`,
              })}
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
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const map = document.querySelector('.leaflet-container');
            if (map) map.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-sm text-navy hover:text-navy/70 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Click map to add waypoint
        </button>
      </div>
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