"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, UserRound, Stethoscope } from "lucide-react";
import { doctorService } from "@/src/services/doctorService";
import { appointmentService } from "@/src/services/appointmentService";
import { Doctor } from "@/src/types/doctor";
import { Appointment } from "@/src/types/appointment";
import StatCard from "@/src/components/ui/StatCard";
import EmptyState from "@/src/components/ui/EmptyState";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import AppointmentCard from "@/src/components/appointments/AppointmentCard";
import Button from "@/src/components/ui/Button";
import Link from "next/link";

export default function DoctorDashboardPage() {
  const [profile, setProfile] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [profileRes, appointmentsRes] = await Promise.allSettled([
        doctorService.getMyProfile(),
        appointmentService.getMy(),
      ]);

      if (profileRes.status === "fulfilled") {
        setProfile(profileRes.value.data.data);
      }

      if (appointmentsRes.status === "fulfilled") {
        setAppointments(appointmentsRes.value.data.data || []);
      }
    } catch (error) {
      console.error("Doctor dashboard error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-950">
              Doctor Dashboard
            </h1>
            <p className="mt-2 text-slate-500">
              Manage profile, availability, and appointments.
            </p>
          </div>

          <Link href="/doctor-dashboard/profile">
            <Button>Update Profile</Button>
          </Link>
        </div>

        {!profile ? (
          <div className="mt-10">
            <EmptyState
              title="Doctor profile not created"
              text="Create your doctor profile and wait for admin verification."
            />
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              <StatCard
                title="Verification"
                value={profile.isVerified ? "Verified" : "Pending"}
                icon={<Stethoscope />}
              />
              <StatCard
                title="Appointments"
                value={appointments.length}
                icon={<CalendarDays />}
              />
              <StatCard
                title="Today"
                value={
                  appointments.filter(
                    (a) => a.date === new Date().toISOString().slice(0, 10),
                  ).length
                }
                icon={<Clock />}
              />
              <StatCard
                title="Patients"
                value={appointments.length}
                icon={<UserRound />}
              />
            </div>

            <section className="mt-10">
              <h2 className="mb-5 text-2xl font-black text-slate-950">
                Appointments
              </h2>

              {appointments.length === 0 ? (
                <EmptyState title="No appointments yet" />
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {appointments.map((item) => (
                    <AppointmentCard
                      key={item._id}
                      appointment={item}
                      role="doctor"
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
