import RoleGuard from "@/src/components/auth/RoleGuard";

export default function DoctorPrescriptionsPage() {
  return (
    <RoleGuard allowedRoles={["doctor"]}>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-4xl font-black text-slate-950">Prescriptions</h1>
          <p className="mt-3 text-slate-500">
            Prescription creation UI will be connected after appointment
            completion.
          </p>
        </div>
      </main>
    </RoleGuard>
  );
}
