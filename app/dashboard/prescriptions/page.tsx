"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import { prescriptionService } from "@/src/services/prescriptionService";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import EmptyState from "@/src/components/ui/EmptyState";

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    prescriptionService
      .getMy()
      .then((res) => setPrescriptions(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black text-slate-950">Prescriptions</h1>

          <div className="mt-8">
            {loading ? (
              <LoadingSpinner />
            ) : prescriptions.length === 0 ? (
              <EmptyState title="No prescriptions found" />
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {prescriptions.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                  >
                    <h3 className="text-xl font-black">{item.diagnosis}</h3>
                    <p className="mt-2 text-sm text-slate-500">{item.advice}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
