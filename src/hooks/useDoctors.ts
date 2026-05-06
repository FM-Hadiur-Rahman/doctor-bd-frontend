"use client";

import { useEffect, useState } from "react";
import { doctorService } from "@/src/services/doctorService";
import { Doctor } from "@/src/types/doctor";

export function useDoctors(params?: { search?: string; district?: string }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await doctorService.getDoctors(params);
      setDoctors(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return { doctors, loading, reload: loadDoctors };
}
