"use client";

import Link from "next/link";
import { Building2, ClipboardList, FileUp, ShieldCheck } from "lucide-react";

export default function DiagnosticDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-br from-[#087CC8] to-blue-700 p-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Building2 className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-black">
                Diagnostic Center Dashboard
              </h1>
              <p className="mt-1 text-blue-100">
                Manage referrals, upload reports, and connect with doctors.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/diagnostic-dashboard/referrals"
            className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <ClipboardList className="h-8 w-8 text-[#087CC8]" />
            <h2 className="mt-4 text-lg font-black text-slate-950">
              My Referrals
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View doctor requests and patient test referrals.
            </p>
          </Link>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <FileUp className="h-8 w-8 text-green-600" />
            <h2 className="mt-4 text-lg font-black text-slate-950">
              Report Upload
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload reports directly inside referral cards.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-purple-600" />
            <h2 className="mt-4 text-lg font-black text-slate-950">
              Verified Center
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Admin verification builds trust with doctors and patients.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
