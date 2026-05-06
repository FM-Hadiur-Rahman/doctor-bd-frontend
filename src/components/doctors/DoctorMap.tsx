"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { useMemo, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { MapPin, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Doctor } from "@/src/types/doctor";
import { formatCurrency } from "@/src/lib/utils";

export default function DoctorMap({ doctors }: { doctors: Doctor[] }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const doctorsWithLocation = useMemo(() => {
    return doctors.filter((doctor) => {
      const coords = doctor.location?.coordinates;
      return coords && coords[0] !== 0 && coords[1] !== 0;
    });
  }, [doctors]);

  const firstDoctor = doctorsWithLocation[0];

  const initialLng = firstDoctor?.location?.coordinates?.[0] || 90.4125;
  const initialLat = firstDoctor?.location?.coordinates?.[1] || 23.8103;

  return (
    <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden rounded-[2rem] bg-slate-200 shadow-sm ring-1 ring-slate-100">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: initialLng,
          latitude: initialLat,
          zoom: 11,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {doctorsWithLocation.map((doctor) => {
          const [lng, lat] = doctor.location!.coordinates;

          return (
            <Marker key={doctor._id} longitude={lng} latitude={lat}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedDoctor(doctor);
                }}
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-[#087CC8] text-white shadow-xl ring-4 ring-white transition hover:scale-110"
              >
                <Stethoscope className="h-5 w-5" />
              </button>
            </Marker>
          );
        })}

        {selectedDoctor && selectedDoctor.location?.coordinates && (
          <Popup
            longitude={selectedDoctor.location.coordinates[0]}
            latitude={selectedDoctor.location.coordinates[1]}
            onClose={() => setSelectedDoctor(null)}
            closeButton
            closeOnClick={false}
            offset={18}
          >
            <div className="w-64 p-2">
              <p className="text-base font-black text-slate-950">
                {selectedDoctor.user?.name}
              </p>
              <p className="mt-1 font-bold text-[#087CC8]">
                {selectedDoctor.specialization}
              </p>

              <p className="mt-3 flex gap-2 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {selectedDoctor.chamberName}, {selectedDoctor.district}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="font-black text-slate-950">
                  {formatCurrency(selectedDoctor.consultationFee)}
                </p>

                <Link
                  href={`/doctors/${selectedDoctor._id}`}
                  className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white"
                >
                  View
                </Link>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {doctorsWithLocation.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 p-6 text-center">
          <div>
            <MapPin className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-3 font-bold text-slate-700">
              No map locations found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add coordinates to doctor profiles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
