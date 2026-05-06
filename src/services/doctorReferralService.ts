import api from "./api";

export const doctorReferralService = {
  create: (payload: {
    appointmentId: string;
    toDoctorId: string;
    reason: string;
    note?: string;
  }) => {
    return api.post("/doctor-referrals", payload);
  },

  getSent: () => {
    return api.get("/doctor-referrals/sent");
  },

  getReceived: () => {
    return api.get("/doctor-referrals/received");
  },

  updateStatus: (
    referralId: string,
    payload: {
      status: "accepted" | "completed" | "cancelled";
    },
  ) => {
    return api.patch(`/doctor-referrals/${referralId}/status`, payload);
  },
};
