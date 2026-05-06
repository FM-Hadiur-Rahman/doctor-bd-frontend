"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  FileText,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/appointments",
    label: "Appointments",
    icon: CalendarDays,
  },
  { href: "/dashboard/prescriptions", label: "Prescriptions", icon: FileText },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
];

export default function DashboardSidebar() {
  return (
    <aside className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-400">
        Patient
      </p>

      <nav className="grid gap-1">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-[#087CC8]"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
