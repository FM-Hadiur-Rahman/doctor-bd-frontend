import { ReactNode } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  FileText,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

const links = [
  { href: "/doctor-dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/doctor-dashboard/profile", label: "Profile", icon: UserRound },
  {
    href: "/doctor-dashboard/availability",
    label: "Availability",
    icon: Clock,
  },
  {
    href: "/doctor-dashboard/appointments",
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    href: "/doctor-dashboard/prescriptions",
    label: "Prescriptions",
    icon: FileText,
  },
];

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <p className="px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-400">
            Doctor
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

        <section>{children}</section>
      </div>
    </main>
  );
}
