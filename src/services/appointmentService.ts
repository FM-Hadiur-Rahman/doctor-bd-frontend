import api from "./api";

export const appointmentService = {
  create: (payload: {
    doctorId: string;
    date: string;
    time: string;
    notes?: string;
  }) => {
    return api.post("/appointments", payload);
  },

  getMy: () => {
    return api.get("/appointments/my");
  },

  getById: (id: string) => {
    return api.get(`/appointments/${id}`);
  },

  updateStatus: (id: string, status: string) => {
    return api.patch(`/appointments/${id}/status`, { status });
  },

  cancel: (id: string) => {
    return api.patch(`/appointments/${id}/cancel`);
  },
};
