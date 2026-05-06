"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import Button from "@/src/components/ui/Button";

export default function DashboardHeader({ title }: { title: string }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div>
        <h1 className="text-3xl font-black text-slate-950">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome{user?.name ? `, ${user.name}` : ""}.
        </p>
      </div>

      <Button variant="ghost" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
