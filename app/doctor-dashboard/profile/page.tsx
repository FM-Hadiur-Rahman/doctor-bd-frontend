import DoctorProfileForm from "@/src/components/forms/DoctorProfileForm";
import RoleGuard from "@/src/components/auth/RoleGuard";

export default function DoctorProfilePage() {
  return (
    <RoleGuard allowedRoles={["doctor"]}>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <DoctorProfileForm />
        </div>
      </main>
    </RoleGuard>
  );
}
