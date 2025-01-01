import React from 'react';
import { Compass } from 'lucide-react';

export function CompassRose() {
  return (
    <div className="leaflet-control leaflet-bar absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-md">
      <Compass className="h-6 w-6 text-navy" />
    </div>
  );
}