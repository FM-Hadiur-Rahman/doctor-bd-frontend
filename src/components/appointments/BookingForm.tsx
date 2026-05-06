"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Info, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { availabilityService } from "@/src/services/availabilityService";
import { appointmentService } from "@/src/services/appointmentService";
import { useAuth } from "@/src/contexts/AuthContext";
import Button from "@/src/components/ui/Button";
import Textarea from "@/src/components/ui/Textarea";
import { useRouter } from "next/navigation";
type Slot = {
  time: string;
  maxPatients: number;
  bookedCount: number;
};

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function BookingForm({ doctorId }: { doctorId: string }) {
  const { user } = useAuth();

  const quickDates = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      return toISODate(date);
    });
  }, []);

  const [date, setDate] = useState(quickDates[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const selectedSlot = slots.find((slot) => slot.time === time);

  const loadSlots = async () => {
    if (!date) return;

    try {
      setLoadingSlots(true);
      setTime("");

      const res = await availabilityService.getDoctorAvailabilityByDate(
        doctorId,
        date,
      );

      setSlots(res.data.data.slots || []);
    } catch {
      toast.error("Failed to load available slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, [date]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login before booking an appointment");
      return;
    }

    if (!date || !time) {
      toast.error("Please select date and time");
      return;
    }

    try {
      setSaving(true);

      await appointmentService.create({
        doctorId,
        date,
        time,
        notes,
      });

      toast.success("Appointment booked successfully");
      setNotes("");
      setTime("");
      router.push("/dashboard");
      await loadSlots();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Booking failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleBook}
      className="sticky top-24 rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-950">
            Book Appointment
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Choose a date and available time.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#087CC8]">
          <CalendarDays className="h-6 w-6" />
        </div>
      </div>

      {!user && (
        <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          <Info className="mr-2 inline h-4 w-4" />
          You can view slots, but you need to login to confirm booking.
        </div>
      )}

      <div className="mt-6">
        <label className="mb-3 block text-sm font-bold text-slate-700">
          Select date
        </label>

        <div className="grid grid-cols-2 gap-2">
          {quickDates.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setDate(item)}
              className={`rounded-2xl border px-3 py-3 text-left transition ${
                date === item
                  ? "border-[#087CC8] bg-blue-50 text-[#087CC8]"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <p className="text-xs font-bold uppercase">
                {item === quickDates[0] ? "Today" : formatDateLabel(item)}
              </p>
              <p className="mt-1 text-sm font-black">{item}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-3 block text-sm font-bold text-slate-700">
          Available slots
        </label>

        {loadingSlots ? (
          <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-8 text-slate-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading slots...
          </div>
        ) : slots.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
            No slots available for this date.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {slots.map((slot) => {
              const remaining = slot.maxPatients - slot.bookedCount;

              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setTime(slot.time)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    time === slot.time
                      ? "border-[#087CC8] bg-blue-50 text-[#087CC8]"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <p className="font-black">{slot.time}</p>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {remaining} seat{remaining > 1 ? "s" : ""} left
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedSlot && (
        <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="mr-2 inline h-4 w-4" />
          Selected: <strong>{date}</strong> at{" "}
          <strong>{selectedSlot.time}</strong>
        </div>
      )}

      <div className="mt-6">
        <Textarea
          label="Problem / Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: Fever for 2 days, chest pain, follow-up..."
        />
      </div>

      <Button
        className="mt-6 w-full"
        type="submit"
        disabled={!date || !time || saving}
      >
        {saving ? "Booking..." : "Confirm Appointment"}
      </Button>
    </form>
  );
}
