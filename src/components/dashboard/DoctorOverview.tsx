"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Search,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import AppointmentCard from "@/src/components/appointments/AppointmentCard";
import Button from "@/src/components/ui/Button";
import EmptyState from "@/src/components/ui/EmptyState";
import Input from "@/src/components/ui/Input";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import StatCard from "@/src/components/ui/StatCard";
import Tabs from "@/src/components/ui/Tabs";
import { appointmentService } from "@/src/services/appointmentService";
import { doctorService } from "@/src/services/doctorService";
import { Appointment } from "@/src/types/appointment";
import { Doctor } from "@/src/types/doctor";

export default function DoctorOverview() {
  const [profile, setProfile] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

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
    } catch {
      toast.error("Failed to load doctor dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const statusMatch = active === "all" || item.status === active;

      const patientName = item.patient?.name?.toLowerCase() || "";
      const patientPhone = item.patient?.phone || "";

      const searchMatch =
        !search ||
        patientName.includes(search.toLowerCase()) ||
        patientPhone.includes(search);

      return statusMatch && searchMatch;
    });
  }, [appointments, active, search]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await appointmentService.updateStatus(id, status);
      toast.success(`Appointment ${status}`);
      await loadDashboard();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Action failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-950">
            Doctor Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Manage profile, availability, and patient appointments.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/doctor-dashboard/profile">
            <Button>Profile</Button>
          </Link>
          <Link href="/doctor-dashboard/availability">
            <Button variant="dark">Availability</Button>
          </Link>
        </div>
      </div>

      {!profile ? (
        <div className="mt-8">
          <EmptyState
            title="Doctor profile not created"
            text="Create your doctor profile first and wait for admin verification."
          />
        </div>
      ) : (
        <>
          {!profile.isVerified && (
            <div className="mt-8 rounded-3xl bg-amber-50 p-5 text-amber-800 ring-1 ring-amber-100">
              <p className="font-black">Verification pending</p>
              <p className="mt-1 text-sm">
                Your profile is waiting for admin approval. Patients will see
                your profile after verification.
              </p>
            </div>
          )}

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
              value={appointments.filter((a) => a.date === today).length}
              icon={<Clock />}
            />
            <StatCard
              title="Patients"
              value={new Set(appointments.map((a) => a.patient?._id)).size}
              icon={<UserRound />}
            />
          </div>

          <section className="mt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Patient Appointments
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Confirm, complete, cancel, and search patient bookings.
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
                  placeholder="Search patient name or phone"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <EmptyState
                title="No appointments found"
                text="Try another status filter or search term."
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredAppointments.map((item) => (
                  <AppointmentCard
                    key={item._id}
                    appointment={item}
                    role="doctor"
                    onStatusChange={updateStatus}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </section>
  );
}
