import RoleGuard from "@/src/components/auth/RoleGuard";
import AvailabilityManager from "@/src/components/availability/AvailabilityManager";

export default function DoctorAvailabilityPage() {
  return (
    <RoleGuard allowedRoles={["doctor"]}>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <AvailabilityManager />
        </div>
      </main>
    </RoleGuard>
  );
}
