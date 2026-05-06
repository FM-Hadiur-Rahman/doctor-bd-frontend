"use client";

import Link from "next/link";
import {
  Menu,
  Stethoscope,
  UserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const dashboardLink =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "doctor"
        ? "/doctor-dashboard"
        : user?.role === "diagnostic_center"
          ? "/diagnostic-dashboard"
          : "/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#087CC8] text-white">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-xl font-black text-slate-950">DoctorBD</span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
          <Link href="/doctors" className="hover:text-[#087CC8]">
            Find Doctors
          </Link>

          {user ? (
            <>
              <Link
                href={dashboardLink}
                className="flex items-center gap-2 hover:text-[#087CC8]"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              {user.role === "doctor" && (
                <Link
                  href="/doctor-dashboard/referrals"
                  className="hover:text-[#087CC8]"
                >
                  Referrals
                </Link>
              )}

              {user.role === "diagnostic_center" && (
                <Link
                  href="/diagnostic-dashboard/referrals"
                  className="hover:text-[#087CC8]"
                >
                  Referrals
                </Link>
              )}

              <Link href="/notifications" className="hover:text-[#087CC8]">
                Notifications
              </Link>

              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[#087CC8]">
                <UserRound className="h-4 w-4" />
                <span>{user.name}</span>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs uppercase">
                  {user.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 font-bold text-white hover:bg-slate-800"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[#087CC8]">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#087CC8] px-5 py-2.5 font-bold text-white hover:bg-[#0668a8]"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-slate-200 p-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
