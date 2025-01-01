import React from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import { BASE_MAP_CONFIG, TILE_LAYER_CONFIG, DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../../lib/utils/mapConfig';

function MapUpdater({ bounds, center, zoom }: { 
  bounds?: [[number, number], [number, number]];
  center?: [number, number];
  zoom?: number;
}) {
  const map = useMap();

  React.useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [map, bounds, center, zoom]);

  return null;
}

type Props = Omit<MapContainerProps, 'center' | 'zoom'> & {
  bounds?: [[number, number], [number, number]];
  center?: [number, number];
  zoom?: number;
};

export function MapContainer({ children, bounds, center, zoom, ...props }: Props) {
  return (
    <LeafletMapContainer
      center={center || DEFAULT_CENTER}
      zoom={zoom || DEFAULT_ZOOM}
      {...BASE_MAP_CONFIG}
      {...props}
    >
      <TileLayer
        {...TILE_LAYER_CONFIG}
      />
      <MapUpdater bounds={bounds} center={center} zoom={zoom} />
      {children}
    </LeafletMapContainer>
  );
}