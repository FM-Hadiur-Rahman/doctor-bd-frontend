"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/Button";
import Textarea from "@/src/components/ui/Textarea";
import { appointmentDocumentService } from "@/src/services/appointmentDocumentService";

export default function AppointmentDocumentUploader({
  appointmentId,
  onUploaded,
}: {
  appointmentId: string;
  onUploaded?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("test_report");
  const [note, setNote] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setUploading(true);

      await appointmentDocumentService.upload(appointmentId, {
        document: file,
        documentType,
        note,
      });

      toast.success("Document uploaded");
      setFile(null);
      setNote("");
      onUploaded?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h3 className="text-lg font-black text-slate-950">
        Upload Medical Document
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Upload test reports, prescriptions, scans, or medical history.
      </p>

      <div className="mt-5 space-y-4">
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
        >
          <option value="test_report">Test Report</option>
          <option value="prescription">Previous Prescription</option>
          <option value="xray">X-ray</option>
          <option value="scan">Scan / MRI / CT</option>
          <option value="medical_history">Medical History</option>
          <option value="other">Other</option>
        </select>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-[#087CC8] hover:bg-blue-50">
          <UploadCloud className="h-8 w-8 text-[#087CC8]" />
          <p className="mt-3 text-sm font-bold text-slate-700">
            {file ? file.name : "Click to upload PDF or image"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            PDF, JPG, PNG, WEBP up to 5MB
          </p>

          <input
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <Textarea
          label="Note"
          placeholder="Example: Blood test report before consultation"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button
          type="button"
          className="w-full"
          disabled={uploading}
          onClick={handleUpload}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </Button>
      </div>
    </div>
  );
}
