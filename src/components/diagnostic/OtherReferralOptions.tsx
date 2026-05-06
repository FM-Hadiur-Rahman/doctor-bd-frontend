"use client";

import { useEffect, useState } from "react";
import { Building2, Stethoscope } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/Button";
import Textarea from "@/src/components/ui/Textarea";
import { doctorService } from "@/src/services/doctorService";
import { doctorReferralService } from "@/src/services/doctorReferralService";
import { clinicReferralService } from "@/src/services/clinicReferralService";

export default function OtherReferralOptions({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [type, setType] = useState<"doctor" | "clinic">("doctor");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [toDoctorId, setToDoctorId] = useState("");

  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const [clinicName, setClinicName] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");

  const [saving, setSaving] = useState(false);

  const loadDoctors = async () => {
    try {
      const res = await doctorService.getDoctors();
      setDoctors(res.data.data || []);
    } catch {
      setDoctors([]);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const submit = async () => {
    if (!reason.trim()) {
      toast.error("Reason is required");
      return;
    }

    try {
      setSaving(true);

      if (type === "doctor") {
        if (!toDoctorId) {
          toast.error("Please select doctor");
          return;
        }

        await doctorReferralService.create({
          appointmentId,
          toDoctorId,
          reason,
          note,
        });

        toast.success("Doctor referral created");
        setToDoctorId("");
      } else {
        if (!clinicName || !address) {
          toast.error("Clinic name and address are required");
          return;
        }

        await clinicReferralService.create({
          appointmentId,
          clinicName,
          department,
          address,
          lng: lng ? Number(lng) : undefined,
          lat: lat ? Number(lat) : undefined,
          reason,
          note,
        });

        toast.success("Clinic referral created");
        setClinicName("");
        setDepartment("");
        setAddress("");
        setLng("");
        setLat("");
      }

      setReason("");
      setNote("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Referral failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <h4 className="text-base font-black text-slate-950">
        Other Referral Options
      </h4>
      <p className="mt-1 text-sm text-slate-500">
        Refer this patient to another doctor, clinic, or hospital.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-2">
        <button
          type="button"
          onClick={() => setType("doctor")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black ${
            type === "doctor"
              ? "bg-[#087CC8] text-white"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <Stethoscope className="h-4 w-4" />
          Doctor
        </button>

        <button
          type="button"
          onClick={() => setType("clinic")}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black ${
            type === "clinic"
              ? "bg-[#087CC8] text-white"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Clinic / Hospital
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {type === "doctor" ? (
          <select
            value={toDoctorId}
            onChange={(e) => setToDoctorId(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.user?.name || "Doctor"} - {doctor.specialization}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="Clinic / Hospital name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
            />

            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department, e.g. Cardiology"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
            />

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
            />

            <div className="grid gap-3 md:grid-cols-2">
              <input
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
              />

              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </>
        )}

        <Textarea
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Example: Patient needs specialist opinion / hospital admission."
        />

        <Textarea
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
        />

        <Button
          type="button"
          className="w-full"
          disabled={saving}
          onClick={submit}
        >
          {saving ? "Creating..." : "Create Referral"}
        </Button>
      </div>
    </div>
  );
}
