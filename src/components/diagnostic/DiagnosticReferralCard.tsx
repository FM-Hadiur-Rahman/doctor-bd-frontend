"use client";

import { useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  FileUp,
  Stethoscope,
  UploadCloud,
  UserRound,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/Button";
import { diagnosticReferralService } from "@/src/services/diagnosticReferralService";

type Referral = {
  _id: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  tests: string[];
  note?: string;
  createdAt: string;
  patient?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  diagnosticCenter?: {
    centerName?: string;
    phone?: string;
    address?: string;
  };
  doctor?: {
    user?: {
      name?: string;
      email?: string;
      phone?: string;
    };
  };
  reportDocument?: {
    fileUrl?: string;
    originalName?: string;
  };
};

const statusClass: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function DiagnosticReferralCard({
  referral,
  mode = "doctor",
  onRefresh,
}: {
  referral: Referral;
  mode?: "doctor" | "center";
  onRefresh?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (
    status: "accepted" | "completed" | "cancelled",
  ) => {
    try {
      setUpdating(true);
      await diagnosticReferralService.updateStatus(referral._id, { status });
      toast.success("Referral updated");
      onRefresh?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const uploadReport = async () => {
    if (!file) {
      toast.error("Please select report file");
      return;
    }

    try {
      setUploading(true);

      await diagnosticReferralService.uploadReport(referral._id, {
        document: file,
      });

      toast.success("Report uploaded");
      setFile(null);
      onRefresh?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-slate-950">
              {mode === "doctor"
                ? referral.diagnosticCenter?.centerName || "Diagnostic Center"
                : referral.patient?.name || "Patient"}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                statusClass[referral.status] || "bg-slate-100 text-slate-600"
              }`}
            >
              {referral.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Referral created for diagnostic tests and report upload.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-[#087CC8]">
          {mode === "doctor" ? (
            <Building2 className="h-5 w-5" />
          ) : (
            <FileUp className="h-5 w-5" />
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4" />
          Patient: {referral.patient?.name || "N/A"}
        </div>

        {mode === "center" && (
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Doctor: {referral.doctor?.user?.name || "N/A"}
          </div>
        )}

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {new Date(referral.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-slate-700">Requested Tests</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {referral.tests.map((test) => (
            <span
              key={test}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700"
            >
              {test}
            </span>
          ))}
        </div>
      </div>

      {referral.note && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          {referral.note}
        </div>
      )}

      {referral.reportDocument?.fileUrl && (
        <div className="mt-5 rounded-2xl bg-green-50 p-4">
          <p className="text-sm font-black text-green-800">
            Report uploaded: {referral.reportDocument.originalName || "Report"}
          </p>

          <a
            href={referral.reportDocument.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-sm font-bold text-green-700 underline"
          >
            View Report
          </a>
        </div>
      )}

      {mode === "center" && referral.status !== "completed" && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap gap-2">
            {referral.status === "pending" && (
              <Button
                type="button"
                disabled={updating}
                onClick={() => updateStatus("accepted")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Accept
              </Button>
            )}

            {referral.status !== "cancelled" && (
              <Button
                type="button"
                variant="ghost"
                className="text-red-600"
                disabled={updating}
                onClick={() => updateStatus("cancelled")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>

          {referral.status === "accepted" && (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <label className="flex cursor-pointer flex-col items-center justify-center text-center">
                <UploadCloud className="h-8 w-8 text-[#087CC8]" />

                <p className="mt-2 text-sm font-black text-slate-700">
                  {file ? file.name : "Upload report PDF or image"}
                </p>

                <p className="text-xs text-slate-500">PDF, JPG, PNG, WEBP</p>

                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              <Button
                type="button"
                className="mt-4 w-full"
                disabled={uploading}
                onClick={uploadReport}
              >
                {uploading ? "Uploading..." : "Upload Report"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
