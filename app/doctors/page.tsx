"use client";

import { useEffect, useState } from "react";
import api from "@/src/services/api";
import DoctorCard from "@/src/components/doctors/DoctorCard";
import DoctorSearchBar from "@/src/components/doctors/DoctorSearchBar";
import DoctorMap from "@/src/components/doctors/DoctorMap";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import EmptyState from "@/src/components/ui/EmptyState";
import { Doctor } from "@/src/types/doctor";
import { MapPin, ShieldCheck } from "lucide-react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMapMobile, setShowMapMobile] = useState(false);

  const loadDoctors = async (filters?: {
    search?: string;
    district?: string;
  }) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (filters?.search) params.set("search", filters.search);
      if (filters?.district) params.set("district", filters.district);

      const res = await api.get(`/doctors?${params.toString()}`);
      setDoctors(res.data.data || []);
    } catch (error) {
      console.error("Failed to load doctors", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#087CC8]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">
              Find verified doctors across Bangladesh
            </p>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Search doctors by specialty, district, or chamber.
            </h1>

            <p className="mt-5 text-lg leading-8 text-blue-50">
              Real availability, verified profiles, chamber map, and simple
              appointment booking.
            </p>
          </div>

          <div className="mt-10">
            <DoctorSearchBar onSearch={loadDoctors} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Available Doctors
            </h2>
            <p className="mt-1 text-slate-500">
              {loading
                ? "Loading doctors..."
                : `${doctors.length} doctors found`}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-100">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              BMDC Verified
            </div>

            <button
              onClick={() => setShowMapMobile((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-100 lg:hidden"
            >
              <MapPin className="h-4 w-4 text-[#087CC8]" />
              {showMapMobile ? "Hide Map" : "Show Map"}
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-100 lg:inline-flex">
              <MapPin className="h-4 w-4 text-[#087CC8]" />
              Map Enabled
            </div>
          </div>
        </div>

        {showMapMobile && (
          <div className="mb-8 lg:hidden">
            <div className="h-[420px]">
              <DoctorMap doctors={doctors} />
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : doctors.length === 0 ? (
          <EmptyState
            title="No doctors found"
            text="Try another specialty or district."
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_480px]">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>

            <div className="hidden lg:block">
              <DoctorMap doctors={doctors} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
