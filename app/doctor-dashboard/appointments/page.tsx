"use client";

import RoleGuard from "@/src/components/auth/RoleGuard";
import AppointmentCard from "@/src/components/appointments/AppointmentCard";
import EmptyState from "@/src/components/ui/EmptyState";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useAppointments } from "@/src/hooks/useAppointments";

export default function DoctorAppointmentsPage() {
  const { appointments, loading } = useAppointments();

  return (
    <RoleGuard allowedRoles={["doctor"]}>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black text-slate-950">
            Doctor Appointments
          </h1>

          <div className="mt-8">
            {loading ? (
              <LoadingSpinner />
            ) : appointments.length === 0 ? (
              <EmptyState title="No appointments found" />
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
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
