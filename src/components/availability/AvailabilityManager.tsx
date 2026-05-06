"use client";

import { useEffect, useState } from "react";
import { availabilityService } from "@/src/services/availabilityService";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

export default function AvailabilityManager() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([{ time: "10:00", maxPatients: 1 }]);
  const [message, setMessage] = useState("");
  const [availability, setAvailability] = useState<any[]>([]);

  const loadAvailability = async () => {
    const res = await availabilityService.getMyAvailability();
    setAvailability(res.data.data || []);
  };

  useEffect(() => {
    loadAvailability();
  }, []);

  const updateSlot = (index: number, field: string, value: string) => {
    setSlots((prev) =>
      prev.map((slot, i) =>
        i === index
          ? {
              ...slot,
              [field]: field === "maxPatients" ? Number(value) : value,
            }
          : slot,
      ),
    );
  };

  const addSlot = () => {
    setSlots((prev) => [...prev, { time: "10:00", maxPatients: 1 }]);
  };

  const removeSlot = (index: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const save = async () => {
    try {
      await availabilityService.saveAvailability({ date, slots });
      setMessage("Availability saved successfully.");
      loadAvailability();
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to save");
    }
  };

  const block = async () => {
    try {
      await availabilityService.blockDate({
        date,
        reason: "Doctor unavailable",
      });
      setMessage("Date blocked successfully.");
      loadAvailability();
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to block");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-3xl font-black text-slate-950">
          Availability Manager
        </h1>
        <p className="mt-2 text-slate-500">
          Create real date-based appointment slots.
        </p>

        {message && (
          <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm font-bold text-[#087CC8]">
            {message}
          </div>
        )}

        <div className="mt-8 space-y-5">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="space-y-3">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1fr_auto]"
              >
                <Input
                  label="Time"
                  type="time"
                  value={slot.time}
                  onChange={(e) => updateSlot(index, "time", e.target.value)}
                />
                <Input
                  label="Max Patients"
                  type="number"
                  value={slot.maxPatients}
                  onChange={(e) =>
                    updateSlot(index, "maxPatients", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  className="self-end rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={addSlot}>
              Add Slot
            </Button>
            <Button type="button" onClick={save} disabled={!date}>
              Save Availability
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={block}
              disabled={!date}
            >
              Block Date
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-xl font-black text-slate-950">Saved Dates</h2>
        <div className="mt-5 space-y-3">
          {availability.map((item) => (
            <div key={item._id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-slate-950">{item.date}</p>
              <p className="text-sm text-slate-500">
                {item.isBlocked
                  ? `Blocked: ${item.blockReason}`
                  : `${item.slots?.length || 0} slots`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
