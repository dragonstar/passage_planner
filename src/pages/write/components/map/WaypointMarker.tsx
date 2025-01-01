import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import type { Waypoint } from '../../hooks/useWaypoints';

type Props = {
  waypoint: Waypoint;
  index: number;
  draggable?: boolean;
  onDragEnd?: (lat: number, lng: number) => void;
};

export function WaypointMarker({ waypoint, index, draggable, onDragEnd }: Props) {
  const icon = divIcon({
    className: 'bg-transparent',
    html: `<div class="flex items-center justify-center w-6 h-6 bg-navy text-parchment rounded-full shadow-md">${index + 1}</div>`,
  });

  return (
    <Marker
      position={[waypoint.lat, waypoint.lng]}
      icon={icon}
      draggable={draggable}
      eventHandlers={onDragEnd ? {
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onDragEnd(position.lat, position.lng);
        },
      } : undefined}
    >
      {draggable && (
        <Popup>
          <div className="text-sm">
            <strong>{waypoint.name}</strong>
            <div className="text-gray-600">
              {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  );
}