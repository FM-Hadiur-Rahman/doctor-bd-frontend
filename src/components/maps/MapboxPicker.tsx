"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, MapLayerMouseEvent } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";

type Props = {
  lng: number;
  lat: number;
  onChange: (coords: { lng: number; lat: number }) => void;
};

export default function MapboxPicker({ lng, lat, onChange }: Props) {
  const handleClick = (event: MapLayerMouseEvent) => {
    onChange({
      lng: event.lngLat.lng,
      lat: event.lngLat.lat,
    });
  };

  return (
    <div className="h-[320px] overflow-hidden rounded-3xl">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleClick}
      >
        <Marker longitude={lng} latitude={lat}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#087CC8] text-white shadow-lg">
            <MapPin className="h-5 w-5" />
          </div>
        </Marker>
      </Map>
    </div>
  );
}
