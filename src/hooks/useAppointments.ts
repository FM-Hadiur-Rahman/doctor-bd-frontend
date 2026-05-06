"use client";

import { useEffect, useState } from "react";
import { appointmentService } from "@/src/services/appointmentService";
import { Appointment } from "@/src/types/appointment";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await appointmentService.getMy();
      setAppointments(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return { appointments, loading, reload: loadAppointments };
}
