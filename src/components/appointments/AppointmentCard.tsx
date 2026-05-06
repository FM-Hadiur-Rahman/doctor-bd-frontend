"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  UserRound,
  XCircle,
} from "lucide-react";

import { Appointment } from "@/src/types/appointment";
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import AppointmentDocumentUploader from "./AppointmentDocumentUploader";
import AppointmentDocuments from "./AppointmentDocuments";
import CreateDiagnosticReferral from "@/src/components/diagnostic/CreateDiagnosticReferral";
import DoctorAppointmentWorkspace from "./DoctorAppointmentWorkspace";

type Props = {
  appointment: Appointment;
  role?: "patient" | "doctor" | "diagnostic_center" | "admin";
  onCancel?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
};

export default function AppointmentCard({
  appointment,
  role = "patient",
  onCancel,
  onStatusChange,
}: Props) {
  const [refreshDocs, setRefreshDocs] = useState(0);
  const [showDocs, setShowDocs] = useState(false);

  const canCancel =
    appointment.status !== "cancelled" && appointment.status !== "completed";

  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            {appointment.doctor?.user?.name || "Doctor"}
          </h3>

          <p className="mt-1 font-semibold text-[#087CC8]">
            {appointment.doctor?.specialization}
          </p>

          {role === "doctor" && appointment.patient && (
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Patient: {appointment.patient.name}
            </p>
          )}
        </div>

        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {appointment.date}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {appointment.time}
        </div>

        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4" />
          Serial #{appointment.serialNumber}
        </div>
      </div>

      {appointment.notes && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          {appointment.notes}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowDocs((prev) => !prev)}
        >
          <FileText className="mr-2 h-4 w-4" />
          {showDocs ? "Hide Documents" : "Documents"}
        </Button>

        {role === "patient" && canCancel && (
          <Button
            type="button"
            variant="ghost"
            className="text-red-600"
            onClick={() => onCancel?.(appointment._id)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}

        {role === "doctor" && appointment.status === "pending" && (
          <Button
            type="button"
            onClick={() => onStatusChange?.(appointment._id, "confirmed")}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Confirm
          </Button>
        )}

        {role === "doctor" && appointment.status === "confirmed" && (
          <Button
            type="button"
            variant="dark"
            onClick={() => onStatusChange?.(appointment._id, "completed")}
          >
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Complete
          </Button>
        )}

        {role === "doctor" && canCancel && (
          <Button
            type="button"
            variant="ghost"
            className="text-red-600"
            onClick={() => onStatusChange?.(appointment._id, "cancelled")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
      </div>

      {showDocs && (
        <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
          {role === "doctor" ? (
            <DoctorAppointmentWorkspace
              appointment={appointment}
              refreshDocs={refreshDocs}
              setRefreshDocs={setRefreshDocs}
            />
          ) : (
            <>
              <AppointmentDocumentUploader
                appointmentId={appointment._id}
                onUploaded={() => setRefreshDocs((prev) => prev + 1)}
              />

              <AppointmentDocuments
                appointmentId={appointment._id}
                refreshKey={refreshDocs}
                canDelete={role === "patient"}
              />
            </>
          )}
        </div>
      )}
    </Card>
  );
}
