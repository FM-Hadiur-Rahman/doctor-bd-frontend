"use client";

import Link from "next/link";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-slate-950/40 md:hidden"
      onClick={onClose}
    >
      <div
        className="absolute right-4 top-20 w-[calc(100%-2rem)] rounded-3xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="grid gap-2 text-sm font-bold text-slate-700">
          <Link
            href="/doctors"
            onClick={onClose}
            className="rounded-2xl p-3 hover:bg-slate-50"
          >
            Find Doctors
          </Link>

          <Link
            href="/dashboard"
            onClick={onClose}
            className="rounded-2xl p-3 hover:bg-slate-50"
          >
            My Appointments
          </Link>

          <Link
            href="/doctor-dashboard"
            onClick={onClose}
            className="rounded-2xl p-3 hover:bg-slate-50"
          >
            Doctor Dashboard
          </Link>

          <Link
            href="/login"
            onClick={onClose}
            className="rounded-2xl p-3 hover:bg-slate-50"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={onClose}
            className="rounded-2xl bg-[#087CC8] p-3 text-white"
          >
            Join Now
          </Link>
        </nav>
      </div>
    </div>
  );
}
