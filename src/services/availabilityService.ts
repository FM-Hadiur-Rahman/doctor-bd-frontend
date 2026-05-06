import api from "./api";

export const availabilityService = {
  getDoctorAvailabilityByDate: (doctorId: string, date: string) => {
    return api.get(`/availability/doctor/${doctorId}/date/${date}`);
  },

  getMyAvailability: () => {
    return api.get("/availability/my");
  },

  saveAvailability: (payload: {
    date: string;
    slots: { time: string; maxPatients: number }[];
  }) => {
    return api.post("/availability", payload);
  },

  blockDate: (payload: { date: string; reason?: string }) => {
    return api.patch("/availability/block", payload);
  },

  unblockDate: (payload: { date: string }) => {
    return api.patch("/availability/unblock", payload);
  },
};
