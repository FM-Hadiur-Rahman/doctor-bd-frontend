import { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  LayoutDashboard,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/doctors", label: "Doctors", icon: ShieldCheck },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-4 text-white shadow-sm">
          <p className="px-4 py-3 text-sm font-black uppercase tracking-wide text-white/40">
            Admin
          </p>

          <nav className="grid gap-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
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
