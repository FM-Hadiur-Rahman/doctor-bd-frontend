import api from "./api";

export const adminService = {
  getStats: () => {
    return api.get("/admin/stats");
  },

  getPendingDoctors: () => {
    return api.get("/admin/doctors/pending");
  },

  verifyDoctor: (id: string) => {
    return api.patch(`/admin/doctors/${id}/verify`);
  },

  rejectDoctor: (id: string) => {
    return api.delete(`/admin/doctors/${id}/reject`);
  },
};
