"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";

export default function DoctorLocationMap({
  lng,
  lat,
}: {
  lng: number;
  lat: number;
}) {
  return (
    <div className="h-[320px] overflow-hidden rounded-3xl">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
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
