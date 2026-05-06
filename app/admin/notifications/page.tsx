import AdminLayout from "@/src/components/layout/AdminLayout";

export default function AdminNotificationsPage() {
  return (
    <AdminLayout>
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-4xl font-black text-slate-950">Notifications</h1>
        <p className="mt-3 text-slate-500">
          System notifications will be shown here.
        </p>
      </div>
    </AdminLayout>
  );
}
