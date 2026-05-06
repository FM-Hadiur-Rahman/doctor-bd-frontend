"use client";

import { useState } from "react";
import {
  Activity,
  FileText,
  History,
  NotebookPen,
  UserRound,
  Waypoints,
} from "lucide-react";

import { Appointment } from "@/src/types/appointment";
import AppointmentDocumentUploader from "./AppointmentDocumentUploader";
import AppointmentDocuments from "./AppointmentDocuments";
import CreateDiagnosticReferral from "@/src/components/diagnostic/CreateDiagnosticReferral";
import OtherReferralOptions from "@/src/components/diagnostic/OtherReferralOptions";

type Tab = "bio" | "reports" | "diagnosis" | "referrals" | "history";

export default function DoctorAppointmentWorkspace({
  appointment,
  refreshDocs,
  setRefreshDocs,
}: {
  appointment: Appointment;
  refreshDocs: number;
  setRefreshDocs: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("bio");

  const tabs: {
    key: Tab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "bio",
      label: "Patient Bio",
      icon: <UserRound className="h-4 w-4" />,
    },
    {
      key: "reports",
      label: "Reports",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      key: "diagnosis",
      label: "Diagnosis",
      icon: <NotebookPen className="h-4 w-4" />,
    },
    {
      key: "referrals",
      label: "Referrals",
      icon: <Waypoints className="h-4 w-4" />,
    },
    { key: "history", label: "History", icon: <History className="h-4 w-4" /> },
  ];

  return (
    <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087CC8] text-white">
          <Activity className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-950">
            Clinical Workspace
          </h3>
          <p className="text-sm text-slate-500">
            Review patient details, reports, diagnosis, and referrals.
          </p>
        </div>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition ${
              activeTab === tab.key
                ? "bg-[#087CC8] text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "bio" && (
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h4 className="text-base font-black text-slate-950">Patient Bio</h4>

          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="font-bold text-slate-800">Name:</span>{" "}
              {appointment.patient?.name || "N/A"}
            </div>

            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="font-bold text-slate-800">Email:</span>{" "}
              {appointment.patient?.email || "N/A"}
            </div>

            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="font-bold text-slate-800">Phone:</span>{" "}
              {appointment.patient?.phone || "N/A"}
            </div>

            <div className="rounded-2xl bg-slate-50 p-3">
              <span className="font-bold text-slate-800">
                Appointment Reason:
              </span>{" "}
              {appointment.notes || "N/A"}
            </div>
          </div>

          <p className="mt-4 rounded-2xl bg-yellow-50 p-3 text-sm font-semibold text-yellow-800">
            Later we will connect full medical profile: blood group, allergies,
            chronic diseases, medications, emergency contact.
          </p>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-4">
          <AppointmentDocumentUploader
            appointmentId={appointment._id}
            onUploaded={() => setRefreshDocs((prev) => prev + 1)}
          />

          <AppointmentDocuments
            appointmentId={appointment._id}
            refreshKey={refreshDocs}
            canDelete={false}
            canDoctorUpdate={true}
          />
        </div>
      )}

      {activeTab === "diagnosis" && (
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h4 className="text-base font-black text-slate-950">
            Diagnosis & Clinical Notes
          </h4>

          <p className="mt-2 text-sm text-slate-500">
            This UI is ready. Backend clinical-note API will be added next.
          </p>

          <div className="mt-4 space-y-3">
            <textarea
              placeholder="Symptoms..."
              className="min-h-24 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
            />

            <textarea
              placeholder="Diagnosis..."
              className="min-h-24 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
            />

            <textarea
              placeholder="Treatment plan..."
              className="min-h-24 w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              className="w-full rounded-2xl bg-[#087CC8] px-5 py-3 text-sm font-black text-white"
            >
              Save Clinical Note
            </button>
          </div>
        </div>
      )}

      {activeTab === "referrals" && (
        <div className="space-y-4">
          <CreateDiagnosticReferral
            appointmentId={appointment._id}
            onCreated={() => setRefreshDocs((prev) => prev + 1)}
          />

          <OtherReferralOptions appointmentId={appointment._id} />
        </div>
      )}

      {activeTab === "history" && (
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h4 className="text-base font-black text-slate-950">
            Medical History
          </h4>

          <p className="mt-2 text-sm text-slate-500">
            Later we will show previous appointments, old prescriptions,
            diagnostic reports, and follow-up history here.
          </p>
        </div>
      )}
    </div>
  );
}
