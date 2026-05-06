"use client";

import { useEffect, useState } from "react";
import {
  Download,
  ExternalLink,
  Eye,
  FileImage,
  FileText,
  Star,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { appointmentDocumentService } from "@/src/services/appointmentDocumentService";
import Button from "@/src/components/ui/Button";
import Textarea from "@/src/components/ui/Textarea";

type AppointmentDocument = {
  _id: string;
  originalName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  documentType: string;
  note?: string;
  doctorNote?: string;
  isImportant?: boolean;
  createdAt: string;
  uploadedBy?: {
    name: string;
    role: string;
  };
};

export default function AppointmentDocuments({
  appointmentId,
  canDelete = true,
  canDoctorUpdate = false,
  refreshKey,
}: {
  appointmentId: string;
  canDelete?: boolean;
  canDoctorUpdate?: boolean;
  refreshKey?: number;
}) {
  const [documents, setDocuments] = useState<AppointmentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewDoc, setPreviewDoc] = useState<AppointmentDocument | null>(
    null,
  );
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [doctorNote, setDoctorNote] = useState("");
  const [saving, setSaving] = useState(false);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const res =
        await appointmentDocumentService.getByAppointment(appointmentId);
      setDocuments(res.data.data || []);
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [appointmentId, refreshKey]);

  const deleteDocument = async (id: string) => {
    const ok = confirm("Delete this document?");
    if (!ok) return;

    try {
      await appointmentDocumentService.delete(id);
      toast.success("Document deleted");
      loadDocuments();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const saveDoctorNote = async (doc: AppointmentDocument) => {
    try {
      setSaving(true);
      await appointmentDocumentService.update(doc._id, {
        doctorNote,
      });

      toast.success("Doctor note saved");
      setEditingNoteId(null);
      setDoctorNote("");
      loadDocuments();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const toggleImportant = async (doc: AppointmentDocument) => {
    try {
      await appointmentDocumentService.update(doc._id, {
        isImportant: !doc.isImportant,
      });

      toast.success(
        doc.isImportant ? "Removed important mark" : "Marked important",
      );
      loadDocuments();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
        Loading documents...
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {documents.map((doc) => {
          const isImage = doc.fileType?.startsWith("image/");
          const isPdf = doc.fileType === "application/pdf";

          return (
            <div
              key={doc._id}
              className={`rounded-3xl border bg-white p-4 shadow-sm transition hover:shadow-md ${
                doc.isImportant
                  ? "border-yellow-200 ring-2 ring-yellow-100"
                  : "border-slate-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-[#087CC8]">
                    {isImage ? (
                      <FileImage className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-slate-950">
                        {doc.originalName}
                      </p>

                      {doc.isImportant && (
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-black text-yellow-700">
                          Important
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs font-semibold uppercase text-slate-400">
                      {doc.documentType.replace("_", " ")} · Uploaded by{" "}
                      {doc.uploadedBy?.name || "User"}
                    </p>

                    {doc.note && (
                      <p className="mt-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                        Patient note: {doc.note}
                      </p>
                    )}

                    {doc.doctorNote && (
                      <p className="mt-2 rounded-2xl bg-blue-50 p-3 text-sm font-semibold text-slate-700">
                        Doctor note: {doc.doctorNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap justify-end gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="rounded-xl bg-slate-50 p-2 text-slate-700 hover:bg-blue-50 hover:text-[#087CC8]"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <a
                    href={doc.fileUrl}
                    download
                    className="rounded-xl bg-slate-50 p-2 text-slate-700 hover:bg-green-50 hover:text-green-700"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </a>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-slate-50 p-2 text-slate-700 hover:bg-blue-50 hover:text-[#087CC8]"
                    title="Open"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {canDoctorUpdate && (
                    <button
                      onClick={() => toggleImportant(doc)}
                      className={`rounded-xl p-2 ${
                        doc.isImportant
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-50 text-slate-700 hover:bg-yellow-50 hover:text-yellow-700"
                      }`}
                      title="Mark important"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  )}

                  {canDelete && (
                    <button
                      onClick={() => deleteDocument(doc._id)}
                      className="rounded-xl bg-slate-50 p-2 text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {canDoctorUpdate && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  {editingNoteId === doc._id ? (
                    <div className="space-y-3">
                      <Textarea
                        label="Doctor Note"
                        value={doctorNote}
                        onChange={(e) => setDoctorNote(e.target.value)}
                        placeholder="Example: Cholesterol level high. Repeat test after 2 weeks."
                      />

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          disabled={saving}
                          onClick={() => saveDoctorNote(doc)}
                        >
                          {saving ? "Saving..." : "Save Note"}
                        </Button>

                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setEditingNoteId(null);
                            setDoctorNote("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingNoteId(doc._id);
                        setDoctorNote(doc.doctorNote || "");
                      }}
                    >
                      Add / Edit Doctor Note
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h3 className="font-black text-slate-950">
                  {previewDoc.originalName}
                </h3>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  {previewDoc.documentType.replace("_", " ")}
                </p>
              </div>

              <button
                onClick={() => setPreviewDoc(null)}
                className="rounded-xl bg-slate-100 p-2 text-slate-700 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto bg-slate-50 p-4">
              {previewDoc.fileType?.startsWith("image/") ? (
                <img
                  src={previewDoc.fileUrl}
                  alt={previewDoc.originalName}
                  className="mx-auto max-h-[70vh] rounded-2xl object-contain"
                />
              ) : previewDoc.fileType === "application/pdf" ? (
                <iframe
                  src={previewDoc.fileUrl}
                  className="h-[70vh] w-full rounded-2xl bg-white"
                />
              ) : (
                <div className="rounded-2xl bg-white p-6 text-center">
                  <p className="text-sm text-slate-500">
                    Preview is not available for this file type.
                  </p>

                  <a
                    href={previewDoc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-xl bg-[#087CC8] px-4 py-2 text-sm font-bold text-white"
                  >
                    Open document
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
