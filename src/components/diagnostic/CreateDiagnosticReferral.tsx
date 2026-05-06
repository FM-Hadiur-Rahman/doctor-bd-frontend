"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/Button";
import Textarea from "@/src/components/ui/Textarea";
import { diagnosticCenterService } from "@/src/services/diagnosticCenterService";
import { diagnosticReferralService } from "@/src/services/diagnosticReferralService";

type DiagnosticCenter = {
  _id: string;
  centerName: string;
  phone: string;
  address: string;
  services?: string[];
  isVerified?: boolean;
};

export default function CreateDiagnosticReferral({
  appointmentId,
  onCreated,
}: {
  appointmentId: string;
  onCreated?: () => void;
}) {
  const [centers, setCenters] = useState<DiagnosticCenter[]>([]);
  const [diagnosticCenterId, setDiagnosticCenterId] = useState("");
  const [testInput, setTestInput] = useState("");
  const [tests, setTests] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadCenters = async () => {
    try {
      setLoading(true);
      const res = await diagnosticCenterService.getAll();
      setCenters(res.data.data || []);
    } catch {
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCenters();
  }, []);

  const addTest = () => {
    const value = testInput.trim();

    if (!value) return;

    if (tests.includes(value)) {
      toast.error("Test already added");
      return;
    }

    setTests((prev) => [...prev, value]);
    setTestInput("");
  };

  const removeTest = (value: string) => {
    setTests((prev) => prev.filter((item) => item !== value));
  };

  const createReferral = async () => {
    if (!diagnosticCenterId) {
      toast.error("Please select diagnostic center");
      return;
    }

    if (tests.length === 0) {
      toast.error("Please add at least one test");
      return;
    }

    try {
      setCreating(true);

      await diagnosticReferralService.create({
        appointmentId,
        diagnosticCenterId,
        tests,
        note,
      });

      toast.success("Diagnostic referral created");
      setDiagnosticCenterId("");
      setTests([]);
      setNote("");
      onCreated?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create referral");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087CC8] text-white">
          <Building2 className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-950">
            Refer to Diagnostic Center
          </h3>
          <p className="text-sm text-slate-500">
            Send patient for lab test, scan, X-ray, MRI, or report upload.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <select
          value={diagnosticCenterId}
          onChange={(e) => setDiagnosticCenterId(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            {loading ? "Loading centers..." : "Select diagnostic center"}
          </option>

          {centers.map((center) => (
            <option key={center._id} value={center._id}>
              {center.centerName} {center.isVerified ? "✓" : ""}
            </option>
          ))}
        </select>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Tests
          </label>

          <div className="flex gap-2">
            <input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Example: CBC, X-Ray, MRI"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTest();
                }
              }}
            />

            <Button type="button" onClick={addTest}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {tests.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tests.map((test) => (
                <span
                  key={test}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-[#087CC8]"
                >
                  {test}
                  <button type="button" onClick={() => removeTest(test)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <Textarea
          label="Referral Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Example: Please do CBC and upload report before follow-up."
        />

        <Button
          type="button"
          className="w-full"
          disabled={creating}
          onClick={createReferral}
        >
          {creating ? "Creating..." : "Create Referral"}
        </Button>
      </div>
    </div>
  );
}
