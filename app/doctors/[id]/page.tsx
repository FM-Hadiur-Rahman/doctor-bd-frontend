"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, ShieldCheck, Star, Stethoscope } from "lucide-react";
import { doctorService } from "@/src/services/doctorService";
import { Doctor } from "@/src/types/doctor";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import Badge from "@/src/components/ui/Badge";
import BookingForm from "@/src/components/appointments/BookingForm";
import DoctorLocationMap from "@/src/components/maps/DoctorLocationMap";
import { formatCurrency } from "@/src/lib/utils";

export default function DoctorDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorService
      .getDoctorById(id)
      .then((res) => setDoctor(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!doctor) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center">
          <h1 className="text-3xl font-black">Doctor not found</h1>
        </div>
      </main>
    );
  }

  const coordinates = doctor.location?.coordinates;
  const hasMap = coordinates && coordinates[0] !== 0 && coordinates[1] !== 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#087CC8] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/15">
              <Stethoscope className="h-12 w-12" />
            </div>

            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {doctor.isVerified && (
                  <Badge className="bg-white/15 text-white">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    BMDC Verified
                  </Badge>
                )}
                <Badge className="bg-white/15 text-white">
                  <Star className="mr-1 h-3 w-3" />
                  4.8 Rating
                </Badge>
              </div>

              <h1 className="text-4xl font-black md:text-6xl">
                {doctor.user?.name}
              </h1>

              <p className="mt-3 text-xl font-semibold text-blue-50">
                {doctor.specialization}
              </p>

              <p className="mt-3 flex items-center gap-2 text-blue-50">
                <MapPin className="h-5 w-5" />
                {doctor.chamberName}, {doctor.district}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-slate-950">
              Chamber Information
            </h2>

            <div className="mt-6 grid gap-4 text-slate-600">
              <p>
                <strong className="text-slate-950">Chamber:</strong>{" "}
                {doctor.chamberName}
              </p>
              <p>
                <strong className="text-slate-950">Address:</strong>{" "}
                {doctor.address}
              </p>
              <p>
                <strong className="text-slate-950">Consultation Fee:</strong>{" "}
                {formatCurrency(doctor.consultationFee)}
              </p>
              <p>
                <strong className="text-slate-950">BMDC:</strong>{" "}
                {doctor.bmdcNumber}
              </p>
            </div>
          </div>

          {hasMap && (
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="mb-5 text-2xl font-black text-slate-950">
                Chamber Location
              </h2>
              <DoctorLocationMap lng={coordinates[0]} lat={coordinates[1]} />
            </div>
          )}
        </div>

        <BookingForm doctorId={doctor._id} />
      </section>
    </main>
  );
}
