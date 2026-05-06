import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function PatientProfilePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-4xl font-black text-slate-950">My Profile</h1>
          <p className="mt-3 text-slate-500">
            Profile editing will be added here.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
