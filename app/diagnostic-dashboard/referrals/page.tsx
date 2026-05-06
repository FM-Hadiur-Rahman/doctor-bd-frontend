"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import toast from "react-hot-toast";
import DiagnosticReferralCard from "@/src/components/diagnostic/DiagnosticReferralCard";
import { diagnosticReferralService } from "@/src/services/diagnosticReferralService";

export default function DiagnosticCenterReferralsPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReferrals = async () => {
    try {
      setLoading(true);
      const res = await diagnosticReferralService.getCenterReferrals();
      setReferrals(res.data.data || []);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load referrals");
      setReferrals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReferrals();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087CC8] text-white">
              <ClipboardList className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Assigned Referrals
              </h1>
              <p className="text-sm text-slate-500">
                Accept referrals and upload patient diagnostic reports.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-6 text-sm text-slate-500">
            Loading referrals...
          </div>
        ) : referrals.length === 0 ? (
          <div className="rounded-3xl bg-white p-6 text-sm text-slate-500">
            No referrals assigned yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {referrals.map((referral) => (
              <DiagnosticReferralCard
                key={referral._id}
                referral={referral}
                mode="center"
                onRefresh={loadReferrals}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
