import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import type { Waypoint } from '../../hooks/useWaypoints';
import { WaypointPopup } from './WaypointPopup';

type Props = {
  waypoint: Waypoint;
  index: number;
  onUpdate: (updates: Partial<Waypoint>) => void;
  onAddBetween: (index: number) => void;
};

export function WaypointMarker({ waypoint, index, onUpdate, onAddBetween }: Props) {
  const icon = divIcon({
    className: 'bg-transparent',
    html: `<div class="flex items-center justify-center w-6 h-6 bg-navy text-parchment rounded-full">${index + 1}</div>`,
  });

  return (
    <Marker
      position={[waypoint.lat, waypoint.lng]}
      icon={icon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onUpdate({ lat: position.lat, lng: position.lng });
        },
      }}
    >
      <Popup>
        <WaypointPopup
          waypoint={waypoint}
          index={index}
          onUpdate={onUpdate}
          onAddBetween={onAddBetween}
        />
      </Popup>
    </Marker>
  );
}