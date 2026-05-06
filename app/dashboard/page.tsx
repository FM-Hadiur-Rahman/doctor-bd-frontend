"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, FileText, Bell, Search } from "lucide-react";
import toast from "react-hot-toast";
import { appointmentService } from "@/src/services/appointmentService";
import { Appointment } from "@/src/types/appointment";
import AppointmentCard from "@/src/components/appointments/AppointmentCard";
import StatCard from "@/src/components/ui/StatCard";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import EmptyState from "@/src/components/ui/EmptyState";
import Tabs from "@/src/components/ui/Tabs";
import Input from "@/src/components/ui/Input";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await appointmentService.getMy();
      setAppointments(res.data.data || []);
    } catch {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const statusMatch = active === "all" || item.status === active;
      const searchMatch =
        !search ||
        item.doctor?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.doctor?.specialization
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });
  }, [appointments, active, search]);

  const cancelAppointment = async (id: string) => {
    const ok = confirm("Are you sure you want to cancel this appointment?");
    if (!ok) return;

    try {
      await appointmentService.cancel(id);
      toast.success("Appointment cancelled");
      loadAppointments();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black text-slate-950">My Dashboard</h1>
          <p className="mt-2 text-slate-500">
            Manage appointments, prescriptions, and notifications.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <StatCard
              title="Appointments"
              value={appointments.length}
              icon={<CalendarDays />}
            />
            <StatCard title="Prescriptions" value="1" icon={<FileText />} />
            <StatCard title="Notifications" value="2" icon={<Bell />} />
          </div>

          <section className="mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  My Appointments
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Filter, search, and manage your bookings.
                </p>
              </div>

              <Tabs
                tabs={["all", "pending", "confirmed", "completed", "cancelled"]}
                active={active}
                onChange={setActive}
              />
            </div>

            <div className="mb-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search doctor or specialty"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <EmptyState title="No appointments found" />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredAppointments.map((item) => (
                  <AppointmentCard
                    key={item._id}
                    appointment={item}
                    role="patient"
                    onCancel={cancelAppointment}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
