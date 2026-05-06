import api from "./api";

export const clinicReferralService = {
  create: (payload: {
    appointmentId: string;
    clinicName: string;
    department?: string;
    address: string;
    lng?: number;
    lat?: number;
    reason: string;
    note?: string;
  }) => {
    return api.post("/clinic-referrals", payload);
  },

  getDoctorMine: () => {
    return api.get("/clinic-referrals/doctor/my");
  },

  getPatientMine: () => {
    return api.get("/clinic-referrals/patient/my");
  },
};
