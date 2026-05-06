"use client";

import { useState } from "react";
import { doctorService } from "@/src/services/doctorService";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import Select from "@/src/components/ui/Select";
import Textarea from "@/src/components/ui/Textarea";
import MapboxPicker from "@/src/components/maps/MapboxPicker";
import { districts } from "@/src/constants/districts";
import { specializations } from "@/src/constants/specializations";

export default function DoctorProfileForm() {
  const [form, setForm] = useState({
    bmdcNumber: "",
    specialization: "",
    chamberName: "",
    district: "",
    address: "",
    mapAddress: "",
    consultationFee: "500",
    lng: 90.4125,
    lat: 23.8103,
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      await doctorService.createProfile({
        bmdcNumber: form.bmdcNumber,
        specialization: form.specialization,
        chamberName: form.chamberName,
        district: form.district,
        address: form.address,
        mapAddress: form.mapAddress,
        consultationFee: Number(form.consultationFee),
        location: {
          type: "Point",
          coordinates: [Number(form.lng), Number(form.lat)],
        },
      });

      setMessage("Doctor profile created. Waiting for admin verification.");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Profile save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
    >
      <h2 className="text-2xl font-black text-slate-950">Doctor Profile</h2>
      <p className="mt-2 text-slate-500">
        Add your BMDC, chamber, consultation fee, and location.
      </p>

      {message && (
        <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-[#087CC8]">
          {message}
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Input
          label="BMDC Number"
          value={form.bmdcNumber}
          onChange={(e) => update("bmdcNumber", e.target.value)}
          required
        />

        <Select
          label="Specialization"
          options={specializations}
          value={form.specialization}
          onChange={(e) => update("specialization", e.target.value)}
          required
        />

        <Input
          label="Chamber Name"
          value={form.chamberName}
          onChange={(e) => update("chamberName", e.target.value)}
          required
        />

        <Select
          label="District"
          options={districts}
          value={form.district}
          onChange={(e) => update("district", e.target.value)}
          required
        />

        <Input
          label="Consultation Fee"
          type="number"
          value={form.consultationFee}
          onChange={(e) => update("consultationFee", e.target.value)}
          required
        />

        <Input
          label="Map Address"
          value={form.mapAddress}
          onChange={(e) => update("mapAddress", e.target.value)}
          placeholder="Dhanmondi, Dhaka, Bangladesh"
        />

        <div className="md:col-span-2">
          <Textarea
            label="Full Address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Pick Chamber Location
          </label>
          <MapboxPicker
            lng={Number(form.lng)}
            lat={Number(form.lat)}
            onChange={({ lng, lat }) => {
              update("lng", lng);
              update("lat", lat);
            }}
          />
          <p className="mt-2 text-sm text-slate-500">
            Longitude: {form.lng}, Latitude: {form.lat}
          </p>
        </div>
      </div>

      <Button className="mt-8" type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Doctor Profile"}
      </Button>
    </form>
  );
}
