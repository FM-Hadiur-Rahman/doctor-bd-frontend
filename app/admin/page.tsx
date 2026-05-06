"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { adminService } from "@/src/services/adminService";
import StatCard from "@/src/components/ui/StatCard";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import Button from "@/src/components/ui/Button";

type Stats = {
  totalPatients: number;
  totalDoctors: number;
  verifiedDoctors: number;
  pendingDoctors: number;
  totalAppointments: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingDoctors, setPendingDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdmin = async () => {
    try {
      const [statsRes, pendingRes] = await Promise.all([
        adminService.getStats(),
        adminService.getPendingDoctors(),
      ]);

      setStats(statsRes.data.data);
      setPendingDoctors(pendingRes.data.data || []);
    } catch (error) {
      console.error("Admin load failed", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyDoctor = async (id: string) => {
    await adminService.verifyDoctor(id);
    loadAdmin();
  };

  const rejectDoctor = async (id: string) => {
    await adminService.rejectDoctor(id);
    loadAdmin();
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black text-slate-950">Admin Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Manage doctors, appointments, users, and reviews.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard
            title="Patients"
            value={stats?.totalPatients || 0}
            icon={<Users />}
          />
          <StatCard
            title="Doctors"
            value={stats?.totalDoctors || 0}
            icon={<Stethoscope />}
          />
          <StatCard
            title="Verified"
            value={stats?.verifiedDoctors || 0}
            icon={<ShieldCheck />}
          />
          <StatCard
            title="Appointments"
            value={stats?.totalAppointments || 0}
            icon={<CalendarDays />}
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-slate-950">
            Pending Doctor Verification
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="py-3">Doctor</th>
                  <th>Specialization</th>
                  <th>BMDC</th>
                  <th>District</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {pendingDoctors.map((doctor) => (
                  <tr key={doctor._id} className="border-b border-slate-100">
                    <td className="py-4 font-bold">{doctor.user?.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.bmdcNumber}</td>
                    <td>{doctor.district}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button
                          className="py-2"
                          onClick={() => verifyDoctor(doctor._id)}
                        >
                          Verify
                        </Button>
                        <Button
                          variant="ghost"
                          className="py-2 text-red-600"
                          onClick={() => rejectDoctor(doctor._id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pendingDoctors.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-slate-500"
                    >
                      No pending doctors
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
